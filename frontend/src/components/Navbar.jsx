// --- FILE: src/components/Navbar.jsx ---
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../store/authSlice'
import { 
  Sprout, 
  ShoppingBag, 
  User, 
  LogOut, 
  Menu, 
  X,
  Heart,
  Package,
  BookOpen,
  Lightbulb
} from 'lucide-react'

export function Navbar() {
  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Dispatch logout action to clear Redux state
      dispatch(logout())
      // Navigate to home page after logout
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const isActiveRoute = (path) => {
    return location.pathname === path
  }

  const getDashboardLink = () => {
    if (!user || !isAuthenticated) return null
    switch (user.role) {
      case 'farmer':
        return '/farmer'
      case 'buyer':
        return '/school'
      case 'institution':
        return '/institution'
      case 'super_admin':
        return '/admin-secure-portal'
      default:
        return '/dashboard'
    }
  }

  const getDashboardText = () => {
    if (!user || !isAuthenticated) return null
    switch (user.role) {
      case 'farmer':
        return 'My Farm'
      case 'buyer':
        return 'My Orders'
      case 'institution':
        return 'My Institution'
      case 'super_admin':
        return 'Admin Panel'
      default:
        return 'Dashboard'
    }
  }

  const getDashboardIcon = () => {
    if (!user || !isAuthenticated) return null
    switch (user.role) {
      case 'farmer':
        return Package
      case 'buyer':
        return ShoppingBag
      case 'institution':
        return Heart
      case 'super_admin':
        return User
      default:
        return Package
    }
  }

  const DashboardIcon = getDashboardIcon()

  return (
    <nav className="bg-white dark:bg-forest-900 border-b border-forest-200 dark:border-forest-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-terracotta-500 rounded-lg flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-forest-900 dark:text-forest-100">
              TELAX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Guest/Unauthenticated Links */}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActiveRoute('/login')
                      ? 'text-forest-600 dark:text-forest-300 bg-forest-100 dark:bg-forest-800'
                      : 'text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 hover:bg-forest-50 dark:hover:bg-forest-800'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Link>
                
                <Link
                  to="/register"
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActiveRoute('/register')
                      ? 'text-forest-600 dark:text-forest-300 bg-forest-100 dark:bg-forest-800'
                      : 'text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 hover:bg-forest-50 dark:hover:bg-forest-800'
                  }`}
                >
                  <Sprout className="w-4 h-4 mr-2" />
                  Register
                </Link>
                
                <Link
                  to="/about"
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActiveRoute('/about')
                      ? 'text-forest-600 dark:text-forest-300 bg-forest-100 dark:bg-forest-800'
                      : 'text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 hover:bg-forest-50 dark:hover:bg-forest-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  About
                </Link>
                
                <Link
                  to="/farm-gallery"
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActiveRoute('/farm-gallery')
                      ? 'text-forest-600 dark:text-forest-300 bg-forest-100 dark:bg-forest-800'
                      : 'text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 hover:bg-forest-50 dark:hover:bg-forest-800'
                  }`}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Explore
                </Link>
              </>
            )}

            {/* Authenticated User Links */}
            {isAuthenticated && user && (
              <>
                {/* Dashboard Link */}
                {getDashboardLink() && (
                  <Link
                    to={getDashboardLink()}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActiveRoute(getDashboardLink())
                        ? 'text-forest-600 dark:text-forest-300 bg-forest-100 dark:bg-forest-800'
                        : 'text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 hover:bg-forest-50 dark:hover:bg-forest-800'
                    }`}
                  >
                    {DashboardIcon && <DashboardIcon className="w-4 h-4 mr-2" />}
                    {getDashboardText()}
                  </Link>
                )}

                <Link
                  to="/listings"
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActiveRoute('/listings')
                      ? 'text-forest-600 dark:text-forest-300 bg-forest-100 dark:bg-forest-800'
                      : 'text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 hover:bg-forest-50 dark:hover:bg-forest-800'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Marketplace
                </Link>

                <Link
                  to="/profile"
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActiveRoute('/profile')
                      ? 'text-forest-600 dark:text-forest-300 bg-forest-100 dark:bg-forest-800'
                      : 'text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 hover:bg-forest-50 dark:hover:bg-forest-800'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center px-4 py-2 rounded-lg font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <LogOut className="w-4 h-4 mr-2" />
                  )}
                  {isLoggingOut ? 'Signing out...' : 'Logout'}
                </button>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Auth Status */}
            {!isAuthenticated ? (
              <>
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex items-center px-4 py-2 rounded-lg font-medium text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">
                      {user.first_name} {user.last_name}
                    </span>
                    <span className="sm:hidden">
                      Account
                    </span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isMobileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-forest-800 rounded-lg shadow-lg border border-forest-200 dark:border-forest-700">
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="flex items-center w-full px-4 py-2 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoggingOut ? (
                            <div className="w-4 h-4 border-2 border-forest-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : (
                            <LogOut className="w-4 h-4 mr-2" />
                          )}
                          {isLoggingOut ? 'Signing out...' : 'Logout'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login/Register */}
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-lg font-medium text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
                
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-forest-800 border-b border-forest-200 dark:border-forest-700">
            <div className="px-6 py-4 space-y-2">
              {/* Guest Links */}
              {!isAuthenticated && (
                <>
                  <Link
                    to="/about"
                    className="flex items-center px-4 py-3 rounded-lg font-medium text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 mr-3" />
                    About
                  </Link>
                  
                  <Link
                    to="/explore"
                    className="flex items-center px-4 py-3 rounded-lg font-medium text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
                  >
                    <Sprout className="w-5 h-5 mr-3" />
                    Explore
                  </Link>

                  <Link
                    to="/vision"
                    className="flex items-center px-4 py-3 rounded-lg font-medium text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
                  >
                    <Lightbulb className="w-5 h-5 mr-3" />
                    Vision
                  </Link>
                </>
              )}

              {/* Authenticated Links */}
              {isAuthenticated && user && (
                <>
                  {getDashboardLink() && (
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center px-4 py-3 rounded-lg font-medium text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
                    >
                      {DashboardIcon && <DashboardIcon className="w-5 h-5 mr-3" />}
                      {getDashboardText()}
                    </Link>
                  )}
                  
                  <Link
                    to="/listings"
                    className="flex items-center px-4 py-3 rounded-lg font-medium text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5 mr-3" />
                    Marketplace
                  </Link>

                  <Link
                    to="/explore"
                    className="flex items-center px-4 py-3 rounded-lg font-medium text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
                  >
                    <Heart className="w-5 h-5 mr-3" />
                    Saved Farms
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 rounded-lg font-medium text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors"
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center w-full px-4 py-3 rounded-lg font-medium text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? (
                      <div className="w-5 h-5 border-2 border-forest-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                    ) : (
                      <LogOut className="w-5 h-5 mr-3" />
                    )}
                    {isLoggingOut ? 'Signing out...' : 'Logout'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
