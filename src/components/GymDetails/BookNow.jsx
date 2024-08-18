import React, { useEffect, useState } from 'react'
import { PiCurrencyInrLight } from 'react-icons/pi'
import dayjs from 'dayjs'
import { DatePicker, Space } from 'antd'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import useAuth from '../../hooks/useAuth.jsx'
import api from '../../api/axios.js'

function BookNow({ price, gym_id, schedule }) {
  const format = 'HH:mm'
  const navigate = useNavigate()
  const location = useLocation()
  const [slots, setSlots] = useState([])
  const { isAuthenticated } = useAuth()
  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      date: null,
      slot: '',
      time: '',
      duration: 60,
    },
  })

  // Watch for changes in date, slot, and time
  const watchedDate = watch('date')
  const watchedSlot = watch('slot')
  const watchedTime = watch('time')
  const watchedDuration = watch('duration')

  // Update slots when the date changes
  useEffect(() => {
    if (watchedDate) {
      updateAvailableSlots(watchedDate)
    }
  }, [watchedDate])

  // Update time options when the slot changes
  useEffect(() => {
    if (watchedSlot) {
      const [slotFrom, slotTo] = watchedSlot.split(' - ')
      const times = generateAvailableTimes(slotFrom, slotTo)
      setValue('time', times[0]) // default to the first available time
    }
  }, [watchedSlot])

  // Function to update available slots based on selected date/day
  const updateAvailableSlots = (date) => {
    const dayName = dayjs(date).format('dddd')
    const availableSlots = schedule.slots[dayName] || []

    setSlots(availableSlots)

    if (availableSlots.length > 0) {
      const [slotFrom, slotTo] = availableSlots[0].from.split(' - ')
      const times = generateAvailableTimes(slotFrom, slotTo)
      setValue('time', times[0]) // default to the first available time
      setValue('slot', `${availableSlots[0].from} - ${availableSlots[0].to}`) // default slot
    } else {
      setValue('time', '')
      setValue('slot', '')
    }

    return availableSlots
  }

  // Function to generate available times
  const generateAvailableTimes = (slotFrom, slotTo) => {
    const times = []
    let current = dayjs(slotFrom, format)
    const end = dayjs(slotTo, format)

    while (
      current.add(30, 'minute').isBefore(end) ||
      current.add(60, 'minute').isSame(end)
    ) {
      times.push(current.format(format))
      current = current.add(30, 'minute')
    }

    return times
  }

  // Handle it when Date change
  const handleDateChange = (date) => {
    setValue('date', date)
    if (date) {
      updateAvailableSlots(date)
    }
  }

  // Handle it when Slot changes
  const handleSlotChange = (e) => {
    const selectedSlot = e.target.value
    setValue('slot', selectedSlot)

    const [slotFrom, slotTo] = selectedSlot.split(' - ')
    const times = generateAvailableTimes(slotFrom, slotTo)
    setValue('time', times[0]) // default to the first available time
  }

  // Handle it when Time changes
  const handleStartTimeChange = (e) => {
    const selectedTime = e.target.value
    setValue('time', selectedTime)
  }

  // Increase Duration
  const increaseDuration = () => {
    const currentDuration = getValues('duration')
    const newDuration = currentDuration + 30 // Increment by 30 minutes
    setValue('duration', newDuration)
  }

  // Decrease Duration
  const decreaseDuration = () => {
    const currentDuration = getValues('duration')
    const newDuration = Math.max(currentDuration - 30, 60) // Decrement by 30 minutes but not below 60 minutes
    setValue('duration', newDuration)
  }

  // Format Duration
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }

  const onSubmit = async () => {
    if (!isAuthenticated) {
      // Display a toast message for non-authenticated users
      toast.error(
        'You need to be logged in to book a session. Redirecting to the login page...'
      )

      setTimeout(() => {
        navigate('/login', {
          state: { from: location.pathname },
          replace: true,
        })
      }, 5000)

      return
    }

    const date = getValues('date').format('DD/MM/YYYY')
    const fromTime = dayjs(getValues('time'), format)
    const duration = getValues('duration')
    const toTime = fromTime.add(duration, 'minute')

    // Extract slot times
    const [slotFrom, slotTo] = getValues('slot').split(' - ')
    const slotStart = dayjs(slotFrom, format)
    const slotEnd = dayjs(slotTo, format)

    // Check if fromTime and toTime are within the slot's time range
    if (
      fromTime.isBefore(slotStart) ||
      fromTime.isAfter(slotEnd) ||
      toTime.isBefore(slotStart) ||
      toTime.isAfter(slotEnd)
    ) {
      return toast.error('The selected duration is outside the available slot.')
    }

    try {
      const response = await api.post(`/bookings`, {
        date: date,
        from: fromTime.format(format),
        to: toTime.format(format),
        totalPrice: (price * duration).toFixed(2),
        gym_id: gym_id || '66c06c22b3789c8442c0d26a',
      })

      if (response.status === 201) {
        toast.success('Booking successful')
        setTimeout(() => navigate('/bookings'), 5000)
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data

        if (errors.global) {
          toast.error(errors.global)
        }
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='p-4 space-y-6 shadow-lg md:p-8'
    >
      {/* Date */}
      <div className='flex flex-col items-start space-y-2'>
        <label className='mb-1 text-sm font-medium'>Date:</label>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Controller
            name='date'
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                className='w-full px-3 py-2 rounded-none bg-wwbg !text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-red-500 hover:bg-wwbg'
                style={{ width: '100%' }}
                onChange={handleDateChange}
              />
            )}
          />
        </Space>
      </div>

      {/* Slots */}
      {slots.length > 0 && (
        <div className='flex flex-col mb-6 lg:mb-0'>
          <label className='mb-1 text-sm font-medium'>Select Slot:</label>
          <Controller
            name='slot'
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className='w-full px-3 py-2 text-center text-white border border-red-500 rounded-none bg-wwbg focus:outline-none focus:border-red-500'
                onChange={handleSlotChange}
              >
                {slots.map((slot, index) => (
                  <option key={index} value={`${slot.from} - ${slot.to}`}>
                    {`${slot.from} - ${slot.to}`}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      )}

      {/* Time */}
      {slots.length > 0 && (
        <div className='flex-col mb-6 lg:mb-0'>
          <label className='mb-1 text-sm font-medium'>Start Time:</label>
          <Controller
            name='time'
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className='w-full px-3 py-2 text-center text-white border border-red-500 rounded-none bg-wwbg focus:outline-none focus:border-red-500'
                onChange={(e) => handleStartTimeChange(e)}
              >
                {generateAvailableTimes(
                  getValues('slot').split(' - ')[0],
                  getValues('slot').split(' - ')[1]
                ).map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      )}

      {/* Duration */}
      {getValues('time') && (
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium'>Duration:</label>
          <div className='flex items-center justify-center space-x-2'>
            <button
              type='button'
              onClick={decreaseDuration}
              className='px-3 py-1.5 text-lg font-bold border border-red-900'
            >
              -
            </button>
            <Controller
              name='duration'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  value={formatDuration(field.value)} // Show duration in hours
                  readOnly
                  className='w-full px-3 py-2 text-center text-white border border-red-500 rounded-none cursor-not-allowed bg-wwbg focus:outline-none focus:border-red-500'
                />
              )}
            />
            <button
              type='button'
              onClick={increaseDuration}
              className='px-3 py-1.5 text-lg font-bold border border-red-900'
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Price */}
      <div>
        {/* Price/hour */}
        <div className='flex items-center justify-between'>
          <p className='text-base text-white'>Price</p>
          <div className='flex items-center'>
            <PiCurrencyInrLight size={16} />
            <span>{price} /hr</span>
          </div>
        </div>

        {/* Total Price */}
        <div className='flex items-center justify-between'>
          <p className='text-lg font-bold text-white'>Total</p>
          <div className='flex items-center'>
            <PiCurrencyInrLight size={16} />
            <span className='text-lg font-bold text-white'>
              {(price * (getValues('duration') / 60)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className='flex justify-center w-full'>
        <button
          type='submit'
          className='w-full px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Book Now
        </button>
      </div>
    </form>
  )
}

export default BookNow
