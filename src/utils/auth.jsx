// // Function to check if the user is authenticated
// // Helper function to get a cookie by name
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`
//   const parts = value.split(`; ${name}=`)
//   if (parts.length === 2) return parts.pop().split(';').shift()
// }

// VALIDATION IF USER IS SIGNED IN
export const getAuthToken = () => {

  const auth_token = localStorage.getItem('auth_token');

  if (auth_token) return auth_token;

  return false;
}
