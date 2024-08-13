/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { PiCurrencyInrLight } from 'react-icons/pi'
import { TimePicker } from 'antd'
import dayjs from 'dayjs'
import { DatePicker, Space, Select } from 'antd'
import axios from 'axios'
import config from '../config.js'
import useAuth from '../hooks/useAuth.jsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { IntervalTimer } from '../utils/intervalTimer.js'

const { Option } = Select

function BookNowSession({ price, gym_id, slots }) {
  const format = 'HH:mm'
  const [duration, setDuration] = useState(1) // Default duration
  const [date, setDate] = useState(null)
  const [fromTime, setFromTime] = useState(null)
  const [toTime, setToTime] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate();

  // Update available slots when the selected day changes
  useEffect(() => {
    if (selectedDay) {
      const daySlots = slots.find(slot => slot.day === selectedDay)
      setAvailableSlots(daySlots ? daySlots.slots : [])
    } else {
      setAvailableSlots([])
    }
  }, [selectedDay, slots])

  // Update toTime when fromTime or duration changes
  useEffect(() => {
    if (fromTime) {
      updateToTime(duration)
    }
  }, [fromTime, duration])

  const incrementDuration = () => {
    setDuration(prev => Math.min(prev + 0.5, 23.5))
  }

  const decrementDuration = () => {
    setDuration(prev => Math.max(prev - 0.5, 1))
  }

  const updateToTime = newDuration => {
    const newToTime = dayjs(fromTime).add(newDuration, 'hour')
    setToTime(newToTime)
  }

  const formatDuration = value => {
    const hours = Math.floor(value)
    const minutes = value % 1 * 60
    return `${hours}:${minutes === 0 ? '00' : minutes}`
  }

  const calculateTotalPrice = () => (price * duration).toFixed(2)

  const handleDateChange = date => {
    setDate(date ? date.format('YYYY-MM-DD') : null)
    if (date) {
      const dayOfWeek = dayjs(date).format('dddd')
      setSelectedDay(dayOfWeek)
    }
  }

  const handleSlotChange = slot => {
    const [slotFrom, slotTo] = slot.split(' - ')
    setFromTime(dayjs(slotFrom, format))
    setToTime(dayjs(slotTo, format))
    setDuration(dayjs(slotTo, format).diff(dayjs(slotFrom, format), 'hour', true))
  }

  const bookNowSubmit = async () => {
    try {
      console.log('Preparing to book:')
      console.log('Date:', date)
      console.log('From Time:', fromTime.format(format))
      console.log('To Time:', toTime.format(format))
      console.log('Total Price:', calculateTotalPrice())
      console.log('Gym ID:', gym_id)

      const response = await axios.post(
        `${config.BASE_BACKEND_URL}/bookings`,
        {
          date,
          from: fromTime.format(format),
          to: toTime.format(format),
          totalPrice: calculateTotalPrice(),
          gym_id: gym_id || '66b8c95b6e2891a02c1f18f6',
        },
        {
          headers: {
            Authorization: `Bearer ${isAuthenticated}`,
          },
          withCredentials: true,
        }
      )

      if (response.status == 201) {
        toast.success('Booking successful')
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data

        if (errors.global) {
          toast.error(errors.global)
        }
      }
    }


    const interval = IntervalTimer(() => {
      navigate('/home')
    }, 5000)
  }

  return (
    <div className='p-4 space-y-6 shadow-lg md:p-8'>
      <div className='flex flex-col items-start space-y-2'>
        <label className='mb-1 text-sm font-medium'>Date:</label>
        <Space direction='vertical' style={{ width: '100%' }}>
          <DatePicker
            className='w-full px-3 py-2 rounded-none bg-wwbg !text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-red-500 hover:bg-wwbg'
            style={{ width: '100%' }}
            onChange={handleDateChange}
          />
        </Space>
      </div>

      <div className='flex-col hidden mb-6 lg:mb-0'>
        <label className='mb-1 text-sm font-medium'>Day:</label>
        <input
          type='text'
          value={selectedDay || ''}
          readOnly
          className='w-full px-3 py-2 text-center text-white border border-red-500 rounded-none cursor-not-allowed bg-wwbg focus:outline-none focus:border-red-500'
        />
      </div>

      {availableSlots.length > 0 && (
        <div className='flex flex-col mb-6 lg:mb-0'>
          <label className='mb-1 text-sm font-medium'>Select Slot:</label>
          <Select
            placeholder='Select Slot'
            className='w-full'
            onChange={handleSlotChange}
          >
            {availableSlots.map((slot, index) => (
              <Option key={index} value={`${slot.from} - ${slot.to}`}>
                {`${slot.from} - ${slot.to}`}
              </Option>
            ))}
          </Select>
        </div>
      )}


      <div className='flex-col mb-6 lg:mb-0'>
        <label className='mb-1 text-sm font-medium'>Start Time:</label>
        <input
          type='text'
          className='w-full px-3 py-2 text-center text-white border border-red-500 rounded-none cursor-not-allowed bg-wwbg focus:outline-none focus:border-red-500'
        />
      </div>

      <div className='flex flex-col'>
        <label className='mb-1 text-sm font-medium'>Duration:</label>
        <div className='flex items-center justify-center space-x-2'>
          <button
            type='button'
            onClick={decrementDuration}
            className='px-3 py-1.5 text-lg font-bold border border-red-900'
          >
            -
          </button>
          <input
            type='text'
            value={formatDuration(duration)}
            readOnly
            className='w-full px-3 py-2 text-center text-white border border-red-500 rounded-none cursor-not-allowed bg-wwbg focus:outline-none focus:border-red-500'
          />
          <button
            type='button'
            onClick={incrementDuration}
            className='px-3 py-1.5 text-lg font-bold border border-red-900'
          >
            +
          </button>
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <p className='text-base text-white'>Price</p>
          <div className='flex items-center'>
            <PiCurrencyInrLight size={16} />
            <span>{price} /hr</span>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <p className='text-lg font-bold text-white'>Total</p>
          <div className='flex items-center'>
            <PiCurrencyInrLight size={16} />
            <span className='text-lg font-bold text-white'>
              {calculateTotalPrice()}
            </span>
          </div>
        </div>
      </div>

      <div onClick={bookNowSubmit} className='flex justify-center w-full'>
        <button
          type='button'
          className='w-full px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default BookNowSession