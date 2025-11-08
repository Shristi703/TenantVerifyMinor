import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import toast from 'react-hot-toast'

// Request interceptor to add auth token
export const setupRequestInterceptor = (instance: ReturnType<typeof axios.create>) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('authToken')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )
}

// Response interceptor for error handling
export const setupResponseInterceptor = (instance: ReturnType<typeof axios.create>) => {
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        const message = (error.response.data as any)?.message || 'An error occurred'
        toast.error(message)
        
        // Handle 401 Unauthorized
        if (error.response.status === 401) {
          localStorage.removeItem('authToken')
          localStorage.removeItem('userRole')
          window.location.href = '/login'
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection.')
      } else {
        toast.error('An unexpected error occurred')
      }
      return Promise.reject(error)
    }
  )
}

// Setup interceptors for an axios instance
export const setupInterceptors = (instance: ReturnType<typeof axios.create>) => {
  setupRequestInterceptor(instance)
  setupResponseInterceptor(instance)
}

