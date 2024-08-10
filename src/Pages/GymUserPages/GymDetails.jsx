import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '../../components/Carousel';
import BookNow from '../../components/BookNow';
import Facilities from '../../components/Facilites';
import CurrentLocationMap from '../../components/CurrentLocationMap';
import AboutSection from '../../components/AboutSection';
import ContactGYM from '../../components/ContactGYM';
import WWButton from '../../components/WWButton';

function GymDetailsPage() {
  const [gymDetails, setGymDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/gymDetails/dummy'); // Adjust the URL as needed
        setGymDetails(response.data);
      } catch (error) {
        setError('Error fetching gym details');
      } finally {
        setLoading(false);
      }
    };

    fetchGymDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
   
    //   <h1>{gymDetails.gym_name}</h1>
   
    <>
      {/* section 1 */}
      <div className='w-[64%] pl-8 pb-6 pt-6'>
        <Carousel images={gymDetails.images} />
        <BookNow price={gymDetails.price} extended_session={2}/>
        <Facilities facilities={gymDetails.facilities}/>

        <CurrentLocationMap location={{ lat: gymDetails.map_detail.lattitude, lng: gymDetails.map_detail.longitude }} />
        <AboutSection desc={gymDetails.description}/>
        <ContactGYM email={gymDetails.owner_id.contact_info.email} phone={gymDetails.owner_id.contact_info.phone_number}/>
        <WWButton variant='v1' text='supportForm2' to='/urlThatMuhmaadisGoingToPutAndIamGoingToChange'/>
      </div>
    </>
  );
}

export default GymDetailsPage;