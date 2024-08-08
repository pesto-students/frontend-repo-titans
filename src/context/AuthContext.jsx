import React, { createContext, useContext, useState, useEffect } from 'react'
import { isAuthenticated } from '../utils/auth' // Function to check JWT in cookies

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

export const useAuthContext = () => useContext(AuthContext)
