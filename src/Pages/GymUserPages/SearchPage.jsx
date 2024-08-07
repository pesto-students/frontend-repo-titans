import React from 'react';
import WWButton from '../../components/WWButton';

function SearchPage() {
  return (
    <div>
      Search Page
      <WWButton text="Next" to="/bookings" variant="v3" minWidth="24rem"/>
    </div>
  );
}

export default SearchPage;