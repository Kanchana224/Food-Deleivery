// LikedFoodContext.js
import React, { createContext, useContext, useState } from 'react';

const LikedFoodContext = createContext();

export const useLikedFoodContext = () => useContext(LikedFoodContext);

export const LikedFoodProvider = ({ children }) => {
  const [likedFoods, setLikedFoods] = useState([]);

  const addLikedFood = (food) => {
    setLikedFoods((prevLikedFoods) => [...prevLikedFoods, food]);
  };

  const removeLikedFood = (food) => {
    setLikedFoods((prevLikedFoods) => prevLikedFoods.filter((item) => item._id !== food._id));
  };

  return (
    <LikedFoodContext.Provider value={{ likedFoods, addLikedFood, removeLikedFood }}>
      {children}
    </LikedFoodContext.Provider>
  );
};
