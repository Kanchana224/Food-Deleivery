import React, { useState } from "react";
import logo from "../assets/logo.png";
import png from "../assets/png.png"
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.jsx";
import { useCartContext } from "../../context/CardContext.jsx";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { cartItems } = useCartContext(); 

  const handleNav = () => {
    setNav(!nav);
  };

  const totalItemsQuantity = cartItems.reduce((total, item) => total + item.Qty, 0);

  return (
    <>
      <div className=" bg-black shadow-md fixed top-0 left-0 w-full z-40 ease-in duration-300 backdrop-blur-md text-white">
       
        <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6 container mx-auto  text-white">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src={png} alt="" className="h-20 cursor-pointer" />
            </Link>

            <div className="lg:flex hidden gap-8 items-center">
           
            {user?.user?.role === "user" && (
                <>
              <Link to="/todaySpecial" className="text-[#fefcfc] text-xl font-bold hover:text-red-500">
                Today Special
              </Link>
              <Link to="/my-order" className="text-[#fefcfc] text-xl font-bold hover:text-red-500">
                My Order
              </Link>
              <Link to="/menu" className="text-[#fefcfc] text-xl font-bold hover:text-red-500">
                Our Menu
              </Link>
              <Link to="/likedFoods" className="text-[#fefcfc] text-xl font-bold hover:text-red-500">
                Liked Foods
              </Link>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item text-white">{totalItemsQuantity}</span>
                  </div>
                </div>
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow bg-white">
                  <div className="card-body">
                    <span className="font-bold text-lg text-black">{totalItemsQuantity} Items</span>
                    <div className="card-actions">
                      <Link to="/viewcart">
                        <button className='bg-black text-white active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium mx-auto text-center mb-3 mt-5' type='submit'>View Cart</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              </>
            )}

              {user?.user?.role === "admin" && (
                <>
                  <Link to="/addfood" className="text-[#fefcfc] text-xl font-bold hover:text-red-500">
                    Add Food
                  </Link>
                  <Link to="/food-control" className="text-[#fefcfc] text-xl font-bold hover:text-red-500">
                    Food Control
                  </Link>
                  <Link to="/all-order" className="text-[#fefcfc] text-xl font-bold hover:text-red-500">
                    All Orders
                  </Link>
                  <Link to="/likedFoods" className="text-[#fefcfc] text-xl font-bold hover:text-red-500">
                Liked Foods
              </Link>
                  
                </>
              )}

             

             

              {user ? (
                <div className="dropdown dropdown-end relative">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img alt="profile" src={user?.user?.profileImage} />
                    </div>
                  </div>
                  <ul tabIndex={0} className="dropdown-content bg-blue rounded-box w-52 absolute right-0 top-12 shadow-lg z-20 bg-white text-black">
                    <li style={{ padding: "0.3rem", marginLeft: "0.8rem", marginTop: "0.5rem" }}>
                      <Link to="/profile" className="justify-between">Profile</Link>
                    </li>
                    {user?.user?.role === "user" && (
                      <>
                        <li style={{ padding: "0.3rem", marginLeft: "0.8rem", marginTop: "0.5rem" }}>
                          <Link to="/my-order" className="justify-between">My Order</Link>
                        </li>
                        <li style={{ padding: "0.3rem", marginLeft: "0.8rem", marginTop: "0.5rem" }}>
                          <Link to="/todaySpecial" className="justify-between">Today Special</Link>
                        </li>
                        <li style={{ padding: "0.3rem", marginLeft: "0.8rem", marginTop: "0.5rem" }}>
                          <Link to="/menu" className="justify-between">Our Menu</Link>
                        </li>
                        <li style={{ padding: "0.3rem", marginLeft: "0.8rem", marginTop: "0.5rem" }}>
                          <Link to="/viewcart" className="justify-between">View Cart</Link>
                        </li>
                      </>
                    )}

                    {user?.user?.role === "admin" && (
                      <>
                        <li style={{ padding: "0.3rem", marginLeft: "0.8rem", marginTop: "0.5rem" }}>
                          <Link to="/all-order" className="justify-between">All Orders</Link>
                        </li>
                        <li style={{ padding: "0.3rem", marginLeft: "0.8rem", marginTop: "0.5rem" }}>
                          <Link to="/food-control" className="justify-between">Food Control</Link>
                        </li>
                        <li style={{ padding: "0.3rem", marginLeft: "0.8rem", marginTop: "0.5rem" }}>
                          <Link to="/addfood" className="justify-between">Add Food</Link>
                        </li>
                      </>
                    )}

                    <li style={{ padding: "0.3rem", marginLeft: "0.8rem", marginTop: "0.5rem" }}>
                      <button onClick={() => { localStorage.clear(); location.reload(); navigate("/"); }}>Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="flex items-center">
                  <button className="bg-red-500 active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">Login</button>
                </Link>
              )}
            </div>

            <div className="block lg:hidden z-40" onClick={handleNav}>
              {nav ? (
                <RxCross2 size={28} fontWeight={900} className="text-[#191919] cursor-pointer" />
              ) : (
                <TiThMenu className="text-red-500 cursor-pointer" size={28} />
              )}
            </div>

            <div className={`lg:hidden absolute w-1/2 sm:w-2/5 h-screen px-4 py-2 text-xl font-medium ease-in shadow-sm text-black backdrop-blur-md bg-white top-0 duration-500 ${nav ? "right-0" : "right-[100%]"} pt-24`}>
              <div className="flex flex-col gap-8 items-center">
                {user?.user?.role === "user" && (
                  <>
                    <Link to="/todaySpecial" href="" className="text-[#191919] text-base font-medium hover:text-red-500">Today Special</Link>
                    <Link to="/my-order" href="" className="text-[#191919] text-base font-medium hover:text-red-500">My Order</Link>
                    <Link to="/menu" href="" className="text-[#191919] text-base font-medium hover:text-red-500">Our Menu</Link>
                    <Link to="/viewcart" href="" className="text-[#191919] text-base font-medium hover:text-red-500">View Cart</Link>
                  </>
                )}
                {user?.user?.role === "admin" && (
                  <>
                    <Link to="/addfood" href="" className="text-[#191919] text-base font-medium hover:text-red-500">Add Food</Link>
                    <Link to="/all-order" href="" className="text-[#191919] text-base font-medium hover:text-red-500">All Orders</Link>
                    <Link to="/food-control" href="" className="text-[#191919] text-base font-medium hover:text-red-500">Food Control</Link>
                  </>
                )}
                <Link to="/likedFoods" href="" className="text-[#191919] text-base font-medium hover:text-red-500">Liked Foods</Link>
                {user ? (
                  <button onClick={() => { localStorage.clear(); location.reload(); navigate("/"); }} className="bg-red-500 text-white active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium mx-auto text-center">Logout</button>
                ) : (
                  <Link to="/login" className="flex items-center">
                    <button className="bg-red-500 active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">Login</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
