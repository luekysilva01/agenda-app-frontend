"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  useUser,
  useAuth as useClerkAuth,
  useClerk,
} from "@clerk/nextjs";
import { User, LoginPayload, RegisterPayload, UserRole } from "../api/types";
import { authApi, BackendMeResponse } from "../api/auth";
import {
  getCookie,
  setCookie,
  deleteCookie,
  purgeLegacyLocalStorage,
} from "../utils/cookies";
import { getSafeRedirectUrl } from "../utils/security";

interface AuthContextType {
  user: User | null;
  clerkUser: ReturnType<typeof useUser>["user"] | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: (redirectUrl?: string) => Promise<void>;
  signUpWithGoogle: (redirectUrl?: string) => Promise<void>;
  login: (payload?: LoginPayload) => Promise<User>;
  register: (payload?: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  refreshUser: () => Promise<void>;
  fetchBackendProfile: () => Promise<BackendMeResponse>;
  updateUserProfile: (profileData: Partial<User>) => void;
}

const STORAGE_KEY = "r3uno_access_token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { getToken: getClerkToken } = useClerkAuth();
  const clerk = useClerk();

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      purgeLegacyLocalStorage();
      return getCookie(STORAGE_KEY) || getCookie("__session");
    }
    return null;
  });
  const [dbProfile, setDbProfile] = useState<Partial<User> | null>(null);

  // Map Clerk user to our standardized User model and merge dbProfile
  const user: User | null = useMemo(() => {
    if (!isSignedIn || !clerkUser) return null;

    const primaryEmail =
      clerkUser.primaryEmailAddress?.emailAddress ||
      clerkUser.emailAddresses?.[0]?.emailAddress ||
      "";

    const fullName =
      dbProfile?.name ||
      clerkUser.fullName ||
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
      clerkUser.username ||
      primaryEmail.split("@")[0] ||
      "Usuário Google";

    const autoSlug = fullName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const googleAccount = clerkUser.externalAccounts?.find(
      (acc) =>
        acc.provider === "google" ||
        acc.verification?.strategy === "oauth_google",
    );

    return {
      id: clerkUser.id,
      clerkId: clerkUser.id,
      name: fullName,
      email: primaryEmail,
      role: (dbProfile?.role || (clerkUser.publicMetadata?.role as string) || "PROFESSIONAL") as UserRole,
      status: "ACTIVE",
      phone: dbProfile?.phone || clerkUser.phoneNumbers?.[0]?.phoneNumber || null,
      slug: dbProfile?.slug || (clerkUser.publicMetadata?.slug as string) || autoSlug || "minha-agenda",
      avatarUrl: dbProfile?.avatarUrl || clerkUser.imageUrl || null,
      title: dbProfile?.title || "",
      companyName: dbProfile?.companyName || "",
      documentNumber: dbProfile?.documentNumber || "",
      emailNotifications: dbProfile?.emailNotifications ?? true,
      isGoogleAuth: !!googleAccount || (clerkUser.externalAccounts && clerkUser.externalAccounts.length > 0),
      googleEmail: googleAccount?.emailAddress || primaryEmail,
      createdAt: clerkUser.createdAt
        ? new Date(clerkUser.createdAt).toISOString()
        : new Date().toISOString(),
      updatedAt: clerkUser.updatedAt
        ? new Date(clerkUser.updatedAt).toISOString()
        : new Date().toISOString(),
    };
  }, [isSignedIn, clerkUser, dbProfile]);

  // Sync token to secure cookie for backend requests
  useEffect(() => {
    let isMounted = true;

    const syncTokenAndProfile = async () => {
      if (isSignedIn) {
        try {
          // Always purge any stale localStorage items
          purgeLegacyLocalStorage();

          const currentToken = await getClerkToken();
          if (isMounted) {
            setToken(currentToken);
            if (typeof window !== "undefined" && currentToken) {
              setCookie(STORAGE_KEY, currentToken, { days: 7, path: "/" });
            }

            // Sync backend profile securely
            try {
              const profileRes = await authApi.getMe(currentToken || undefined);
              if (isMounted && profileRes?.user) {
                setDbProfile(profileRes.user);
              }
            } catch {
              // Silently fallback to Clerk profile
            }
          }
        } catch (err) {
          console.error("Error getting Clerk token:", err);
        }
      } else {
        if (isMounted) {
          setToken(null);
          setDbProfile(null);
          if (typeof window !== "undefined") {
            deleteCookie(STORAGE_KEY);
            deleteCookie("__session");
            purgeLegacyLocalStorage();
          }
        }
      }
    };

    if (isLoaded) {
      syncTokenAndProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [isLoaded, isSignedIn, getClerkToken]);

  /**
   * Triggers direct Google OAuth Sign-In
   */
  const loginWithGoogle = useCallback(
    async (redirectUrl: string = "/dashboard") => {
      const signIn = clerk.client?.signIn;
      if (!signIn) {
        throw new Error(
          "O serviço de autenticação ainda está inicializando. Tente novamente em alguns instantes."
        );
      }
      const safeRedirect = getSafeRedirectUrl(redirectUrl, "/dashboard");
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: safeRedirect,
        continueSignUp: true,
      });
    },
    [clerk],
  );

  /**
   * Triggers direct Google OAuth Sign-Up
   */
  const signUpWithGoogle = useCallback(
    async (redirectUrl: string = "/dashboard") => {
      const signUp = clerk.client?.signUp;
      if (!signUp) {
        throw new Error(
          "O serviço de autenticação ainda está inicializando. Tente novamente em alguns instantes."
        );
      }
      const safeRedirect = getSafeRedirectUrl(redirectUrl, "/dashboard");
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: safeRedirect,
        continueSignIn: true,
      });
    },
    [clerk],
  );

  const login = useCallback(
    async (): Promise<User> => {
      await loginWithGoogle("/dashboard");
      if (user) return user;
      throw new Error("Redirecionando para a autenticação do Google...");
    },
    [loginWithGoogle, user],
  );

  const register = useCallback(
    async (): Promise<User> => {
      await signUpWithGoogle("/dashboard");
      if (user) return user;
      throw new Error("Redirecionando para a criação de conta do Google...");
    },
    [signUpWithGoogle, user],
  );

  const logout = useCallback(async () => {
    if (typeof window !== "undefined") {
      deleteCookie(STORAGE_KEY);
      deleteCookie("__session");
      purgeLegacyLocalStorage();
    }
    setToken(null);
    setDbProfile(null);
    await clerk.signOut({ redirectUrl: "/" });
  }, [clerk]);

  const getToken = useCallback(async (): Promise<string | null> => {
    try {
      const t = await getClerkToken();
      if (t) {
        setToken(t);
        if (typeof window !== "undefined") {
          setCookie(STORAGE_KEY, t, { days: 7, path: "/" });
        }
      }
      return t;
    } catch {
      return null;
    }
  }, [getClerkToken]);

  const refreshUser = useCallback(async () => {
    await clerk.user?.reload();
  }, [clerk]);

  const fetchBackendProfile = useCallback(async () => {
    const freshToken = await getToken();
    return authApi.getMe(freshToken || undefined);
  }, [getToken]);

  const updateUserProfile = useCallback((profileData: Partial<User>) => {
    setDbProfile((prev) => ({ ...(prev || {}), ...profileData }));
  }, []);

  const value = useMemo(
    () => ({
      user,
      clerkUser: clerkUser || null,
      token,
      isLoading: !isLoaded,
      isAuthenticated: !!isSignedIn,
      loginWithGoogle,
      signUpWithGoogle,
      login,
      register,
      logout,
      getToken,
      refreshUser,
      fetchBackendProfile,
      updateUserProfile,
    }),
    [
      user,
      clerkUser,
      token,
      isLoaded,
      isSignedIn,
      loginWithGoogle,
      signUpWithGoogle,
      login,
      register,
      logout,
      getToken,
      refreshUser,
      fetchBackendProfile,
      updateUserProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um <AuthProvider />");
  }
  return context;
}
