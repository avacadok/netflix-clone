import React from 'react';

function SignIn() {
  return (
    <div className='signIn'>
      <form>
        <h1>Sign In</h1>
        <input placeholder='Email' type={'email'} />
        <input placeholder='Password' type={'password'} />
        <button type='Submit'>Sign In</button>

        <div>
          <span className='new-to'>New to Netflix?</span>
          <span className='signup-link'>Sign up now.</span>
        </div>
      </form>
    </div>
  )
}

export default SignIn;