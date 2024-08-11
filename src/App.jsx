import './App.css'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import LandingPage from './Pages/GymUserPages/LandingPage'
import Home from './Pages/GymUserPages/Home'
import SearchPage from './Pages/GymUserPages/SearchPage'
import Bookings from './Pages/GymUserPages/Bookings'
import Login from './Pages/GymUserPages/Login'
import Register from './Pages/GymUserPages/Register'
import GymDetails from './Pages/GymUserPages/GymDetails'
import PageNotFound from './Pages/Error/PageNotFound'
import Profile from './Pages/GymUserPages/Profile'
import OwnerSignup from './Pages/GymOwnerPages/OwnerSignup'
import OwnerLogin from './Pages/GymOwnerPages/OwnerLogin'

// Main application component
function App() {
  return (
    <Routes>
      <Route
        path='*'
        element={
          <Layout>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/home' element={<Home />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/bookings' element={<Bookings />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/gymDetails' element={<GymDetails />} />
              <Route path='*' element={<PageNotFound />} />
              <Route
                path='/user'
                element={<PrivateRoute element={<Profile />} />}
              />
              {/* Owner's Routes */}
              <Route path='/owner/register' element={<OwnerSignup />} />
              <Route path='/owner/login' element={<OwnerLogin />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
