// --- FILE: src/pages/AdminLogin.jsx ---
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/authSlice'
import { Eye, EyeOff, Shield, Lock, Mail, AlertTriangle } from 'lucide-react'

export function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await dispatch(loginUser(formData))
      if (result.meta.requestStatus === 'fulfilled') {
        // Check if user is admin
        if (result.payload.user.role === 'super_admin') {
          navigate('/admin')
        } else {
          // Non-admin trying to access admin portal
          setError('Access denied. Administrator credentials required.')
          // Redirect to standard login after a delay
          setTimeout(() => {
            navigate('/login')
          }, 3000)
        }
      } else {
        setError(result.payload || 'Authentication failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-900 via-soil-900 to-forest-950 p-6">
      {/* Security-themed floating elements */}
      <div className="absolute top-20 left-20 animate-float opacity-30">
        <Shield className="w-16 h-16 text-terracotta-400" />
      </div>
      <div className="absolute top-40 right-32 animate-float-delayed opacity-30">
        <Lock className="w-12 h-12 text-forest-400" />
      </div>
      <div className="absolute bottom-32 left-40 animate-float opacity-30">
        <Shield className="w-10 h-10 text-sunlight-400" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Admin Login Card - Modern Agri Dark Theme */}
        <div className="bg-forest-800/90 backdrop-blur-xl border border-forest-700 rounded-2xl p-8 shadow-2xl">
          {/* Security Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-terracotta-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-forest-300 text-sm font-medium">
              Secure Administrator Access
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-red-400 text-xs font-semibold bg-red-900/20 px-3 py-1 rounded-full border border-red-800/30">
              <AlertTriangle className="w-3 h-3" />
              <span>AUTHORIZED PERSONNEL ONLY</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-xl ${
              error.includes('Access denied') 
                ? 'bg-red-900/30 border border-red-800/50' 
                : 'bg-red-900/30 border border-red-800/50'
            }`}>
              <p className="text-red-300 text-sm font-medium">{error}</p>
              {error.includes('Access denied') && (
                <p className="text-red-400 text-xs mt-2">
                  Redirecting to public login in 3 seconds...
                </p>
              )}
            </div>
          )}

          {/* Admin Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-forest-200 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-forest-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-forest-900/50 border border-forest-600 rounded-xl text-forest-100 placeholder-forest-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all duration-200"
                  placeholder="admin@telax.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-forest-200 mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-forest-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-forest-900/50 border border-forest-600 rounded-xl text-forest-100 placeholder-forest-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter administrator password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-forest-400 hover:text-forest-300 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-forest-400 hover:text-forest-300 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-terracotta-600 hover:from-red-700 hover:to-terracotta-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Access Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-forest-700">
            <div className="text-center space-y-2">
              <p className="text-xs text-forest-400 font-medium">
                🔒 This portal is monitored and logged
              </p>
              <p className="text-xs text-forest-500">
                Unauthorized access attempts are strictly prohibited
              </p>
              <p className="text-xs text-forest-600">
                All activities are recorded for security purposes
              </p>
            </div>
          </div>

          {/* Back to Public Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-forest-400 hover:text-forest-300 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>←</span>
              <span>Return to Public Login</span>
            </Link>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest-800/50 border border-forest-700 rounded-full">
            <Shield className="w-4 h-4 text-terracotta-400" />
            <span className="text-xs text-forest-400 font-medium">TELAX SECURE ADMIN</span>
          </div>
        </div>
      </div>
    </div>
  )
}
