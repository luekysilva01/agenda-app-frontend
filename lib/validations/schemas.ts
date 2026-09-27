import { z } from "zod";

const HTML_TAG_REGEX = /<[^>]*>/;
const SUSPICIOUS_SCHEMES_REGEX = /(javascript:|vbscript:|data:\s*text\/html)/i;
const EVENT_HANDLER_REGEX = /\bon[a-z]+\s*=/i;

/**
 * Robust Anti-XSS validation helper: disallows HTML tags, dangerous schemes, and event handlers.
 */
export const noXss = (
  message: string = "Input contains disallowed HTML characters, scripts, or dangerous schemes"
) =>
  z.string().trim().refine(
    (val) => {
      if (!val) return true;
      return (
        !HTML_TAG_REGEX.test(val) &&
        !SUSPICIOUS_SCHEMES_REGEX.test(val) &&
        !EVENT_HANDLER_REGEX.test(val)
      );
    },
    { message }
  );

/**
 * Zod validation schemas for R3uno platform forms.
 */

// ==========================================
// Authentication Schemas
// ==========================================

export const loginSchema = z.object({
  email: noXss()
    .pipe(z.string().email("Please enter a valid corporate email address"))
    .optional()
    .or(z.literal("")),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: noXss()
    .pipe(
      z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name cannot exceed 100 characters")
    )
    .optional()
    .or(z.literal("")),
  email: noXss()
    .pipe(z.string().email("Please enter a valid corporate email address"))
    .optional()
    .or(z.literal("")),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms of Service and Privacy Policy to continue",
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;

// ==========================================
// Appointment Schemas
// ==========================================

export const newAppointmentSchema = z.object({
  clientName: noXss()
    .pipe(
      z
        .string()
        .min(2, "Client name must be at least 2 characters")
        .max(100, "Client name cannot exceed 100 characters")
    ),
  clientEmail: noXss().pipe(
    z.string().email("Please enter a valid email address for the client")
  ),
  clientPhone: noXss()
    .pipe(
      z
        .string()
        .min(6, "Please enter a valid phone number with area code")
        .max(30, "Phone number is too long")
    ),
  scheduledDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  scheduledTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  serviceName: noXss().pipe(
    z.string().min(1, "Please select or enter a service").max(100)
  ),
  serviceId: z.string().uuid().optional().nullable(),
  durationMinutes: z
    .number()
    .min(5, "Duration must be at least 5 minutes")
    .max(480, "Duration cannot exceed 8 hours"),
  notes: noXss()
    .pipe(z.string().max(1000, "Notes cannot exceed 1000 characters"))
    .optional()
    .nullable(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Client privacy consent is required",
  }),
});

export type NewAppointmentFormData = z.infer<typeof newAppointmentSchema>;

export const editAppointmentSchema = z.object({
  clientName: noXss()
    .pipe(
      z
        .string()
        .min(2, "Client name must be at least 2 characters")
        .max(100)
    ),
  clientEmail: noXss().pipe(
    z.string().email("Please enter a valid email address")
  ),
  clientPhone: noXss()
    .pipe(
      z
        .string()
        .min(6, "Please enter a valid phone number with area code")
        .max(30)
    ),
  scheduledDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  scheduledTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  status: z.enum(["CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"], {
    message: "Selected status is invalid",
  }),
  durationMinutes: z.number().min(5).max(480),
  notes: noXss()
    .pipe(z.string().max(1000))
    .optional()
    .nullable(),
});

export type EditAppointmentFormData = z.infer<typeof editAppointmentSchema>;

// ==========================================
// Service Catalog Schemas
// ==========================================

export const serviceSchema = z.object({
  name: noXss()
    .pipe(
      z
        .string()
        .min(2, "Service name must be at least 2 characters")
        .max(100, "Service name cannot exceed 100 characters")
    ),
  description: noXss()
    .pipe(z.string().max(500, "Description cannot exceed 500 characters"))
    .optional()
    .nullable(),
  durationMinutes: z
    .number()
    .min(5, "Duration must be at least 5 minutes")
    .max(480, "Duration cannot exceed 480 minutes (8 hours)"),
  category: noXss().pipe(z.string().min(1, "Category is required").max(60)),
  isActive: z.boolean(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

// ==========================================
// Working Hours & Availability Schemas
// ==========================================

export const availabilitySchema = z.object({
  workDays: z
    .array(z.string())
    .min(1, "Please select at least one active working day"),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Start time must be formatted as HH:MM"),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "End time must be formatted as HH:MM"),
  slotDuration: z.string().min(1, "Service duration is required"),
  bufferTime: z.string().min(1, "Buffer break interval is required"),
}).refine(
  (data) => {
    return data.startTime < data.endTime;
  },
  {
    message: "Start time must be earlier than end time",
    path: ["endTime"],
  }
);

export type AvailabilityFormData = z.infer<typeof availabilitySchema>;

// ==========================================
// Profile & Corporate Settings Schemas
// ==========================================

export const profileSettingsSchema = z.object({
  name: noXss()
    .pipe(
      z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name cannot exceed 100 characters")
    ),
  title: noXss()
    .pipe(z.string().max(100, "Title/Specialty cannot exceed 100 characters"))
    .optional()
    .nullable(),
  companyName: noXss()
    .pipe(z.string().max(100, "Company name cannot exceed 100 characters"))
    .optional()
    .nullable(),
  emailNotifications: z.boolean(),
});

export type ProfileSettingsFormData = z.infer<typeof profileSettingsSchema>;

// ==========================================
// Demo Booking Form Schema
// ==========================================

export const demoBookingSchema = z.object({
  clientName: noXss()
    .pipe(z.string().min(2, "Enter your full name").max(100)),
  clientEmail: noXss().pipe(
    z.string().email("Enter a valid corporate email address")
  ),
  clientPhone: noXss()
    .pipe(z.string().min(6, "Enter a valid phone number with area code").max(30)),
  notes: noXss().pipe(z.string().max(500)).optional().nullable(),
});

export type DemoBookingFormData = z.infer<typeof demoBookingSchema>;
