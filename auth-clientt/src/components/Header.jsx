import React, { useState } from "react";
import { FaPlay, FaSearch } from "react-icons/fa";
import buffet from "../assets/buffet.png";
import { Link } from "react-router-dom";
import foodVideo from "../assets/FoodVideo.mp4";

const Header = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleWatchNow = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
      <div className="container mx-auto py-[16vh]">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
          <div className="lg:w-[40remrem] w-full flex flex-col space-y-6">
            <div className="text-2xl md:text-4xl font-bold text-[#2e2e2e] lg:text-5xl">
              We are <span className="text-[#f54748]">Serious</span> For{" "}
              <span className="text-[#f54748]">Food</span> &{" "}
              <span className="text-[#Fdc55e]">Delivery ..</span>
            </div>
            <div className="font-bold text-md">
              At the Food Hub, our culinary masterpieces are not just meals; they
              are experiences crafted to ignite your senses and leave you craving
              for more. From  Our chefs, like culinary artisans, blend passion and
              precision to create dishes that are as visually stunning as they are
              delectable. With ingredients handpicked from local purveyors, each
              bite is a celebration of freshness and quality, a testament to our
              commitment to excellence. Step into our world of culinary
              enchantment, where every meal is an occasion, and every guest is
              cherished. At the Food Hub, we invite you to savor the moment, savor
              the flavors, and savor the experience.
            </div>
            <div className="flex rounded-full py-2 px-4 justify-between items-center bg-white shadow-md">
              <div className="flex items-center">
                <FaSearch size={22} className="cursor-pointer" />
                <input
                  type="text"
                  placeholder="Search food here..."
                  className="text-[#191919] w-full border-none outline-none py-2 px-4"
                />
              </div>
              <div className="h-10 w-10 relative bg-[#fdc55e] rounded-full">
                <FaSearch
                  size={15}
                  className="cursor-pointer text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              
            </div>
            <div className="flex  gap-14 items-center ">
              <button
                className="bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-8"
              >
                <Link to="/todaySpecial">Explore New </Link>
              </button>
              <div className="sm:flex hidden gap-4 items-center">
                <div className="h-14 w-14 shadow-md cursor-pointer relative bg-white rounded-full mt-8">
                  <FaPlay
                    size={18}
                    className="cursor-pointer text-[#f54748] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    onClick={handleWatchNow}
                  />
                </div>
                <div
                  className="lg:text-xl sm: text-[#191919] md:text-lg text-base cursor-pointer mt-8"
                  onClick={handleWatchNow}
                >
                  watch now
                </div>
              </div>
            </div>
          </div>
          <img src={buffet} className="h-[32rem] w-[64rem] mx-auto justify-end" alt="" />
        </div>
      </div>

      {showVideo && (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48rem h-24rem z-10 flex justify-center items-center bg-black bg-opacity-50">
    <div className="relative">
      <video
        controls
        className="max-w-full max-h-full"
        src={foodVideo}
        type="video/mp4"
      ></video>
      <button
        className="absolute top-0 right-0 m-2 text-white text-sm"
        onClick={handleCloseVideo}  
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Header;
