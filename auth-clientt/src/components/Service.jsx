import React from "react";
import sheff from "../assets/chef.png";
import { Link } from "react-router-dom";

const Service = () => {
  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
      <div className="container mx-auto py-[2vh]">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
          <img
            src={sheff}
            alt=""
            className="h-[35rem] w-[60rem] mx-auto justify-end"
          />
          <div className="w-full md:w-[40rem] flex flex-col space-y-6 ">
            <div className="text-4xl md:text-4xl font-bold text-[#2e2e2e] lg:text-5xl">
              We are <span className="text-[#f54748]"> more </span> than{" "}
              <span className="text-[#fdc55e]">multiple</span> service...
            </div>
            <div className="lg:text-lg text-[#191919] md:text-base text-sm font-bold">
              Welcome to Food Hub, where culinary excellence meets unparalleled
              hospitality. At Food Hub, we take pride in offering a gastronomic
              journey like no other. Step into our world of flavors, where each
              dish tells a story of passion and creativity. From the moment you
              enter, you'll be greeted by the tantalizing aromas of our kitchen,
              promising a dining experience beyond compare. Whether you're
              indulging in our chef's specialties or savoring our signature
              dishes, every bite at Food Hub is a symphony of taste and texture.
              Join us and discover why Food Hub is not just a destination but an
              unforgettable culinary adventure.
            </div>
            <div className="flex gap-8 items-center">
           <Link to="/about-us"> {/* Link component for navigation */}
             <button
            className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white"
              >
              About Us
         </button>
         </Link>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
