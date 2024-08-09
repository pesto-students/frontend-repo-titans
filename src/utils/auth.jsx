// Function to check if the user is authenticated
// Helper function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

// Function to delete a cookie by name, without specifying the path
export const deleteCookie = (name = 'token') => {
  // Set the cookie with the same name and an expired date
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`
}

// VALIDATION IF USER IS SIGNED IN
export const getAuthToken = () => {
  // Checking if the code is running in the browser
  if (typeof window === 'undefined') {
    return false
  }

  // Get Auth token from cookies
  const auth_token = getCookie('token')

  if (auth_token) {
    return auth_token
  }

  return false
}
