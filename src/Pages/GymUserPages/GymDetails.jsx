import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import Carousel from '../../components/GymDetails/Carousel'
import BookNow from '../../components/GymDetails/BookNow'
import Facilities from '../../components/GymDetails/Facilites' // Ensure correct component name
import CurrentLocationMap from '../../components/GymDetails/CurrentLocationMap'
import AboutSection from '../../components/GymDetails/AboutSection'
import ContactGYM from '../../components/GymDetails/ContactGYM'
import api from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAboutLoadingFalse } from '../../redux/aboutSectionSlice'
import { setBookNowLoadingFalse } from '../../redux/bookNowSlice'
import { setCarouselLoadingFalse } from '../../redux/CarouselSlice'
import { setContactGymLoadingFalse } from '../../redux/contactGymSlice'
import { setCurrentLocationLoadingFalse } from '../../redux/currentLocationSlice'
import { setFacilitiesLoadingFalse } from '../../redux/facilitiesSlice'
import GymDetailsSkeleton from '../../components/Skeletons/GymDetailsSkeleton'

function GymDetailsPage() {
  const { id } = useParams() // Here we have the GymID
  const [gymDetails, setGymDetails] = useState(null)
  const [error, setError] = useState(null)

  // Select loading states from Redux
  const aboutSectionLoading = useSelector((state) => state.isGymDetailsLoading.aboutSection.loading);
  const bookNowLoading = useSelector((state) => state.isGymDetailsLoading.bookNow.loading);
  const carouselLoading = useSelector((state) => state.isGymDetailsLoading.carousel.loading);
  const contactGymLoading = useSelector((state) => state.isGymDetailsLoading.contactGym.loading);
  const currentLocationLoading = useSelector((state) => state.isGymDetailsLoading.currentLocation.loading);
  const facilitiesLoading = useSelector((state) => state.isGymDetailsLoading.aboutSection.loading);

  // Check if any component is still loading
  const isLoading = carouselLoading || aboutSectionLoading || bookNowLoading || facilitiesLoading || contactGymLoading || currentLocationLoading;
  const dispatchAboutSection = useDispatch();
  const dispatchBookNow = useDispatch();
  const dispatchCarousel = useDispatch();
  const dispatchContactGym = useDispatch();
  const dispatchCurrentLocation = useDispatch();
  const dispatchFacilities = useDispatch();

  function dispatchToFalse() {
    dispatchAboutSection(setAboutLoadingFalse());
    dispatchBookNow(setBookNowLoadingFalse())
    dispatchCarousel(setCarouselLoadingFalse())
    dispatchContactGym(setContactGymLoadingFalse())
    dispatchCurrentLocation(setCurrentLocationLoadingFalse())
    dispatchFacilities(setFacilitiesLoadingFalse())
  }

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await api.get(`/gyms/${id}`);

        setGymDetails(response.data);
        dispatchToFalse()

      } catch (error) {
        setError('Error fetching gym details');
      }
    };

    fetchGymDetails();
  }, [id]); // Dependency on gymid to refetch if it changes

  if (isLoading || !gymDetails) { // Check overall loading state
    return <div><GymDetailsSkeleton /></div>; // Show loading until all components are ready
  }


  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='py-6 md:p-6'>
      <div className='mx-10 md:mx-16'>
        <div className='flex flex-col items-center justify-center md:items-start'>
          <h1 className='text-xl font-bold text-white md:text-2xl'>
            {gymDetails.gym_name ?? "GYM NAME"}
          </h1>
          <div className='flex items-center mt-2 space-x-2 text-gray-300 md:space-x-2 md:mt-0'>
            <span className='text-xs md:text-sm'>
              {gymDetails.address.city ?? "CITY"}, {gymDetails.address.state ?? "STATE"}
            </span>
            <div className='flex items-center space-x-1'>
              <FaStar className='text-red-500' />
              <span className='text-xs md:text-sm'>
                {(gymDetails.average_rating ?? 0).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row'>
        {/* section 1 */}
        <section className='px-6 lg:w-2/3'>
          <Carousel images={gymDetails.images ?? []} />
          <AboutSection desc={gymDetails.description ?? "DESCRIPTION HERE..."} />
        </section>
        {/* section 2 */}
        <section className='px-6 space-y-4 lg:w-1/3'>
          <BookNow
            price={gymDetails.price ?? 19}
            gym_id={id ?? "66c9a765d76ca5af637c223b"}
            schedule={gymDetails.schedule ?? []}
          />
          <Facilities facilities={gymDetails.facilities ?? []} />
          <CurrentLocationMap
            location={{
              lat: gymDetails.map_detail.coordinates[1],
              lng: gymDetails.map_detail.coordinates[0],
            }}
          />
          <ContactGYM
            email={gymDetails.owner_id.email ?? "email@email.com"}
            phone={gymDetails.owner_id.phone_number ?? "790*******"}
          />
        </section>
      </div>
    </div>
  )
}

export default GymDetailsPage
