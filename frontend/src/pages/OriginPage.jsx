// --- FILE: src/pages/OriginPage.jsx ---
import { Link } from 'react-router-dom'
import { Sprout, Leaf, Heart, Lightbulb, Target, Users, ArrowRight, Globe, Award, TrendingUp, AlertTriangle, Zap, TreePine } from 'lucide-react'

export function OriginPage() {
  return (
    <div className="min-h-screen bg-tlx-pattern">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-forest-900 via-terracotta-900 to-sunlight-900 py-20">
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 animate-float opacity-20">
          <Lightbulb className="w-16 h-16 text-terracotta-400" />
        </div>
        <div className="absolute top-20 right-20 animate-float-delayed opacity-20">
          <Heart className="w-12 h-12 text-forest-400" />
        </div>
        <div className="absolute bottom-10 left-1/4 animate-float opacity-20">
          <Globe className="w-14 h-14 text-sunlight-400" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-terracotta-500 to-forest-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Lightbulb className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            The Origin Story
          </h1>
          <p className="text-xl text-forest-200 max-w-3xl mx-auto mb-8">
            Why TELAX? Because every city deserves fresh food, and every farmer deserves direct access to their community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about" className="btn-accent bg-white text-forest-800 hover:bg-forest-50">
              <Award className="w-5 h-5 mr-2" />
              Learn More
            </Link>
            <Link to="/register" className="btn-primary">
              <Users className="w-5 h-5 mr-2" />
              Join the Mission
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* The Problem */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              The Challenge We're Solving
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-3xl mx-auto">
              In our rapidly urbanizing world, the connection between food producers and consumers has never been more broken.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-4">
                Growing Urban Food Deserts
              </h3>
              <p className="text-forest-600 dark:text-forest-300">
                Cities expanding into agricultural land, reducing access to fresh, 
                locally-grown produce for millions of urban residents.
              </p>
            </div>
            
            <div className="glass-card p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-4">
                Farmer Income Crisis
              </h3>
              <p className="text-forest-600 dark:text-forest-300">
                Small farmers struggling with market access, middlemen taking 
                up to 70% of final retail prices.
              </p>
            </div>
            
            <div className="glass-card p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-4">
                Environmental Impact
              </h3>
              <p className="text-forest-600 dark:text-forest-300">
                Long supply chains creating massive carbon footprint and 
                food waste during transportation.
              </p>
            </div>
          </div>
        </div>

        {/* The Vision */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              Our Vision: Reconnecting Communities
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-3xl mx-auto">
              TELAX was born from a simple belief: technology should bring us closer to our food, not further away.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
                For Urban Communities
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-forest-100 dark:bg-forest-800 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Heart className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Fresh Food Access
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Direct access to farm-fresh produce, eliminating 
                      complex supply chains and reducing costs by 30-40%.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-terracotta-100 dark:bg-terracotta-800 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Target className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Food Security
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Building resilient local food systems that can 
                      withstand global supply chain disruptions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-sunlight-100 dark:bg-sunlight-800 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Award className="w-4 h-4 text-sunlight-600 dark:text-sunlight-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Community Connection
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Knowing who grows your food and building 
                      relationships with local producers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
                For Farmers
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-forest-100 dark:bg-forest-800 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <TrendingUp className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Fair Pricing
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Farmers receive 60-80% of retail price, 
                      compared to 30% in traditional markets.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-terracotta-100 dark:bg-terracotta-800 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Users className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Direct Market Access
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Immediate access to thousands of urban consumers 
                      without relying on middlemen or distributors.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-sunlight-100 dark:bg-sunlight-800 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Lightbulb className="w-4 h-4 text-sunlight-600 dark:text-sunlight-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Technology Integration
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Modern tools for inventory management, 
                      order processing, and business analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              How TELAX Bridges the Gap
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-3xl mx-auto">
              Our platform creates a direct, transparent, and efficient marketplace that benefits everyone in the food ecosystem.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-forest-500 to-forest-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-forest-900 dark:text-forest-100 mb-3">
                Direct Connection
              </h3>
              <p className="text-forest-600 dark:text-forest-300 text-sm">
                Farmers connect directly with consumers, 
                eliminating unnecessary intermediaries.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-terracotta-500 to-terracotta-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-forest-900 dark:text-forest-100 mb-3">
                Trust & Transparency
              </h3>
              <p className="text-forest-600 dark:text-forest-300 text-sm">
                Verified farms, transparent pricing, and 
                real-time availability updates.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-sunlight-500 to-sunlight-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-forest-900 dark:text-forest-100 mb-3">
                Urban Food Security
              </h3>
              <p className="text-forest-600 dark:text-forest-300 text-sm">
                Reducing food miles and building 
                resilient local food systems.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-forest-900 dark:text-forest-100 mb-3">
                Sustainable Growth
              </h3>
              <p className="text-forest-600 dark:text-forest-300 text-sm">
                Supporting farming practices that protect 
                our environment for future generations.
              </p>
            </div>
          </div>
        </div>

        {/* Urban Agriculturalist Focus */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              Empowering Urban Agriculturalists
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-3xl mx-auto">
              TELAX specifically addresses the unique challenges faced by farmers working in and around urban centers.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
                Urban Farming Challenges
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Limited Space
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Urban farmers work with smaller plots, rooftops, and vertical spaces, 
                      requiring innovative growing methods.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Higher Costs
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Urban land prices, water costs, and specialized equipment 
                      create financial barriers for urban farmers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2">
                      Market Access
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300">
                      Difficulty reaching customers directly and competing 
                      with large-scale industrial agriculture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
                TELAX Solutions
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-green-600" />
                    Technology-Enabled Efficiency
                  </h4>
                  <p className="text-forest-600 dark:text-forest-300 mb-4">
                    Digital tools help urban farmers maximize limited space 
                    through precision agriculture and automated management.
                  </p>
                  <div className="flex items-center text-forest-600 dark:text-forest-300">
                    <TreePine className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-medium">Grow more in less space</span>
                  </div>
                </div>
                
                <div className="p-6 bg-terracotta-50 dark:bg-terracotta-800/50 rounded-xl">
                  <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-terracotta-600" />
                    Direct Consumer Relationships
                  </h4>
                  <p className="text-forest-600 dark:text-forest-300 mb-4">
                    Build loyal customer bases through transparent operations 
                    and community engagement features.
                  </p>
                  <div className="flex items-center text-forest-600 dark:text-forest-300">
                    <Users className="w-5 h-5 mr-2 text-terracotta-600" />
                    <span className="font-medium">Community-supported agriculture</span>
                  </div>
                </div>
                
                <div className="p-6 bg-sunlight-50 dark:bg-sunlight-800/50 rounded-xl">
                  <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-sunlight-600" />
                    Premium Pricing Support
                  </h4>
                  <p className="text-forest-600 dark:text-forest-300 mb-4">
                    Connect urban farmers with consumers willing to pay premium 
                    prices for fresh, locally-grown, specialty produce.
                  </p>
                  <div className="flex items-center text-forest-600 dark:text-forest-300">
                    <Award className="w-5 h-5 mr-2 text-sunlight-600" />
                    <span className="font-medium">Fair value for quality produce</span>
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
              Our Growing Impact
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 max-w-3xl mx-auto">
              Together, we're building a more sustainable and equitable food future.
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

        {/* Join the Movement */}
        <div className="text-center">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-forest-900 dark:text-forest-100 mb-6">
              Be Part of the Solution
            </h2>
            <p className="text-xl text-forest-600 dark:text-forest-300 mb-8 max-w-2xl mx-auto">
              Whether you're a farmer looking to reach more customers or a consumer 
              seeking fresh, local produce, your participation strengthens our entire food ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                <Users className="w-6 h-6 mr-2" />
                Join TELAX Today
              </Link>
              <Link to="/farm-gallery" className="btn-accent text-lg px-8 py-4">
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
    </div>
  )
}
