import React, { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useCartContext } from "../../context/CardContext";
import { useLikedFoodContext } from "../../context/LikedFoodContext";
import axios from "axios";
import pizza from "../assets/spicy-pizza.png";
import rice from "../assets/biriyani.png";
import juice from "../assets/trio.png";
import fruit from "../assets/green plum.png";
import noodles from "../assets/noodles.png";
import desert from "../assets/moose.png";
import combo from "../assets/combo1.png";
import chicken from "../assets/KFC.png";
import { useFoodContext } from "../../context/foodContext";

const Menu = () => {
  const { Food, setFood } = useFoodContext();
  const { addToCart, cartItems, removeItem } = useCartContext();
  const { likedFoods, addLikedFood, removeLikedFood } = useLikedFoodContext(); // Retrieve likedFoods and methods to add/remove liked food
  const [active, setActive] = useState(0);
  const [value, setValue] = useState("all");

  const category = [
    {
      id: 0,
      name: "All",
      value: "all",
    },
    {
      id: 1,
      name: "Rice",
      value: "Rice",
      icon: rice,
    },
    {
      id: 2,
      name: "Pizza",
      value: "Pizza",
      icon: pizza,
    },
    {
      id: 3,
      name: "Noodles",
      value: "Noodles",
      icon: noodles,
    },
    {
      id: 4,
      name: "Desert",
      value: "Desert",
      icon: desert,
    },
    {
      id: 5,
      name: "Juice",
      value: "Juice",
      icon: juice,
    },
    {
      id: 6,
      name: "Fruits",
      value: "Fruits",
      icon: fruit,
    },
    {
      id: 7,
      name: "Combo",
      value: "Combo",
      icon: combo,
    },
    {
      id: 8,
      name: "Chicken",
      value: "Chicken",
      icon: chicken,
    },
  ];

  const handleBtn = (btn) => {
    setActive(btn.id);
    setValue(btn.value);
  };

  const handleLikeClick = (curElem) => {
    if (likedFoods.some((food) => food._id === curElem._id)) {
      removeLikedFood(curElem); // Remove from liked foods if already liked
    } else {
      addLikedFood(curElem); // Add to liked foods if not liked
    }
  };

  const getFoods = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/food/getAllFood?category=${value}`
      );
      if (res.data.success) {
        setFood(res.data.data.food);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFoods();
  }, [value]);

  return (
    <div className="pt-[16vh]">
      <div className="container mx-auto py-8">
        <div className="p-5 mb-14">
          <div className="flex flex-wrap justify-center mb-8 gap-5">
            {category?.map((btn) => (
              <button
                key={btn.id}
                className={
                  active === btn.id
                    ? "flex items-center justify-center text-xl px-4 py-3 text-white bg-black border-2 rounded-full font-medium"
                    : "flex items-center justify-center menu1 text-xl px-4 py-3 text-black border-black bg-white border-2 rounded-full font-bold"
                }
                onClick={() => {
                  handleBtn(btn);
                }}
              >
                {btn.icon && (
                  <img src={btn.icon} alt={btn.name} className="w-7 h-7 mr-2" />
                )}
                <span className={active === btn.id ? "font-bold" : ""}>
                  {btn.name}
                </span>
              </button>
            ))}
          </div>
          <div className="grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {Food?.map((curElem) => (
              <div
                className="food-card rounded-xl flex flex-col cursor-pointer items-center p-5"
                key={curElem._id}
              >
                <div className="relative mb-3">
                  <Link to={`/menu/${curElem?._id}`}>
                    <img
                      src={curElem?.foodImage}
                      alt=""
                      srcSet=""
                      style={{ width: "220px", height: "250px" }}
                    />
                  </Link>
                  <div className="absolute top-2 left-2 ">
                    <button className="shadow-sm text-white bg-red-100 hover:bg-red-700 cursor-pointer p-5 rounded-full relative">
                      <FaHeart
                        className={`absolute text-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                          likedFoods.some((food) => food._id === curElem._id)
                            ? "text-red-600"
                            : "text-gray-200"
                        }`}
                        onClick={() => handleLikeClick(curElem)}
                      />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <button className="shadow-sm bottom-4 border-white text-white bg-green-500 cursor-pointer p-3 h-14 w-20 text-xl font-bold rounded-full relative">
                      <div className="absolute text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                        Rs.{curElem?.price}
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <p className="text-2xl text-center font-bold text-black mt-2">
                    {curElem?.name}
                  </p>
                  <div className="flex text-sm space-x-2 cursor-pointer mt-2">
                    <span className=" font-normal text-lg text-green-500">
                      4.3
                    </span>
                    <FaStar
                      size={18}
                      className="text-[#fdc55e] mt-1"
                    />
                    <span className=" font-medium text-lg">
                      ({curElem?.reviews?.length})
                    </span>
                  </div>
                </div>
                {curElem.quantity <= 0 ? (
                  <button
                    className="disabled bg-gray-400 cursor-not-allowed rounded-full px-8 py-2 text-xl font-medium text-white mt-4"
                    disabled
                  >
                    Out of Stock
                  </button>
                ) : (
                  <>
                    {curElem.weight === 0 ? (
                      <>
                      <button className="bg-gray-50 cursor-not-allowed p-2 rounded-md text-red-500 text-2xl font-bold mt-4" disabled>
                          Out of Stock
                      </button>
                      <span className="text-red-500">It will be updated after 24 hours</span>
                  </>
                    ) : (
                      <>
                        {cartItems.some((item) => item._id === curElem._id) ? (
                          <button
                            className="remove bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-4"
                            onClick={() => removeItem(curElem)}
                          >
                            Remove from Cart
                          </button>
                        ) : (
                          <button
                            className="add active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-4"
                            onClick={() => addToCart(curElem)}
                          >
                            Add to Cart
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
