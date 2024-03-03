import React, { useState } from 'react';
import './App.css';
import Navbar from './Shared/Navbar';
import Footer from './Shared/Footer';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Pages/ProtectedRoute';
import VerifyOtp from './Pages/VerifyOtp';
import Addfood from './Pages/admin/Addfood';
import Menu from './Pages/Menu';
import FoodPage from './Pages/FoodPage';
import Profile from './Pages/Profile';
import ViewCart from './Pages/ViewCart';
import Success from './Pages/Success';
import Cancel from './Pages/Cancel';
import Order from './Pages/Order';
import MyOrder from './Pages/MyOrder';
import AllOrder from './Pages/admin/AllOrder';
import RecommendedFood from './components/RecommendedFood';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './Pages/Home';
import TodaySpecial from "./Pages/TodaySpecial"
import AboutUs from './Pages/AboutUs';
import FoodList from './Pages/admin/FoodList';
import UpdateFood from './Pages/admin/UpdateFood';
import Liked from './Pages/Liked';

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
