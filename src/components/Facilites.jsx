import React from 'react';
import { FaShower } from 'react-icons/fa';
import { GiPunchingBag, GiSteam, GiWeightLiftingUp } from 'react-icons/gi';
import { GrYoga } from 'react-icons/gr';
import { MdLocalParking } from 'react-icons/md';
import { PiLockers } from 'react-icons/pi';
import { TbAirConditioning, TbTreadmill } from 'react-icons/tb';

const availableFacilities = {
    shower: { icon: FaShower, label: 'Shower' },
    locker: { icon: PiLockers, label: 'Lockers' },
    air_condition: { icon: TbAirConditioning, label: 'Air Condition' },
    parking: { icon: MdLocalParking, label: 'Parking' },
    cardio: { icon: TbTreadmill, label: 'Treadmill' },
    yoga: { icon: GrYoga, label: 'Yoga' },
    weightlifting: { icon: GiWeightLiftingUp, label: 'Weight Lifting' },
    punching_bag: { icon: GiPunchingBag, label: 'Punching Bag' },
    steam: { icon: GiSteam, label: 'Steam' },
};

function Facilities({ facilities }) {
    if (!facilities || facilities.length === 0) {
        return <p>Facilities not mentioned</p>;
    }

    return (
        <div className='w-auto p-12 border border-gray-400'>
            {facilities.map((facility) => {
                const facilityData = availableFacilities[facility.toLowerCase()];
                if (!facilityData) return null;

                const IconComponent = facilityData.icon;
                return (
                    <div key={facility} className="flex items-center text-red-500">
                        <IconComponent className="mr-2" />
                        <span>{facilityData.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default Facilities;