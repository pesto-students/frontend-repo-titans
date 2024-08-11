import React, { createContext, useState, useEffect } from 'react'
import { getAuthToken } from '../utils/auth' // Function to check JWT in cookies
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthState] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Initialize authentication state
    setAuthState(getAuthToken())
  }, [])

  // Method to manually update authentication state
  const refreshAuthState = () => {
    setAuthState(getAuthToken())
  }

  // TODO: merge token and userdata from cookie
  const updateUserState = (userData) => {
    setUser(userData)
  }

  console.log('AuthContext user data : ', user)

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, refreshAuthState, user, updateUserState }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node
}
