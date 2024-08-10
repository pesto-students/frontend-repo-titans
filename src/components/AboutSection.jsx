/* eslint-disable react/prop-types */
import React from 'react'

function AboutSection({ desc = 'description here' }) {
  return (
    <div className='w-full min-h-1/2 shadow-lg mt-4 p-4 md:p-8'>
      <div className='pb-2 text-xl border-b border-red-600'>About</div>
      <p className='text-gray-300 mt-3'>{desc}</p>
    </div>
  )
}

export default AboutSection
