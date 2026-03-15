// --- FILE: src/pages/BuyerDashboard.jsx ---
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Heart, 
  Star,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Truck,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Eye
} from 'lucide-react'
import { EmptyOrders, EmptyProducts } from '../components/EmptyState'
import { ListingCard } from '../components/ListingCard'

export function BuyerDashboard() {
  const { user } = useSelector(state => state.auth)
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalSpent: 0,
    favoriteProducts: 0,
    savedAmount: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [favoriteProducts, setFavoriteProducts] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load buyer data
    const loadBuyerData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setStats({
          totalOrders: 23,
          pendingOrders: 3,
          completedOrders: 20,
          totalSpent: 1234.56,
          favoriteProducts: 8,
          savedAmount: 156.78
        })

        setRecentOrders([
          {
            id: 1,
            farmer: 'John\'s Organdata:image/jpeg;base64,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 Farm',
            products: ['Organic Tomatoes', 'Fresh Lettuce'],
            total: 67.45,
            status: 'pending',
            date: new Date('2024-01-20'),
            deliveryDate: new Date('2024-01-22'),
            paymentMethod: 'pod',
            image: '/api/placeholder/60/60'
          },
          {
            id: 2,
            farmer: 'Sunny Side Farm',
            products: ['Farm Eggs', 'Local Honey'],
            total: 45.98,
            status: 'confirmed',
            date: new Date('2024-01-19'),
            deliveryDate: new Date('2024-01-21'),
            paymentMethod: 'pod',
            image: '/api/placeholder/60/60'
          },
          {
            id: 3,
            farmer: 'Green Valley Farm',
            products: ['Carrots', 'Potatoes'],
            total: 34.50,
            status: 'delivered',
            date: new Date('2024-01-18'),
            deliveryDate: new Date('2024-01-20'),
            paymentMethod: 'pod',
            image: '/api/placeholder/60/60'
          }
        ])

        setFavoriteProducts([
          {
            id: 1,
            title: 'Organic Tomatoes',
            farmer: 'John\'s Organic Farm',
            price: 4.99,
            unit: 'kg',
            rating: 4.8,
            image: '/api/placeholder/150/100',
            description: 'Fresh organic tomatoes grown without pesticides'
          },
          {
            id: 2,
            title: 'Farm Eggs',
            farmer: 'Sunny Side Farm',
            price: 6.99,
            unit: 'dozen',
            rating: 4.9,
            image: '/api/placeholder/150/100',
            description: 'Free-range eggs from happy chickens'
          },
          {
            id: 3,
            title: 'Local Honey',
            farmer: 'Green Valley Farm',
            price: 12.99,
            unit: 'jar',
            rating: 5.0,
            image: '/api/placeholder/150/100',
            description: 'Pure raw honey from local wildflowers'
          }
        ].filter(Boolean)) // Filter out any undefined/null products

        setRecommendedProducts([
          {
            id: 1,
            title: 'Fresh Strawberries',
            farmer: 'Berry Farm',
            price: 8.99,
            unit: 'punnet',
            rating: 4.7,
            image: '/api/placeholder/150/100',
            description: 'Sweet, juicy strawberries picked at peak ripeness',
            isRecommended: true
          },
          {
            id: 2,
            title: 'Organic Spinach',
            farmer: 'Green Valley Farm',
            price: 3.99,
            unit: 'bunch',
            rating: 4.6,
            image: '/api/placeholder/150/100',
            description: 'Nutrient-rich organic spinach perfect for salads',
            isRecommended: true
          },
          {
            id: 3,
            title: 'Artisan Bread',
            farmer: 'Local Bakery',
            price: 4.50,
            unit: 'loaf',
            rating: 4.8,
            image: '/api/placeholder/150/100',
            description: 'Freshly baked artisan bread with crispy crust',
            isRecommended: true
          }
        ].filter(Boolean)) // Filter out any undefined/null products

      } catch (error) {
        console.error('Failed to load buyer dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBuyerData()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'confirmed': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
      case 'delivered': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      default: return 'text-forest-600 dark:text-forest-400 bg-forest-100 dark:bg-forest-900/30'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-forest-200 border-t-forest-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-forest-600 dark:text-forest-300">Loading your dashboard...</p>
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
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-lg text-forest-600 dark:text-forest-300">
            Discover fresh produce from local farms
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-forest-100 dark:bg-forest-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="w-6 h-6 text-forest-600 dark:text-forest-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.totalOrders}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Total Orders</p>
            {stats.pendingOrders > 0 && (
              <div className="mt-2">
                <span className="pod-badge">{stats.pendingOrders} pending</span>
              </div>
            )}
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.completedOrders}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Completed</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-soil-100 dark:bg-soil-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-soil-600 dark:text-soil-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">${stats.totalSpent}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Total Spent</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-terracotta-100 dark:bg-terracotta-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-terracotta-600 dark:text-terracotta-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.favoriteProducts}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Favorites</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-sunlight-100 dark:bg-sunlight-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-sunlight-600 dark:text-sunlight-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">${stats.savedAmount}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Saved</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">4.8</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Avg Rating</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-2">Quick Actions</h2>
              <p className="text-forest-600 dark:text-forest-300">Browse fresh produce and manage your orders</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-primary flex items-center gap-2">
                <Search className="w-5 h-5" />
                Browse Products
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                View Orders
              </button>
              <button className="bg-white dark:bg-forest-700 text-forest-700 dark:text-forest-300 px-6 py-3 rounded-xl font-semibold border-2 border-forest-300 dark:border-forest-600 hover:border-forest-500 transition-colors duration-200 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Favorites
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100">Recent Orders</h2>
                <Link to="/orders" className="text-forest-600 dark:text-forest-300 hover:text-forest-500 dark:hover:text-forest-200 text-sm">
                  View All
                </Link>
              </div>
              
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl hover:bg-forest-100/50 dark:hover:bg-forest-700/50 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-forest-900 dark:text-forest-100">{order.farmer}</h3>
                          <p className="text-sm text-forest-600 dark:text-forest-300">
                            {order.products.join(', ')}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-forest-500 dark:text-forest-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {order.date.toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            {order.deliveryDate.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="pod-badge text-xs">POD</span>
                          <span className="font-semibold text-forest-900 dark:text-forest-100">${order.total}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyOrders />
              )}
            </div>
          </div>

          {/* Favorite Products */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100">Favorite Products</h2>
              <Link to="/favorites" className="text-forest-600 dark:text-forest-300 hover:text-forest-500 dark:hover:text-forest-200 text-sm">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {favoriteProducts.filter(Boolean).map((product) => (
                <ListingCard 
                  key={product?.id || `fav-${Math.random()}`} 
                  product={product} 
                  viewMode="list"
                  className="hover:shadow-lg transition-shadow"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-8 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100">Recommended for You</h2>
            <Link to="/listings" className="text-forest-600 dark:text-forest-300 hover:text-forest-500 dark:hover:text-forest-200 text-sm">
              Browse All
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.filter(Boolean).map((product) => (
              <ListingCard 
                key={product?.id || `rec-${Math.random()}`} 
                product={product} 
                viewMode="grid"
                className="hover:shadow-xl transition-shadow"
              />
            ))}
          </div>
        </div>

        {/* Shopping Tips */}
        <div className="mt-8 glass-card p-6">
          <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-6">Shopping Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-100 dark:bg-forest-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-forest-600 dark:text-forest-400" />
              </div>
              <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">Seasonal Buying</h3>
              <p className="text-sm text-forest-600 dark:text-forest-300">
                Buy seasonal produce for better prices and freshness
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta-100 dark:bg-terracotta-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-terracotta-600 dark:text-terracotta-400" />
              </div>
              <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">Support Local</h3>
              <p className="text-sm text-forest-600 dark:text-forest-300">
                Support local farmers and strengthen community bonds
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sunlight-100 dark:bg-sunlight-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-sunlight-600 dark:text-sunlight-400" />
              </div>
              <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">Bulk Orders</h3>
              <p className="text-sm text-forest-600 dark:text-forest-300">
                Save money with bulk orders for schools and institutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
