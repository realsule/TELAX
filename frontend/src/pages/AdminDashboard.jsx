// --- FILE: src/pages/AdminDashboard.jsx ---
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  Users, 
  TrendingUp, 
  Package, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Settings,
  Download,
  Calendar,
  ShoppingCart,
  Star,
  Activity,
  BarChart3,
  PieChart,
  Filter,
  UserCheck,
  UserX,
  MessageSquare
} from 'lucide-react'
import { EmptyUsers } from '../components/EmptyState'

export function AdminDashboard() {
  const { user } = useSelector(state => state.auth)
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    farmersCount: 0,
    buyersCount: 0,
    adminsCount: 0,
    totalListings: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentRegistrations: 0,
    unverifiedUsers: 0,
    reportedIssues: 0,
    systemHealth: 'healthy'
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [systemMetrics, setSystemMetrics] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load admin dashboard data
    const loadDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setStats({
          totalUsers: 1247,
          verifiedUsers: 1198,
          farmersCount: 156,
          buyersCount: 1087,
          adminsCount: 4,
          totalListings: 892,
          totalOrders: 3456,
          totalRevenue: 45678.90,
          recentRegistrations: 23,
          unverifiedUsers: 49,
          reportedIssues: 3,
          systemHealth: 'healthy'
        })

        setRecentActivity([
          {
            id: 1,
            type: 'user_registration',
            user: 'Sarah Johnson',
            role: 'farmer',
            timestamp: new Date('2024-01-20T10:30:00'),
            details: 'Registered as new farmer',
            status: 'pending'
          },
          {
            id: 2,
            type: 'new_order',
            user: 'Springfield Elementary',
            role: 'buyer',
            timestamp: new Date('2024-01-20T09:45:00'),
            details: 'Placed order for 15 items',
            status: 'completed'
          },
          {
            id: 3,
            type: 'listing_created',
            user: 'John\'s Organic Farm',
            role: 'farmer',
            timestamp: new Date('2024-01-20T08:15:00'),
            details: 'Added new product listing',
            status: 'approved'
          },
          {
            id: 4,
            type: 'system_alert',
            user: 'System',
            role: 'system',
            timestamp: new Date('2024-01-20T07:00:00'),
            details: 'Database backup completed',
            status: 'success'
          },
          {
            id: 5,
            type: 'reported_issue',
            user: 'Mike Wilson',
            role: 'farmer',
            timestamp: new Date('2024-01-19T16:30:00'),
            details: 'Reported payment processing issue',
            status: 'investigating'
          }
        ])

        setSystemMetrics([
          { name: 'API Response Time', value: '124ms', status: 'good', trend: 'down' },
          { name: 'Database Load', value: '45%', status: 'good', trend: 'stable' },
          { name: 'Error Rate', value: '0.2%', status: 'good', trend: 'down' },
          { name: 'Active Users', value: '234', status: 'good', trend: 'up' },
          { name: 'Storage Usage', value: '67%', status: 'warning', trend: 'up' }
        ])

      } catch (error) {
        console.error('Failed to load admin dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration': return <Users className="w-4 h-4" />
      case 'new_order': return <ShoppingCart className="w-4 h-4" />
      case 'listing_created': return <Package className="w-4 h-4" />
      case 'system_alert': return <AlertTriangle className="w-4 h-4" />
      case 'reported_issue': return <MessageSquare className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
      case 'completed':
      case 'approved': 
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'pending':
      case 'investigating': 
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'error':
      case 'failed': 
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      default: 
        return 'text-forest-600 dark:text-forest-400 bg-forest-100 dark:bg-forest-900/30'
    }
  }

  const getMetricStatus = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 dark:text-green-400'
      case 'warning': return 'text-yellow-600 dark:text-yellow-400'
      case 'error': return 'text-red-600 dark:text-red-400'
      default: return 'text-forest-600 dark:text-forest-400'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-forest-200 border-t-forest-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-forest-600 dark:text-forest-300">Loading admin dashboard...</p>
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
            Admin Dashboard
          </h1>
          <p className="text-lg text-forest-600 dark:text-forest-300">
            Monitor system performance and user activity
          </p>
        </div>

        {/* System Health Banner */}
        <div className={`glass-card p-4 mb-8 border-l-4 ${
          stats.systemHealth === 'healthy' 
            ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20' 
            : 'border-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/20'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {stats.systemHealth === 'healthy' ? (
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              )}
              <div>
                <h3 className="font-semibold text-forest-900 dark:text-forest-100">
                  System Status: {stats.systemHealth === 'healthy' ? 'All Systems Operational' : 'Some Issues Detected'}
                </h3>
                <p className="text-sm text-forest-600 dark:text-forest-300">
                  Last checked: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
            <button className="btn-secondary text-sm">
              View Details
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-forest-100 dark:bg-forest-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-forest-600 dark:text-forest-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.totalUsers}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Total Users</p>
            <div className="mt-2">
              <span className="pod-badge">+{stats.recentRegistrations} this week</span>
            </div>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.verifiedUsers}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Verified</p>
            <div className="mt-2">
              <span className="pod-badge">{stats.unverifiedUsers} pending</span>
            </div>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-terracotta-100 dark:bg-terracotta-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-terracotta-600 dark:text-terracotta-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.totalListings}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Listings</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-sunlight-100 dark:bg-sunlight-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="w-6 h-6 text-sunlight-600 dark:text-sunlight-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.totalOrders}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Orders</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-soil-100 dark:bg-soil-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-soil-600 dark:text-soil-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">${stats.totalRevenue}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Revenue</p>
          </div>
          
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-xl flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">{stats.reportedIssues}</h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">Issues</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* System Metrics */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-6">System Performance</h2>
              
              <div className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        metric.status === 'good' ? 'bg-green-500' : 
                        metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <h3 className="font-medium text-forest-900 dark:text-forest-100">{metric.name}</h3>
                        <p className="text-sm text-forest-600 dark:text-forest-300">Current: {metric.value}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${getMetricStatus(metric.status)}`}>
                        {metric.status}
                      </span>
                      <p className="text-xs text-forest-500 dark:text-forest-400">
                        {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} 
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Breakdown */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-6">User Distribution</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-forest-700 dark:text-forest-300 font-medium">Farmers</span>
                  <span className="text-forest-900 dark:text-forest-100 font-bold">{stats.farmersCount}</span>
                </div>
                <div className="w-full bg-forest-200 dark:bg-forest-700 rounded-full h-2">
                  <div 
                    className="bg-forest-500 h-2 rounded-full" 
                    style={{ width: `${(stats.farmersCount / stats.totalUsers) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-forest-500 dark:text-forest-400 mt-1">
                  {((stats.farmersCount / stats.totalUsers) * 100).toFixed(1)}% of users
                </p>
              </div>
              
              <div className="p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-forest-700 dark:text-forest-300 font-medium">Buyers</span>
                  <span className="text-forest-900 dark:text-forest-100 font-bold">{stats.buyersCount}</span>
                </div>
                <div className="w-full bg-forest-200 dark:bg-forest-700 rounded-full h-2">
                  <div 
                    className="bg-terracotta-500 h-2 rounded-full" 
                    style={{ width: `${(stats.buyersCount / stats.totalUsers) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-forest-500 dark:text-forest-400 mt-1">
                  {((stats.buyersCount / stats.totalUsers) * 100).toFixed(1)}% of users
                </p>
              </div>
              
              <div className="p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-forest-700 dark:text-forest-300 font-medium">Admins</span>
                  <span className="text-forest-900 dark:text-forest-100 font-bold">{stats.adminsCount}</span>
                </div>
                <div className="w-full bg-forest-200 dark:bg-forest-700 rounded-full h-2">
                  <div 
                    className="bg-soil-500 h-2 rounded-full" 
                    style={{ width: `${(stats.adminsCount / stats.totalUsers) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-forest-500 dark:text-forest-400 mt-1">
                  {((stats.adminsCount / stats.totalUsers) * 100).toFixed(1)}% of users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100">Recent Activity</h2>
            <button className="btn-secondary text-sm flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl hover:bg-forest-100/50 dark:hover:bg-forest-700/50 transition-colors duration-200">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-forest-900 dark:text-forest-100">{activity.user}</h3>
                    <p className="text-sm text-forest-600 dark:text-forest-300">{activity.details}</p>
                    <p className="text-xs text-forest-500 dark:text-forest-400">
                      {activity.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                    <p className="text-xs text-forest-500 dark:text-forest-400 mt-1">
                      {activity.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyUsers />
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 glass-card p-6">
          <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-6">Admin Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <button className="btn-primary flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Manage Users
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              Review Listings
            </button>
            <button className="bg-white dark:bg-forest-700 text-forest-700 dark:text-forest-300 px-6 py-3 rounded-xl font-semibold border-2 border-forest-300 dark:border-forest-600 hover:border-forest-500 transition-colors duration-200 flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Generate Reports
            </button>
            <button className="bg-white dark:bg-forest-700 text-forest-700 dark:text-forest-300 px-6 py-3 rounded-xl font-semibold border-2 border-forest-300 dark:border-forest-600 hover:border-forest-500 transition-colors duration-200 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Export Data
            </button>
            <button 
              onClick={() => window.open('#', '_blank')}
              className="bg-gradient-to-r from-red-600 to-terracotta-600 hover:from-red-700 hover:to-terracotta-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <Download className="w-5 h-5" />
              Download Handover Docs
            </button>
          </div>
          <div className="mt-4 p-4 bg-red-50/50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>Stage 8 Handover Documentation:</strong> Download complete project documentation for April 6 submission deadline.
            </p>
          </div>
        </div>

        {/* Traffic Observations - Super Admin View */}
        <div className="mt-8 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100">Traffic Observations</h2>
            <span className="pod-badge text-xs">Live Monitoring</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-forest-100 dark:bg-forest-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-forest-600 dark:text-forest-400" />
              </div>
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">1,247</h3>
              <p className="text-sm text-forest-600 dark:text-forest-300">Active Users</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12% from yesterday</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-terracotta-100 dark:bg-terracotta-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-terracotta-600 dark:text-terracotta-400" />
              </div>
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">8,532</h3>
              <p className="text-sm text-forest-600 dark:text-forest-300">Page Views</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">+8% from last hour</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sunlight-100 dark:bg-sunlight-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-6 h-6 text-sunlight-600 dark:text-sunlight-400" />
              </div>
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">342</h3>
              <p className="text-sm text-forest-600 dark:text-forest-300">Orders Today</p>
              <p className="text-xs text-forest-600 dark:text-forest-400 mt-1">On track for goal</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-soil-100 dark:bg-soil-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-soil-600 dark:text-soil-400" />
              </div>
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100">89.2%</h3>
              <p className="text-sm text-forest-600 dark:text-forest-300">Conversion Rate</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Above industry avg</p>
            </div>
          </div>

          {/* Real-time Activity Feed */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-4">Real-time Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-forest-50/50 dark:bg-forest-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-forest-600 dark:text-forest-300">
                    New user registration from <strong>Nairobi</strong>
                  </span>
                </div>
                <span className="text-xs text-forest-500 dark:text-forest-400">2 min ago</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-forest-50/50 dark:bg-forest-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-terracotta-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-forest-600 dark:text-forest-300">
                    Bulk order placed by <strong>Kisumu School District</strong>
                  </span>
                </div>
                <span className="text-xs text-forest-500 dark:text-forest-400">5 min ago</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-forest-50/50 dark:bg-forest-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-sunlight-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-forest-600 dark:text-forest-300">
                    New product listing: <strong>Organic Avocados</strong>
                  </span>
                </div>
                <span className="text-xs text-forest-500 dark:text-forest-400">8 min ago</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-forest-50/50 dark:bg-forest-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-forest-600 dark:text-forest-300">
                    Payment completed for order <strong>#1234</strong>
                  </span>
                </div>
                <span className="text-xs text-forest-500 dark:text-forest-400">12 min ago</span>
              </div>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div>
            <h3 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-4">Geographic Distribution</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-forest-600 dark:text-forest-300">Nairobi</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-forest-200 dark:bg-forest-700 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-forest-500"></div>
                    </div>
                    <span className="text-sm font-medium text-forest-900 dark:text-forest-100">45%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-forest-600 dark:text-forest-300">Mombasa</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-forest-200 dark:bg-forest-700 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-terracotta-500"></div>
                    </div>
                    <span className="text-sm font-medium text-forest-900 dark:text-forest-100">22%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-forest-600 dark:text-forest-300">Kisumu</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-forest-200 dark:bg-forest-700 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-sunlight-500"></div>
                    </div>
                    <span className="text-sm font-medium text-forest-900 dark:text-forest-100">18%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-forest-600 dark:text-forest-300">Other</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-forest-200 dark:bg-forest-700 rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-soil-500"></div>
                    </div>
                    <span className="text-sm font-medium text-forest-900 dark:text-forest-100">15%</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-forest-100 dark:bg-forest-800 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-forest-900 dark:text-forest-100">100%</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border-8 border-forest-500 border-t-terracotta-500 border-r-sunlight-500 border-b-soil-500 animate-spin"></div>
                  </div>
                </div>
                <p className="text-sm text-forest-600 dark:text-forest-300">Total Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
