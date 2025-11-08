import * as Yup from 'yup'
import { VALIDATION_MESSAGES, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from './constants'

// Phone validation regex (India format: +91 9876543210 or 9876543210)
// Supports: +91 9876543210, +91-9876543210, +919876543210, 9876543210
const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/

// Email validation
export const emailSchema = Yup.string()
  .email(VALIDATION_MESSAGES.INVALID_EMAIL)
  .required(VALIDATION_MESSAGES.REQUIRED)

// Phone validation
export const phoneSchema = Yup.string()
  .matches(phoneRegex, VALIDATION_MESSAGES.INVALID_PHONE)
  .required(VALIDATION_MESSAGES.REQUIRED)

// Password validation
export const passwordSchema = Yup.string()
  .min(8, VALIDATION_MESSAGES.PASSWORD_TOO_SHORT)
  .required(VALIDATION_MESSAGES.REQUIRED)

// File validation
export const fileSchema = Yup.mixed<File>()
  .required(VALIDATION_MESSAGES.REQUIRED)
  .test('fileType', VALIDATION_MESSAGES.INVALID_FILE_TYPE, (value) => {
    if (!value) return false
    return ALLOWED_FILE_TYPES.includes(value.type)
  })
  .test('fileSize', VALIDATION_MESSAGES.FILE_TOO_LARGE, (value) => {
    if (!value) return false
    return value.size <= MAX_FILE_SIZE
  })

// Login Schema
export const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
})

// Signup Schema
export const signupSchema = Yup.object().shape({
  name: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], VALIDATION_MESSAGES.PASSWORD_MISMATCH)
    .required(VALIDATION_MESSAGES.REQUIRED),
  role: Yup.string()
    .oneOf(['tenant', 'landlord'], 'Please select a role')
    .required(VALIDATION_MESSAGES.REQUIRED),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(VALIDATION_MESSAGES.REQUIRED),
})

// Tenant Request - Basic Info Schema
export const basicInfoSchema = Yup.object().shape({
  name: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  email: emailSchema,
  phone: phoneSchema,
  address: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  moveInDate: Yup.date()
    .min(new Date(), VALIDATION_MESSAGES.INVALID_DATE)
    .required(VALIDATION_MESSAGES.REQUIRED),
})

// Tenant Request - Employment Details Schema
export const employmentSchema = Yup.object().shape({
  employerName: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  jobTitle: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  monthlyIncome: Yup.number()
    .positive('Monthly income must be positive')
    .required(VALIDATION_MESSAGES.REQUIRED),
  employmentType: Yup.string()
    .oneOf(['full-time', 'part-time', 'contract', 'self-employed'], 'Please select employment type')
    .required(VALIDATION_MESSAGES.REQUIRED),
})

// Tenant Request - Documents Schema
export const documentsSchema = Yup.object().shape({
  idProof: fileSchema,
  payslip: fileSchema,
  additionalDocuments: Yup.array()
    .of(fileSchema)
    .optional(),
})

// Tenant Request - References Schema
export const referencesSchema = Yup.object().shape({
  reference1Name: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  reference1Phone: phoneSchema,
  reference1Email: emailSchema,
  reference2Name: Yup.string().optional(),
  reference2Phone: Yup.string().when('reference2Name', {
    is: (val: string) => val && val.length > 0,
    then: () => phoneSchema,
    otherwise: () => Yup.string().optional(),
  }),
  reference2Email: Yup.string().when('reference2Name', {
    is: (val: string) => val && val.length > 0,
    then: () => emailSchema,
    otherwise: () => Yup.string().optional(),
  }),
  consent: Yup.boolean()
    .oneOf([true], 'You must provide consent')
    .required(VALIDATION_MESSAGES.REQUIRED),
})

// Complete Tenant Request Schema
export const tenantRequestSchema = basicInfoSchema
  .concat(employmentSchema)
  .concat(documentsSchema)
  .concat(referencesSchema)

// Profile Update Schema
export const profileUpdateSchema = Yup.object().shape({
  name: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  email: emailSchema,
  phone: phoneSchema,
  address: Yup.string().optional(),
  bio: Yup.string().optional(),
})


