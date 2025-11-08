import axios from 'axios'
import { API_BASE_URL } from './constants'
import { setupInterceptors } from './axiosInterceptor'
import { mockListings, filterListings, simulateDelay, MockListing } from './mockData'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Setup interceptors
setupInterceptors(api)

// Check if we should use mock data (when API is not available)
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || !API_BASE_URL || API_BASE_URL.includes('localhost')

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials)
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userRole', response.data.user.role)
    }
    return response.data
  },
  
  signup: async (userData: { name: string; email: string; phone: string; password: string; role: string }) => {
    const response = await api.post('/auth/signup', userData)
    return response.data
  },
  
  verifyOTP: async (otp: string) => {
    const response = await api.post('/auth/verify-otp', { otp })
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userRole', response.data.user.role)
    }
    return response.data
  },
  
  logout: async () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    return { success: true }
  }
}

// Listings API
export const listingsAPI = {
  getAll: async (params?: { search?: string; filters?: any }) => {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await simulateDelay(500)
      
      // Filter mock data
      const filtered = filterListings(mockListings, params?.search, params?.filters)
      
      return filtered
    }
    
    try {
      const response = await api.get('/listings', { params })
      return response.data
    } catch (error: any) {
      // Fallback to mock data on error
      console.warn('API request failed, using mock data:', error.message)
      await simulateDelay(500)
      return filterListings(mockListings, params?.search, params?.filters)
    }
  },
  
  getDetail: async (id: string) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(300)
      const listing = mockListings.find((l) => l.id === id)
      if (!listing) {
        throw new Error('Listing not found')
      }
      return listing
    }
    
    try {
      const response = await api.get(`/listings/${id}`)
      return response.data
    } catch (error: any) {
      // Fallback to mock data on error
      console.warn('API request failed, using mock data:', error.message)
      await simulateDelay(300)
      const listing = mockListings.find((l) => l.id === id)
      if (!listing) {
        throw new Error('Listing not found')
      }
      return listing
    }
  },
  
  search: async (query: string) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(400)
      return filterListings(mockListings, query)
    }
    
    try {
      const response = await api.get('/listings/search', { params: { q: query } })
      return response.data
    } catch (error: any) {
      // Fallback to mock data on error
      console.warn('API request failed, using mock data:', error.message)
      await simulateDelay(400)
      return filterListings(mockListings, query)
    }
  }
}

// Tenant API
export const tenantAPI = {
  createRequest: async (requestData: FormData) => {
    const response = await api.post('/tenant/request', requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
  
  getRequests: async () => {
    const response = await api.get('/tenant/requests')
    return response.data
  },
  
  getRequestDetail: async (id: string) => {
    const response = await api.get(`/tenant/request/${id}`)
    return response.data
  },
  
  updateRequest: async (id: string, requestData: FormData) => {
    const response = await api.put(`/tenant/request/${id}`, requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
  
  deleteRequest: async (id: string) => {
    const response = await api.delete(`/tenant/request/${id}`)
    return response.data
  }
}

// Landlord API
export const landlordAPI = {
  getRequests: async (params?: { status?: string }) => {
    const response = await api.get('/landlord/requests', { params })
    return response.data
  },
  
  getRequestDetail: async (id: string) => {
    const response = await api.get(`/landlord/request/${id}`)
    return response.data
  },
  
  approveRequest: async (id: string) => {
    const response = await api.put(`/landlord/request/${id}/approve`)
    return response.data
  },
  
  rejectRequest: async (id: string, reason?: string) => {
    const response = await api.put(`/landlord/request/${id}/reject`, { reason })
    return response.data
  },
  
  requestMoreInfo: async (id: string, message: string) => {
    const response = await api.put(`/landlord/request/${id}/more-info`, { message })
    return response.data
  }
}

// Profile API
export const profileAPI = {
  get: async () => {
    const response = await api.get('/profile')
    return response.data
  },
  
  update: async (profileData: any) => {
    const response = await api.put('/profile', profileData)
    return response.data
  },
  
  uploadPhoto: async (photo: File) => {
    const formData = new FormData()
    formData.append('photo', photo)
    const response = await api.post('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

export default api


