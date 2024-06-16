import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Sign from './pages/SignIn/Sign';


export default function App() {
  return (
    <BrowserRouter>
      
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sign />} />
        </Routes>
    
    </BrowserRouter>
  );
}
