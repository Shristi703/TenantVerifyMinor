import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar } from 'lucide-react'
import { listingsAPI } from '../utils/api'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: listing, isLoading } = useQuery(
    ['listing', id],
    () => listingsAPI.getDetail(id!),
    {
      enabled: !!id,
      onError: (error: any) => {
        toast.error(error.message || 'Failed to load listing')
      },
    }
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-encora-green dark:border-encora-mint"></div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-encora-text dark:text-white">Listing not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/listings')}
          className="flex items-center gap-2 text-encora-green dark:text-encora-mint mb-6 hover:text-encora-green-dark dark:hover:text-encora-mint-light transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Listings
        </button>

        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 overflow-hidden">
          {listing.image && (
            <div className="h-96 bg-encora-gray dark:bg-encora-green/30 overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-encora-text dark:text-white mb-2">
                  {listing.title}
                </h1>
                <div className="flex items-center gap-2 text-encora-text/60 dark:text-white/60 mb-4">
                  <MapPin size={18} />
                  <span>{listing.address}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-encora-green dark:text-encora-mint">
                  ₹{listing.price.toLocaleString()}
                  <span className="text-lg font-normal">/mo</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-encora-green/10 dark:border-white/10">
              {listing.bedrooms && (
                <div className="flex items-center gap-2 text-encora-text dark:text-white">
                  <Bed size={20} />
                  <span>{listing.bedrooms} Bedrooms</span>
                </div>
              )}
              {listing.bathrooms && (
                <div className="flex items-center gap-2 text-encora-text dark:text-white">
                  <Bath size={20} />
                  <span>{listing.bathrooms} Bathrooms</span>
                </div>
              )}
              {listing.area && (
                <div className="flex items-center gap-2 text-encora-text dark:text-white">
                  <Square size={20} />
                  <span>{listing.area} sqft</span>
                </div>
              )}
            </div>

            {listing.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">Description</h2>
                <p className="text-encora-text/70 dark:text-white/70 leading-relaxed">
                  {listing.description}
                </p>
              </div>
            )}

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {listing.amenities.map((amenity: string, index: number) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-encora-gray dark:bg-encora-green/30 rounded-lg text-encora-text dark:text-white text-sm"
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {listing.propertyType && (
                <div>
                  <p className="text-sm text-encora-text/60 dark:text-white/60 mb-1">Property Type</p>
                  <p className="text-encora-text dark:text-white font-semibold capitalize">{listing.propertyType}</p>
                </div>
              )}
              {listing.furnished !== undefined && (
                <div>
                  <p className="text-sm text-encora-text/60 dark:text-white/60 mb-1">Furnished</p>
                  <p className="text-encora-text dark:text-white font-semibold">{listing.furnished ? 'Yes' : 'No'}</p>
                </div>
              )}
              {listing.parking !== undefined && (
                <div>
                  <p className="text-sm text-encora-text/60 dark:text-white/60 mb-1">Parking</p>
                  <p className="text-encora-text dark:text-white font-semibold">{listing.parking ? 'Available' : 'Not Available'}</p>
                </div>
              )}
              {listing.petFriendly !== undefined && (
                <div>
                  <p className="text-sm text-encora-text/60 dark:text-white/60 mb-1">Pet Friendly</p>
                  <p className="text-encora-text dark:text-white font-semibold">{listing.petFriendly ? 'Yes' : 'No'}</p>
                </div>
              )}
            </div>

            {/* Landlord Info */}
            {(listing.landlordName || listing.landlordEmail || listing.landlordPhone) && (
              <div className="mb-8 p-6 bg-encora-gray dark:bg-encora-green/30 rounded-lg">
                <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">Landlord Information</h2>
                <div className="space-y-2">
                  {listing.landlordName && (
                    <p className="text-encora-text dark:text-white">
                      <span className="font-semibold">Name:</span> {listing.landlordName}
                    </p>
                  )}
                  {listing.landlordEmail && (
                    <p className="text-encora-text dark:text-white">
                      <span className="font-semibold">Email:</span> {listing.landlordEmail}
                    </p>
                  )}
                  {listing.landlordPhone && (
                    <p className="text-encora-text dark:text-white">
                      <span className="font-semibold">Phone:</span> {listing.landlordPhone}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Link
                to={`/tenant/request/new/${id}`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Calendar size={20} />
                Request Verification
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


