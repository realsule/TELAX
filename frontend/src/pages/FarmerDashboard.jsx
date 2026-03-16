// --- FILE: src/pages/FarmerDashboard.jsx ---
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Package, 
  TrendingUp, 
  Users, 
  Star,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search
} from 'lucide-react'
import { EmptyProducts } from '../components/EmptyState'

export function FarmerDashboard() {
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalOrders: 0,
    totalRevenue: 0,
    avgRating: 0,
    pendingOrders: 0
  })
  const [listings, setListings] = useState([])
  const [recentOrders, setRecentOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    // Load farmer data
    const loadFarmerData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Initialize with empty data (realistic for new user)
        setStats({
          totalListings: 0,
          activeListings: 0,
          totalOrders: 0,
          totalRevenue: 0,
          avgRating: 0,
          pendingOrders: 0
        })
        
        setListings([])
        setRecentOrders([])
        
      } catch (error) {
        console.error('Error loading farmer data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFarmerData()
  }, [])

  const handleAddProduct = () => {
    // Navigate to add product page
    navigate('/listings/create')
  }

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                          (filterStatus === 'available' && listing.isAvailable) ||
                          (filterStatus === 'unavailable' && !listing.isAvailable)
    return matchesSearch && matchesFilter
  })

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
          <p className="text-forest-600 dark:text-forest-300">Loading your farm dashboard...</p>
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
            Manage your farm products and track your sales
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-forest-100 dark:bg-forest-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-forest-600 dark:text-forest-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.totalListings}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Total Listings</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.activeListings}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Active</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-terracotta-100 dark:bg-terracotta-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="w-6 h-6 text-terracotta-600 dark:text-terracotta-400" />
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
            <div className="w-12 h-12 bg-soil-100 dark:bg-soil-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-soil-600 dark:text-soil-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">${stats.totalRevenue}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Revenue</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-sunlight-100 dark:bg-sunlight-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-sunlight-600 dark:text-sunlight-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.avgRating}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Avg Rating</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">+23%</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Growth</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-2">Quick Actions</h2>
              <p className="text-forest-600 dark:text-forest-300">Manage your farm products efficiently</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-primary flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Product
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                View Orders
              </button>
              <button className="bg-white dark:bg-forest-700 text-forest-700 dark:text-forest-300 px-6 py-3 rounded-xl font-semibold border-2 border-forest-300 dark:border-forest-600 hover:border-forest-500 transition-colors duration-200 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Analytics
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Listings */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100">Your Products</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-xl border border-forest-200 dark:border-forest-700 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-100 text-sm focus:border-forest-500 focus:outline-none"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-forest-200 dark:border-forest-700 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-100 text-sm focus:border-forest-500 focus:outline-none"
                  >
                    <option value="all">All Products</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Out of Stock</option>
                  </select>
                </div>
              </div>
              
              {filteredListings.length > 0 ? (
                <div className="space-y-4">
                  {filteredListings.map((listing) => (
                    <div key={listing.id} className="p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl hover:bg-forest-100/50 dark:hover:bg-forest-700/50 transition-colors duration-200">
                      <div className="flex gap-4">
                        <img src={listing.image} alt={listing.title} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-forest-900 dark:text-forest-100">{listing.title}</h3>
                              <p className="text-sm text-forest-600 dark:text-forest-300 mb-2">{listing.description}</p>
                              <div className="flex items-center gap-4 text-sm text-forest-500 dark:text-forest-400">
                                <span>${listing.price}/{listing.unit}</span>
                                <span>•</span>
                                <span>{listing.quantity} available</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span>{listing.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                listing.isAvailable 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                              }`}>
                                {listing.isAvailable ? 'Available' : 'Out of Stock'}
                              </span>
                              <div className="flex gap-2">
                                <button className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-3 text-xs text-forest-500 dark:text-forest-400">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {listing.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <ShoppingCart className="w-3 h-3" />
                              {listing.orders} orders
                            </span>
                            <span>Added {listing.createdAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-forest-100 dark:bg-forest-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-12 h-12 text-forest-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-900 dark:text-forest-100 mb-3">
                    Your farm is currently empty
                  </h3>
                  <p className="text-forest-600 dark:text-forest-300 mb-8 max-w-md mx-auto">
                    Add your first product to start selling to the community and connect with local buyers.
                  </p>
                  <button 
                    onClick={handleAddProduct}
                    className="btn-primary"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Product
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100">Recent Orders</h2>
              <Link to="/orders" className="text-forest-600 dark:text-forest-300 hover:text-forest-500 dark:hover:text-forest-200 text-sm">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-forest-900 dark:text-forest-100">{order.customer}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-forest-600 dark:text-forest-300 mb-1">
                    {order.quantity} × {order.product}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-forest-500 dark:text-forest-400">
                      {order.date.toLocaleDateString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="pod-badge text-xs">POD</span>
                      <span className="font-semibold text-forest-900 dark:text-forest-100">${order.total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Farm Tips */}
        <div className="mt-8 glass-card p-6">
          <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-6">Farm Tips & Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-100 dark:bg-forest-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-forest-600 dark:text-forest-400" />
              </div>
              <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">Seasonal Planning</h3>
              <p className="text-sm text-forest-600 dark:text-forest-300">
                Plan your crops based on seasonal demand for better sales
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta-100 dark:bg-terracotta-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-terracotta-600 dark:text-terracotta-400" />
              </div>
              <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">Customer Relations</h3>
              <p className="text-sm text-forest-600 dark:text-forest-300">
                Build relationships with schools for consistent orders
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sunlight-100 dark:bg-sunlight-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-sunlight-600 dark:text-sunlight-400" />
              </div>
              <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">Quality Matters</h3>
              <p className="text-sm text-forest-600 dark:text-forest-300">
                High-quality products lead to better ratings and repeat customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
