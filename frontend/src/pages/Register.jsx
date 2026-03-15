// --- FILE: src/pages/Register.jsx ---
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../store/authSlice'
import { Eye, EyeOff, Sprout, Leaf, User, Lock, Mail, MapPin, Phone, Building } from 'lucide-react'

export function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    role: 'buyer' // 'farmer', 'buyer', 'super_admin'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // Multi-step registration
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateStep = () => {
    if (step === 1) {
      return formData.role
    } else if (step === 2) {
      return formData.first_name && formData.last_name && formData.username && formData.email && formData.phone && formData.address
    } else if (step === 3) {
      return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
    }
    return false
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1)
      setError('')
    } else {
      setError('Please fill in all required fields')
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep()) {
      setError('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await dispatch(registerUser(formData))
      if (result.meta.requestStatus === 'fulfilled') {
        // Redirect to role-based dashboard
        const dashboardPath = formData.role === 'farmer' ? '/farmer' : '/school'
        navigate(dashboardPath)
      } else {
        setError(result.payload || 'Registration failed')
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
        {/* Register Card */}
        <div className="glass-card p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-forest-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-forest-900 dark:text-forest-100 mb-2">
              Join TELAX
            </h1>
            <p className="text-forest-600 dark:text-forest-300">
              Create your account to start trading
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNum
                        ? 'bg-forest-500 text-white'
                        : 'bg-forest-200 dark:bg-forest-700 text-forest-600 dark:text-forest-400'
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div
                      className={`w-full h-1 mx-2 ${
                        step > stepNum ? 'bg-forest-500' : 'bg-forest-200 dark:bg-forest-700'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-forest-600 dark:text-forest-300">
              <span>Role</span>
              <span>Basic Info</span>
              <span>Security</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl">
              <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Multi-step Form */}
          <form onSubmit={handleSubmit}>
            {/* Step 1: Role Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-4">
                    I want to join as:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Buyer Card */}
                    <div
                      onClick={() => setFormData({...formData, role: 'buyer'})}
                      className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
                        formData.role === 'buyer'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg'
                          : 'border-forest-200 dark:border-forest-700 hover:border-forest-500 bg-white dark:bg-forest-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="buyer"
                        checked={formData.role === 'buyer'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          formData.role === 'buyer'
                            ? 'bg-green-500 text-white'
                            : 'bg-forest-100 dark:bg-forest-700 text-forest-600 dark:text-forest-400'
                        }`}>
                          <User className="w-8 h-8" />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${
                          formData.role === 'buyer'
                            ? 'text-green-800 dark:text-green-200'
                            : 'text-forest-900 dark:text-forest-100'
                        }`}>
                          Buyer
                        </h3>
                        <p className={`text-sm ${
                          formData.role === 'buyer'
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-forest-600 dark:text-forest-300'
                        }`}>
                          I want to purchase fresh produce
                        </p>
                      </div>
                      {formData.role === 'buyer' && (
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </div>

                    {/* Farmer Card */}
                    <div
                      onClick={() => setFormData({...formData, role: 'farmer'})}
                      className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
                        formData.role === 'farmer'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg'
                          : 'border-forest-200 dark:border-forest-700 hover:border-forest-500 bg-white dark:bg-forest-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="farmer"
                        checked={formData.role === 'farmer'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          formData.role === 'farmer'
                            ? 'bg-green-500 text-white'
                            : 'bg-forest-100 dark:bg-forest-700 text-forest-600 dark:text-forest-400'
                        }`}>
                          <Sprout className="w-8 h-8" />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${
                          formData.role === 'farmer'
                            ? 'text-green-800 dark:text-green-200'
                            : 'text-forest-900 dark:text-forest-100'
                        }`}>
                          Farmer
                        </h3>
                        <p className={`text-sm ${
                          formData.role === 'farmer'
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-forest-600 dark:text-forest-300'
                        }`}>
                          I want to list and sell my products
                        </p>
                      </div>
                      {formData.role === 'farmer' && (
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Administrator Option (Compact) */}
                  <div className="mt-4">
                    <label className="flex items-center p-3 border border-forest-200 dark:border-forest-700 rounded-lg cursor-pointer hover:border-forest-500 transition-colors">
                      <input
                        type="radio"
                        name="role"
                        value="super_admin"
                        checked={formData.role === 'super_admin'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex items-center flex-1">
                        <Building className="w-6 h-6 text-forest-600 dark:text-forest-400 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-forest-900 dark:text-forest-100">Administrator</h3>
                          <p className="text-xs text-forest-600 dark:text-forest-300">
                            Manage the platform (requires approval)
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Basic Information */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-forest-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="form-input pl-10"
                      placeholder="Choose a username"
                    />
                  </div>
                </div>

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

                <div>
                  <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-forest-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-input pl-10"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-forest-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="form-input pl-10"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Security */}
            {step === 3 && (
              <div className="space-y-6">
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
                      placeholder="Create a strong password"
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
                  <p className="mt-1 text-xs text-forest-500 dark:text-forest-400">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-forest-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="form-input pl-10 pr-10"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-forest-400 hover:text-forest-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-forest-400 hover:text-forest-600" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary flex-1"
                >
                  Previous
                </button>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary flex-1"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Sprout className="w-5 h-5" />
                  )}
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-forest-600 dark:text-forest-300">
              Already have an account?{' '}
              <Link to="/login" className="text-forest-600 dark:text-forest-300 hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-forest-500 dark:text-forest-400">
            By creating an account, you agree to our{' '}
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

