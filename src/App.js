import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const user = null;
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
