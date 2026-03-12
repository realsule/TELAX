// --- FILE: src/components/ListingCard.jsx ---
import { Link } from 'react-router-dom'
import { Heart, Star, MapPin, Eye, ShoppingCart } from 'lucide-react'

export function ListingCard({ product, viewMode = 'grid', className = '' }) {
  // Handle undefined product with fallbacks
  if (!product) {
    return (
      <div className={`glass-card p-4 ${className}`}>
        <div className="text-center text-forest-600 dark:text-forest-300">
          Product not available
        </div>
      </div>
    )
  }

  // Destructure with defaults
  const {
    image = '/api/placeholder/150/150',
    title = 'Unknown Product',
    description = 'No description available',
    location = 'Unknown Location',
    rating = 0,
    reviews = 0,
    price = 0,
    unit = 'item',
    farmer = 'Unknown Farmer',
    featured = false,
    isOrganic = false
  } = product || {}

  return (
    <div className={`glass-card glass-card-hover overflow-hidden ${className}`}>
      {viewMode === 'grid' ? (
        // Grid View
        <div>
          <div className="relative">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            {featured && (
              <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-forest-500 text-white">
                Featured
              </span>
            )}
            {isOrganic && (
              <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                Organic
              </span>
            )}
            <button className="absolute bottom-3 right-3 p-2 bg-white dark:bg-forest-800 rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <Heart className="w-4 h-4 text-forest-600 dark:text-forest-400" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-1">{title}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300 mb-3 line-clamp-2">{description}</p>
            <div className="flex items-center gap-2 mb-3 text-xs text-forest-500 dark:text-forest-400">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-forest-900 dark:text-forest-100">{rating}</span>
                <span className="text-xs text-forest-500 dark:text-forest-400">({reviews})</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-forest-900 dark:text-forest-100">${price}</span>
                <span className="text-sm text-forest-600 dark:text-forest-400">/{unit}</span>
              </div>
            </div>
            <p className="text-sm text-forest-600 dark:text-forest-300 mb-4">{farmer}</p>
            <div className="flex gap-2">
              <button className="flex-1 btn-primary text-sm flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button className="p-2 bg-white dark:bg-forest-700 rounded-xl border border-forest-200 dark:border-forest-600 hover:border-forest-500 transition-colors">
                <Eye className="w-4 h-4 text-forest-600 dark:text-forest-400" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // List View
        <div className="flex gap-4 p-4">
          <img src={image} alt={title} className="w-32 h-32 rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-1">{title}</h3>
                <p className="text-sm text-forest-600 dark:text-forest-300 mb-2 line-clamp-2">{description}</p>
                <div className="flex items-center gap-4 text-sm text-forest-500 dark:text-forest-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {location}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span>{rating}</span>
                    <span>({reviews})</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex gap-2 mb-2">
                  {featured && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-forest-500 text-white">
                      Featured
                    </span>
                  )}
                  {isOrganic && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                      Organic
                    </span>
                  )}
                </div>
                <div className="text-lg font-bold text-forest-900 dark:text-forest-100">
                  ${price}
                  <span className="text-sm text-forest-600 dark:text-forest-400">/{unit}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-forest-600 dark:text-forest-300">{farmer}</p>
              <div className="flex gap-2">
                <button className="btn-primary text-sm flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button className="p-2 bg-white dark:bg-forest-700 rounded-xl border border-forest-200 dark:border-forest-600 hover:border-forest-500 transition-colors">
                  <Heart className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                </button>
                <button className="p-2 bg-white dark:bg-forest-700 rounded-xl border border-forest-200 dark:border-forest-600 hover:border-forest-500 transition-colors">
                  <Eye className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

