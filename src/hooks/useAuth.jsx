import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAuth = () => {
  const { isAuthenticated, refreshAuthState } = useContext(AuthContext)
  return { isAuthenticated, refreshAuthState }
}

export default useAuth
