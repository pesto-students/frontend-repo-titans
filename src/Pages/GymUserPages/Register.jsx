import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { IoCloseSharp } from 'react-icons/io5'
import config from '../../config.js'
import signup_img from '../../assets/images/signup.jpg'
import useAuth from '../../hooks/useAuth'
import { IntervalTimer } from '../../utils/intervalTimer'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [serverError, setServerError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const notify = () =>
    toast.error(
      "You're currently logged in. To create a new account, please logout and try again."
    )

  useEffect(() => {
    if (isAuthenticated) {
      notify()

      const interval = IntervalTimer(() => {
        navigate('/home')
      }, 1)

      return () => clearInterval(interval)
    }
  })

  // Watch password field to use for validation
  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${config.BASE_BACKEND_URL}/api/auth/register`,
        {
          email: data.email,
          password: data.password,
          role: 'owner',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )

      // Handle successful login
      if (response.status === 200) {
        // Redirect the user to the home page or dashboard
        navigate('/login')
      }
    } catch (error) {
      console.error('Error during registration:', error)

      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data

        if (errors.global) {
          setServerError(errors.global)
        }
      }
    }
  }

  return (
    <div className='flex flex-col justify-center relative md:flex-row h-screen'>
      <button
        onClick={() => navigate(-1)}
        className='absolute top-4 right-4 text-red-500'
      >
        <IoCloseSharp size={24} />
      </button>
      {/* Left side with image, hidden on mobile */}
      <div className='hidden md:block md:w-1/2 bg-cover bg-center relative overflow-hidden'>
        <img
          src={signup_img}
          alt='Workout'
          className='object-cover w-full h-full grayscale'
        />
      </div>

      {/* Right side with form */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-6 md:p-12'>
        <div
          className='w-full max-w-md wwbg text-white flex flex-col justify-center p-6 md:p-12 shadow-l'
          style={{
            boxShadow:
              '-4px 0 8px rgba(0, 0, 0, 0.1), 4px 0 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 className='text-2xl md:text-3xl font-semibold mb-4 text-center md:text-start'>
            Create new account
            <span className='mx-2 font-bold text-red-700'>.</span>
          </h2>
          <p className='text-sm text-gray-300 mb-8 text-center md:text-start'>
            Already have an account?{' '}
            <Link to='/login' className='text-red-500 underline'>
              Sign In
            </Link>
          </p>

          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <p className='text-red-500 text-base mb-4'>{serverError}</p>
            )}
            <div className='mb-4'>
              <label
                className='block text-sm font-medium mb-1 wwred'
                htmlFor='email'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                placeholder='abc@example.com'
                {...register('email', { required: 'Email is required' })}
                className={`w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                }  bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='password'
              >
                Password
              </label>
              <div>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    autoComplete='new-password'
                    placeholder='**************'
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    className={`w-full px-3 py-2 border ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-500'
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className='mb-6'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='confirm-password'
              >
                Confirm Password
              </label>
              <div>
                <div className='relative'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id='confirm-password'
                    placeholder='**************'
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === password ||
                        'Ensure both passwords are the same',
                    })}
                    className={`w-full px-3 py-2 border ${
                      errors.confirmPassword
                        ? 'border-red-500'
                        : 'border-gray-600'
                    } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-500'
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type='submit'
              className='w-full bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign Up
            </button>
          </form>

          <div className='flex items-center my-6'>
            <div className='flex-grow border-t border-red-600'></div>
            <span className='mx-4 text-white-400'>Or</span>
            <div className='flex-grow border-t border-red-600'></div>
          </div>

          <button className='w-full flex items-center justify-center bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:w-full mb-2 text-center border border-wwred'>
            <FcGoogle className='w-6 h-6 mr-2' alt='Google Logo' />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
