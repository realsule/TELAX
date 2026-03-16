// --- FILE: src/pages/InstitutionDashboard.jsx ---
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Gift, 
  Users, 
  Plus, 
  Clock, 
  MapPin, 
  Target,
  TrendingUp,
  Award,
  Heart,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react'

export function InstitutionDashboard() {
  const { user } = useSelector(state => state.auth)
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalParticipants: 0,
    totalDonations: 0,
    activeDonations: 0,
    totalValueClaimed: 0
  })
  const [events, setEvents] = useState([])
  const [donations, setDonations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('events')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    // Load institution data
    const loadInstitutionData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Initialize with empty data (realistic for new user)
        setStats({
          totalEvents: 0,
          activeEvents: 0,
          totalParticipants: 0,
          totalDonations: 0,
          activeDonations: 0,
          totalValueClaimed: 0
        })
        
        setEvents([])
        setDonations([])
        
      } catch (error) {
        console.error('Error loading institution data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInstitutionData()
  }, [])

  const handleCreateEvent = () => {
    // Navigate to create event page or open modal
    console.log('Create event clicked')
  }

  const handleCreateDonation = () => {
    // Navigate to create donation page or open modal
    console.log('Create donation clicked')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'approved': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'rejected': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      case 'completed': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
      default: return 'text-forest-600 dark:text-forest-400 bg-forest-100 dark:bg-forest-900/30'
    }
  }

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'workshop': return <Target className="w-4 h-4" />
      case 'school_visit': return <Users className="w-4 h-4" />
      case 'community_meeting': return <Heart className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getDonationTypeIcon = (type) => {
    switch (type) {
      case 'grant': return <Award className="w-4 h-4" />
      case 'resource': return <Gift className="w-4 h-4" />
      case 'volunteer': return <Users className="w-4 h-4" />
      default: return <Gift className="w-4 h-4" />
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                          (filterStatus === 'active' && event.is_active) ||
                          (filterStatus === 'inactive' && !event.is_active)
    return matchesSearch && matchesFilter
  })

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                          (filterStatus === 'active' && donation.is_active) ||
                          (filterStatus === 'inactive' && !donation.is_active)
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-tlx-pattern p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-forest-200 dark:bg-forest-700 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map(i => (
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-forest-900 dark:text-forest-100 mb-2">
            Institution Dashboard
          </h1>
          <p className="text-forest-600 dark:text-forest-300">
            Manage your events and donations to support the agricultural community
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-forest-100 dark:bg-forest-800 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-forest-600 dark:text-forest-400" />
              </div>
              <span className="text-2xl font-bold text-forest-900 dark:text-forest-100">
                {stats.totalEvents}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-1">
              Total Events
            </h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">
              {stats.activeEvents} currently active
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-terracotta-100 dark:bg-terracotta-800 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-terracotta-600 dark:text-terracotta-400" />
              </div>
              <span className="text-2xl font-bold text-forest-900 dark:text-forest-100">
                {stats.totalParticipants}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-1">
              Total Participants
            </h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">
              Across all events
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sunlight-100 dark:bg-sunlight-800 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-sunlight-600 dark:text-sunlight-400" />
              </div>
              <span className="text-2xl font-bold text-forest-900 dark:text-forest-100">
                {stats.totalDonations}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-1">
              Total Donations
            </h3>
            <p className="text-sm text-forest-600 dark:text-forest-300">
              {stats.activeDonations} currently active
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="glass-card">
          {/* Tab Navigation */}
          <div className="border-b border-forest-200 dark:border-forest-700">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'events'
                    ? 'border-forest-500 text-forest-600 dark:text-forest-400'
                    : 'border-transparent text-forest-500 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Events
              </button>
              <button
                onClick={() => setActiveTab('donations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'donations'
                    ? 'border-forest-500 text-forest-600 dark:text-forest-400'
                    : 'border-transparent text-forest-500 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300'
                }`}
              >
                <Gift className="w-4 h-4 inline mr-2" />
                Donations
              </button>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="p-6 border-b border-forest-200 dark:border-forest-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
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
                  <option value="all">All {activeTab === 'events' ? 'Events' : 'Donations'}</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <button
                onClick={activeTab === 'events' ? handleCreateEvent : handleCreateDonation}
                className="btn-primary"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create {activeTab === 'events' ? 'Event' : 'Donation'}
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'events' ? (
              <>
                {filteredEvents.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEvents.map((event) => (
                      <div key={event.id} className="p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl hover:bg-forest-100/50 dark:hover:bg-forest-700/50 transition-colors duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getEventTypeIcon(event.event_type)}
                              <h3 className="font-semibold text-forest-900 dark:text-forest-100">
                                {event.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                event.is_active 
                                  ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
                                  : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30'
                              }`}>
                                {event.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <p className="text-sm text-forest-600 dark:text-forest-300 mb-3">
                              {event.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-forest-500 dark:text-forest-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {event.current_participants}/{event.max_participants || '∞'} participants
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
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
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-forest-100 dark:bg-forest-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calendar className="w-12 h-12 text-forest-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-forest-900 dark:text-forest-100 mb-3">
                      Welcome to the community!
                    </h3>
                    <p className="text-forest-600 dark:text-forest-300 mb-8 max-w-md mx-auto">
                      You haven't organized any events yet. Click 'Create Event' to get started and engage with the agricultural community.
                    </p>
                    <button 
                      onClick={handleCreateEvent}
                      className="btn-primary"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Your First Event
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {filteredDonations.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDonations.map((donation) => (
                      <div key={donation.id} className="p-4 bg-forest-50/50 dark:bg-forest-800/50 rounded-xl hover:bg-forest-100/50 dark:hover:bg-forest-700/50 transition-colors duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getDonationTypeIcon(donation.donation_type)}
                              <h3 className="font-semibold text-forest-900 dark:text-forest-100">
                                {donation.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                donation.is_active 
                                  ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
                                  : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30'
                              }`}>
                                {donation.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <p className="text-sm text-forest-600 dark:text-forest-300 mb-3">
                              {donation.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-forest-500 dark:text-forest-400">
                              <span className="flex items-center gap-1">
                                <Gift className="w-3 h-3" />
                                {donation.donation_type}
                              </span>
                              {donation.quantity_available && (
                                <span className="flex items-center gap-1">
                                  <Target className="w-3 h-3" />
                                  {donation.quantity_claimed}/{donation.quantity_available} claimed
                                </span>
                              )}
                              {donation.value && (
                                <span className="flex items-center gap-1">
                                  <Award className="w-3 h-3" />
                                  KES {donation.value}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
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
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-forest-100 dark:bg-forest-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Gift className="w-12 h-12 text-forest-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-forest-900 dark:text-forest-100 mb-3">
                      Start making a difference!
                    </h3>
                    <p className="text-forest-600 dark:text-forest-300 mb-8 max-w-md mx-auto">
                      You haven't posted any donations yet. Share grants, resources, or volunteer opportunities to support the agricultural community.
                    </p>
                    <button 
                      onClick={handleCreateDonation}
                      className="btn-primary"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Your First Donation
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
