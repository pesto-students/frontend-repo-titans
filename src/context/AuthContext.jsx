import React, { createContext, useContext, useState, useEffect } from 'react'
import { isAuthenticated } from '../utils/auth' // Function to check JWT in cookies
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null)

  useEffect(() => {
    // Initialize authentication state
    setAuthState(isAuthenticated())
  }, [])

  // Method to manually update authentication state
  const refreshAuthState = () => {
    setAuthState(isAuthenticated())
  }

  return (
    <AuthContext.Provider value={{ authState, refreshAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node
}
