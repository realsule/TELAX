// --- FILE: src/pages/Profile.jsx ---
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Settings, 
  LogOut,
  Edit,
  Save,
  X,
  Shield,
  Bell,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'

export function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: ''
  })
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone_number: user.phone_number || '',
        address: user.address || ''
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      // API call to update profile
      // const response = await updateProfile(formData)
      setMessage('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      setMessage('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      setMessage('New passwords do not match')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      // API call to update password
      // const response = await updatePassword(passwordData)
      setMessage('Password updated successfully!')
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      })
      setShowPasswordForm(false)
    } catch (error) {
      setMessage('Failed to update password. Please check your current password.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const getRoleDisplay = (role) => {
    switch (role) {
      case 'farmer': return 'Farmer'
      case 'buyer': return 'Buyer (School/Community)'
      case 'super_admin': return 'Super Admin'
      default: return role
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'farmer': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'buyer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'super_admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-forest-600 dark:text-forest-300">Please login to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-terracotta-50 to-sunlight-50 dark:from-forest-900 dark:via-soil-900 dark:to-terracotta-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-2">
            My Profile
          </h1>
          <p className="text-lg text-forest-600 dark:text-forest-300">
            Manage your account settings and preferences
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-full ${
            message.includes('success') 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          }`}>
            <p className="text-center">{message}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card-organic text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-forest-400 to-terracotta-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-2">
                {user.first_name} {user.last_name}
              </h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${getRoleColor(user.role)}`}>
                {getRoleDisplay(user.role)}
              </span>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-forest-600 dark:text-forest-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.phone_number && (
                  <div className="flex items-center gap-3 text-forest-600 dark:text-forest-300">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{user.phone_number}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-forest-600 dark:text-forest-300">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-forest-600 dark:text-forest-300">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">
                    {user.is_verified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="w-full bg-white dark:bg-forest-700 text-forest-700 dark:text-forest-300 px-6 py-3 rounded-full font-semibold border-2 border-forest-300 dark:border-forest-600 hover:border-forest-500 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <div className="card-flowing">
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
                {isEditing ? 'Edit Profile' : 'Profile Information'}
              </h3>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-4">
                    Basic Information
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="input-label">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field ${!isEditing ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : ''}`}
                      />
                    </div>
                    <div>
                      <label className="input-label">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field ${!isEditing ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-4">
                    Contact Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="input-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field ${!isEditing ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : ''}`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="input-label">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-2xl border-2 border-forest-300 dark:border-forest-600 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-100 focus:border-forest-500 focus:outline-none resize-none ${!isEditing ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : ''}`}
                        placeholder="123 Farm Road, Agriculture City, AC 12345"
                      />
                    </div>
                  </div>
                </div>

                {/* Account Information (Read-only) */}
                <div>
                  <h4 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-4">
                    Account Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="input-label">Email Address</label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="input-field bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="input-label">Account Type</label>
                      <input
                        type="text"
                        value={getRoleDisplay(user.role)}
                        disabled
                        className="input-field bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="input-label">Member Since</label>
                      <input
                        type="text"
                        value={new Date(user.created_at).toLocaleDateString()}
                        disabled
                        className="input-field bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="loader-organic" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Form */}
        {showPasswordForm && (
          <div className="mt-8 card-flowing">
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
              Change Password
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="input-label">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="current_password"
                    value={passwordData.current_password}
                    onChange={handlePasswordChange}
                    className="input-field pr-12"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-forest-500 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-200"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="input-label">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    className="input-field pr-12"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-forest-500 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-200"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="input-label">Confirm New Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={passwordData.confirm_password}
                  onChange={handlePasswordChange}
                  className="input-field"
                  placeholder="Confirm new password"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handlePasswordUpdate}
                  disabled={isLoading}
                  className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="loader-organic" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowPasswordForm(false)
                    setPasswordData({
                      current_password: '',
                      new_password: '',
                      confirm_password: ''
                    })
                  }}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Section */}
        <div className="mt-8 card-flowing">
          <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
            Preferences
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-forest-900 dark:text-forest-100">Email Notifications</h4>
                <p className="text-sm text-forest-600 dark:text-forest-300">
                  Receive email updates about orders and messages
                </p>
              </div>
              <button className="theme-toggle">
                <Bell className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-forest-900 dark:text-forest-100">Order Updates</h4>
                <p className="text-sm text-forest-600 dark:text-forest-300">
                  Get notified when your order status changes
                </p>
              </div>
              <button className="theme-toggle">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-forest-900 dark:text-forest-100">Marketing Emails</h4>
                <p className="text-sm text-forest-600 dark:text-forest-300">
                  Receive promotional offers and farm updates
                </p>
              </div>
              <button className="theme-toggle">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
