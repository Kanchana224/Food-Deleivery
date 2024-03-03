import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import PageNavigation from '../components/PageNavigation';
import { useCartContext } from '../../context/CardContext';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const FoodPage = () => {
    const params = useParams();
    const { addToCart, cartItems, removeItem } = useCartContext();
    const [foodDetails, setFoodDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const getFoodDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/food/getFood/${params.id}`);
            if (res.data.success) {
                setFoodDetails(res.data.data.food);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFoodDetails();
    }, []);

    const handleAddToCart = () => {
        addToCart({ ...foodDetails, quantity }); // Include quantity in the item object
    };

    const handleRemoveFromCart = () => {
        removeItem(foodDetails); // Remove the item from the cart
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
        // Update cart count
        addToCart({ ...foodDetails, quantity: quantity + 1 });
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            // Remove quantity from cart
            removeItem({ ...foodDetails, quantity: 1 });
        } else {
            // If quantity is 1 or less, remove the item from the cart
            removeItem(foodDetails);
        }
    };

    return (
        <div className="pt-[16vh]">
            <div className="py-3 px-10 sm:px-6 lg:px-6">
                <div className="container mx-auto">
                    <PageNavigation title={foodDetails?.name} />

                    <div className="grid grid-cols-1 md:grid-cols-2 pb-14 gap-8">
                        <div className="bg-white border rounded-md mb-5 p-4">
                            <img src={foodDetails?.foodImage} alt="" className='w-full h-[25rem] cursor-pointer' />
                        </div>
                        <div className={`bg-white border rounded p-8 text-black mb-5 ${foodDetails?.weight === 0 ? 'out-of-stock' : ''}`}>
                            <div className="text-2xl mb-2 font-bold text-[#f54748]">
                                {foodDetails?.name}
                            </div>
                            <div className="text-2xl mb-2 font-bold text-green-500">
                                Price : Rs.{foodDetails?.price}
                            </div>
                            <div className="text-xl text-justify text-black mb-6">
                                {foodDetails?.description}
                            </div>
                            {/* Quantity Section */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-2xl font-bold text-black">
                                    Quantity
                                </div>
                                <span className="flex items-center space-x-4">
                                    <div className="bg-black relative p-4 rounded-full text-white cursor-pointer" onClick={handleDecrement}>
                                        <AiOutlineMinus className='font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' size={20} />
                                    </div>
                                    <span className="text-black px-6 py-2 bg-slate-50 text-lg font-bold">
                                        {quantity}
                                    </span>
                                    <div className="bg-black relative p-4 rounded-full text-white cursor-pointer" onClick={handleIncrement}>
                                        <AiOutlinePlus className='font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' size={20} />
                                    </div>
                                </span>
                            </div>
                            {/* Add to Cart Button */}
                            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:gap-5 sm:mx-auto sm:justify-center">
                                {foodDetails?.weight !== 0 && cartItems.some(item => item._id === foodDetails?._id) ? (
                                    <button className="bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white" onClick={handleRemoveFromCart}>
                                        Remove from Cart
                                    </button>
                                ) : foodDetails?.weight !== 0 ? (
                                    <button className="bg-black active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white" onClick={handleAddToCart}>
                                        Add to Cart
                                    </button>
                                ) : (
                                    <>
                                    <button className="bg-gray-50 cursor-not-allowed p-2 rounded-md text-red-500 text-2xl font-bold mt-4" disabled>
                                        Out of Stock
                                    </button>
                                    <span className="text-red-500">It will be updated after 24 hours</span>
                                </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="grid lg:grid-cols-4 pb-14 md:grid-cols-2 grid-cols-2 gap-8">
                        <div className="bg-black py-4 text-center text-white font-semibold rounded-full">
                            Category: {foodDetails?.category}
                        </div>
                        <div className="bg-black py-4 text-center text-white font-semibold rounded-full">
                            Quantity: {foodDetails?.weight} Nos
                        </div>
                        <div className="bg-black py-4 text-center text-white font-semibold rounded-full">
                            Location: Chennai
                        </div>
                        <div className="bg-black py-4 text-center text-white font-semibold rounded-full">
                            Location: Chennai
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodPage;
