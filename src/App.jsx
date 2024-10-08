import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './tailwind.css'
import Product from './pages/product/product.jsx'; // Make sure to use correct import path
import Register from './pages/authentication/register'; // Example additional page
import Login from './pages/authentication/login'; 
import ResetPassword from './pages/authentication/ResetPassword'; 
import Dashboard from './pages/dashboard/app.jsx'; // Example additional page
import LandingPage from './pages/LandingPage/Hero/hero.jsx';
import EnterpriseLandingPage from './pages/EnterpriseLandingPage/EnterpriseLandingPage.jsx'
import { HelmetProvider } from 'react-helmet-async';



function App() {
  return (
    <HelmetProvider>
    <Router>
      <Routes>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/reset-password" element={<ResetPassword/>}/>
        <Route path="/enterprise" element={<EnterpriseLandingPage/>}/>
        <Route path="/" element={<LandingPage />}/> 
        {/* Change to the landing page instead of dashboard */}
      </Routes>
    </Router>
    </HelmetProvider>
  );
}

export default App;
