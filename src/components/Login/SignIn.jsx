import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignUp] = useState(false)

  const handleSignIn = (e) => {
    e.preventDefault();
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log('authUser', authUser)
      })
      .catch(err => console.log("auth error", err))
  }

  return (
    <div className='signIn'>
      {!signUp ? <form onClick={handleSignIn}>
        <h1>Sign In</h1>
        <input placeholder='Email'
          type={'email'}
          onChange={(e) => setEmail(e.target.value)}
          value={email} />

        <input placeholder='Password'
          type={'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type='Submit'>Sign In</button>

        <div>
          <span className='new-to'>New to Netflix?</span>
          <span className='signup-link' onClick={() => { setSignUp(true) }}>Sign up now.</span>
        </div>
      </form> :
        <form onClick={handleSignIn}>
          <h1>Sign Up</h1>
          <input placeholder='Name'
          type={'name'}
          onChange={(e) => setName(e.target.value)}
          value={name}
          required={true} />
          
          <input placeholder='Email'
            type={'email'}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={true} />

          <input placeholder='Password'
            type={'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={true}
          />
          <button type='Submit' onClick={handleSignUp}>Sign Up</button>

        </form>
      }
    </div>
  )
}

export default SignIn;