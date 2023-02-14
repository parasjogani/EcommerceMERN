import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Productlist from './pages/Productlist';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<Resetpassword />} />
        <Route path='/forgot-password' element={<Forgotpassword />} />
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='orders' element={<Orders />} />
          <Route path='customers' element={<Customers />} />
          <Route path='product-list' element={<Productlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
