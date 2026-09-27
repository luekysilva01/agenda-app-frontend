export type UserRole = 'ADMIN' | 'PROFESSIONAL' | 'USER' | 'CLIENT';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED';

export interface User {
  id: string;
  clerkId?: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone?: string | null;
  slug?: string | null;
  avatarUrl?: string | null;
  title?: string | null;
  companyName?: string | null;
  documentNumber?: string | null;
  emailNotifications?: boolean;
  isGoogleAuth?: boolean;
  googleEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}

export interface LoginPayload {
  email?: string;
  password?: string;
}

export interface RegisterPayload {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  slug?: string;
  role?: UserRole;
}

export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  error: string;
  message: string | string[];
  timestamp: string;
  path: string;
}
