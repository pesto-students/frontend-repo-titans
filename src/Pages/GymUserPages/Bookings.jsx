import React, { useEffect, useState } from 'react'
import TableComponent from '../../components/TableComponent'
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import config from '../../config.js';

function Bookings() {
  const [todayBookings, setTodayBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [futureBookings, setFutureBookings] = useState([]);
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
        );
  
        const bookings = response.data.bookings;
  
        if (bookings.length > 0) {
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Set today's time to 00:00:00 for accurate comparison
  
          const todayBookings = bookings.filter(booking => {
            const bookingDate = new Date(booking.date.split('/').reverse().join('-'));
            return bookingDate.getTime() === today.getTime();
          });
  
          const pastBookings = bookings.filter(booking => {
            const bookingDate = new Date(booking.date.split('/').reverse().join('-'));
            return bookingDate.getTime() < today.getTime();
          });
  
          const futureBookings = bookings.filter(booking => {
            const bookingDate = new Date(booking.date.split('/').reverse().join('-'));
            return bookingDate.getTime() > today.getTime();
          });
  
          setTodayBookings(todayBookings);
          setPastBookings(pastBookings);
          setFutureBookings(futureBookings);
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
  }, [isAuthenticated]);
  
  const renderTable = (headers, data, title) => (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      <TableComponent
        columns={headers.length}
        headers={headers}
        data={data}
      />
    </div>
  );

  return (
    <>
      <div className="p-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {todayBookings.length > 0 && renderTable(Object.keys(todayBookings[0]), todayBookings, "Today's Bookings")}
            {pastBookings.length > 0 && renderTable(Object.keys(pastBookings[0]), pastBookings, "Past Bookings")}
            {futureBookings.length > 0 && renderTable(Object.keys(futureBookings[0]), futureBookings, "Future Bookings")}
          </>
        )}
      </div>
    </>
  );
}

export default Bookings;