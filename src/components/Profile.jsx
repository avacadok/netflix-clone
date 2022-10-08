import React from 'react';
import Nav from './HomePage/Navbar';
import './../styles/profile.css';
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import Plans from './Plan';

function Profile() {
  const user = useSelector(selectUser)
  return (
    <section className='profile'>
      <Nav />
      <div className='profile-body'>
        <h1>Edit Profile</h1>

        <div className='profile-info'>
          <img src='https://imgur.com/F9LQMzR.png' alt='homepage-avatar' className='' />

          <div className='profile-detail'>
            <h2>{user.email}</h2>
            <div className='profile-plans'>
            <h3>Plans</h3>
            <Plans/>
              <Link to={'/'}>
                <button
                  className='profile-signout'
                  onClick={() => auth.signOut()}
                >Sign Out</button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile;