import { apiClient } from './client';
import { User } from './types';

export interface GoogleDetails {
  provider: string;
  email: string;
  googleId?: string;
  avatarUrl?: string;
  verified?: boolean;
  verificationStatus?: string;
}

export interface GoogleInfoResponse {
  success: boolean;
  authenticatedVia: string;
  clerkUserId: string;
  sessionId?: string;
  googleDetails: GoogleDetails;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    role: string;
  };
}

export interface BackendMeResponse {
  success: boolean;
  user: User & {
    isGoogleAuth?: boolean;
    googleDetails?: GoogleDetails | null;
  };
}

export interface SyncUserResponse {
  success: boolean;
  message: string;
  user: Record<string, unknown>;
}

export const authApi = {
  /**
   * Checks the health and status of the Auth Service.
   */
  async getStatus(): Promise<{ status: string; service: string; authProvider: string; timestamp: string }> {
    return apiClient<{ status: string; service: string; authProvider: string; timestamp: string }>('/auth/status');
  },

  /**
   * Fetches the currently authenticated user's profile from the backend using the Clerk token.
   */
  async getMe(customToken?: string): Promise<BackendMeResponse> {
    return apiClient<BackendMeResponse>('/auth/me', {
      method: 'GET',
      headers: customToken
        ? { Authorization: `Bearer ${customToken}` }
        : undefined,
    });
  },

  /**
   * Updates user account settings and professional profile.
   */
  async updateProfile(
    payload: Partial<User>,
    customToken?: string
  ): Promise<{ success: boolean; message: string; user: User }> {
    return apiClient<{ success: boolean; message: string; user: User }>('/auth/profile', {
      method: 'PATCH',
      headers: customToken
        ? { Authorization: `Bearer ${customToken}` }
        : undefined,
      body: JSON.stringify(payload),
    });
  },

  /**
   * Fetches Google OAuth verification and identity info for the user.
   */
  async getGoogleInfo(customToken?: string): Promise<GoogleInfoResponse> {
    return apiClient<GoogleInfoResponse>('/auth/google-info', {
      method: 'GET',
      headers: customToken
        ? { Authorization: `Bearer ${customToken}` }
        : undefined,
    });
  },

  /**
   * Synchronizes Clerk user profile with PostgreSQL database.
   */
  async syncUser(customToken?: string): Promise<SyncUserResponse> {
    return apiClient<SyncUserResponse>('/auth/sync', {
      method: 'POST',
      headers: customToken
        ? { Authorization: `Bearer ${customToken}` }
        : undefined,
      body: JSON.stringify({}),
    });
  },

  /**
   * Data Portability: Exports the complete personal data dossier of the user.
   */
  async exportLgpdData(customToken?: string): Promise<{ success: boolean; dossie: Record<string, unknown> }> {
    return apiClient<{ success: boolean; dossie: Record<string, unknown> }>('/auth/lgpd/export', {
      method: 'GET',
      headers: customToken
        ? { Authorization: `Bearer ${customToken}` }
        : undefined,
    });
  },

  /**
   * Data Anonymization: Anonymizes client personal data from a specific appointment.
   */
  async anonymizeAppointment(
    appointmentId: string,
    customToken?: string
  ): Promise<{ success: boolean; message: string; appointment: Record<string, unknown> }> {
    return apiClient<{ success: boolean; message: string; appointment: Record<string, unknown> }>(
      `/auth/lgpd/anonymize-appointment/${appointmentId}`,
      {
        method: 'POST',
        headers: customToken
          ? { Authorization: `Bearer ${customToken}` }
          : undefined,
        body: JSON.stringify({}),
      }
    );
  },

  /**
   * Right to Erasure: Request permanent deletion and anonymization of user account.
   */
  async deleteAccount(customToken?: string): Promise<{ success: boolean; message: string; deletedAt: string }> {
    return apiClient<{ success: boolean; message: string; deletedAt: string }>('/auth/lgpd/delete-account', {
      method: 'DELETE',
      headers: customToken
        ? { Authorization: `Bearer ${customToken}` }
        : undefined,
    });
  },
};
