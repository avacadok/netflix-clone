import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [msg, setMsg] = useState('');
  const [signUp, setSignUp] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log('user sign in successfully', authUser)
      })
      .catch(err => {
        console.log("auth error", err)
        setErrMsg('Please enter a valid email and password.')
      })
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log('authUser', authUser)
        setEmail('');
        setPassword('');
        setErrMsg('');
        setName('');
        setMsg(`Welcome to Netflix ${name}. Sign in to discover more.`)
      })
      .catch(err => {
        console.log("auth error123", err.code)
        setMsg('')
        //setErrMsg(err.message)
        if (err.code == 'auth/invalid-email') {
          setErrMsg('Please enter a valid email address')
        }

        if (err.code == 'auth/email-already-in-use') {
          setErrMsg('This email is already in use, please enter a different email.')
        }

        if (err.code == 'auth/weak-password') {
          setErrMsg('Password should be at least 6 characters or longer.')
        }

        if (err.code == 'auth/internal-error') {
          setErrMsg('Password cannot be empty.')
        }
      })
  }

  return (
    <div className='signIn'>
      {!signUp ? <form >
        <h1>Sign In</h1>
        {errMsg ? <p className='errmsg'>{errMsg}</p> : <></>}
        <input placeholder='Email'
          type={'email'}
          onChange={(e) => setEmail(e.target.value)}
          value={email} />

        <input placeholder='Password'
          type={'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type='Submit' onClick={handleSignIn}>Sign In</button>

        <div>
          <span className='new-to'>New to Netflix?</span>
          <span className='signup-link' onClick={() => { setSignUp(true); setErrMsg('') }}>Sign up now.</span>
        </div>
      </form>
        :
        <form >
          <h1>Sign Up</h1>
          {errMsg ? <p className='errmsg'>{errMsg}</p> : <></>}
          {msg ? <p className='signup-msg'>{msg}</p> : <></>}
          <input placeholder='Username'
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

          <div>
            <span className='new-to'>Have an account already?</span>
            <span className='signup-link' onClick={() => { setSignUp(false); setErrMsg('') }}>Sign in now.</span>
          </div>

        </form>
      }
    </div>
  )
}

export default SignIn;