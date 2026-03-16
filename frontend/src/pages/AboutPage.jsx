// --- FILE: src/pages/AboutPage.jsx ---
import { Link } from 'react-router-dom'
import { Sprout, Leaf, Users, ShoppingBag, BookOpen, Award, TrendingUp, Globe, Heart, Shield, Target, Zap, TreePine } from 'lucide-react'
import { TeamSection } from '../components/TeamSection'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-tlx-pattern">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-forest-900 via-forest-800 to-terracotta-900 py-20">
        {/* Floating Agricultural Elements */}
        <div className="absolute top-10 left-10 animate-float opacity-20">
          <Sprout className="w-16 h-16 text-terracotta-400" />
        </div>
        <div className="absolute top-20 right-20 animate-float-delayed opacity-20">
          <Leaf className="w-12 h-12 text-forest-400" />
        </div>
        <div className="absolute bottom-10 left-1/4 animate-float opacity-20">
          <Globe className="w-14 h-14 text-sunlight-400" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-terracotta-500 to-forest-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Sprout className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            About TELAX
          </h1>
          <p className="text-xl text-forest-200 max-w-3xl mx-auto mb-8">
            Teule Educational Leadership Agricultural Xperience - Bridging Urban Communities with Local Farms
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/explore" className="btn-accent bg-white text-forest-800 hover:bg-forest-50">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Explore Farms
            </Link>
            <Link to="/register" className="btn-primary">
              <Users className="w-5 h-5 mr-2" />
              Join Community
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Platform Purpose */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-3xl mx-auto">
              TELAX creates a seamless bridge between urban consumers and local agricultural producers, 
              fostering sustainable food systems and strengthening community connections.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-forest-100 dark:bg-forest-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-forest-600 dark:text-forest-400" />
              </div>
              <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-4">
                Community First
              </h3>
              <p className="text-forest-600 dark:text-forest-300">
                Building strong, lasting connections between farmers and urban communities 
                through transparent relationships and shared values.
              </p>
            </div>
            
            <div className="glass-card p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-terracotta-100 dark:bg-terracotta-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-terracotta-600 dark:text-terracotta-400" />
              </div>
              <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-4">
                Quality Assurance
              </h3>
              <p className="text-forest-600 dark:text-forest-300">
                Ensuring fresh, high-quality produce from verified local farms with 
                complete transparency in farming practices and sourcing.
              </p>
            </div>
            
            <div className="glass-card p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-sunlight-100 dark:bg-sunlight-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-sunlight-600 dark:text-sunlight-400" />
              </div>
              <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-4">
                Sustainable Growth
              </h3>
              <p className="text-forest-600 dark:text-forest-300">
                Supporting local agriculture and urban food security through 
                innovative technology and sustainable farming practices.
              </p>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-3xl mx-auto">
              Comprehensive tools designed for modern agricultural commerce and education.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Marketplace Feature */}
            <div className="glass-card p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-forest-500 to-forest-600 rounded-xl flex items-center justify-center mr-4">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100">
                  Marketplace
                </h3>
              </div>
              <p className="text-forest-600 dark:text-forest-300 mb-4">
                Direct-to-consumer sales platform connecting farmers with urban buyers. 
                Browse fresh produce, place orders, and support local agriculture.
              </p>
              <ul className="space-y-2 text-forest-600 dark:text-forest-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-forest-500 rounded-full mr-3"></div>
                  Real-time inventory management
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-forest-500 rounded-full mr-3"></div>
                  Secure payment processing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-forest-500 rounded-full mr-3"></div>
                  Order tracking and delivery
                </li>
              </ul>
            </div>

            {/* Education Feature */}
            <div className="glass-card p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-terracotta-500 to-terracotta-600 rounded-xl flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100">
                  Education
                </h3>
              </div>
              <p className="text-forest-600 dark:text-forest-300 mb-4">
                Agricultural knowledge sharing and best practices for sustainable farming.
                Learn from experienced farmers and agricultural experts.
              </p>
              <ul className="space-y-2 text-forest-600 dark:text-forest-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-terracotta-500 rounded-full mr-3"></div>
                  Farming techniques and guides
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-terracotta-500 rounded-full mr-3"></div>
                  Seasonal planting calendars
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-terracotta-500 rounded-full mr-3"></div>
                  Pest management resources
                </li>
              </ul>
            </div>

            {/* Exhibition Feature */}
            <div className="glass-card p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-sunlight-500 to-sunlight-600 rounded-xl flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100">
                  Exhibition
                </h3>
              </div>
              <p className="text-forest-600 dark:text-forest-300 mb-4">
                Showcase innovative farming practices and connect with agricultural community.
                Feature your farm and share your success stories.
              </p>
              <ul className="space-y-2 text-forest-600 dark:text-forest-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sunlight-500 rounded-full mr-3"></div>
                  Farm profiles and galleries
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sunlight-500 rounded-full mr-3"></div>
                  Success story features
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sunlight-500 rounded-full mr-3"></div>
                  Community events and workshops
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Web-Field Integration */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              Web-Field Integration
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-3xl mx-auto">
              How TELAX seamlessly connects digital platforms with real-world agricultural operations.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
                Digital Farm Management
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-forest-100 dark:bg-forest-800 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Zap className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Real-Time Inventory
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Farmers update inventory directly from the field using mobile devices, 
                      ensuring accurate availability for urban buyers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-terracotta-100 dark:bg-terracotta-800 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Target className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Smart Order Processing
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Automated order management that coordinates harvest schedules with 
                      urban demand patterns for optimal efficiency.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-sunlight-100 dark:bg-sunlight-800 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <TreePine className="w-4 h-4 text-sunlight-600 dark:text-sunlight-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Data-Driven Farming
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Analytics dashboard helps farmers understand market trends, 
                      optimize planting schedules, and maximize yields.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
                Urban Consumer Experience
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-forest-50 dark:bg-forest-800/50 rounded-xl">
                  <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-3">
                    Freshness Guarantee
                  </h4>
                  <p className="text-forest-600 dark:text-forest-300 mb-4">
                    Track your produce from farm to table with real-time updates 
                    on harvest, processing, and delivery status.
                  </p>
                  <div className="flex items-center text-forest-600 dark:text-forest-300">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-medium">Farm-to-table in under 24 hours</span>
                  </div>
                </div>
                
                <div className="p-6 bg-terracotta-50 dark:bg-terracotta-800/50 rounded-xl">
                  <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-3">
                    Seasonal Planning
                  </h4>
                  <p className="text-forest-600 dark:text-forest-300 mb-4">
                    Plan your meals around seasonal availability with 
                    predictive harvest calendars and pre-order options.
                  </p>
                  <div className="flex items-center text-forest-600 dark:text-forest-300">
                    <Calendar className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-medium">Know what's fresh, when it's fresh</span>
                  </div>
                </div>
                
                <div className="p-6 bg-sunlight-50 dark:bg-sunlight-800/50 rounded-xl">
                  <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-3">
                    Community Connection
                  </h4>
                  <p className="text-forest-600 dark:text-forest-300 mb-4">
                    Build relationships with local farmers through 
                    direct messaging, farm visits, and community events.
                  </p>
                  <div className="flex items-center text-forest-600 dark:text-forest-300">
                    <Users className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-medium">Know your farmer, know your food</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-3xl mx-auto">
              Measurable results in building sustainable urban food systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-2">
                500+
              </div>
              <p className="text-forest-600 dark:text-forest-300">
                Local Farmers Connected
              </p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <div className="text-4xl font-bold text-terracotta-600 dark:text-terracotta-400 mb-2">
                50,000+
              </div>
              <p className="text-forest-600 dark:text-forest-300">
                Urban Consumers Served
              </p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <div className="text-4xl font-bold text-sunlight-600 dark:text-sunlight-400 mb-2">
                85%
              </div>
              <p className="text-forest-600 dark:text-forest-300">
                Reduction in Food Miles
              </p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                40%
              </div>
              <p className="text-forest-600 dark:text-forest-300">
                Income Increase for Farmers
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-forest-900 dark:text-forest-100 mb-6">
              Join the Agricultural Revolution
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 mb-8 max-w-2xl mx-auto">
              Whether you're a farmer looking to expand your reach or a consumer 
              seeking fresh, local produce, TELAX is your platform for growth and connection.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                <Users className="w-6 h-6 mr-2" />
                Get Started Today
              </Link>
              <Link to="/explore" className="btn-accent text-lg px-8 py-4">
                <Sprout className="w-6 h-6 mr-2" />
                Explore Farms
              </Link>
            </div>
            
            <div className="mt-8 p-6 bg-forest-50 dark:bg-forest-800/50 rounded-xl">
              <p className="text-forest-700 dark:text-forest-300 font-medium">
                <strong>TELAX:</strong> Teule Educational Leadership Agricultural Xperience
              </p>
              <p className="text-forest-600 dark:text-forest-300 text-sm mt-2">
                Connecting communities, supporting farmers, and building sustainable urban food systems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <TeamSection />
    </div>
  )
}
