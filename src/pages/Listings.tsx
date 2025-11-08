import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search, Filter, MapPin } from 'lucide-react'
import { listingsAPI } from '../utils/api'
import ListingCard from '../../components/ListingCard'
import toast from 'react-hot-toast'

export default function Listings() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
  })

  const { data: listings, isLoading } = useQuery(
    ['listings', searchQuery, filters],
    () => listingsAPI.getAll({ search: searchQuery, filters }),
    {
      onError: (error: any) => {
        toast.error(error.message || 'Failed to load listings')
      },
    }
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-encora-green dark:text-white mb-8">Property Listings</h1>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-xl shadow-lg border border-encora-mint/20 dark:border-encora-mint/30 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
              />
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-encora-green dark:border-encora-mint"></div>
          </div>
        ) : listings && listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing: any) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-encora-text/60 dark:text-white/60">No listings found</p>
          </div>
        )}
      </div>
    </div>
  )
}

