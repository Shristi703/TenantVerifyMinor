import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Mail, Lock, User, Building2, Home, Eye, EyeOff } from 'lucide-react'
import { signupSchema } from '../utils/validationSchemas'
import { authAPI } from '../utils/api'
import { ROUTES, USER_ROLES } from '../utils/constants'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (values: {
    name: string
    email: string
    phone: string
    password: string
    confirmPassword: string
    role: string
    terms: boolean
  }) => {
    try {
      const { confirmPassword, terms, ...signupData } = values
      await authAPI.signup(signupData)
      toast.success('Signup successful! Please verify your email.')
      navigate(ROUTES.LOGIN)
    } catch (error: any) {
      toast.error(error.message || 'Signup failed')
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-80 h-80 bg-encora-mint/10 dark:bg-encora-mint/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-encora-green/5 dark:bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-encora-green dark:text-white mb-2">
            Create Account
          </h2>
          <p className="text-encora-text/70 dark:text-white/70">
            Get started with your account today
          </p>
        </div>

        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-8">
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              password: '',
              confirmPassword: '',
              role: '',
              terms: false,
            }}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-encora-text dark:text-white mb-3">
                    I am a: <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFieldValue('role', USER_ROLES.TENANT)}
                      className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${
                        values.role === USER_ROLES.TENANT
                          ? 'border-encora-green dark:border-encora-mint bg-encora-green/10 dark:bg-encora-mint/20 shadow-md'
                          : 'border-encora-green/20 dark:border-encora-mint/30 bg-white dark:bg-encora-green/50 hover:border-encora-green/40 dark:hover:border-encora-mint/50'
                      }`}
                    >
                      <Home
                        className={`h-8 w-8 mb-2 ${
                          values.role === USER_ROLES.TENANT
                            ? 'text-encora-green dark:text-encora-mint'
                            : 'text-encora-green/50 dark:text-encora-mint/50'
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          values.role === USER_ROLES.TENANT
                            ? 'text-encora-green dark:text-white'
                            : 'text-encora-text dark:text-white/70'
                        }`}
                      >
                        Tenant
                      </span>
                      {values.role === USER_ROLES.TENANT && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-encora-green dark:bg-encora-mint rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setFieldValue('role', USER_ROLES.LANDLORD)}
                      className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${
                        values.role === USER_ROLES.LANDLORD
                          ? 'border-encora-green dark:border-encora-mint bg-encora-green/10 dark:bg-encora-mint/20 shadow-md'
                          : 'border-encora-green/20 dark:border-encora-mint/30 bg-white dark:bg-encora-green/50 hover:border-encora-green/40 dark:hover:border-encora-mint/50'
                      }`}
                    >
                      <Building2
                        className={`h-8 w-8 mb-2 ${
                          values.role === USER_ROLES.LANDLORD
                            ? 'text-encora-green dark:text-encora-mint'
                            : 'text-encora-green/50 dark:text-encora-mint/50'
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          values.role === USER_ROLES.LANDLORD
                            ? 'text-encora-green dark:text-white'
                            : 'text-encora-text dark:text-white/70'
                        }`}
                      >
                        Landlord
                      </span>
                      {values.role === USER_ROLES.LANDLORD && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-encora-green dark:bg-encora-mint rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                    </div>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                    </div>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                    placeholder="+91 9876543210"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                    </div>
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className="block w-full pl-10 pr-10 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-encora-green/50 dark:text-encora-mint/50 hover:text-encora-green dark:hover:text-encora-mint transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                    </div>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className="block w-full pl-10 pr-10 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-encora-green/50 dark:text-encora-mint/50 hover:text-encora-green dark:hover:text-encora-mint transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start">
                  <Field
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-encora-green focus:ring-encora-green border-encora-green/30 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-encora-text dark:text-white">
                    I agree to the{' '}
                    <Link to="/terms" className="text-encora-green dark:text-encora-mint hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                <ErrorMessage name="terms" component="div" className="text-red-500 text-sm mt-1" />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !values.role}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-encora-green dark:bg-white hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-encora-green dark:focus:ring-encora-mint disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-encora-text dark:text-white">
              Already have an account?{' '}
              <Link
                to={ROUTES.LOGIN}
                className="font-medium text-encora-green dark:text-encora-mint hover:text-encora-green-dark dark:hover:text-encora-mint-light transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
