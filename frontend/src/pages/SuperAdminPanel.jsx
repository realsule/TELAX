// --- FILE: src/pages/SuperAdminPanel.jsx ---
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Users, 
  Building, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Search,
  Filter,
  TrendingUp,
  AlertCircle,
  Award,
  Calendar,
  Gift,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react'

export function SuperAdminPanel() {
  const { user } = useSelector(state => state.auth)
  const [pendingInstitutions, setPendingInstitutions] = useState([])
  const [approvedInstitutions, setApprovedInstitutions] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInstitutions: 0,
    pendingApprovals: 0,
    totalEvents: 0,
    totalDonations: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('pending')
  const [selectedInstitution, setSelectedInstitution] = useState(null)

  useEffect(() => {
    // Load admin data
    const loadAdminData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Initialize with empty data (realistic for new admin)
        setStats({
          totalUsers: 0,
          totalInstitutions: 0,
          pendingApprovals: 0,
          totalEvents: 0,
          totalDonations: 0
        })
        
        setPendingInstitutions([])
        setApprovedInstitutions([])
        
      } catch (error) {
        console.error('Error loading admin data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAdminData()
  }, [])

  const handleApproveInstitution = async (institutionId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update local state
      const institution = pendingInstitutions.find(i => i.id === institutionId)
      if (institution) {
        setPendingInstitutions(prev => prev.filter(i => i.id !== institutionId))
        setApprovedInstitutions(prev => [...prev, { ...institution, is_approved: true }])
        setStats(prev => ({
          ...prev,
          pendingApprovals: prev.pendingApprovals - 1,
          totalInstitutions: prev.totalInstitutions + 1
        }))
      }
    } catch (error) {
      console.error('Error approving institution:', error)
    }
  }

  const handleRejectInstitution = async (institutionId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update local state
      setPendingInstitutions(prev => prev.filter(i => i.id !== institutionId))
      setStats(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals - 1
      }))
    } catch (error) {
      console.error('Error rejecting institution:', error)
    }
  }

  const filteredInstitutions = pendingInstitutions.filter(institution => {
    const matchesSearch = 
      institution.institution_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.first_name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-tlx-pattern p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-forest-200 dark:bg-forest-700 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-forest-100 dark:bg-forest-800 rounded-xl"></div>
              ))}
            </div>
            <div className="h-64 bg-forest-100 dark:bg-forest-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-tlx-pattern p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-forest-900 dark:text-forest-100 mb-2">
              Super Admin Panel
            </h1>
            <p className="text-forest-600 dark:text-forest-300">
              Manage institutions and oversee platform operations
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin-secure-portal/settings" className="btn-secondary">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </Link>
            <Link to="/login" className="btn-accent">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-forest-100 dark:bg-forest-800 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-forest-600 dark:text-forest-400" />
              </div>
              <span className="text-2xl font-bold text-forest-900 dark:text-forest-100">
                {stats.totalUsers}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-1">
              Total Users
            </h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">
              All platform users
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-terracotta-100 dark:bg-terracotta-800 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-terracotta-600 dark:text-terracotta-400" />
              </div>
              <span className="text-2xl font-bold text-forest-900 dark:text-forest-100">
                {stats.totalInstitutions}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-1">
              Institutions
            </h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">
              Approved organizations
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-800 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-2xl font-bold text-forest-900 dark:text-forest-100">
                {stats.pendingApprovals}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-1">
              Pending Approvals
            </h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">
              Awaiting review
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sunlight-100 dark:bg-sunlight-800 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-sunlight-600 dark:text-sunlight-400" />
              </div>
              <span className="text-2xl font-bold text-forest-900 dark:text-forest-100">
                {stats.totalEvents + stats.totalDonations}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-1">
              Activities
            </h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">
              Events & donations
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Institutions */}
          <div className="lg:col-span-2">
            <div className="glass-card">
              <div className="p-6 border-b border-forest-200 dark:border-forest-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-forest-900 dark:text-forest-100">
                    Pending Institution Approvals
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search institutions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-xl border border-forest-200 dark:border-forest-700 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-100 text-sm focus:border-forest-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {filteredInstitutions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredInstitutions.map((institution) => (
                      <div key={institution.id} className="p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl hover:bg-forest-100/50 dark:hover:bg-forest-700/50 transition-colors duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Building className="w-5 h-5 text-terracotta-600 dark:text-terracotta-400" />
                              <h3 className="font-semibold text-forest-900 dark:text-forest-100">
                                {institution.institution_name}
                              </h3>
                              <span className="px-2 py-1 rounded-full text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30">
                                Pending
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-forest-600 dark:text-forest-300 mb-3">
                              <div>
                                <span className="font-medium">Contact:</span> {institution.first_name} {institution.last_name}
                              </div>
                              <div>
                                <span className="font-medium">Email:</span> {institution.email}
                              </div>
                              <div>
                                <span className="font-medium">Type:</span> {institution.institution_type}
                              </div>
                              <div>
                                <span className="font-medium">Phone:</span> {institution.phone_number}
                              </div>
                            </div>
                            {institution.institution_description && (
                              <p className="text-sm text-forest-600 dark:text-forest-300 mb-3">
                                <span className="font-medium">Description:</span> {institution.institution_description}
                              </p>
                            )}
                            {institution.institution_address && (
                              <p className="text-sm text-forest-600 dark:text-forest-300">
                                <span className="font-medium">Address:</span> {institution.institution_address}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-forest-200 dark:border-forest-700">
                          <div className="flex items-center gap-2 text-xs text-forest-500 dark:text-forest-400">
                            <Clock className="w-3 h-3" />
                            Applied {new Date(institution.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedInstitution(institution)}
                              className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleApproveInstitution(institution.id)}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                            >
                              <CheckCircle className="w-4 h-4 inline mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectInstitution(institution.id)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                            >
                              <XCircle className="w-4 h-4 inline mr-1" />
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-forest-100 dark:bg-forest-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-forest-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-forest-900 dark:text-forest-100 mb-3">
                      All caught up!
                    </h3>
                    <p className="text-forest-600 dark:text-forest-300 max-w-md mx-auto">
                      No pending institution approvals at the moment. New applications will appear here for your review.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-forest-900 dark:text-forest-100 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link to="/admin/users" className="flex items-center p-3 bg-forest-50 dark:bg-forest-800 rounded-lg hover:bg-forest-100 dark:hover:bg-forest-700 transition-colors">
                  <Users className="w-5 h-5 text-forest-600 dark:text-forest-400 mr-3" />
                  <div>
                    <div className="font-medium text-forest-900 dark:text-forest-100">Manage Users</div>
                    <div className="text-sm text-forest-600 dark:text-forest-300">View and manage all users</div>
                  </div>
                </Link>
                
                <Link to="/admin/institutions" className="flex items-center p-3 bg-forest-50 dark:bg-forest-800 rounded-lg hover:bg-forest-100 dark:hover:bg-forest-700 transition-colors">
                  <Building className="w-5 h-5 text-terracotta-600 dark:text-terracotta-400 mr-3" />
                  <div>
                    <div className="font-medium text-forest-900 dark:text-forest-100">All Institutions</div>
                    <div className="text-sm text-forest-600 dark:text-forest-300">View approved institutions</div>
                  </div>
                </Link>
                
                <Link to="/admin/analytics" className="flex items-center p-3 bg-forest-50 dark:bg-forest-800 rounded-lg hover:bg-forest-100 dark:hover:bg-forest-700 transition-colors">
                  <BarChart3 className="w-5 h-5 text-sunlight-600 dark:text-sunlight-400 mr-3" />
                  <div>
                    <div className="font-medium text-forest-900 dark:text-forest-100">Analytics</div>
                    <div className="text-sm text-forest-600 dark:text-forest-300">Platform statistics</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-forest-900 dark:text-forest-100 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-forest-900 dark:text-forest-100">
                      No recent activity
                    </div>
                    <div className="text-xs text-forest-600 dark:text-forest-300">
                      Platform is ready for new users
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
