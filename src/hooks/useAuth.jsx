import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAuth = () => {
  const { isAuthenticated, user, login, logout } =
    useContext(AuthContext)
  return { isAuthenticated, user, login, logout }
}

export default useAuth
