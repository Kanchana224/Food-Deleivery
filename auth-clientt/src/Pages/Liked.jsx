import React from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useCartContext } from "../../context/CardContext";

const LikedPage = () => {
    const likedFoods = JSON.parse(localStorage.getItem('likedFoods')) || [];
    const { addToCart, removeItem, cartItems } = useCartContext();

    const handleLikeClick = (food) => {
        const isLiked = likedFoods.some(item => item._id === food._id);
        let updatedLikedFoods;
        if (isLiked) {
            updatedLikedFoods = likedFoods.filter(item => item._id !== food._id);
        } else {
            updatedLikedFoods = [...likedFoods, food];
        }
        localStorage.setItem('likedFoods', JSON.stringify(updatedLikedFoods));
    };

    const handleDislikeClick = (food) => {
        const updatedLikedFoods = likedFoods.filter(item => item._id !== food._id);
        localStorage.setItem('likedFoods', JSON.stringify(updatedLikedFoods));
    };

    const isItemInCart = (food) => {
        return cartItems.some(item => item._id === food._id);
    };

    return (
        <div className="pt-[16vh]">
            <div className="container mx-auto py-8">
                <div className="p-5 mb-14">
                    <h1 className="text-2xl font-bold mb-4">Liked Foods</h1>
                    <div className="grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        {likedFoods.map(food => (
                            <div key={food._id} className="food-card rounded-xl flex flex-col cursor-pointer items-center p-5">
                                <div className="relative mb-3">
                                    <img
                                        src={food.foodImage}
                                        alt=""
                                        className="food-image"
                                        style={{ width: "350px", height: "280px" }}
                                    />
                                    <div className="absolute top-0 left-0">
                                        <FaHeart className={`absolute text-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${likedFoods.some(item => item._id === food._id) ? 'text-red-600 cursor-pointer' : 'text-gray-400 cursor-pointer'}`} onClick={() => likedFoods.some(item => item._id === food._id) ? handleDislikeClick(food) : handleLikeClick(food)} />
                                    </div>
                                    <div className="absolute bottom-2 right-2">
                                        <button className="shadow-sm bottom-4 border-white text-white bg-green-500 cursor-pointer p-3 h-14 w-20 text-xl font-bold rounded-full relative">
                                            <div className="absolute text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                                                Rs.{food.price}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className="text-2xl text-center font-bold text-black mt-2">
                                        {food.name}
                                    </p>
                                    <div className="flex text-sm space-x-2 cursor-pointer mt-2">
                                        <span className=" font-normal text-lg text-green-500">
                                            4.3
                                        </span>
                                        <FaStar size={18} className="text-[#fdc55e] mt-1" />
                                        <span className=" font-medium text-lg">
                                            ({food.reviews?.length})
                                        </span>
                                    </div>
                                </div>
                                {isItemInCart(food) ? (
                                    <button className="remove bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-4" onClick={() => handleAddToCart(food)}>
                                        Added to Cart
                                    </button>
                                ) : (
                                    <button className="add active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-4" onClick={() => handleAddToCart(food)}>
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LikedPage;
