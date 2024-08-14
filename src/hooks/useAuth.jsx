import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAuth = () => {
  const { isAuthenticated, refreshAuthState, user, updateUserState, login, logout } =
    useContext(AuthContext)
  return { isAuthenticated, refreshAuthState, user, updateUserState, login, logout }
}

export default useAuth
