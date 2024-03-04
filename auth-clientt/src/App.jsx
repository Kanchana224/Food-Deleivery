import React, { useState } from 'react';
import './App.css';
import Navbar from './Shared/Navbar.jsx';
import Footer from './Shared/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Pages/ProtectedRoute.jsx';
import VerifyOtp from './Pages/VerifyOtp.jsx';
import Addfood from './Pages/admin/Addfood.jsx';
import Menu from './Pages/Menu.jsx';
import FoodPage from './Pages/FoodPage.jsx';
import Profile from './Pages/Profile.jsx';
import ViewCart from './Pages/ViewCart.jsx';
import Success from './Pages/Success.jsx';
import Cancel from './Pages/Cancel.jsx';
import Order from './Pages/Order.jsx';
import MyOrder from './Pages/MyOrder.jsx';
import AllOrder from './Pages/admin/AllOrder.jsx';
import RecommendedFood from './components/RecommendedFood';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './Pages/Home.jsx';
import TodaySpecial from "./Pages/TodaySpecial.jsx"
import AboutUs from './Pages/AboutUs.jsx';
import FoodList from './Pages/admin/FoodList.jsx';
import UpdateFood from './Pages/admin/UpdateFood.jsx';
import Liked from './Pages/Liked.jsx';

const stripePromise = loadStripe("pk_test_51Om8PESBtUcYrYBCYP4VhhUAqg0bswQDx0yDjehy3fcFQRqZsJc5OeoKMmsnNsXoB2xf1LMboDkajYamlRPsLiY600ki7Yzho9");

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyOtp" element={<ProtectedRoute><VerifyOtp /></ProtectedRoute>} />
        <Route path="/addfood" element={<ProtectedRoute><Addfood /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
        <Route path="/menu/:id" element={<ProtectedRoute><FoodPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/viewcart" element={<ProtectedRoute><ViewCart /></ProtectedRoute>} />
        <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path="/cancel" element={<ProtectedRoute><Cancel /></ProtectedRoute>} />
        <Route path="/todaySpecial" element={<ProtectedRoute><TodaySpecial/></ProtectedRoute>} />
        <Route path="/my-order" element={<ProtectedRoute><MyOrder /></ProtectedRoute>} />
        <Route path="/all-order" element={<ProtectedRoute><AllOrder /></ProtectedRoute>} />
        <Route path="/about-us" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="/food-control" element={<ProtectedRoute><FoodList /></ProtectedRoute>} />
        <Route path="/update/:id" element={<ProtectedRoute><UpdateFood /></ProtectedRoute>} />
        <Route path="/likedFoods" element={<ProtectedRoute><Liked/></ProtectedRoute>} />

        
        
        <Route path="/order" element={<ProtectedRoute>
          <Elements stripe={stripePromise}>
            <Order />
          </Elements>
        </ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
