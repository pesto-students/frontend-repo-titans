import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import config from '../../config.js'
import useAuth from '../../hooks/useAuth' // Custom hook for authentication
import profile_img from '../../assets/svg/profile.svg'
import ChangePasswordModal from '../../components/ChangePasswordModal.jsx'
import { toast } from 'react-toastify'

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { isAuthenticated } = useAuth()
  const [image, setImage] = useState(profile_img)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeButton, setActiveButton] = useState('Early Morning')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)

      // Create a URL for previewing the image
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)

      // Optionally, upload the file to the server
      // uploadImage(file)
    }
  }

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      // Replace with your actual upload URL
      const response = await axios.post('YOUR_UPLOAD_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Handle successful upload response
      console.log('Image uploaded:', response.data)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const deleteImage = () => {
    setImage(profile_img) // Reset to default image
    setSelectedFile(null) // Clear selected file
  }

  // RestPassword Modal
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const preferredTimings = ['Early Morning', 'Morning', 'Afternoon', 'Evening']

  console.log('Authorization: ', isAuthenticated)

  const onSubmit = async (data) => {
    console.log(data)

    try {
      const response = await axios.post(
        `${config.BASE_BACKEND_URL}/user`,
        {
          ...data, // Spread the form data
          preferredTiming: activeButton, // Add preferredTiming to request payload
        },
        {
          headers: {
            authorization: `Bearer ${isAuthenticated}`,
          },
          withCredentials: true,
        }
      )

      console.log(response)

      // Handle successful login
      if (response.status === 200) {
        // Redirect the user to the home page or dashboard
        // After successful login, refresh authentication state
        toast.error('Your details saved successfully')
      }
    } catch (error) {
      console.error('Error while saving user details:', error)

      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data

        if (errors.global) {
          toast.error(errors.global)
        }
      }
    }
  }

  return (
    <div className='flex items-center justify-center bg-wwbg text-white mt-4 md:my-12'>
      <div className='w-full max-w-2xl bg-wwbg shadow-lg p-8'>
        <h2 className='text-3xl text-center font-semibold mb-8'>
          Account Settings
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='flex justify-center items-center mb-4 space-x-6'>
            <div className='flex justify-center'>
              <div className='relative'>
                <img
                  src={image}
                  alt='Profile'
                  className='w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-red-700'
                />
                <input
                  type='file'
                  id='fileInput'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='absolute inset-0 opacity-0 cursor-pointer'
                />
              </div>
            </div>
            <div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
              <label
                htmlFor='fileInput'
                className='px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Change Picture
              </label>
              <button
                type='button'
                onClick={deleteImage}
                className='px-4 bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center border border-wwred'
              >
                Delete Picture
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='mb-4'>
              <label
                className='block text-sm font-medium mb-1 wwred'
                htmlFor='fullName'
              >
                Full Name<span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='fullName'
                defaultValue='Stephen Max'
                {...register('fullName', {
                  required: 'Full Name is required',
                  minLength: {
                    value: 3,
                    message: 'Full name must be at least 3 characters',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Full name must be less than 50 characters',
                  },
                })}
                className={`w-full px-3 py-2 border ${
                  errors.fullName ? 'border-red-500' : 'border-gray-600'
                } bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              {errors.fullName && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className='mb-4'>
              <label
                className='block text-sm font-medium mb-1 wwred'
                htmlFor='email'
              >
                Email Address<span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                id='email'
                defaultValue='stephen@workoutwings.com'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                placeholder='abc@example.com'
                className={`w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                } bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className='mb-4'>
              <label
                className='block text-sm font-medium mb-1 wwred'
                htmlFor='age'
              >
                Age
              </label>
              <input
                type='number'
                id='age'
                defaultValue='31'
                {...register('age', {
                  required: 'Age is required',
                  min: {
                    value: 18,
                    message: 'You must be at least 18 years old',
                  },
                  max: {
                    value: 100,
                    message: 'Age must be less than 120 years',
                  },
                })}
                className={`w-full px-3 py-2 border ${
                  errors.age ? 'border-red-500' : 'border-gray-600'
                } bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              {errors.age && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.age.message}
                </p>
              )}
            </div>

            <div className='mb-4'>
              <label
                className='block text-sm font-medium mb-1 wwred'
                htmlFor='phoneNumber'
              >
                Phone Number<span className='text-red-500'>*</span>
              </label>
              <input
                type='tel'
                id='phoneNumber'
                defaultValue='+91 9012345678'
                {...register('phoneNumber', {
                  required: 'Phone Number is required',
                  min: {
                    value: 1,
                    message: 'Number must be at least 1',
                  },
                  max: {
                    value: 100,
                    message: 'Number must be at most 100',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Enter a valid number',
                  },
                })}
                className={`w-full px-3 py-2 border ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-600'
                } bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              {errors.phoneNumber && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className='text-right'>
            <a
              type='button'
              onClick={openModal}
              className='text-wwred underline cursor-pointer'
            >
              Reset Password
            </a>
          </div>
          <label className='block text-sm font-medium mb-3 wwred'>
            What’s your preferred time?
          </label>

          <div className='flex flex-wrap gap-2'>
            {preferredTimings.map((timing) => (
              <button
                key={timing}
                type='button'
                className={`px-4 py-2.5 w-1/2 md:w-0 mx-auto text-sm font-semibold shadow-sm border border-wwred flex-grow text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  activeButton === timing
                    ? 'bg-wwred text-white md:hover:bg-red-600 md:hover:text-white'
                    : 'bg-transparent text-red-500 md:hover:bg-red-600 md:hover:text-white'
                } `}
                onClick={() => setActiveButton(timing)}
              >
                {timing}
              </button>
            ))}
          </div>

          <div className='mt-6 text-center'>
            <button
              type='submit'
              className='w-full md:w-1/4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <ChangePasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Profile
