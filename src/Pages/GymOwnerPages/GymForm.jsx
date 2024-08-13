import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import GymForm1 from '../../components/GymForm/GymForm1'
import GymForm2 from '../../components/GymForm/GymForm2'
import config from '../../config.js'
import useAuth from '../../hooks/useAuth'


const GymForm = () => {
  // State to track which form is currently displayed
  const [currentForm, setCurrentForm] = useState('form1')
  const [formData1, setFormData1] = useState({})
  const [formData2, setFormData2] = useState({})
  const { isAuthenticated } = useAuth();

  // Function to handle form submission and transition to next form
  const handleForm1Submit = (data) => {
    setFormData1(data) // Store form1 data
    setCurrentForm('form2') // Transition to form2
  }

  // Function to handle form2 submission
  const handleForm2Submit = async (data) => {
    setFormData2(data) // Store form2 data

    try {
      // Combine formData from form1 with form2 data
      const combinedData = { ...formData1, ...data }

      console.log("isAuthenticated for gym form : " + isAuthenticated);
      console.log(combinedData);


      const response = await axios.post(
        `${config.BASE_BACKEND_URL}/gyms/onboarding`,
        {
          combinedData: combinedData
        },
        {
          headers: {
            Authorization: `Bearer ${isAuthenticated}`,
          },
          withCredentials: true,
        }
      )

      console.log("response : " + response);


      toast.success('Your details saved successfully')
    } catch (error) {
      toast.error('Failed to save details')
    }
  }

  // Function to handle navigation back to form1
  const handlePrevious = (data) => {
    setFormData2(data)
    setCurrentForm('form1') // Transition back to form1
  }

  return (
    <div>
      {currentForm === 'form1' && (
        <GymForm1 onSubmit={handleForm1Submit} initialData={formData1} />
      )}
      {currentForm === 'form2' && (
        <GymForm2
          onSubmit={handleForm2Submit}
          initialData={formData2}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  )
}

export default GymForm
