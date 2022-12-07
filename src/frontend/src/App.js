import './App.css';
import React, { useState, useEffect } from "react";
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
      {!!Object.keys(user).length ? <HomePage user={user}/> : <LandingPage setUser={setUser} />}
    </div>
  );
}

export default App;
