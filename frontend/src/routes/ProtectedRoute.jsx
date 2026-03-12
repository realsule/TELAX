import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { UserRoles } from '../store/authSlice'

/**
 * ProtectedRoute
 *
 * - Guards routes based on authentication and role.
 * - `allowedRoles` is an array of roles that can access the nested routes.
 */
export function ProtectedRoute({ allowedRoles }) {
  const { accessToken, role } = useSelector((state) => state.auth)

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Later this could redirect to a role-specific default dashboard.
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

