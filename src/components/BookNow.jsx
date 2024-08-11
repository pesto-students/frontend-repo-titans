import React, { useState, useEffect } from 'react'
import { PiCurrencyInrLight } from 'react-icons/pi'
import WWButton from './WWButton'
import { TimePicker } from 'antd'
import dayjs from 'dayjs'
import { DatePicker, Space } from 'antd'

function BookNowSession({ price, extended_session = 1 }) {
  const format = 'HH:mm'
  const [duration, setDuration] = useState(1) // Default duration

  const bookNowSubmit = () => {
    alert('Book now clicked')
  }

  // Function to increment duration
  const incrementDuration = () => {
    setDuration((prev) => Math.min(prev + 0.5, 23.5))
  }

  // Function to decrement duration
  const decrementDuration = () => {
    setDuration((prev) => Math.max(prev - 0.5, 1))
  }

  // Format the duration to display correctly
  const formatDuration = (value) => {
    const hours = Math.floor(value)
    const minutes = (value % 1) * 60
    return `${hours}:${minutes === 0 ? '00' : minutes}`
  }

  // Calculate total price based on duration
  const calculateTotalPrice = () => {
    // Price is per hour, so multiply by duration
    return (price * duration).toFixed(2)
  }

  return (
    <div className='p-4 md:p-8 space-y-6 shadow-lg'>
      {/* Date Selector */}
      <div className='flex flex-col items-start space-y-2'>
        <label className='text-sm font-medium mb-1'>Date:</label>
        <Space direction='vertical' style={{ width: '100%' }}>
          <DatePicker
            className='w-full px-3 py-2 rounded-none bg-wwbg !text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-red-500 hover:bg-wwbg'
            style={{ width: '100%' }}
          />
        </Space>
      </div>

      {/* Time Selector */}
      <div className='flex flex-col mb-6 lg:mb-0'>
        <label className='text-sm font-medium mb-1'>From:</label>
        <TimePicker
          defaultValue={dayjs('05:00', format)}
          format={format}
          className='w-full px-3 py-2 rounded-none bg-wwbg text-white focus:outline-none focus:border-red-500 border border-red-500'
        />
      </div>

      {/* Duration Selector */}
      <div className='flex flex-col'>
        <label className='text-sm font-medium mb-1'>Duration:</label>
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
            className='w-full text-center px-3 py-2 rounded-none bg-wwbg text-white focus:outline-none focus:border-red-500 border border-red-500 cursor-not-allowed'
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
        {/* Price section */}
        <div className='flex items-center justify-between'>
          <p className='text-base text-white'>Price</p>
          <div className='flex items-center'>
            <PiCurrencyInrLight size={16} />
            <span>{price} /hr</span>
          </div>
        </div>

        {/* Total cost section */}
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

      {/* Submit button */}
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
