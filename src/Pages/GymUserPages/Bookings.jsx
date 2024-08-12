import React, { useEffect, useState } from 'react'
import TableComponent from '../../components/TableComponent'
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import config from '../../config.js';
import BookingCard from '../../components/BookingCard.jsx';

function Bookings() {

  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_BACKEND_URL}/users/bookings`,
          {
            headers: {
              Authorization: `Bearer ${isAuthenticated}`,
            },
            withCredentials: true,
          }
        )

        const bookings = response.data.bookings;

        if (bookings.length > 0) {
          // Extract headers from keys of the first object
          const extractedHeaders = Object.keys(bookings[0]);
          setHeaders(extractedHeaders);
          setData(bookings);
        } else {
          setError('No bookings found.');
        }
      } catch (err) {
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);



  return (
    <>

      <BookingCard/>
      <div>
        <div className="p-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <TableComponent
              columns={headers.length}
              headers={headers}
              data={data}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Bookings
