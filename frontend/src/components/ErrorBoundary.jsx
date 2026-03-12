// --- FILE: src/components/ErrorBoundary.jsx ---
import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-50 via-terracotta-50 to-sunlight-50 dark:from-forest-900 dark:via-soil-900 dark:to-terracotta-900">
          <div className="glass-card p-8 max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-terracotta-100 dark:bg-terracotta-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-terracotta-600 dark:text-terracotta-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              Something went wrong
            </h1>
            
            <p className="text-forest-600 dark:text-forest-400 mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            
            <button
              onClick={() => window.location.reload()}
              className="btn-primary flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Page
            </button>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-forest-500 dark:text-forest-400 hover:text-forest-700 dark:hover:text-forest-300">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-forest-100 dark:bg-forest-800 rounded-lg text-xs overflow-auto text-forest-800 dark:text-forest-200">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
