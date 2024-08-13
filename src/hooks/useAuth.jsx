import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAuth = () => {
  const { isAuthenticated, refreshAuthState, user, updateUserState } =
    useContext(AuthContext)
  return { isAuthenticated, refreshAuthState, user, updateUserState }
}

export default useAuth
