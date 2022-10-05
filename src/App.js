import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login, selectUser } from './features/userSlice'

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log('213231',user)

  useEffect(() => {
    const userLogin = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // logged in
        console.log("userAuth sdf sdf", userAuth)
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        //loggd out
        dispatch(logout)
      }
    })

    return userLogin();
  }, [])
  return (
    <div className="app">
      <Router>
        <Routes>
          {user ? <Route exact path="/" element={<HomePage />} /> : <Route exact path="/" element={<Login />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
