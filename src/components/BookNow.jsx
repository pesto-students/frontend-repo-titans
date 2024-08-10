import React, { useState, useEffect } from 'react';
import { PiCurrencyInrLight } from 'react-icons/pi';
import WWButton from './WWButton';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';

function BookNowSession({ price, extended_session = 1 }) {
    const format = 'HH:mm';
    const [duration, setDuration] = useState(1); // Default duration

    const bookNowSubmit = () => {
        alert("Book now clicked");
    }

    // Function to increment duration
    const incrementDuration = () => {
        setDuration(prev => Math.min(prev + 0.5, 23.5));
    };

    // Function to decrement duration
    const decrementDuration = () => {
        setDuration(prev => Math.max(prev - 0.5, 1));
    };

    // Format the duration to display correctly
    const formatDuration = (value) => {
        const hours = Math.floor(value);
        const minutes = (value % 1) * 60;
        return `${hours}:${minutes === 0 ? '00' : minutes}`;
    };

    // Calculate total price based on duration
    const calculateTotalPrice = () => {
        // Price is per hour, so multiply by duration
        return (price * duration).toFixed(2);
    };

    return (
        <div className="w-full max-w-md p-12 mx-auto space-y-6 border border-gray-600">
            {/* Date Selector */}
            <div className="flex flex-col items-start">
                <label className="text-sm font-medium text-wwred">Date:</label>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <DatePicker status="error" style={{ width: '100%' }} />
                </Space>
            </div>

            <div className="flex space-x-8">
                {/* Time Selector */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-wwred">From:</label>
                    <TimePicker
                        defaultValue={dayjs('05:00', format)}
                        format={format}
                        className="p-2 text-black border border-gray-300 rounded-md w-36"
                    />
                </div>

                {/* Duration Selector */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-wwred">Duration:</label>
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={decrementDuration}
                            className="pl-3 pr-3 text-lg font-bold border border-red-900"
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={formatDuration(duration)}
                            readOnly
                            className="w-20 p-2 text-center border border-gray-300 rounded-md"
                        />
                        <button
                            type="button"
                            onClick={incrementDuration}
                            className="pl-3 pr-3 text-lg font-bold border border-red-900"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>  

            {/* Price section */}
            <div className='flex items-center justify-between'>
                <p className='text-sm font-medium text-wwred'>Price:</p>
                <div className='flex items-center'>
                    <PiCurrencyInrLight size={20} />
                    <span className="ml-1">{price} /hr</span>
                </div>
            </div>

            {/* Total cost section */}
            <div className='flex items-center justify-between'>
                <p className='text-sm font-medium text-wwred'>Total:</p>
                <div className='flex items-center'>
                    <PiCurrencyInrLight size={20} />
                    <span className="ml-1">{calculateTotalPrice()}</span>
                </div>
            </div>

            {/* Submit button */}
            <div onClick={bookNowSubmit} className='flex justify-center w-full'>
                <WWButton variant='v1' text='Book now' minWidth='14rem' />
            </div>
        </div>
    );
}

export default BookNowSession;