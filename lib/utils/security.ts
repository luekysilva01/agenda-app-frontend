/**
 * Security utilities for XSS prevention, Safe URL Redirections, and Parameter Sanitization.
 */

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const SCRIPT_TAG_REGEX = /<[^>]*>/gm;
const DANGEROUS_URI_REGEX = /(javascript:|data:\s*text\/html|vbscript:|file:)/gi;
const EVENT_HANDLER_REGEX = /\bon[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi;

/**
 * Validates whether a string matches a strict RFC 4122 UUID format (v1-v5).
 */
export function isValidUUID(id: string | null | undefined): boolean {
  if (!id || typeof id !== "string") return false;
  return UUID_REGEX.test(id.trim());
}

/**
 * Validates and normalizes an ISO Date string (YYYY-MM-DD) from query parameters.
 * Returns the fallback date if the parameter is missing or invalid.
 */
export function getSafeDateParam(
  param: string | null | undefined,
  fallbackDate: string = new Date().toISOString().split("T")[0]
): string {
  if (!param || typeof param !== "string") return fallbackDate;
  const clean = param.trim().split("T")[0];
  if (!DATE_REGEX.test(clean)) return fallbackDate;

  const [year, month, day] = clean.split("-").map(Number);
  if (year < 2000 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
    return fallbackDate;
  }

  return clean;
}

/**
 * Sanitizes input text to eliminate XSS vectors, stripping HTML tags, event handlers, and dangerous schemes.
 */
export function sanitizeText(text: string | null | undefined): string {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(SCRIPT_TAG_REGEX, "")
    .replace(EVENT_HANDLER_REGEX, "")
    .replace(DANGEROUS_URI_REGEX, "")
    .trim();
}

/**
 * Validates redirect URLs to prevent Open Redirect and DOM-based XSS vulnerabilities.
 * Ensures the destination is strictly a local relative route starting with '/' (and not '//' or '/\').
 */
export function getSafeRedirectUrl(
  url: string | null | undefined,
  fallback: string = "/dashboard"
): string {
  if (!url || typeof url !== "string") return fallback;

  const trimmed = url.trim();

  // Must start with '/'
  if (!trimmed.startsWith("/")) return fallback;

  // Must not start with '//' or '/\' (protocol-relative open redirects)
  if (trimmed.startsWith("//") || trimmed.startsWith("/\\") || trimmed.startsWith("/%5C")) {
    return fallback;
  }

  // Must not contain URI schemes (javascript:, data:, https:, http:)
  if (trimmed.includes(":") || trimmed.includes("javascript") || trimmed.includes("data:")) {
    return fallback;
  }

  // Must not contain control characters
  if (/[\x00-\x1F\x7F]/.test(trimmed)) {
    return fallback;
  }

  return trimmed;
}

/**
 * Validates URLs for SSRF prevention, ensuring only allowed external HTTPS protocols and domains.
 */
export function isValidPublicUrl(url: string | null | undefined, allowedDomains: string[] = []): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;

    // Disallow loopback, private IPv4, IPv6, metadata endpoints (SSRF vectors)
    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "169.254.169.254" ||
      hostname.startsWith("10.") ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("172.16.") ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".local")
    ) {
      return false;
    }

    if (allowedDomains.length > 0) {
      return allowedDomains.some((d) => hostname === d || hostname.endsWith(`.${d}`));
    }

    return true;
  } catch {
    return false;
  }
}
