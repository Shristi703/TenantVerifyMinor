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

