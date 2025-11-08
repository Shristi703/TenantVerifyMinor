import { Navigate, useLocation } from 'react-router-dom'
import { USER_ROLES, ROUTES } from '../utils/constants'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'tenant' | 'landlord'
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation()
  const token = localStorage.getItem('authToken')
  const userRole = localStorage.getItem('userRole')

  // If not authenticated, redirect to login
  if (!token) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  // If role is required and doesn't match, redirect to appropriate dashboard
  if (requiredRole) {
    if (userRole !== requiredRole) {
      if (userRole === USER_ROLES.TENANT) {
        return <Navigate to={ROUTES.TENANT.DASHBOARD} replace />
      } else if (userRole === USER_ROLES.LANDLORD) {
        return <Navigate to={ROUTES.LANDLORD.DASHBOARD} replace />
      }
      return <Navigate to={ROUTES.HOME} replace />
    }
  }

  return <>{children}</>
}


