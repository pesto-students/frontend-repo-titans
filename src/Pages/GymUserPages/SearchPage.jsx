import React, { useState, useEffect, useRef } from 'react';
import { FiMapPin, FiSearch, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';
import WWButton from '../../components/WWButton';
import GymCard from '../../components/GymCard';
import config from '../../config';

const SearchPage = () => {
  const [gyms, setGyms] = useState([]);
  const [filteredGyms, setFilteredGyms] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchCities();
    fetchGymsInTheCity();
    setSelectedCity('Bangalore');
  }, []);

  useEffect(() => {
    fetchGymsInTheCity();
  }, [selectedCity]);

  //to handle the dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const searchGymsByName = (e) => {
    const name = e.target.value;
    if (name) {
      const filtered = gyms.filter(gym => gym.gym_name.toLowerCase().includes(name.toLowerCase()));
      setFilteredGyms(filtered);
    } else setFilteredGyms(gyms);
  };

  const fetchGymsInTheCity = async (city) => {
    try {
      const res = await axios.get(`${config.BASE_BACKEND_URL}/api/gym/search`, {
        params: { city: selectedCity } // Hardcoded city name for now
      });
      setGyms(res.data);
      setFilteredGyms(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCities = async () => {
    try {
      const res = await axios.get(`${config.BASE_BACKEND_URL}/api/gym/getCities`);
      setCities(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setDropdownOpen(false);
    // Add any additional logic for when a city is selected
  };

  return (
    <div className="searchPage bg-black mx-auto px-4" style={{ minHeight: "calc(100vh - 220px)" }}>
      <div className="flex items-center justify-between space-x-2 p-3 bg-black">
        <div className="flex items-center justify-between space-x-2 p-3" style={{ flexBasis: '50%' }}>
          <div className="relative" ref={dropdownRef}>
            <button style={{ minWidth: '15rem' }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-red-600 text-white py-2 px-4 flex justify-center items-center"
            >
              <FiMapPin className="w-5 h-5 mr-2" />
              <span>{selectedCity}</span>
              <FiChevronDown className="w-5 h-5 ml-2" />
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 w-full bg-red-600 shadow-lg z-10">
                {cities.map((city) => (
                  <div
                    key={city.id}
                    onClick={() => handleCityChange(city.name)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white"
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-full">
            <input type="text" id="gymName" name="gymName" placeholder="Search GYM"
              className="w-full px-3 py-2 pr-10 border bg-wwbg text-white focus:outline-none focus:border-red-500"
              onChange={searchGymsByName} />
            <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
          </div>
        </div>
        <div className="sort-by flex items-center space-x-3 p-3" style={{ flexBasis: '30%' }}>
          <WWButton variant="v1" minWidth="8rem" text="Sort By" />
          <WWButton variant="v3" minWidth="6rem" text="Distance" className="rounded-full" />
          <WWButton variant="v3" minWidth="6rem" text="Time" className="rounded-full" />
          <WWButton variant="v3" minWidth="6rem" text="Price" className="rounded-full" />
          <WWButton variant="v3" minWidth="6rem" text="Rating" className="rounded-full" />
          {/* <button className="bg-red-600  text-white py-2 px-2 rounded-md min-w-[10rem]">Sort By</button>
          <button className="bg-gray-900 text-white py-2 px-2 rounded-md min-w-[10rem]">Distance</button>
          <button className="bg-gray-900 text-white py-2 px-2 rounded-md min-w-[10rem]">Time</button>
          <button className="bg-gray-900 text-white py-2 px-2 rounded-md min-w-[10rem]">Price</button>
          <button className="bg-gray-900 text-white py-2 px-2 rounded-md min-w-[10rem]">Rating</button> */}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 px-6">
        {filteredGyms.map((gym, index) => (
          <GymCard
            key={index}
            gymName={gym.gym_name}
            imageSrc={gym.images[0]}
            rating={gym.average_rating}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;