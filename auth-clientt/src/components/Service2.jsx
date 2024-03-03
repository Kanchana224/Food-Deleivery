import React from "react";
import buffet from "../assets/buffet.png";
import header from "../assets/combo.png";
import { Link } from "react-router-dom";

const Service2 = () => {
  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
      <div className="container mx-auto py-[2vh]">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
          <div className="w-full md:w-[40rem] flex flex-col space-y-6 ">
            <div className="text-4xl md:text-4xl font-bold text-[#2e2e2e] lg:text-5xl">
              We are <span className="text-[#f54748]"> waiting </span> to make{" "}
              <span className="text-[#fdc55e]">Food</span> for you....
            </div>
            <div className="lg:text-lg text-[#191919] md:text-base text-sm font-bold">
              Nestled in the heart of the city, Food Hub stands as a beacon of
              culinary innovation and excellence. With a commitment to sourcing
              the freshest ingredients and crafting dishes that tantalize the
              taste buds, Food Hub invites you to embark on a culinary journey
              that celebrates the rich tapestry of flavors from around the
              world. Whether you're craving classic comfort food or eager to
              explore bold new culinary creations, our talented chefs are
              dedicated to delivering an unforgettable dining experience. From
              the warm ambiance of our dining room to the impeccable service at
              every turn, Food Hub sets the stage for memorable moments and
              gastronomic delights. Join us and elevate your dining experience
              to new heights at Food Hub.
            </div>
            <div className="flex gap-8 items-center">
           <Link to="/about-us">
             <button
            className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white"
              >
              About Us
         </button>
         </Link>
        </div>
          </div>
          <img
            src={header}
            alt=""
            className="h-[32rem] w-[64rem] mx-auto justify-end"
          />
        </div>
      </div>
    </div>
  );
};

export default Service2;
