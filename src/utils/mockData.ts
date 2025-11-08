// Mock listing data
export interface MockListing {
  id: string
  title: string
  address: string
  price: number
  bedrooms?: number
  bathrooms?: number
  area?: number
  description?: string
  image?: string
  images?: string[]
  amenities?: string[]
  landlordName?: string
  landlordPhone?: string
  landlordEmail?: string
  availableFrom?: string
  propertyType?: string
  furnished?: boolean
  parking?: boolean
  petFriendly?: boolean
}

export const mockListings: MockListing[] = [
  {
    id: '1',
    title: 'Modern 2BHK Apartment in Downtown',
    address: '123 Main Street, Downtown, City 12345',
    price: 25000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    description: 'Beautiful modern apartment with great amenities. Located in the heart of downtown with easy access to public transport, shopping, and dining.',
    image: '/placeholder.jpg',
    images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
    amenities: ['Air Conditioning', 'WiFi', 'Parking', 'Gym', 'Swimming Pool'],
    landlordName: 'John Smith',
    landlordPhone: '+91 9876543210',
    landlordEmail: 'john.smith@example.com',
    availableFrom: '2024-02-01',
    propertyType: 'Apartment',
    furnished: true,
    parking: true,
    petFriendly: false,
  },
  {
    id: '2',
    title: 'Spacious 3BHK Villa with Garden',
    address: '456 Oak Avenue, Suburb, City 12345',
    price: 45000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    description: 'Luxurious villa with private garden and modern amenities. Perfect for families looking for a peaceful living environment.',
    image: '/placeholder.jpg',
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    amenities: ['Garden', 'Parking', 'Security', 'WiFi', 'Air Conditioning'],
    landlordName: 'Sarah Johnson',
    landlordPhone: '+91 9876543211',
    landlordEmail: 'sarah.j@example.com',
    availableFrom: '2024-03-01',
    propertyType: 'Villa',
    furnished: false,
    parking: true,
    petFriendly: true,
  },
  {
    id: '3',
    title: 'Cozy 1BHK Studio Apartment',
    address: '789 Park Road, Midtown, City 12345',
    price: 15000,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    description: 'Compact and cozy studio apartment perfect for singles or couples. Fully furnished with all modern amenities.',
    image: '/placeholder.jpg',
    images: ['/placeholder.jpg'],
    amenities: ['WiFi', 'Air Conditioning', 'Furnished', 'Security'],
    landlordName: 'Mike Davis',
    landlordPhone: '+91 9876543212',
    landlordEmail: 'mike.davis@example.com',
    availableFrom: '2024-01-15',
    propertyType: 'Studio',
    furnished: true,
    parking: false,
    petFriendly: false,
  },
  {
    id: '4',
    title: 'Luxury 4BHK Penthouse',
    address: '321 Sky Tower, Uptown, City 12345',
    price: 85000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3500,
    description: 'Stunning penthouse with panoramic city views. Premium finishes and top-of-the-line amenities throughout.',
    image: '/placeholder.jpg',
    images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
    amenities: ['City View', 'Gym', 'Swimming Pool', 'Concierge', 'Parking', 'WiFi', 'Air Conditioning'],
    landlordName: 'Emily Chen',
    landlordPhone: '+91 9876543213',
    landlordEmail: 'emily.chen@example.com',
    availableFrom: '2024-04-01',
    propertyType: 'Penthouse',
    furnished: true,
    parking: true,
    petFriendly: true,
  },
  {
    id: '5',
    title: 'Family-Friendly 3BHK House',
    address: '654 Maple Street, Residential Area, City 12345',
    price: 35000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    description: 'Charming family home in a quiet residential neighborhood. Close to schools and parks.',
    image: '/placeholder.jpg',
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    amenities: ['Garden', 'Parking', 'Security', 'WiFi'],
    landlordName: 'Robert Wilson',
    landlordPhone: '+91 9876543214',
    landlordEmail: 'robert.w@example.com',
    availableFrom: '2024-02-15',
    propertyType: 'House',
    furnished: false,
    parking: true,
    petFriendly: true,
  },
  {
    id: '6',
    title: 'Modern 2BHK with Balcony',
    address: '987 River View, Riverside, City 12345',
    price: 28000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    description: 'Contemporary apartment with river views. Modern kitchen and spacious living area.',
    image: '/placeholder.jpg',
    images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
    amenities: ['River View', 'Balcony', 'Parking', 'WiFi', 'Air Conditioning', 'Gym'],
    landlordName: 'Lisa Anderson',
    landlordPhone: '+91 9876543215',
    landlordEmail: 'lisa.a@example.com',
    availableFrom: '2024-01-20',
    propertyType: 'Apartment',
    furnished: true,
    parking: true,
    petFriendly: false,
  },
]

// Helper function to filter listings
export const filterListings = (
  listings: MockListing[],
  searchQuery?: string,
  filters?: {
    minPrice?: string
    maxPrice?: string
    bedrooms?: string
    bathrooms?: string
  }
): MockListing[] => {
  let filtered = [...listings]

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (listing) =>
        listing.title.toLowerCase().includes(query) ||
        listing.address.toLowerCase().includes(query) ||
        listing.description?.toLowerCase().includes(query)
    )
  }

  // Price filters
  if (filters?.minPrice) {
    const minPrice = Number(filters.minPrice)
    filtered = filtered.filter((listing) => listing.price >= minPrice)
  }

  if (filters?.maxPrice) {
    const maxPrice = Number(filters.maxPrice)
    filtered = filtered.filter((listing) => listing.price <= maxPrice)
  }

  // Bedrooms filter
  if (filters?.bedrooms) {
    const bedrooms = Number(filters.bedrooms)
    filtered = filtered.filter((listing) => listing.bedrooms === bedrooms)
  }

  // Bathrooms filter
  if (filters?.bathrooms) {
    const bathrooms = Number(filters.bathrooms)
    filtered = filtered.filter((listing) => listing.bathrooms === bathrooms)
  }

  return filtered
}

// Simulate API delay
export const simulateDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Mock Tenant Request
export interface MockTenantRequest {
  id: string
  listingId: string
  propertyName: string
  address: string
  status: string
  submittedAt: string
  createdAt?: string
  moveInDate: string
  documents?: string[]
  notes?: string
}

// Mock Landlord Request
export interface MockLandlordRequest {
  id: string
  tenantName: string
  tenantEmail: string
  tenantPhone: string
  propertyName: string
  address: string
  status: string
  submittedAt: string
  moveInDate: string
  documents?: string[]
  notes?: string
}

// Mock Profile
export interface MockProfile {
  id: string
  name: string
  email: string
  phone: string
  role: string
  photo?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

// Mock tenant requests
export const mockTenantRequests: MockTenantRequest[] = [
  {
    id: 'req-1',
    listingId: '1',
    propertyName: 'Modern 2BHK Apartment in Downtown',
    address: '123 Main Street, Downtown, City 12345',
    status: 'submitted',
    submittedAt: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-15T10:30:00Z',
    moveInDate: '2024-02-01',
    documents: ['id-proof.pdf', 'income-proof.pdf'],
    notes: 'Looking forward to moving in soon!'
  },
  {
    id: 'req-2',
    listingId: '2',
    propertyName: 'Spacious 3BHK Villa with Garden',
    address: '456 Oak Avenue, Suburb, City 12345',
    status: 'in_review',
    submittedAt: '2024-01-10T14:20:00Z',
    createdAt: '2024-01-10T14:20:00Z',
    moveInDate: '2024-03-01',
    documents: ['id-proof.pdf', 'income-proof.pdf', 'reference-letter.pdf'],
    notes: 'Family of 4, need parking space'
  },
  {
    id: 'req-3',
    listingId: '3',
    propertyName: 'Cozy 1BHK Studio Apartment',
    address: '789 Park Road, Midtown, City 12345',
    status: 'approved',
    submittedAt: '2024-01-05T09:15:00Z',
    createdAt: '2024-01-05T09:15:00Z',
    moveInDate: '2024-01-15',
    documents: ['id-proof.pdf'],
    notes: 'Single professional, quiet tenant'
  }
]

// Mock landlord requests
export const mockLandlordRequests: MockLandlordRequest[] = [
  {
    id: 'req-1',
    tenantName: 'John Doe',
    tenantEmail: 'john.doe@example.com',
    tenantPhone: '+91 9876543210',
    propertyName: 'Modern 2BHK Apartment in Downtown',
    address: '123 Main Street, Downtown, City 12345',
    status: 'submitted',
    submittedAt: '2024-01-15T10:30:00Z',
    moveInDate: '2024-02-01',
    documents: ['id-proof.pdf', 'income-proof.pdf'],
    notes: 'Looking forward to moving in soon!'
  },
  {
    id: 'req-2',
    tenantName: 'Jane Smith',
    tenantEmail: 'jane.smith@example.com',
    tenantPhone: '+91 9876543211',
    propertyName: 'Spacious 3BHK Villa with Garden',
    address: '456 Oak Avenue, Suburb, City 12345',
    status: 'in_review',
    submittedAt: '2024-01-10T14:20:00Z',
    moveInDate: '2024-03-01',
    documents: ['id-proof.pdf', 'income-proof.pdf', 'reference-letter.pdf'],
    notes: 'Family of 4, need parking space'
  },
  {
    id: 'req-3',
    tenantName: 'Mike Johnson',
    tenantEmail: 'mike.j@example.com',
    tenantPhone: '+91 9876543212',
    propertyName: 'Cozy 1BHK Studio Apartment',
    address: '789 Park Road, Midtown, City 12345',
    status: 'approved',
    submittedAt: '2024-01-05T09:15:00Z',
    moveInDate: '2024-01-15',
    documents: ['id-proof.pdf'],
    notes: 'Single professional, quiet tenant'
  },
  {
    id: 'req-4',
    tenantName: 'Sarah Williams',
    tenantEmail: 'sarah.w@example.com',
    tenantPhone: '+91 9876543213',
    propertyName: 'Luxury 4BHK Penthouse',
    address: '321 Sky Tower, Uptown, City 12345',
    status: 'more_info_required',
    submittedAt: '2024-01-12T11:00:00Z',
    moveInDate: '2024-04-01',
    documents: ['id-proof.pdf'],
    notes: 'Need additional references'
  },
  {
    id: 'req-5',
    tenantName: 'David Brown',
    tenantEmail: 'david.b@example.com',
    tenantPhone: '+91 9876543214',
    propertyName: 'Family-Friendly 3BHK House',
    address: '654 Maple Street, Residential Area, City 12345',
    status: 'rejected',
    submittedAt: '2024-01-08T16:45:00Z',
    moveInDate: '2024-02-15',
    documents: ['id-proof.pdf', 'income-proof.pdf'],
    notes: 'Income verification incomplete'
  }
]

// Mock user credentials for testing
export interface MockUser {
  email: string
  password: string
  name: string
  role: 'tenant' | 'landlord'
  id: string
}

export const mockUsers: MockUser[] = [
  {
    id: 'user-tenant-1',
    email: 'tenant@test.com',
    password: 'tenant123',
    name: 'John Doe',
    role: 'tenant'
  },
  {
    id: 'user-landlord-1',
    email: 'landlord@test.com',
    password: 'landlord123',
    name: 'Sarah Johnson',
    role: 'landlord'
  }
]

// Mock profile data - separate for tenant and landlord
export const mockTenantProfile: MockProfile = {
  id: 'profile-tenant-1',
  name: 'John Doe',
  email: 'tenant@test.com',
  phone: '+91 9876543210',
  role: 'tenant',
  photo: '/placeholder-user.jpg',
  address: '123 Sample Street, Downtown',
  city: 'City',
  state: 'State',
  zipCode: '12345'
}

export const mockLandlordProfile: MockProfile = {
  id: 'profile-landlord-1',
  name: 'Sarah Johnson',
  email: 'landlord@test.com',
  phone: '+91 9876543211',
  role: 'landlord',
  photo: '/placeholder-user.jpg',
  address: '456 Property Avenue, Uptown',
  city: 'City',
  state: 'State',
  zipCode: '12345'
}

