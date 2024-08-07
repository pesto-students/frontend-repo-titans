// Layout.jsx
import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

// Layout component that conditionally renders Navbar and Footer
const Layout = ({ children }) => {
  // Get the current path from the URL
  const location = useLocation()

  // Determine if the current path is for authentication pages
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      {/* Render Navbar only if not on authentication pages */}
      {!isAuthPage && <Navbar />}

      {/* Render the children components, which are the main routes */}
      {children}

      {/* Render Footer only if not on authentication pages */}
      {!isAuthPage && <Footer />}
    </>
  )
}

export default Layout
