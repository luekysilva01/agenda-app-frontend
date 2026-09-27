/**
 * Secure Cookie management utility.
 * Eliminates reliance on localStorage for tokens and sensitive user states.
 */

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setCookie(
  name: string,
  value: string,
  options: {
    days?: number;
    path?: string;
    sameSite?: 'Lax' | 'Strict' | 'None';
    secure?: boolean;
  } = {},
): void {
  if (typeof document === 'undefined') return;

  const {
    days = 7,
    path = '/',
    sameSite = 'Lax',
    secure = typeof window !== 'undefined' && window.location.protocol === 'https:',
  } = options;

  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  const secureFlag = secure ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=${path}; SameSite=${sameSite}${secureFlag}`;
}

export function deleteCookie(name: string, path: string = '/'): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

/**
 * Purges legacy sensitive/state data from localStorage to prevent XSS exposure
 * and enforce cookie/memory-only architecture.
 */
export function purgeLegacyLocalStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const legacyKeys = [
      'r3uno_access_token',
      'r3uno_user_data',
      'r3uno_db_profile',
      'r3uno_availability_settings',
      'r3uno_cookie_consent',
      'r3uno_token',
      'agar_doctor_token',
      'token',
    ];
    for (const key of legacyKeys) {
      localStorage.removeItem(key);
    }
  } catch {
    // Ignore environments where localStorage is restricted
  }
}
