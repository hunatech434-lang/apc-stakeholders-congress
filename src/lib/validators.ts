import { z } from 'zod';
import { normalizeNigerianPhone } from './phoneNormalizer';

// Phone custom validator
const nigerianPhoneSchema = z.string().refine(
  (val) => {
    if (!val || !val.trim()) return false;
    const { isValid } = normalizeNigerianPhone(val);
    return isValid;
  },
  { message: 'Please enter a valid Nigerian phone number (e.g. 08012345678)' }
);

// Optional email schema that allows empty strings or valid emails
const optionalEmailSchema = z.string().optional().nullable().transform((val) => val?.trim() || null).refine(
  (val) => {
    if (!val) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  },
  { message: 'Please enter a valid email address or leave blank' }
);

// Section 1 Schema (Forum Identity, Geography, and Leadership Contacts)
export const section1Schema = z.object({
  name: z.string().min(2, 'Forum name must be at least 2 characters'),
  motto: z.string().optional().nullable(),
  yearEstablished: z.coerce
    .number({ invalid_type_error: 'Year must be a number' })
    .min(1960, 'Year must be 1960 or later')
    .max(2026, 'Year cannot be in the future'),
  areaOfCoverage: z.string().min(1, 'Please select your area of coverage'),
  selectedCoverages: z.array(z.string()).optional().default([]),

  lgaId: z.coerce.number().min(1, 'Please select at least one LGA of operation'),
  selectedLgaIds: z.array(z.coerce.number()).optional().default([]),
  isAllLgas: z.boolean().optional().default(false),
  wardId: z.coerce.number().optional().nullable(),
  wardName: z.string().optional().nullable(),
  isAllWards: z.boolean().optional().default(false),
  officeAddress: z.string().min(3, 'Office / secretariat address is required'),

  coordinatorName: z.string().min(2, 'Coordinator name is required'),
  coordinatorPhone: nigerianPhoneSchema,
  secretaryName: z.string().min(2, 'Secretary name is required'),
  secretaryPhone: nigerianPhoneSchema,
  forumEmail: optionalEmailSchema,
  socialMediaHandles: z.string().optional().nullable(),
});

// Section 2 Schema (Capacity, Political Track Record, Commitments, Support)
export const section2Schema = z.object({
  totalStrength: z.coerce
    .number({ invalid_type_error: 'Total strength must be a number' })
    .min(1, 'Declared member strength must be at least 1'),
  strengthRange: z.string().optional().nullable(),
  keyActivities: z
    .array(z.string())
    .min(1, 'Please select at least one key mobilization activity'),
  otherActivity: z.string().optional().nullable(),
  hasWhatsappGroup: z.boolean().default(false),
  whatsappGroupLink: z.string().optional().nullable(),
  additionalCapacityInfo: z.string().optional().nullable(),

  previousElectionActivity: z.enum([
    '2023',
    '2019',
    'Both 2019 and 2023',
    'This is our first time',
  ], { required_error: 'Please select your previous election activity' }),
  rolePlayedLastElection: z.string().optional().nullable(),
  leaderSponsorAlignment: z.string().optional().nullable(),

  commitWork2027: z.boolean().refine((val) => val === true, {
    message: 'Commitment to work for APC victory in 2027 is required',
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

  supportNeeded: z.array(z.string()).default([]),
  willingAttendMeetings: z.enum(['Yes', 'No', 'Maybe'], {
    required_error: 'Please select your willingness to attend physical meetings in Ilorin',
  }),

  coordinatorPassportUrl: z.string().optional().nullable(),
  resolutionLetterUrl: z.string().optional().nullable(),
  supportingDocumentUrl: z.string().optional().nullable(),
});

// Full Combined Registration Schema
export const fullRegistrationSchema = section1Schema.merge(section2Schema);

export type FullRegistrationInput = z.infer<typeof fullRegistrationSchema>;

// Admin & CMS Schemas
export const loginSchema = z.object({
  identifier: z.string().min(1, 'Username or Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const reviewDecisionSchema = z.object({
  forumId: z.string().min(1),
  decision: z.enum(['approve', 'query', 'reject', 'suspend']),
  comment: z.string().optional(),
  queryMessage: z.string().optional(),
  rejectionReason: z.string().optional(),
});

export const newsPostSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  body: z.string().min(10, 'Body content is required'),
  category: z.string().default('General'),
  featuredImageUrl: z.string().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
});

export const announcementSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  body: z.string().min(5, 'Message body is required'),
  targetAudience: z.enum(['all', 'registered_only', 'coordinators_only']).default('all'),
  isPinned: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
});
