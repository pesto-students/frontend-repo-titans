import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './Pages/GymUserPages/LandingPage'
import Home from './Pages/GymUserPages/Home'
import SearchPage from './Pages/GymUserPages/SearchPage'
import Bookings from './Pages/GymUserPages/Bookings'
import Login from './Pages/GymUserPages/Login'
import Register from './Pages/GymUserPages/Register'
import Layout from './components/Layout'

// Main application component
function App() {
  const location = useLocation()
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register'
  return (
    <Routes>
      {/* 
        The `path="*"` route matches any path that is not explicitly defined.
        This ensures that the Layout component wraps all routes.
      */}
      <Route
        path='*'
        element={
          <Layout>
            {/* Define the application's routes */}
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/home' element={<Home />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/bookings' element={<Bookings />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
