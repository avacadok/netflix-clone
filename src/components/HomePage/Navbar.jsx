import React, { useEffect, useState } from 'react';

function Navbar() {
  const [show, setShow] = useState(false);

//create function when to show navbar 
  const transitionNav = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNav);
    return () => window.removeEventListener("scroll", transitionNav);
  }, [])
  return (
    <section className={`navbar ${show && 'navbar-black'}`}>
      <div className='nav-content'>
        <div>
          <img src='https://imgur.com/mcwxjvi.png' alt='homepage-logo' className='nav-logo' /> 
          <div className='nav-titles'>
            <span className='home-title'>Home</span>
            <span className='home-title'>TV Shows</span>
            <span className='home-title'>Movies</span>
            <span className='home-title'>New & Popular</span>
            <span className='home-title'>My List</span>
          </div>
        </div>
       
        <img src='https://imgur.com/F9LQMzR.png' alt='homepage-avatar' className='nav-avatar' />
      </div>

    </section>
  )
}

export default Navbar;