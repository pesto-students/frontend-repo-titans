import React from 'react'
import { useParams } from 'react-router-dom'

function GymDetails(props) {
  const { id } = useParams(); //This is the gym id
  
  return (
    <div>
      Gym details here

    </div>
  )
}

export default GymDetails
