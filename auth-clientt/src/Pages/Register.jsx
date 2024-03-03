import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [image, setImage] = useState({});
  const navigate = useNavigate();

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/all/upload-image",
        formData
      );
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again.");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordconfirm = form.confirmPassword.value;
    const profileImage = image?.url;
    const userData = { name, email, password, passwordconfirm, profileImage };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        userData
      );
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
  };

  return (
    <div className="register" style={{ marginTop: "20vh" }}>
      <div className="h-screen w-full mx-auto">
        <form
          className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="file-upload" className="custom-file-uploadimg h-34">
            <img
              src={image?.url || avatar}
              alt=""
              className="h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer"
            />
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
          {/* {!image.url && (
  <div className="text-red-500">Profile image is required</div>
)} */}

          <div className="mb-3">
            <label htmlFor="name" className="block text-grey-700 text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name"
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-grey-700 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
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
                placeholder="***********"
                className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="block text-grey-700 text-sm mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="***********"
                className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
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
