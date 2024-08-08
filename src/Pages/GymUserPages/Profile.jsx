import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../config.js'
import useAuth from '../../hooks/useAuth' // Custom hook for authentication

const Profile = () => {
  const { authState } = useAuth() // Get authentication state
  const headers = {
    Authorization: `Bearer ${authState}`, // Include the token in headers
  }

  console.log('Authorization: ', authState)

  const checkUser = async () => {
    try {
      const response = await axios.post(
        `${config.BASE_BACKEND_URL}/user`,
        {},
        {
          headers: {
            authorization: `Bearer ${authState}`,
          },
          withCredentials: true,
        }
      )

      console.log(response)

      // Handle successful login
      if (response.status === 200) {
        // Redirect the user to the home page or dashboard
        // After successful login, refresh authentication state
        console.log('DOne done')
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <>
      <div>Profile page is working</div>
      <button onClick={checkUser} type='button'>
        check
      </button>
    </>
  )
}

export default Profile
