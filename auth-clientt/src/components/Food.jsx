import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useCartContext } from '../../context/CardContext';
import { Link } from 'react-router-dom';
import { useLikedFoodContext } from '../../context/LikedFoodContext'; // Correct import

const Foods = ({ curElem }) => {
  const { addToCart, cartItems, removeItem, addLikedFood } = useCartContext(); // Add addLikedFood from useCartContext
  const { likedFoods } = useLikedFoodContext(); // Retrieve likedFoods from context
  const [liked, setLiked] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false); // State to track if the food is out of stock

  const handleAddToCart = () => {
    addToCart({ ...curElem, quantity: 1 });
  };

  const handleRemoveFromCart = () => {
    removeItem(curElem);
  };

  const handleLikeClick = () => {
    const updatedLiked = !liked;
    setLiked(updatedLiked);

    const storedLikedFoods = JSON.parse(localStorage.getItem('likedFoods')) || [];

    if (updatedLiked) {
        const newLikedFoods = [...storedLikedFoods, curElem];
        localStorage.setItem('likedFoods', JSON.stringify(newLikedFoods));
        addLikedFood(curElem);
    } else {
        const updatedLikedFoods = storedLikedFoods.filter(food => food._id !== curElem._id);
        localStorage.setItem('likedFoods', JSON.stringify(updatedLikedFoods));
    }
};

useEffect(() => {
  // Retrieve liked foods from localStorage
  const storedLikedFoods = JSON.parse(localStorage.getItem('likedFoods')) || [];
  // Check if the current element is in the liked foods list
  const isLiked = storedLikedFoods.some(food => food._id === curElem._id); // Corrected comparison to use _id
  setLiked(isLiked);

  // Check if the food is out of stock
  setIsOutOfStock(curElem?.weight === 0);
}, [curElem._id, curElem.weight]); // Corrected dependency

  return (
    <div className={`food-card rounded-xl flex flex-col cursor-pointer items-center p-5 ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="relative mb-3">
        <Link to={`/menu/${curElem?._id}`}>
          <img
            src={curElem?.foodImage}
            alt=""
            className="food-image"
            style={{ width: "220px", height: "250px" }}
          />
        </Link>
        <div className="absolute top-0 left-0">
          <button
            className={`shadow-xl text-white bg-red-200 hover:bg-red-400 cursor-pointer p-6 rounded-full relative`}
            onClick={handleLikeClick} // Call handleLikeClick on like button click
          >
            <FaHeart className={`absolute text-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${liked ? 'text-red-600' : 'text-gray-200'}`} />
          </button>
        </div>
        <div className="absolute bottom-2 right-2">
          <button className="shadow-sm bottom-4 border-white text-white bg-green-500 cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full relative">
            <div className="absolute text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              ${curElem?.price}
            </div>
          </button>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <p className="text-xl text-center font-bold text-black">
          {curElem?.name}
        </p>
        <div className="flex text-sm space-x-2 cursor-pointer">
          <span className="font-normal text-green-500">4.3</span>
          <FaStar size={16} className="text-[#fdc55e]" />
          <span className="font-medium">
            ({curElem?.reviews?.length})
          </span>
        </div>
      </div>
      {isOutOfStock ? (
    <>
        <button className="bg-gray-50 cursor-not-allowed p-2 rounded-md text-red-500 text-2xl font-bold mt-4" disabled>
            Out of Stock
        </button>
        <span className="text-red-500">It will be updated after 24 hours</span>
    </>
) : (
    <>
        {cartItems.length > 0 && cartItems.some(item => item._id === curElem?._id) ? (
            <button className="remove bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-4" onClick={handleRemoveFromCart}>
                Remove from Cart
            </button>
        ) : (
            <button className="add bg-black-700 active:scale-90 transition duration-500 transform hover:shadow-2xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-4" onClick={handleAddToCart}>
                Add to Cart
            </button>
        )}
    </>
)}
    </div>
  );
};

export default Foods;
