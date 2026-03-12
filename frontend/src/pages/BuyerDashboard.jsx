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
            farmer: 'John\'s Organic Farm',
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
