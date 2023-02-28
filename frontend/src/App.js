import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About'
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword'
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import Resetpassword from './pages/Resetpassword';
import Wishlist from './pages/Wishlist';
import OurStore from './pages/OurStore';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path='forgot-password' element={<Forgotpassword />} />
            <Route path='reset-password/:token' element={<Resetpassword />} />
            <Route path='privacy-policy' element={<PrivacyPolicy />} />
            <Route path='refund-policy' element={<RefundPolicy />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='product' element={<OurStore />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
