import React, { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { FiMapPin, FiSearch, FiChevronDown } from "react-icons/fi";
import GymCard from "../../components/GymCard.jsx";
import api from "../../api/axios";
import WWButton from "../../components/WWButton.jsx";


const SearchPage = () => {
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState("");
  const [loaded, setIsLoaded] = useState(false);

  const dataRef = useRef({});

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [citiesLoaded, setCitiesLoaded] = useState(false); // New state variable
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({});
  const [filteredGyms, setFilteredGyms] = useState({});
  const dropdownRef = useRef(null);

  //set the height of the dropdown
  const divRef = useRef(null);

  const [page, setPage] = useState(1);
  const bottom = useRef(null);


  useEffect(() => {
    dataRef.current = gyms;
  }, [gyms]);


  // this will fetch the data on the basis of current position
  useEffect(() => {
    fetchData();
  }, [currentPosition]);

  useEffect(() => {
    fetchNextData();
  }, [page]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  async function fetchMorePosts(dataRef) {
    if (dataRef.current.totalPages > 1)
      flushSync(() => {
        setPage(
          (no) => no + 1
        );
      });
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMorePosts(dataRef);
      }
    });
    observer.observe(bottom.current);
  }, []);

  // -----------------------------
  // useEffect(() => {
  //   if (citiesLoaded) {
  //     getCurrentLocation();
  //   }
  // }, [citiesLoaded]);

  //to handle the dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.height = `${window.innerHeight - 150}px`;
    }
  }, [dropdownOpen]);

  const searchGymsByName = (e) => {
    const name = e.target.value;
    if (name) {
      console.log("gyms : " ,gyms);
      
      const filtered = gyms.gyms.filter((gym) =>
        gym.gym_name.toLowerCase().includes(name.toLowerCase())
      );
 
      console.log("filterred",filtered);
      
      setFilteredGyms(filtered);
    } else setFilteredGyms(gyms);
  };

  const fetchCities = async () => {
    try {
      const res = await api.get(`/gyms/cities`);

      setCities(res.data);
      setCitiesLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = async (city) => {
    setSelectedCity(city);
    setSelectedPosition({ latitude: city.latitude, longitude: city.longitude });
    setDropdownOpen(false);
    // Add any additional logic for when a city is selected
    // show cities only from that

    const response = await api.get(`/gyms?city=${city.name}`)
    setGyms(response.data)
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude: latitude, longitude: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchData = async (filterByattribute = false, targetAttribute = "") => {
    try {
      let response;

      const { latitude, longitude } = currentPosition;
      if (filterByattribute) {
        response = await api.get(
          `/gyms?sort_by=${targetAttribute}`
        );
        setPage(1);
      } else {
        response = await api.get(`/gyms?order_by=asc`);
      }

      if (response.data.total) {
        setGyms(response.data);

        setError("");
      } else {
        throw new Error("Sorry ! There is No gym near your location");
      }
    } catch (e) {
      console.log("error:", e.message);
      setError(e.message);
    } finally {
      setIsLoaded(true);
    }
  };

  const fetchNextData = async () => {
    if (loaded) {
      let response = await api.get(
        `/gyms?page=${page}&order_by=asc`
      );
      let responseGymData = response.data.gyms;

      setGyms(...responseGymData);
    }
  };

  const sortedByAttribute = (e) => {
    let targetAttribute = e.target.name.toLowerCase();
    
    fetchData(true, targetAttribute);
  };

  return (
    <div className="w-full min-h-screen px-4 mx-auto bg-black searchPage">
      <div className="flex flex-col items-center justify-between w-11/12 p-3 mx-auto bg-black lg:flex-row">
        <div
          className="flex items-center justify-between p-3 space-x-2 "
          style={{ flexBasis: "50%" }}
        >
          <div className="relative" ref={dropdownRef} onClick={fetchCities}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center px-4 py-2 text-white bg-red-600 no-scrollbar lg:min-w-60"
            >
              <FiMapPin className="w-5 h-5 mr-2" />
              <span className="text-white">{selectedCity.name}</span>
              <FiChevronDown className="w-5 h-5 ml-2" />
            </button>
            {dropdownOpen && (
              <div
                ref={divRef}
                className="absolute z-10 w-full mt-2 overflow-auto bg-red-600 shadow-lg"
              >
                {cities.map((city) => (
                  <div
                    key={city.name}
                    onClick={() => handleCityChange(city)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white"
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-full">
            <input
              type="text"
              id="gymName"
              name="gymName"
              placeholder="Search GYM"
              className="w-full px-3 py-2 pr-10 text-white border bg-wwbg focus:outline-none focus:border-red-500"
              onChange={searchGymsByName}
            />
            <FiSearch className="absolute w-5 h-5 text-red-500 transform -translate-y-1/2 right-4 top-1/2" />
          </div>
        </div>
        <div
          className="flex items-center gap-3 sort-by"
          style={{ flexBasis: "30%" }}
        >
          <button className="py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full">Sort By 
            
          </button>


          <WWButton
            variant="v3"
            minWidth="4rem"
            text="Distance"
            className="rounded-full"
            name={"distance"}
            onClick={(e) => sortedByAttribute(e)}
          />
          <WWButton
            variant="v3"
            minWidth="4rem"
            text="Time"
            className="rounded-full"
            name={"time"}
            onClick={(e) => sortedByAttribute(e)}
          />
          <WWButton
            variant="v3"
            minWidth="4rem"
            text="Price"
            className="rounded-full"
            name={"price"}
            onClick={(e) => sortedByAttribute(e)}
          />
          <WWButton
            variant="v3"
            minWidth="4rem"
            text="Rating"
            className="rounded-full"
            name={"rating"}
            onClick={(e) => sortedByAttribute(e)}
          />
        </div>
      </div>
      {!loaded && (
        <div className="flex justify-center font-bold text-red-600 ">
          loading...
        </div>
      )}
      {error && (
        <div className="flex justify-center font-bold text-red-600 ">
          {error}
        </div>
      )}
      {loaded && !error && (
        <div className="grid w-11/12 mx-auto lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-8 md:mt-8">
          {console.log(gyms)}
          {gyms?.gyms?.map((gym, index) => (
            <GymCard
              key={index}
              gymName={gym.gym_name}
              imageSrc={gym.images[0]}
              rating={gym.average_rating}
              gymId={gym._id}
            />
          ))}
          {gyms?.totalPages > page && (
            <div className="font-bold text-red-600">loading...</div>
          )}
        </div>
      )}
      <div ref={bottom} />
    </div>
  );
};

export default SearchPage;