// --- FILE: src/pages/Home.jsx ---
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Sprout, Users, ShoppingBag, TrendingUp, Star, ArrowRight, Sun, Cloud, Droplets, Flame } from 'lucide-react'
import { ListingCard } from '../components/ListingCard'
import { verifyToken } from '../store/authSlice'

export function Home() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const [featuredListings, setFeaturedListings] = useState([])
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalProducts: 0,
    happyCustomers: 0,
    avgRating: 0
  })
  const [interestCount, setInterestCount] = useState(142)
  const [isLoadingInterest, setIsLoadingInterest] = useState(false)

  // API functions for interest counter
  const fetchInterestCount = async () => {
    try {
      const response = await fetch('/api/interest/count')
      const data = await response.json()
      if (response.ok) {
        setInterestCount(data.count)
      }
    } catch (error) {
      console.error('Failed to fetch interest count:', error)
    }
  }

  const incrementInterestCount = async () => {
    setIsLoadingInterest(true)
    try {
      const response = await fetch('/api/interest/count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      if (response.ok) {
        setInterestCount(data.count)
        // Redirect to register page after incrementing
        window.location.href = '/register'
      }
    } catch (error) {
      console.error('Failed to increment interest count:', error)
      // Still redirect even if API fails
      window.location.href = '/register'
    } finally {
      setIsLoadingInterest(false)
    }
  }

  useEffect(() => {
    // Verify token if authenticated
    if (isAuthenticated) {
      dispatch(verifyToken())
    }

    // Fetch interest count
    fetchInterestCount()

    // Load featured listings (mock data for now)
    setFeaturedListings([
      {
        id: 1,
        title: 'Organic Tomatoes',
        description: 'Fresh, vine-ripened organic tomatoes grown with love',
        price: 4.99,
        unit: 'kg',
        farmer: 'John\'s Organic Farm',
        image: '/api/placeholder/300/200',
        rating: 4.8,
        reviews: 124,
        category: 'vegetables',
        location: 'Kibra, Nairobi',
        featured: true,
        isOrganic: true
      },
      {
        id: 2,
        title: 'Free-Range Eggs',
        description: 'Farm-fresh eggs from happy, free-range chickens',
        price: 6.99,
        unit: 'dozen',
        farmer: 'Sunny Side Farm',
        image: '/api/placeholder/300/200',
        rating: 4.9,
        reviews: 89,
        category: 'dairy',
        location: 'Kawangware, Nairobi',
        featured: false,
        isOrganic: true
      },
      {
        id: 3,
        title: 'Local Honey',
        description: 'Pure, raw honey from local wildflowers',
        price: 12.99,
        unit: 'jar',
        farmer: 'Meadow Sweet Apiary',
        image: '/api/placeholder/300/200',
        rating: 5.0,
        reviews: 67,
        category: 'pantry',
        location: 'Langata, Nairobi',
        featured: false,
        isOrganic: true
      }
    ])

    // Load stats (mock data)
    setStats({
      totalFarmers: 150,
      totalProducts: 500,
      happyCustomers: 2500,
      avgRating: 4.7
    })
  }, [isAuthenticated, dispatch])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 animate-float">
            <Sun className="w-16 h-16 text-yellow-300 opacity-60" />
          </div>
          <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
            <Cloud className="w-20 h-20 text-white opacity-40" />
          </div>
          <div className="absolute bottom-10 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
            <Droplets className="w-12 h-12 text-blue-300 opacity-50" />
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            TELAX
          </h1>
          <p className="hero-subtitle">
            Connecting Local Farmers Directly to Schools, Students & Communities
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <>
                <Link 
                  to={user?.role === 'farmer' ? '/farmer' : '/school'}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  to="/listings"
                  className="btn-accent text-lg px-8 py-4"
                >
                  Browse Products
                  <ShoppingBag className="ml-2 w-5 h-5" />
                </Link>
              </>
            ) : (
              <>
                {/* Prominent Register Button with Live Counter */}
                <button
                  onClick={incrementInterestCount}
                  disabled={isLoadingInterest}
                  className="relative group bg-gradient-to-r from-forest-500 to-terracotta-500 hover:from-forest-600 hover:to-terracotta-600 text-white text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-white/20 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    {isLoadingInterest ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Sprout className="w-6 h-6" />
                    )}
                    <span>Register if Interested</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                  
                  {/* Live Counter Badge */}
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                    <Flame className="w-3 h-3" />
                    <span>{interestCount} interested</span>
                  </div>
                  
                  {/* Glassmorphism overlay effect */}
                  <div className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                </button>
                
                <Link 
                  to="/listings"
                  className="btn-accent text-lg px-8 py-4"
                >
                  Browse Products
                  <ShoppingBag className="ml-2 w-5 h-5" />
                </Link>
              </>
            )}
          </div>
          
          {/* Interest Count Display Below Button */}
          {!isAuthenticated && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-forest-800/80 backdrop-blur-sm rounded-full border border-forest-200 dark:border-forest-700">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-forest-700 dark:text-forest-300">
                  🔥 {interestCount} people have shown interest!
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-forest-50 to-terracotta-50 dark:from-forest-800 dark:to-terracotta-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-200 dark:bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-forest-600 dark:text-forest-300" />
              </div>
              <h3 className="text-3xl font-bold text-forest-900 dark:text-forest-100">{stats.totalFarmers}+</h3>
              <p className="text-forest-600 dark:text-forest-300">Local Farmers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta-200 dark:bg-terracotta-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-terracotta-600 dark:text-terracotta-300" />
              </div>
              <h3 className="text-3xl font-bold text-forest-900 dark:text-forest-100">{stats.totalProducts}+</h3>
              <p className="text-forest-600 dark:text-forest-300">Fresh Products</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sunlight-200 dark:bg-sunlight-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-sunlight-600 dark:text-sunlight-300" />
              </div>
              <h3 className="text-3xl font-bold text-forest-900 dark:text-forest-100">{stats.happyCustomers}+</h3>
              <p className="text-forest-600 dark:text-forest-300">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-soil-200 dark:bg-soil-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-soil-600 dark:text-soil-300" />
              </div>
              <h3 className="text-3xl font-bold text-forest-900 dark:text-forest-100">{stats.avgRating}</h3>
              <p className="text-forest-600 dark:text-forest-300">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-2xl mx-auto">
              Discover the finest fresh produce directly from local farmers in your community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((product, index) => (
              <div key={product.id} className="scroll-grow" style={{ animationDelay: `${index * 0.1}s` }}>
                <ListingCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/listings"
              className="btn-secondary text-lg px-8 py-4"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gradient-to-l from-terracotta-50 to-sunlight-50 dark:from-terracotta-800 dark:to-sunlight-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              How TELAX Works
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-2xl mx-auto">
              Simple, direct connections between farmers and their communities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-forest-200 dark:bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-10 h-10 text-forest-600 dark:text-forest-300" />
              </div>
              <h3 className="text-xl font-semibold text-forest-900 dark:text-forest-100 mb-2">
                Farmers List Products
              </h3>
              <p className="text-forest-600 dark:text-forest-300">
                Local farmers easily list their fresh produce with photos and descriptions
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-terracotta-200 dark:bg-terracotta-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-terracotta-600 dark:text-terracotta-300" />
              </div>
              <h3 className="text-xl font-semibold text-forest-900 dark:text-forest-100 mb-2">
                Schools & Communities Shop
              </h3>
              <p className="text-forest-600 dark:text-forest-300">
                Educational institutions and community members browse and order directly
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-sunlight-200 dark:bg-sunlight-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-sunlight-600 dark:text-sunlight-300" />
              </div>
              <h3 className="text-xl font-semibold text-forest-900 dark:text-forest-100 mb-2">
                Fresh Delivery
              </h3>
              <p className="text-forest-600 dark:text-forest-300">
                Direct delivery ensures maximum freshness and supports local economy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-forest-500 to-terracotta-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Join the Agricultural Revolution?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Whether you're a farmer looking to reach more customers or a community member seeking fresh, local produce, TELAX connects you directly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register"
              className="bg-white text-forest-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Join as Farmer
            </Link>
            <Link 
              to="/register"
              className="bg-forest-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-forest-700 transition-colors duration-200"
            >
              Join as Buyer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
