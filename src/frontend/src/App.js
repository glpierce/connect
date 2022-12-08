import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={!!Object.keys(user).length ? <HomePage user={user} /> : <LandingPage setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
