import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAuth = () => {
  const { authState, refreshAuthState } = useContext(AuthContext)
  return { authState, refreshAuthState }
}

export default useAuth
