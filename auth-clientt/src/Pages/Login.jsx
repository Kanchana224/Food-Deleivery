import React from 'react'
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate=useNavigate()
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const userData = {  email, password };

    try {
      const response = await axios.post("https://food-deleivery.onrender.com/api/v1/user/login", userData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        toast.success(response.data.message);
        form.reset();
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("An error occurred while registering. Please try again.");
    }
  }
  return (
    <div className="login" style={{ marginTop: '20vh' }}>
      <div className="h-screen">
        <form className='ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80
        lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5' onSubmit={handleOnSubmit}>
          <NavLink to="/">
            <img src={logo} alt="" className='logo h-24 w-40 mb-6 cursor-pointer text-center'/>
          </NavLink>
          <div className="mb-4">
            <label className='block text-grey-700 text-sm mb-2' htmlFor='email'>
              Email
            </label>
            <input 
              type='email' name='email' placeholder='Enter your Email'
              className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem]
              text-grey-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className="mb-4">
            <label className='block text-grey-700 text-sm mb-2' htmlFor='email'>
              Password
            </label>
            <input 
              type='password' name='password' placeholder='***********'
              className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem]
              text-grey-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <button className=' bg-[#f54748] active:scale-90 transition duration-150 transform
          hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium
           text-white mx-auto text-center' type='submit'>Sign In</button>

          <Link to="/register" className='text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded'>
             Create an Account
          </Link>
          <ToastContainer autoClose={3000}/>
        </form>
      </div>
    </div>
  )
}

export default Login
