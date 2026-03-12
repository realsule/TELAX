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
      return formData.first_name && formData.last_name && formData.email
    } else if (step === 2) {
      return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
    } else if (step === 3) {
      return formData.role
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
        navigate('/')
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
              <span>Basic Info</span>
              <span>Security</span>
              <span>Role</span>
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
            {/* Step 1: Basic Information */}
            {step === 1 && (
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
                      className="form-input pl-10"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Security */}
            {step === 2 && (
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

            {/* Step 3: Role Selection */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-forest-700 dark:text-forest-300 mb-4">
                    I want to join as:
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-forest-200 dark:border-forest-700 rounded-xl cursor-pointer hover:border-forest-500 transition-colors">
                      <input
                        type="radio"
                        name="role"
                        value="buyer"
                        checked={formData.role === 'buyer'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex items-center flex-1">
                        <User className="w-8 h-8 text-forest-600 dark:text-forest-400 mr-3" />
                        <div>
                          <h3 className="font-medium text-forest-900 dark:text-forest-100">Buyer</h3>
                          <p className="text-sm text-forest-600 dark:text-forest-300">
                            Purchase fresh produce from local farms
                          </p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-forest-200 dark:border-forest-700 rounded-xl cursor-pointer hover:border-forest-500 transition-colors">
                      <input
                        type="radio"
                        name="role"
                        value="farmer"
                        checked={formData.role === 'farmer'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex items-center flex-1">
                        <Sprout className="w-8 h-8 text-forest-600 dark:text-forest-400 mr-3" />
                        <div>
                          <h3 className="font-medium text-forest-900 dark:text-forest-100">Farmer</h3>
                          <p className="text-sm text-forest-600 dark:text-forest-300">
                            Sell your farm products to the community
                          </p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-forest-200 dark:border-forest-700 rounded-xl cursor-pointer hover:border-forest-500 transition-colors">
                      <input
                        type="radio"
                        name="role"
                        value="super_admin"
                        checked={formData.role === 'super_admin'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex items-center flex-1">
                        <Building className="w-8 h-8 text-forest-600 dark:text-forest-400 mr-3" />
                        <div>
                          <h3 className="font-medium text-forest-900 dark:text-forest-100">Administrator</h3>
                          <p className="text-sm text-forest-600 dark:text-forest-300">
                            Manage the platform (requires approval)
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
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

