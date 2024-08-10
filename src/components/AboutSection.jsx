/* eslint-disable react/prop-types */
import React from 'react'

function AboutSection({desc="description here"}) {
  return (
    <div className='w-full'>
      <div className='pb-2 text-xl border-b border-red-600'>About</div>
      <p className='text-gray-300'>{desc}</p>
    </div>
  )
}

export default AboutSection
