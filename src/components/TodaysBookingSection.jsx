import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imageforPage from '../assets/images/signin.jpg';

function TodaysBookingSection({ todayBookings = [] }) {
    const [gymImage, setGymImage] = useState(null);

    useEffect(() => {
        if (todayBookings.length > 0) {
            const booking = todayBookings[0];
            const bookingDate = booking.date.replace(/\//g, '-'); // Replace '/' with '-' for the API call

            axios.get(`http://localhost:3000/users/bookings/images?date=${bookingDate}`)
                .then(response => {
                    setGymImage(response.data.imageUrl);
                })
                .catch(error => {
                    console.error('Error fetching gym image:', error);
                    setGymImage("https://workoutwingsbucket.s3.ap-south-1.amazonaws.com/owner/undefined/1723725094241_5am-fitness-namakkal-gyms-7fdsqtemq4.avif"); // Fallback if image fetching fails
                });
        }
    }, [todayBookings]);

    if (todayBookings.length === 0) {
        return <p className="text-center text-gray-500">No bookings for today.</p>;
    }

    const booking = todayBookings[0];
    const gymName = booking.gym_name || "Gym Name";
    const bookingDate = booking.date || "Booking Date";
    const bookingSlot = `${booking.from} - ${booking.to}` || "Booking Slot";
    const welcomeMessage = `Welcome to ${gymName}!`;

    return (
        <div className="max-w-screen-lg p-4 mx-auto">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-lg lg:flex-row">
                <div
                    className="flex-none h-48 overflow-hidden text-center bg-cover lg:h-auto lg:w-1/3"
                    style={{ backgroundImage: `url(${gymImage || imageforPage})` }}
                    title={gymName}
                />

                <div className="flex flex-col justify-between w-full p-6 lg:w-2/3">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {gymName}
                        </h1>
                        <p className="mt-2 text-gray-700">
                            {welcomeMessage}
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <img
                            className="w-16 h-16 rounded-full shadow-lg"
                            src={gymImage || imageforPage}
                            alt="Gym"
                        />
                        <div className="text-sm">
                            <p className="text-lg font-semibold text-gray-900">
                                {bookingDate}
                            </p>
                            <p className="text-gray-600">
                                {bookingSlot}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodaysBookingSection;