import axios from 'axios'
import { API_BASE_URL } from './constants'
import { setupInterceptors } from './axiosInterceptor'
import { 
  mockListings, 
  filterListings, 
  simulateDelay, 
  MockListing,
  mockTenantRequests,
  mockLandlordRequests,
  mockTenantProfile,
  mockLandlordProfile,
  mockUsers,
  MockTenantRequest,
  MockLandlordRequest
} from './mockData'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Setup interceptors
setupInterceptors(api)

// Always use mock data
const USE_MOCK_DATA = true

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(500)
      const user = mockUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      )
      
      if (!user) {
        throw new Error('Invalid email or password')
      }
      
      // Store token and role in localStorage
      const token = `mock-token-${user.id}-${Date.now()}`
      localStorage.setItem('authToken', token)
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('userId', user.id)
      
      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    }
    
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
    if (USE_MOCK_DATA) {
      await simulateDelay(500)
      const now = new Date().toISOString()
      const newRequest: MockTenantRequest = {
        id: `req-${Date.now()}`,
        listingId: requestData.get('listingId') as string || '1',
        propertyName: requestData.get('propertyName') as string || 'Property',
        address: requestData.get('address') as string || 'Address',
        status: 'submitted',
        submittedAt: now,
        createdAt: now,
        moveInDate: requestData.get('moveInDate') as string || new Date().toISOString(),
        documents: [],
        notes: requestData.get('notes') as string || ''
      }
      mockTenantRequests.push(newRequest)
      return newRequest
    }
    const response = await api.post('/tenant/request', requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
  
  getRequests: async () => {
    if (USE_MOCK_DATA) {
      await simulateDelay(300)
      return mockTenantRequests
    }
    const response = await api.get('/tenant/requests')
    return response.data
  },
  
  getRequestDetail: async (id: string) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(300)
      const request = mockTenantRequests.find(r => r.id === id)
      if (!request) {
        throw new Error('Request not found')
      }
      return request
    }
    const response = await api.get(`/tenant/request/${id}`)
    return response.data
  },
  
  updateRequest: async (id: string, requestData: FormData) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(500)
      const index = mockTenantRequests.findIndex(r => r.id === id)
      if (index === -1) {
        throw new Error('Request not found')
      }
      const updated = {
        ...mockTenantRequests[index],
        ...Object.fromEntries(requestData.entries())
      }
      mockTenantRequests[index] = updated
      return updated
    }
    const response = await api.put(`/tenant/request/${id}`, requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
  
  deleteRequest: async (id: string) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(300)
      const index = mockTenantRequests.findIndex(r => r.id === id)
      if (index === -1) {
        throw new Error('Request not found')
      }
      mockTenantRequests.splice(index, 1)
      return { success: true }
    }
    const response = await api.delete(`/tenant/request/${id}`)
    return response.data
  }
}

// Landlord API
export const landlordAPI = {
  getRequests: async (params?: { status?: string }) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(300)
      let filtered = [...mockLandlordRequests]
      if (params?.status) {
        filtered = filtered.filter(r => r.status === params.status)
      }
      return filtered
    }
    const response = await api.get('/landlord/requests', { params })
    return response.data
  },
  
  getRequestDetail: async (id: string) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(300)
      const request = mockLandlordRequests.find(r => r.id === id)
      if (!request) {
        throw new Error('Request not found')
      }
      return request
    }
    const response = await api.get(`/landlord/request/${id}`)
    return response.data
  },
  
  approveRequest: async (id: string) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(500)
      const request = mockLandlordRequests.find(r => r.id === id)
      if (!request) {
        throw new Error('Request not found')
      }
      request.status = 'approved'
      // Also update tenant request if exists
      const tenantRequest = mockTenantRequests.find(r => r.id === id)
      if (tenantRequest) {
        tenantRequest.status = 'approved'
      }
      return request
    }
    const response = await api.put(`/landlord/request/${id}/approve`)
    return response.data
  },
  
  rejectRequest: async (id: string, reason?: string) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(500)
      const request = mockLandlordRequests.find(r => r.id === id)
      if (!request) {
        throw new Error('Request not found')
      }
      request.status = 'rejected'
      request.notes = reason ? `${request.notes || ''}\nRejection reason: ${reason}` : request.notes
      // Also update tenant request if exists
      const tenantRequest = mockTenantRequests.find(r => r.id === id)
      if (tenantRequest) {
        tenantRequest.status = 'rejected'
      }
      return request
    }
    const response = await api.put(`/landlord/request/${id}/reject`, { reason })
    return response.data
  },
  
  requestMoreInfo: async (id: string, message: string) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(500)
      const request = mockLandlordRequests.find(r => r.id === id)
      if (!request) {
        throw new Error('Request not found')
      }
      request.status = 'more_info_required'
      request.notes = `${request.notes || ''}\nAdditional info requested: ${message}`
      // Also update tenant request if exists
      const tenantRequest = mockTenantRequests.find(r => r.id === id)
      if (tenantRequest) {
        tenantRequest.status = 'more_info_required'
      }
      return request
    }
    const response = await api.put(`/landlord/request/${id}/more-info`, { message })
    return response.data
  }
}

// Profile API
export const profileAPI = {
  get: async () => {
    if (USE_MOCK_DATA) {
      await simulateDelay(300)
      const userRole = localStorage.getItem('userRole')
      const userId = localStorage.getItem('userId')
      
      // Return appropriate profile based on role
      if (userRole === 'landlord') {
        return { ...mockLandlordProfile, id: userId || mockLandlordProfile.id }
      } else {
        return { ...mockTenantProfile, id: userId || mockTenantProfile.id }
      }
    }
    const response = await api.get('/profile')
    return response.data
  },
  
  update: async (profileData: any) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(500)
      const userRole = localStorage.getItem('userRole')
      
      if (userRole === 'landlord') {
        Object.assign(mockLandlordProfile, profileData)
        return mockLandlordProfile
      } else {
        Object.assign(mockTenantProfile, profileData)
        return mockTenantProfile
      }
    }
    const response = await api.put('/profile', profileData)
    return response.data
  },
  
  uploadPhoto: async (photo: File) => {
    if (USE_MOCK_DATA) {
      await simulateDelay(500)
      const userRole = localStorage.getItem('userRole')
      // Create a local URL for the uploaded photo
      const photoUrl = URL.createObjectURL(photo)
      
      if (userRole === 'landlord') {
        mockLandlordProfile.photo = photoUrl
        return { photo: photoUrl }
      } else {
        mockTenantProfile.photo = photoUrl
        return { photo: photoUrl }
      }
    }
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


