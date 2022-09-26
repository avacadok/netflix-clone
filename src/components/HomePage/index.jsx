import React from 'react';
import "../../styles/homePage.css"
import Banner from './Banner';
import Navbar from './Navbar';

function HomePage() {
  return (
    <div className='homePage'>
      <Navbar />
      <Banner />

      {/* Footer */}
    </div>
  )
}

export default HomePage;