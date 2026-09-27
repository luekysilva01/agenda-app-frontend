import { ApiErrorResponse } from './types';
import { getCookie } from '../utils/cookies';

const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location.hostname) {
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    return `${protocol}//${window.location.hostname}:3333`;
  }
  return 'http://localhost:3333';
};

const API_BASE_URL = getApiBaseUrl();

export class ApiClientError extends Error {
  statusCode: number;
  errorName: string;
  messages: string[];

  constructor(statusCode: number, errorName: string, messages: string | string[]) {
    const messageList = Array.isArray(messages) ? messages : [messages];
    super(messageList[0] || 'Ocorreu um erro durante a requisição');
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.errorName = errorName;
    this.messages = messageList;
  }
}

/**
 * Robust API Client with Cookie and Bearer token injection,
 * credentials include for secure session transmission, and unified error extraction.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${normalizedEndpoint}`;

  // Retrieve token from secure cookies if in browser environment
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = getCookie('r3uno_access_token') || getCookie('__session');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      credentials: 'include',
      ...options,
      headers,
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const errorBody = data as ApiErrorResponse | null;
      const errorMessages =
        errorBody?.message ||
        `Erro ${response.status}: ${response.statusText || 'Falha na comunicação com o servidor'}`;
      const errorTitle = errorBody?.error || 'Erro';

      throw new ApiClientError(response.status, errorTitle, errorMessages);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiClientError(
        0,
        'Erro de Conexão',
        'Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.',
      );
    }

    throw new ApiClientError(500, 'Erro Inesperado', (error as Error).message || 'Erro desconhecido');
  }
}
