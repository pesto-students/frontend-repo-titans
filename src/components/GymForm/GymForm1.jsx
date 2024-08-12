import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import image from '../../assets/images/ownergymform.png'
import WelcomeModal from './WelcomeModal'

const GAP_FROM_TOP = 150

const GymForm1 = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  })

  // Focus the input field on error
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0]
    if (firstErrorField) {
      setFocus(firstErrorField)
      setTimeout(() => {
        const element = document.getElementById(firstErrorField)
        if (element) {
          // Calculate the desired scroll position
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({
            top: elementPosition - GAP_FROM_TOP,
            behavior: 'smooth',
          })
        }
      }, 100)
    }
  }, [errors, setFocus])

  return (
    <>
      <WelcomeModal />
      <div className='flex items-center justify-center bg-wwbg text-white min-h-screen p-4'>
        <div className='flex flex-col md:flex-row bg-wwbg shadow-lg overflow-hidden w-full max-w-5xl'>
          {/* Image Section */}
          <div className='hidden md:block w-full md:w-1/2'>
            <img
              src={image}
              alt='Gym Owner'
              className='w-full h-full object-cover'
            />
          </div>

          {/* Form Section */}
          <div className='w-full md:w-1/2 p-8'>
            <h2 className='text-3xl font-semibold text-wwred text-center md:text-start mb-8'>
              Gym Owner
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              {/* Full Name */}
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium mb-1 wwred'
                  htmlFor='fullName'
                >
                  Full Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='fullName'
                  placeholder='Enter your Name'
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

              {/* Contact Information */}
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium mb-1 wwred'
                  htmlFor='contactInfo'
                >
                  Contact Information <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='contactInfo'
                  placeholder='9876543210'
                  {...register('contactInfo', {
                    required: 'Contact Information is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Invalid contact number',
                    },
                  })}
                  className={`w-full px-3 py-2 border ${
                    errors.contactInfo ? 'border-red-500' : 'border-gray-600'
                  } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                />
                {errors.contactInfo && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.contactInfo.message}
                  </p>
                )}
              </div>

              <h2 className='text-2xl font-semibold text-wwred text-center md:text-start mb-8'>
                Business Details
              </h2>

              {/* Gym Name */}
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium mb-1 wwred'
                  htmlFor='gymName'
                >
                  Gym Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='gymName'
                  placeholder='Enter your GYM Name'
                  {...register('gymName', {
                    required: 'Gym Name is required',
                  })}
                  className={`w-full px-3 py-2 border ${
                    errors.gymName ? 'border-red-500' : 'border-gray-600'
                  } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                />
                {errors.gymName && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.gymName.message}
                  </p>
                )}
              </div>

              {/* UPI ID */}
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium mb-1 wwred'
                  htmlFor='upiId'
                >
                  UPI ID
                </label>
                <input
                  type='text'
                  id='upiId'
                  placeholder='UPI ID'
                  {...register('upiId')}
                  className='w-full px-3 py-2 border border-gray-600 bg-wwbg text-white focus:outline-none focus:border-red-500'
                />
              </div>

              {/* GST Number */}
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium mb-1 wwred'
                  htmlFor='gstNumber'
                >
                  GST Number
                </label>
                <input
                  type='text'
                  id='gstNumber'
                  placeholder='GST Number'
                  {...register('gstNumber')}
                  className='w-full px-3 py-2 border border-gray-600 bg-wwbg text-white focus:outline-none focus:border-red-500'
                />
              </div>

              {/* Submit Button */}
              <div className='mt-6 text-center'>
                <button
                  type='submit'
                  className='w-full px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

GymForm1.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    fullName: PropTypes.string,
    contactInfo: PropTypes.string,
    gymName: PropTypes.string,
    upiId: PropTypes.string,
    gstNumber: PropTypes.string,
  }),
}

export default GymForm1
