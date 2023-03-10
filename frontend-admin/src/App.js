import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Product from './pages/Productlist';
import Category from './pages/Categorylist'
import Coupon from './pages/Couponlist';
import Addproduct from './pages/Addproduct';
import Addcategory from './pages/Addcategory';
import Addcoupon from './pages/Addcoupon';


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
          <Route path='product-list' element={<Product />} />
          <Route path='category-list' element={<Category />} />
          <Route path='coupon-list' element={<Coupon />} />
          <Route path='product' element={<Addproduct />} />
          <Route path='product/:id' element={<Addproduct />} />
          <Route path='category' element={<Addcategory />} />
          <Route path='category/:id' element={<Addcategory />} />
          <Route path='add-coupon' element={<Addcoupon />} />
          <Route path='coupon/:id' element={<Addcoupon />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
