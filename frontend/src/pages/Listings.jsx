// --- FILE: src/pages/Listings.jsx ---
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  Search, 
  Filter, 
  Heart, 
  Star, 
  MapPin, 
  Package,
  DollarSign,
  Grid,
  List,
  ChevronDown,
  Eye,
  ShoppingCart
} from 'lucide-react'
import { EmptyProducts } from '../components/EmptyState'

export function Listings() {
  const { user } = useSelector(state => state.auth)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'pantry', name: 'Pantry' },
    { id: 'herbs', name: 'Herbs & Spices' }
  ]

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-5', name: 'Under $5' },
    { id: '5-10', name: '$5 - $10' },
    { id: '10-20', name: '$10 - $20' },
    { id: '20+', name: 'Over $20' }
  ]

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest First' }
  ]

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockProducts = [
          {
            id: 1,
            title: 'Organic Tomatoes',
            description: 'Fresh, vine-ripened organic tomatoes grown with love and care',
            farmer: 'John\'s Organic Farm',
            price: 4.99,
            unit: 'kg',
            category: 'vegetables',
            rating: 4.8,
            reviews: 156,
            image: '/api/placeholder/300/200',
            isAvailable: true,
            isOrganic: true,
            location: '15 miles away',
            featured: true
          },
          {
            id: 2,
            title: 'Fresh Lettuce',
            description: 'Crisp, fresh lettuce perfect for salads and sandwiches',
            farmer: 'Green Valley Farm',
            price: 3.49,
            unit: 'head',
            category: 'vegetables',
            rating: 4.6,
            reviews: 89,
            image: '/api/placeholder/300/200',
            isAvailable: true,
            isOrganic: true,
            location: '8 miles away',
            featured: false
          },
          {
            id: 3,
            title: 'Farm Eggs',
            description: 'Free-range eggs from happy chickens raised on organic feed',
            farmer: 'Sunny Side Farm',
            price: 6.99,
            unit: 'dozen',
            category: 'dairy',
            rating: 4.9,
            reviews: 234,
            image: '/api/placeholder/300/200',
            isAvailable: true,
            isOrganic: true,
            location: '12 miles away',
            featured: true
          },
          {
            id: 4,
            title: 'Local Honey',
            description: 'Pure, raw honey from local wildflowers - unfiltered and delicious',
            farmer: 'Meadow Sweet Apiary',
            price: 12.99,
            unit: 'jar',
            category: 'pantry',
            rating: 5.0,
            reviews: 67,
            image: '/api/placeholder/300/200',
            isAvailable: true,
            isOrganic: true,
            location: '20 miles away',
            featured: true
          },
          {
            id: 5,
            title: 'Fresh Strawberries',
            description: 'Sweet, juicy strawberries picked at peak ripeness',
            farmer: 'Berry Farm',
            price: 8.99,
            unit: 'punnet',
            category: 'fruits',
            rating: 4.7,
            reviews: 145,
            image: '/api/placeholder/300/200',
            isAvailable: true,
            isOrganic: true,
            location: '25 miles away',
            featured: false
          },
          {
            id: 6,
            title: 'Organic Spinach',
            description: 'Nutrient-rich organic spinach, perfect for smoothies and cooking',
            farmer: 'Green Valley Farm',
            price: 3.99,
            unit: 'bunch',
            category: 'vegetables',
            rating: 4.6,
            reviews: 78,
            image: '/api/placeholder/300/200',
            isAvailable: true,
            isOrganic: true,
            location: '8 miles away',
            featured: false
          },
          {
            id: 7,
            title: 'Artisan Bread',
            description: 'Freshly baked sourdough bread using traditional methods',
            farmer: 'Local Bakery',
            price: 4.50,
            unit: 'loaf',
            category: 'pantry',
            rating: 4.8,
            reviews: 198,
            image: '/api/placeholder/300/200',
            isAvailable: true,
            isOrganic: false,
            location: '5 miles away',
            featured: true
          },
          {
            id: 8,
            title: 'Fresh Carrots',
            description: 'Sweet and crunchy carrots, perfect for snacking or cooking',
            farmer: 'Root Vegetable Farm',
            price: 2.99,
            unit: 'kg',
            category: 'vegetables',
            rating: 4.5,
            reviews: 92,
            image: '/api/placeholder/300/200',
            isAvailable: true,
            isOrganic: true,
            location: '10 miles away',
            featured: false
          }
        ]

        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by price range
    if (selectedPriceRange !== 'all') {
      filtered = filtered.filter(product => {
        if (selectedPriceRange === '0-5') return product.price < 5
        if (selectedPriceRange === '5-10') return product.price >= 5 && product.price < 10
        if (selectedPriceRange === '10-20') return product.price >= 10 && product.price < 20
        if (selectedPriceRange === '20+') return product.price >= 20
        return true
      })
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating - a.rating
        case 'newest': return b.id - a.id
        case 'featured': return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        default: return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedPriceRange, sortBy])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-tlx-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-forest-200 border-t-forest-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-forest-600 dark:text-forest-300">Loading fresh products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-tlx-pattern">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-2">
            Fresh from Local Farms
          </h1>
          <p className="text-lg text-forest-600 dark:text-forest-300">
            Discover high-quality produce from trusted local farmers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, farmers, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-forest-200 dark:border-forest-700 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-100 placeholder-forest-500 dark:placeholder-forest-400 focus:border-forest-500 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <div className="flex bg-white dark:bg-forest-800 rounded-xl border border-forest-200 dark:border-forest-700 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-forest-500 text-white' : 'text-forest-600 dark:text-forest-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-forest-500 text-white' : 'text-forest-600 dark:text-forest-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-forest-200 dark:border-forest-700">
              <div>
                <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-forest-200 dark:border-forest-700 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-100 focus:border-forest-500 focus:outline-none"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">Price Range</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-forest-200 dark:border-forest-700 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-100 focus:border-forest-500 focus:outline-none"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>{range.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-forest-200 dark:border-forest-700 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-100 focus:border-forest-500 focus:outline-none"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-forest-600 dark:text-forest-300">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex items-center gap-2">
            <span className="pod-badge text-xs">Payment on Delivery Available</span>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="glass-card glass-card-hover overflow-hidden">
                {viewMode === 'grid' ? (
                  // Grid View
                  <div>
                    <div className="relative">
                      <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                      {product.featured && (
                        <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-forest-500 text-white">
                          Featured
                        </span>
                      )}
                      {product.isOrganic && (
                        <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                          Organic
                        </span>
                      )}
                      <button className="absolute bottom-3 right-3 p-2 bg-white dark:bg-forest-800 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                        <Heart className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-1">{product.title}</h3>
                      <p className="text-sm text-forest-600 dark:text-forest-300 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center gap-2 mb-3 text-xs text-forest-500 dark:text-forest-400">
                        <MapPin className="w-3 h-3" />
                        <span>{product.location}</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-forest-900 dark:text-forest-100">{product.rating}</span>
                          <span className="text-xs text-forest-500 dark:text-forest-400">({product.reviews})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-forest-900 dark:text-forest-100">${product.price}</span>
                          <span className="text-sm text-forest-600 dark:text-forest-400">/{product.unit}</span>
                        </div>
                      </div>
                      <p className="text-sm text-forest-600 dark:text-forest-300 mb-4">{product.farmer}</p>
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
                    <img src={product.image} alt={product.title} className="w-32 h-32 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-1">{product.title}</h3>
                          <p className="text-sm text-forest-600 dark:text-forest-300 mb-2 line-clamp-2">{product.description}</p>
                          <div className="flex items-center gap-4 text-sm text-forest-500 dark:text-forest-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {product.location}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span>{product.rating}</span>
                              <span>({product.reviews})</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex gap-2 mb-2">
                            {product.featured && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-forest-500 text-white">
                                Featured
                              </span>
                            )}
                            {product.isOrganic && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                                Organic
                              </span>
                            )}
                          </div>
                          <div className="text-lg font-bold text-forest-900 dark:text-forest-100">
                            ${product.price}
                            <span className="text-sm text-forest-600 dark:text-forest-400">/{product.unit}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-forest-600 dark:text-forest-300">{product.farmer}</p>
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
            ))}
          </div>
        ) : (
          <EmptyProducts />
        )}
      </div>
    </div>
  )
}
