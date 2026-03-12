import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Room from './components/Room.jsx';

function App() {
  return (
    <div className="bb-app bg-page text-light min-vh-100 d-flex flex-column">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:roomCode" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;

