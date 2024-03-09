import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../assets/avatar.png";

const Register = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage:"",
  });
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "email") {
      setEmailError("");
    }
    if (name === "name") {
      setNameError("");
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    console.log("Form data after appending image:", formData)
    try {
      const { data } = await axios.post(
        "https://food-deleivery.onrender.com/api/v1/all/upload-image",
        formData
      );
      console.log("Image URL received:", data.url); // Add this line for debugging
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      console.log("Image state after setting:", image); // Add this line for debugging
      setFormData({
        ...formData,
        profileImage: data.url,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again.");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    const profileImage = image?.url;
    const userData = { name, email, password, role: "user",profileImage }; // Add role field
    
    try {
      const res = await axios.post("https://food-deleivery.onrender.com/api/v1/user/register", userData);
      if (res.data.success) {
        toast.success(res.data.message, { className: "toast-success" }); // Add className for green color
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Check Email and Name its already exist");
      }
    }
    if (res.data.message === "Email is already registered") {
      toast.error("Email is already registered. Please use another email.");
    }
    if (res.data.message === "Name is already registered") {
      toast.error("Name is already registered. Please use another name.");
    }
  };

  return (
    <div className="register" style={{ marginTop: "20vh" }}>
      <div className="h-screen w-full mx-auto">
        <form
          className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor='file-upload' className='custom-file-uploadimg h-34'>
            <img src={image?.url || avatar} alt="" className="h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer" />
          </label>
          <label className="block text-center text-gray-900 text-base mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImage}
          />

          <div className="mb-3">
            <label htmlFor="name" className="block text-grey-700 text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              placeholder="Enter your Name"
              className={`shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline ${
                nameError && "border-red-500"
              }`}
            />
            {nameError && <p className="text-red-500 text-xs italic ml-1">{nameError}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-grey-700 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter your Email"
              onChange={handleChange}
              className={`shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline ${
                emailError && "border-red-500"
              }`}
            />
            {emailError && <p className="text-red-500 text-xs italic ml-1">{emailError}</p>}
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-grey-700 text-sm mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              placeholder="***********"
              onChange={handleChange}
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
            type="submit"
          >
            Register
          </button>
          <Link
            to="/login"
            className="text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded"
          >
            Already Have an Account
          </Link>
          <ToastContainer autoClose={3000} />
        </form>
      </div>
    </div>
  );
};

export default Register;
