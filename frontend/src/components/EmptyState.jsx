// --- FILE: src/components/EmptyState.jsx ---
import React from 'react'
import { Package, Users, ShoppingCart, AlertCircle } from 'lucide-react'

export function EmptyState({ 
  icon = Package, 
  title = 'No data found', 
  description = 'There\'s nothing to show here yet.',
  action = null 
}) {
  const IconComponent = icon

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <IconComponent className="w-full h-full" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-text">{description}</p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}

// Pre-configured empty states
export function EmptyProducts() {
  return (
    <EmptyState
      icon={Package}
      title="No products available"
      description="There are no products matching your criteria. Try adjusting your filters or check back later."
      action={
        <button className="btn-primary">
          Browse All Products
        </button>
      }
    />
  )
}

export function EmptyOrders() {
  return (
    <EmptyState
      icon={ShoppingCart}
      title="No orders yet"
      description="You haven't placed any orders yet. Start browsing products to make your first purchase."
      action={
        <button className="btn-primary">
          Browse Products
        </button>
      }
    />
  )
}

export function EmptyUsers() {
  return (
    <EmptyState
      icon={Users}
      title="No users found"
      description="There are no users to display. This could be due to filters or no users in the system yet."
    />
  )
}

export function EmptySearch() {
  return (
    <EmptyState
      icon={AlertCircle}
      title="No results found"
      description="We couldn't find anything matching your search. Try different keywords or browse categories."
      action={
        <button className="btn-secondary">
          Clear Search
        </button>
      }
    />
  )
}
