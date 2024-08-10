import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
import Carousel from '../../components/Carousel'
import BookNow from '../../components/BookNow'
import Facilities from '../../components/Facilites'
import CurrentLocationMap from '../../components/CurrentLocationMap'
import AboutSection from '../../components/AboutSection'
import ContactGYM from '../../components/ContactGYM'

function GymDetailsPage() {
  const [gymDetails, setGymDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        // const response = await axios.get(
        //   'http://localhost:3000/gymDetails/dummy'
        // ) // Adjust the URL as needed
        // setGymDetails(response.data)
        setGymDetails({
          gym_name: 'One Fitness',
          map_detail: {
            lattitude: 12.8387694,
            longitude: 80.0444281,
          },
          address: {
            address_line_1: 'K-603, Mahindra Royale, Pimpri',
            address_line_2: 'PunePimpri',
            city: 'Pune',
            state: 'Maharashtra',
            pin_code: '411018',
          },
          description:
            "Welcome to oneFitness, Pune's premier fitness destination where excellence meets convenience. Located in the heart of Pimpri, our state-of-the-art gym is designed to provide a dynamic and effective workout environment tailored to your unique fitness goals. At oneFitness, we offer: Top-Notch Equipment: Our facility is equipped with the latest in fitness technology to ensure you get the most out of every workout. Diverse Fitness Classes: From high-intensity interval training to soothing yoga, our wide range of classes caters to all fitness levels and interests. Expert Trainers: Our experienced trainers are here to provide guidance, motivation, and personalized training programs to help you succeed. Modern Amenities: Enjoy our showers, steam rooms, and ample space dedicated to weightlifting and cardio workouts. Comprehensive Support: Beyond just workouts, we offer nutrition advice and a supportive community to keep you on track and inspired. Whether you aim to build strength, enhance cardiovascular health, or simply stay active, oneFitness is committed to guiding you every step of the way. Join us and elevate your fitness journey with a perfect blend of innovation, dedication, and comfort.",
          facilities: [
            'shaower',
            'steam',
            'random',
            'cardio',
            'locker',
            'weightlifting',
          ],
          gst_number: '122312321312',
          price: 5,
          slots: [
            {
              startTime: '06:00',
              stopTime: '07:00',
            },
            {
              startTime: '07:00',
              stopTime: '08:00',
            },
          ],
          images: [
            'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
            'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
            'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
            'https://t3.ftcdn.net/jpg/06/48/79/10/360_F_648791013_cQK30SdyiLrVQ96Bqn2MOkz4JmvgttGr.jpg',
            'https://t3.ftcdn.net/jpg/08/08/98/52/360_F_808985251_giGEaK2aKUMJZK6qStHBY86XE03qNY49.jpg',
            'https://st2.depositphotos.com/1000423/7768/i/450/depositphotos_77686924-stock-photo-world-is-mine.jpg',
          ],
          average_rating: 4.5,
          total_ratings: 120,
          total_occupancy: 10,
          booking_id: [1, 2, 3],
          blocked_date: ['2024-12-25', '2024-01-01'],
          status: 'active',
          req_creation_Date: '2024-08-09',
          owner_id: {
            _id: '641b2f9c1c4b65a1f8b8f2d9',
            contact_info: {
              phone_number: '+91-1234567890',
              email: 'owner@example.com',
            },
          },
        })
      } catch (error) {
        setError('Error fetching gym details')
      } finally {
        setLoading(false)
      }
    }

    fetchGymDetails()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='py-6 md:p-6'>
      <div className='mx-10 md:mx-16'>
        <div className='flex flex-col justify-center items-center md:items-start'>
          <h1 className='text-xl md:text-2xl font-bold text-white'>
            {gymDetails.gym_name}
          </h1>
          <div className='flex items-center text-gray-300 space-x-2 md:space-x-2 mt-2 md:mt-0'>
            <span className='text-xs md:text-sm'>Chennai, India</span>
            <div className='flex items-center space-x-1'>
              <FaStar className='text-red-500' />
              <span className='text-xs md:text-sm'>5</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row'>
        {/* section 1 */}
        <section className='lg:w-2/3 px-6'>
          <Carousel images={gymDetails.images} />
          <AboutSection desc={gymDetails.description} />
        </section>
        {/* section 2 */}
        <section className='lg:w-1/3 px-6 space-y-4'>
          <BookNow price={gymDetails.price} extended_session={2} />
          <Facilities facilities={gymDetails.facilities} />
          <CurrentLocationMap
            location={{
              lat: gymDetails.map_detail.lattitude,
              lng: gymDetails.map_detail.longitude,
            }}
          />
          <ContactGYM
            email={gymDetails.owner_id.contact_info.email}
            phone={gymDetails.owner_id.contact_info.phone_number}
          />
        </section>
      </div>
    </div>
  )
}

export default GymDetailsPage
