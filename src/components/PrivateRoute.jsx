import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

const PrivateRoute = ({ element }) => {
  const location = useLocation()

  return isAuthenticated() ? (
    element
  ) : (
    // Redirect to login page with the current location
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default PrivateRoute
