import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square } from 'lucide-react'

interface ListingCardProps {
  id: string
  title: string
  address: string
  price: number
  bedrooms?: number
  bathrooms?: number
  area?: number
  image?: string
}

export default function ListingCard({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
}: ListingCardProps) {
  return (
    <Link
      to={`/listing/${id}`}
      className="group bg-white dark:bg-encora-green/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-encora-green/10 dark:border-encora-mint/20"
    >
      <div className="relative h-48 bg-encora-gray dark:bg-encora-green/30 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-encora-text/30 dark:text-white/30">
            <Square size={48} />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white dark:bg-encora-green px-3 py-1 rounded-lg shadow-md">
          <span className="text-lg font-bold text-encora-green dark:text-white">
            ₹{price.toLocaleString()}
            <span className="text-sm font-normal">/mo</span>
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-encora-text dark:text-white mb-2 group-hover:text-encora-green dark:group-hover:text-encora-mint transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-1 text-encora-text/70 dark:text-white/70 mb-4">
          <MapPin size={16} />
          <span className="text-sm">{address}</span>
        </div>
        
        {(bedrooms || bathrooms || area) && (
          <div className="flex items-center gap-4 text-sm text-encora-text/60 dark:text-white/60">
            {bedrooms && (
              <div className="flex items-center gap-1">
                <Bed size={16} />
                <span>{bedrooms} Bed</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center gap-1">
                <Bath size={16} />
                <span>{bathrooms} Bath</span>
              </div>
            )}
            {area && (
              <div className="flex items-center gap-1">
                <Square size={16} />
                <span>{area} sqft</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}


