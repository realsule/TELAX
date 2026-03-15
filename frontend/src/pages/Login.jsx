// --- FILE: src/pages/Login.jsx ---
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/authSlice'
import { Eye, EyeOff, Sprout, Leaf, User, Lock, Mail } from 'lucide-react'

export function Login() {
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
        navigate('/')
      } else {
        setError(result.payload || 'Login failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-tlx-pattern p-6">
      {/* Floating agricultural elements */}
      <div className="absolute top-20 left-20 animate-float">
        <Sprout className="w-16 h-16 text-forest-300 dark:text-forest-600 opacity-50" />
      </div>
      <div className="absolute top-40 right-32 animate-float-delayed">
        <Leaf className="w-12 h-12 text-terracotta-300 dark:text-terracotta-600 opacity-50" />
      </div>
      <div className="absolute bottom-32 left-40 animate-float">
        <Leaf className="w-10 h-10 text-sunlight-300 dark:text-sunlight-600 opacity-50" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <div className="glass-card p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-forest-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-forest-900 dark:text-forest-100 mb-2">
              Welcome Back
            </h1>
            <p className="text-forest-600 dark:text-forest-300">
              Sign in to access your agricultural marketplace
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl">
              <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">
                Email Address
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
                  className="form-input pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">
                Password
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
                  className="form-input pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-forest-400 hover:text-forest-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-forest-400 hover:text-forest-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-forest-600 focus:ring-forest-500 border-forest-300 rounded"
                />
                <span className="ml-2 text-sm text-forest-600 dark:text-forest-300">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-forest-600 dark:text-forest-300 hover:text-forest-500 dark:hover:text-forest-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <User className="w-5 h-5" />
              )}
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-forest-200 dark:border-forest-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-forest-800 text-forest-500 dark:text-forest-400">
                New to TELAX?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link
              to="/register"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Sprout className="w-5 h-5" />
              Create Account
            </Link>
          </div>

          {/* Role-based Sign In Options */}
          <div className="mt-8 pt-8 border-t border-forest-200 dark:border-forest-700">
            <p className="text-center text-sm text-forest-600 dark:text-forest-300 mb-4">
              Sign in as:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="p-3 text-center rounded-xl border border-forest-200 dark:border-forest-700 hover:border-forest-500 dark:hover:border-forest-500 transition-colors"
              >
                <User className="w-5 h-5 mx-auto mb-1 text-forest-600 dark:text-forest-400" />
                <span className="text-xs text-forest-600 dark:text-forest-300">Buyer</span>
              </button>
              <button
                type="button"
                className="p-3 text-center rounded-xl border border-forest-200 dark:border-forest-700 hover:border-forest-500 dark:hover:border-forest-500 transition-colors"
              >
                <Sprout className="w-5 h-5 mx-auto mb-1 text-forest-600 dark:text-forest-400" />
                <span className="text-xs text-forest-600 dark:text-forest-300">Farmer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-forest-500 dark:text-forest-400">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-forest-600 dark:text-forest-300 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-forest-600 dark:text-forest-300 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}