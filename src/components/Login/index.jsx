import React from 'react';
import '../../styles/loginPage.css'

function index() {
  return (
    <section className='login'>
      <div className='login-background'>
        <img className='login-logo'
          src='https://imgur.com/mcwxjvi.png' alt='login-background' />

        <button className='login-button'>Sign In</button>
        <div className='login-fade'></div>

        <div className='login-body'>
          <>
          <h1 className='login-h1'>Unlimited movies, TV shows, and more.</h1>

          <h2 className='login-h2'>Watch anywhere. Cancel anytime.</h2>

          <p className='login-p'>Ready to watch? Enter you email to create or restart your membership.</p>
          
          <div className='login-input'>
            <form className='login-input-email'>
              <input type={'email'} placeholder='Email address'/>
            <button className='get-started'>Get Started</button>
            </form>
          </div>
          </>

        </div>

      </div>
    </section>
  )
}

export default index;