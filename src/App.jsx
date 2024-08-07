import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/GymUserPages/LandingPage'
import Home from './Pages/GymUserPages/Home'
import SearchPage from './Pages/GymUserPages/SearchPage'
import Bookings from './Pages/GymUserPages/Bookings'
import Login from './Pages/GymUserPages/Login'
import Register from './Pages/GymUserPages/Register'
import Layout from './components/Layout'
import GymDetails from './Pages/GymUserPages/GymDetails'
import PageNotFound from './Pages/Error/PageNotFound'

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
              </Routes>
            </Layout>
        }
      />
    </Routes>
  )
}

export default App
