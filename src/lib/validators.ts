import { z } from 'zod';
import { normalizeNigerianPhone } from './phoneNormalizer';

// Phone custom validator
const nigerianPhoneSchema = z.string().refine(
  (val) => {
    const { isValid } = normalizeNigerianPhone(val);
    return isValid;
  },
  { message: 'Please enter a valid 11-digit Nigerian phone number (e.g. 08012345678 or +2348012345678)' }
);

// 1. Forum Registration Step Schemas
export const step1Schema = z.object({
  name: z.string().min(3, 'Forum name must be at least 3 characters'),
  acronym: z.string().optional().or(z.literal('')),
  motto: z.string().optional().or(z.literal('')),
  yearEstablished: z.coerce
    .number({ invalid_type_error: 'Year must be a number' })
    .min(1960, 'Year must be 1960 or later')
    .max(2026, 'Year cannot be in the future'),
  areaOfCoverage: z.string().min(1, 'Please select your area of coverage'),
});

export const step2Schema = z.object({
  lgaId: z.coerce.number().min(1, 'Please select at least one LGA of operation'),
  selectedLgaIds: z.array(z.coerce.number()).optional().default([]),
  wardId: z.coerce.number().optional().nullable(),
  wardName: z.string().optional().or(z.literal('')),
  isAllWards: z.boolean().optional().default(false),
  officeAddress: z.string().min(5, 'Office address is required'),
  meetingVenue: z.string().optional().or(z.literal('')),
});

export const step3Schema = z.object({
  coordinatorName: z.string().min(3, 'Coordinator name is required'),
  coordinatorPhone: nigerianPhoneSchema,
  coordinatorEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  secretaryName: z.string().min(3, 'Secretary name is required'),
  secretaryPhone: nigerianPhoneSchema,
  forumEmail: z.string().email('Invalid forum email address').optional().or(z.literal('')),
  socialMediaHandles: z.string().optional().or(z.literal('')),
});

export const step4Schema = z.object({
  totalStrength: z.coerce
    .number({ invalid_type_error: 'Total strength must be a number' })
    .min(1, 'Declared member strength must be at least 1'),
  keyActivities: z
    .array(z.string())
    .min(1, 'Please select at least one key activity'),
  otherActivity: z.string().optional().or(z.literal('')),
  hasWhatsappGroup: z.boolean(),
  whatsappGroupLink: z.string().optional().or(z.literal('')),
  additionalCapacityInfo: z.string().optional().or(z.literal('')),
});

export const step5Schema = z.object({
  previousElectionActivity: z.enum([
    '2023',
    '2019',
    'Both 2019 and 2023',
    'This is our first time',
  ], { required_error: 'Please select your previous election activity' }),
  rolePlayedLastElection: z.string().optional().or(z.literal('')),
  leaderSponsorAlignment: z.string().optional().or(z.literal('')),
});

export const step6Schema = z.object({
  commitWork2027: z.boolean().refine((val) => val === true, {
    message: 'Commitment to work for APC candidates in 2027 is required',
  }),
  agreeWithCongress: z.boolean().refine((val) => val === true, {
    message: 'Agreement to align with APC Stakeholders Congress is required',
  }),
  declarationConfirmed: z.boolean().refine((val) => val === true, {
    message: 'You must confirm the truthfulness of the provided information',
  }),
  consentDataProcessing: z.boolean().refine((val) => val === true, {
    message: 'Consent to data processing is required',
  }),
});

export const step7Schema = z.object({
  supportNeeded: z.array(z.string()).default([]),
  willingAttendMeetings: z.enum(['Yes', 'No', 'Maybe'], {
    required_error: 'Please select your willingness to attend physical meetings in Ilorin',
  }),
});

export const fullRegistrationSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema)
  .extend({
    coordinatorPassportUrl: z.string().optional().or(z.literal('')),
    resolutionLetterUrl: z.string().optional().or(z.literal('')),
    supportingDocumentUrl: z.string().optional().or(z.literal('')),
  });

export type FullRegistrationInput = z.infer<typeof fullRegistrationSchema>;

// Admin Login Schema
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Admin Review Schema
export const reviewActionSchema = z.object({
  forumId: z.string().uuid(),
  action: z.enum(['under_review', 'more_info_required', 'approved_verified', 'rejected', 'suspended_revoked']),
  notes: z.string().optional().or(z.literal('')),
  queryMessage: z.string().optional().or(z.literal('')),
  rejectionReason: z.string().optional().or(z.literal('')),
});
