import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { loginSchema } from '../utils/validationSchemas'
import { authAPI } from '../utils/api'
import { ROUTES, USER_ROLES } from '../utils/constants'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await authAPI.login(values)
      toast.success('Login successful!')
      
      // Redirect based on user role
      const userRole = localStorage.getItem('userRole')
      if (userRole === USER_ROLES.TENANT) {
        navigate(ROUTES.TENANT.DASHBOARD)
      } else if (userRole === USER_ROLES.LANDLORD) {
        navigate(ROUTES.LANDLORD.DASHBOARD)
      } else {
        navigate(ROUTES.HOME)
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
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
            Welcome Back
          </h2>
          <p className="text-encora-text/70 dark:text-white/70">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-8">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Email Address
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

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                    </div>
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="block w-full pl-10 pr-10 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                      placeholder="Enter your password"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-encora-green focus:ring-encora-green border-encora-green/30 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-encora-text dark:text-white">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-encora-green dark:text-encora-mint hover:text-encora-green-dark dark:hover:text-encora-mint-light transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-encora-green dark:bg-white hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-encora-green dark:focus:ring-encora-mint disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-encora-text dark:text-white">
              Don't have an account?{' '}
              <Link
                to={ROUTES.SIGNUP}
                className="font-medium text-encora-green dark:text-encora-mint hover:text-encora-green-dark dark:hover:text-encora-mint-light transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
