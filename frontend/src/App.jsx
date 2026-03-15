import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './App.css'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { UserRoles } from './store/authSlice'
import { ModernAgriDashboard } from './components/ModernAgriDashboard'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Listings } from './pages/Listings'
import { FarmerDashboard } from './pages/FarmerDashboard'
import { BuyerDashboard } from './pages/BuyerDashboard'
import { AdminDashboard } from './pages/AdminDashboard'
import { AdminLogin } from './pages/AdminLogin'
import { Profile } from './pages/Profile'
import { ThemeToggle } from './components/ThemeToggle'

function App() {
  const [isDark, setIsDark] = useState(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Dark mode toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
      </div>

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/admin-secure-portal" element={<AdminLogin />} />
        <Route path="/unauthorized" element={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-50 via-terracotta-50 to-sunlight-50 dark:from-forest-900 dark:via-soil-900 dark:to-terracotta-900">
            <div className="card-organic max-w-md mx-auto text-center">
              <h1 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-4">Unauthorized Access</h1>
              <p className="text-forest-700 dark:text-forest-300 mb-6">You don't have permission to access this page.</p>
              <button 
                onClick={() => window.history.back()}
                className="btn-primary"
              >
                Go Back
              </button>
            </div>
          </div>
        } />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Farmer dashboard: Produce Management */}
        <Route element={<ProtectedRoute allowedRoles={[UserRoles.FARMER]} />}>
          <Route path="/farmer" element={<FarmerDashboard />} />
        </Route>

        {/* School/Student dashboard: Project Sourcing + Educational Leader portal */}
        <Route element={<ProtectedRoute allowedRoles={[UserRoles.BUYER]} />}>
          <Route path="/school" element={<BuyerDashboard />} />
          <Route path="/community" element={<BuyerDashboard />} />
        </Route>

        {/* Admin dashboard: System monitoring */}
        <Route element={<ProtectedRoute allowedRoles={[UserRoles.SUPER_ADMIN]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Legacy dashboard route - redirects based on role */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<ModernAgriDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
