// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Home/HomePage'; // Ana sayfa bileşeni
import Navbar from './components/common/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
    
  );
}

export default App;
