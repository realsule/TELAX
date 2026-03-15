// --- FILE: src/pages/FarmGallery.jsx ---
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sprout, Droplets, Sun, MapPin, Users, Star, Heart, Filter, Search, Egg, Wheat, TreePine, Fish, Package } from 'lucide-react'

export function FarmGallery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const farms = [
    {
      id: 1,
      name: "Green Valley Poultry",
      category: "poultry",
      image: "/api/placeholder/400/300",
      description: "Specializing in free-range organic poultry and eggs, serving Nairobi's urban communities with fresh, ethically-raised poultry products.",
      processes: ["Free-range farming", "Organic feed", "Daily harvesting", "Quality certification"],
      relevance: "Provides urban consumers with fresh, locally-sourced protein while ensuring animal welfare and sustainable farming practices.",
      rating: 4.8,
      farmers: 3,
      location: "Nairobi, Kenya",
      icon: Egg
    },
    {
      id: 2,
      name: "HydroHarvest Solutions",
      category: "greenhouse",
      image: "/api/placeholder/400/300",
      description: "Innovative hydroponic farming using 90% less water than traditional agriculture, producing year-round fresh vegetables in urban environments.",
      processes: ["Water recycling", "Nutrient management", "LED lighting", "Vertical farming"],
      relevance: "Revolutionary approach to urban food security, enabling fresh produce production in limited spaces with minimal environmental impact.",
      rating: 4.9,
      farmers: 5,
      location: "Kisumu, Kenya",
      icon: Droplets
    },
    {
      id: 3,
      name: "Maize Masters Cooperative",
      category: "grain",
      image: "/api/placeholder/400/300",
      description: "Traditional grain farming combined with modern sustainable practices, providing staple foods to communities across Kenya.",
      processes: ["Crop rotation", "Organic pest control", "Sustainable irrigation", "Community farming"],
      relevance: "Essential for food security, providing affordable staple crops while implementing sustainable agricultural practices that preserve soil health.",
      rating: 4.7,
      farmers: 12,
      location: "Eldoret, Kenya",
      icon: Wheat
    },
    {
      id: 4,
      name: "Urban Veggie Haven",
      category: "vegetables",
      image: "/api/placeholder/400/300",
      description: "Rooftop and container farming in Nairobi's urban centers, delivering hyper-local produce within hours of harvesting.",
      processes: ["Container farming", "Composting", "Direct delivery", "Urban agriculture"],
      relevance: "Transforms unused urban spaces into productive farms, drastically reducing food miles and providing the freshest possible produce to city dwellers.",
      rating: 4.6,
      farmers: 8,
      location: "Nairobi, Kenya",
      icon: Sprout
    },
    {
      id: 5,
      name: "Dairy Dreams Farm",
      category: "dairy",
      image: "/api/placeholder/400/300",
      description: "Small-scale dairy farm specializing in organic milk, cheese, and yogurt products from pasture-raised cattle.",
      processes: ["Pasture grazing", "Organic certification", "Artisanal production", "Cold chain delivery"],
      relevance: "Brings high-quality, locally-produced dairy products to urban markets while supporting sustainable livestock management and rural livelihoods.",
      rating: 4.8,
      farmers: 4,
      location: "Nakuru, Kenya",
      icon: Package
    },
    {
      id: 6,
      name: "Fruit Paradise Estate",
      category: "fruits",
      image: "/api/placeholder/400/300",
      description: "Tropical fruit farm specializing in mangoes, avocados, and passion fruits using organic and regenerative farming methods.",
      processes: ["Regenerative agriculture", "Organic certification", "Export quality", "Fair trade practices"],
      relevance: "Provides nutrient-rich tropical fruits while implementing farming practices that improve soil health and biodiversity, supporting both local and export markets.",
      rating: 4.9,
      farmers: 6,
      location: "Mombasa, Kenya",
      icon: Sun
    },
    {
      id: 7,
      name: "Forest Grove Organics",
      category: "mushrooms",
      image: "/api/placeholder/400/300",
      description: "Specialty mushroom farm growing gourmet varieties in climate-controlled facilities for restaurants and home cooks.",
      processes: ["Spore cultivation", "Climate control", "Organic substrate", "Year-round harvesting"],
      relevance: "Provides high-value, protein-rich produce with minimal space requirements, perfect for urban farming and specialty markets.",
      rating: 4.7,
      farmers: 2,
      location: "Nairobi, Kenya",
      icon: TreePine
    },
    {
      id: 8,
      name: "Aquatic Harvest Systems",
      category: "aquaculture",
      image: "/api/placeholder/400/300",
      description: "Sustainable fish farming operation producing tilapia and catfish using recirculating aquaculture systems.",
      processes: ["Water filtration", "Sustainable feed", "Disease prevention", "Efficient harvesting"],
      relevance: "Addresses protein security through sustainable fish production, reducing pressure on wild fish stocks while providing fresh, locally-grown seafood.",
      rating: 4.6,
      farmers: 3,
      location: "Lake Victoria, Kenya",
      icon: Fish
    }
  ]

  const categories = [
    { id: 'all', name: 'All Farms', icon: Sprout },
    { id: 'poultry', name: 'Poultry', icon: Egg },
    { id: 'greenhouse', name: 'Greenhouse', icon: Droplets },
    { id: 'grain', name: 'Grain', icon: Wheat },
    { id: 'vegetables', name: 'Vegetables', icon: Sprout },
    { id: 'dairy', name: 'Dairy', icon: Package },
    { id: 'fruits', name: 'Fruits', icon: Sun },
    { id: 'mushrooms', name: 'Mushrooms', icon: TreePine },
    { id: 'aquaculture', name: 'Aquaculture', icon: Fish }
  ]

  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || farm.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category) => {
    const farm = farms.find(f => f.category === category)
    return farm ? farm.icon : Sprout
  }

  return (
    <div className="min-h-screen bg-tlx-pattern">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-forest-900 via-terracotta-900 to-sunlight-900 py-16">
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 animate-float opacity-20">
          <Sprout className="w-16 h-16 text-terracotta-400" />
        </div>
        <div className="absolute top-20 right-20 animate-float-delayed opacity-20">
          <Droplets className="w-12 h-12 text-forest-400" />
        </div>
        <div className="absolute bottom-10 right-1/4 animate-float opacity-20">
          <Sun className="w-14 h-14 text-sunlight-400" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Farm Gallery
          </h1>
          <p className="text-xl text-forest-200 max-w-3xl mx-auto mb-8">
            Discover the diverse agricultural practices and dedicated farmers 
            feeding our urban communities with fresh, sustainable produce.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-forest-400" />
            </div>
            <input
              type="text"
              placeholder="Search farms, products, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-forest-200 dark:border-forest-700 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-100 focus:ring-2 focus:ring-forest-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'border-forest-500 bg-forest-500 text-white shadow-lg'
                      : 'border-forest-200 dark:border-forest-700 bg-white dark:bg-forest-800 text-forest-700 dark:text-forest-300 hover:border-forest-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Farm Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFarms.map(farm => {
            const Icon = farm.icon
            return (
              <div key={farm.id} className="glass-card hover:shadow-xl transition-all duration-300 group">
                {/* Farm Image */}
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img 
                    src={farm.image} 
                    alt={farm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-forest-500 text-white text-sm font-medium rounded-full">
                      {farm.category}
                    </div>
                  </div>
                </div>

                {/* Farm Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Icon className="w-5 h-5 text-forest-600 dark:text-forest-400 mr-2" />
                        <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100 group-hover:text-forest-600 transition-colors">
                          {farm.name}
                        </h3>
                      </div>
                      <div className="flex items-center text-forest-600 dark:text-forest-300 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {farm.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-forest-700 dark:text-forest-300 font-medium">
                        {farm.rating}
                      </span>
                      <span className="text-forest-500 text-sm">
                        ({farm.farmers} farmers)
                      </span>
                    </div>
                  </div>

                  <p className="text-forest-600 dark:text-forest-300 text-sm leading-relaxed">
                    {farm.description}
                  </p>

                  {/* Farming Processes */}
                  <div>
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-3 flex items-center">
                      <Icon className="w-5 h-5 mr-2 text-forest-600 dark:text-forest-400" />
                      Farming Processes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {farm.processes.map((process, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-300 text-xs font-medium rounded-full"
                        >
                          {process}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Urban Food Security Relevance */}
                  <div className="p-4 bg-terracotta-50 dark:bg-terracotta-900/20 rounded-xl">
                    <h4 className="font-semibold text-forest-900 dark:text-forest-100 mb-2 text-sm">
                      Urban Food Security Impact
                    </h4>
                    <p className="text-forest-600 dark:text-forest-300 text-xs leading-relaxed">
                      {farm.relevance}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                      <Heart className="w-4 h-4" />
                      Save Farm
                    </button>
                    <button className="flex-1 btn-accent flex items-center justify-center gap-2">
                      <Sprout className="w-4 h-4" />
                      View Products
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredFarms.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-forest-100 dark:bg-forest-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-forest-400" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              No farms found
            </h3>
            <p className="text-forest-600 dark:text-forest-300 mb-8 max-w-md mx-auto">
              Try adjusting your search terms or browse all farms to discover local agricultural producers.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="btn-primary"
            >
              Browse All Farms
            </button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-forest-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Join Our Farming Community?
          </h2>
          <p className="text-xl text-forest-200 mb-8 max-w-2xl mx-auto">
            List your farm on TELAX and connect with thousands of urban consumers 
            looking for fresh, locally-grown produce.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn-accent bg-white text-forest-800 hover:bg-forest-50">
              <Sprout className="w-5 h-5 mr-2" />
              Register Your Farm
            </Link>
            <Link to="/about" className="btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
