// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// User Roles
export const USER_ROLES = {
  TENANT: 'tenant',
  LANDLORD: 'landlord'
} as const

// Request Statuses
export const REQUEST_STATUS = {
  SUBMITTED: 'submitted',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  MORE_INFO_REQUIRED: 'more_info_required'
} as const

// File Upload Constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
export const ALLOWED_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf']

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number (e.g., +91 9876543210)',
  INVALID_FILE_TYPE: 'Only JPG, PNG, and PDF files are allowed',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  PASSWORD_MISMATCH: 'Passwords do not match',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  INVALID_DATE: 'Move-in date must be today or later'
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    VERIFY_OTP: '/auth/verify-otp',
    LOGOUT: '/auth/logout'
  },
  LISTINGS: {
    GET_ALL: '/listings',
    GET_DETAIL: '/listings/:id',
    SEARCH: '/listings/search'
  },
  TENANT: {
    CREATE_REQUEST: '/tenant/request',
    GET_REQUESTS: '/tenant/requests',
    GET_REQUEST_DETAIL: '/tenant/request/:id',
    UPDATE_REQUEST: '/tenant/request/:id',
    DELETE_REQUEST: '/tenant/request/:id'
  },
  LANDLORD: {
    GET_REQUESTS: '/landlord/requests',
    GET_REQUEST_DETAIL: '/landlord/request/:id',
    APPROVE_REQUEST: '/landlord/request/:id/approve',
    REJECT_REQUEST: '/landlord/request/:id/reject',
    REQUEST_MORE_INFO: '/landlord/request/:id/more-info'
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    UPLOAD_PHOTO: '/profile/photo'
  }
}

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LISTINGS: '/listings',
  LISTING_DETAIL: '/listings/:id',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  TENANT: {
    DASHBOARD: '/tenant/dashboard',
    NEW_REQUEST: '/tenant/request/new',
    REQUESTS: '/tenant/requests',
    PROFILE: '/tenant/profile'
  },
  LANDLORD: {
    DASHBOARD: '/landlord/dashboard',
    REQUEST_DETAIL: '/landlord/request/:id',
    PROFILE: '/landlord/profile'
  }
}


