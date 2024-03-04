import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartContext } from '../../context/CardContext.jsx';
import { useUserContext } from '../../context/UserContext.jsx';
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import Success from './Success.jsx';
import Cancel from './Cancel.jsx';

const Order = () => {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const { cartItems } = useCartContext();
    const { user } = useUserContext();
    const stripe = useStripe();

    const itemsPrice = cartItems.reduce((a, e) => a + e.price * e.Qty, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = Math.round(itemsPrice + Number(taxPrice) + shippingPrice);

    const handleFinish = async () => {
        try {
            const orderItems = cartItems.map(item => ({
                food: item._id,
                Qty: item.Qty,
                price: item.price,
                taxPrice: taxPrice,
                shippingPrice: shippingPrice,
            }));

            const userId = user?.user?._id;
            if (!userId) {
                throw new Error("User ID is undefined");
            }

            const response = await axios.post("https://food-deleivery.onrender.com/api/v1/order/session", {
                userId: userId,
                items: orderItems,
                totalAmount: totalPrice,
                taxPrice: taxPrice, 
                shippingPrice: shippingPrice, 
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const sessionId = response.data.sessionId;
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId
            });

            if (error) {
                throw new Error(error.message);
            } else {
                setPaymentSuccess(true);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            toast.error("Oops...Something went wrong");
            setPaymentSuccess(false);
        }
    };

    return (
        <div className="Order" style={{ marginTop: '20vh' }}>
            <div className="h-screen">
                <div className='ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80
                lg:w-[28rem] mx-auto flex flex-col items-center rounded-md px-8 py-5'>
                    <NavLink to="/">
                        <img src={logo} alt="" className='logo h-24 w-40 mb-6 cursor-pointer text-center'/>
                    </NavLink>
                    <div className="text-xl text-[#2e2e2e] mb-3">
                        Items Price: <span className="text-[#f54748]">Rs.{itemsPrice}</span>
                    </div>
                    <div className="text-xl text-[#2e2e2e] mb-3">
                        Tax Price: <span className="text-[#f54748]">Rs.{taxPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-xl text-[#2e2e2e] mb-3">
                        Shipping Amount: <span className="text-[#f54748]">Rs.{shippingPrice}</span>
                    </div>
                    <div className="text-xl text-[#2e2e2e] mb-3">
                        Total Price: <span className="text-[#f54748]">Rs.{totalPrice}</span>
                    </div>
                    <button className=' bg-[#f54748] active:scale-90 transition duration-150 transform
                    hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium
                    text-white mx-auto text-center' onClick={handleFinish}>Pay Rs.{totalPrice}</button>

                    <ToastContainer/>
                </div>
            </div>
            {/* Conditionally render Success or Cancel component based on payment success state */}
            {paymentSuccess ? <Success /> : null}
            {!paymentSuccess ? null : <Cancel />}
        </div>
    );
}

export default Order;
