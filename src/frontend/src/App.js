import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import Header from './components/Header';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import Account from './components/Account';

function App() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
  const [user, setUser] = useState({
    status: "SUCCESS",
    id: "1",
    email: "grant@email.com",
    first_name: "Grant",
    last_name: "Pierce"
});

useEffect(() => {
  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

function getWindowDimensions() {
  const {innerWidth, innerHeight} = window;
  return({innerWidth, innerHeight});
}

  /* //Auto-login fetch. Missing endpoint
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []); */

  return (
    <div className="App">
      <Header user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={!!Object.keys(user).length ? <HomePage user={user} windowDimensions={windowDimensions}/> : <LandingPage setUser={setUser} />} />
        <Route path="my_account" element={<Account user={user}/>} />
      </Routes>
    </div>
  );
}

export default App;
