// Addfood.jsx

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const Addfood = () => {
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        "https://food-deleivery.onrender.com/api/v1/all/upload-image",
        formData
      );
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      toast.success(`Successfully uploaded`);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const price = form.price.value;
    const category = form.category.value;
    const weight = form.weight.value;
    const location = form.location.value;
    const description = form.description.value;
    const foodImage = image?.url;
    const foodData = { name, price, category, weight, location, description, foodImage };

    try {
      const res = await axios.post("https://food-deleivery.onrender.com/api/v1/food/addfood", foodData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (res.data.success) {
        toast.success(res.data.message);
        form.reset()
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("Error adding food. Please try again.");
    }
  };

  return (
    <div className="addfood" style={{ marginTop: "20vh" }}>
      <div className="h-screen w-full mx-auto">
        <form
          onSubmit={handleSubmit}
          className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5"
        >
          <NavLink to="/">
            <img
              src={logo}
              alt=""
              className=" mx-auto logo h-24 w-40 mb-6 cursor-pointer text-center"
              style={{ width: "250px", height: "180px" }}
            />
          </NavLink>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Food Name"
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="file"
              accept="image/*"
              name="myFile"
              className="file-input file-input-bordered file-input-md w-full bg-red-500 text-white"
              onChange={handleImage}
            />
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter Price"
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <select
              className="select bg-red-500 text-white select-md w-full max-w-xs"
              name="category"
            >
              <option disabled selected>
                Category
              </option>
              <option>Rice</option>
              <option>Pizza</option>
              <option>Noodles</option>
              <option>Desert</option>
              <option>Chicken</option>
              <option>Juice</option>
              <option>Combo</option>
              <option>Fruits</option>
            </select>
            <input
              type="number"
              id="weight"
              name="weight"
              placeholder="Enter Quantity"
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <textarea
              className="textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full col-span-2 py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              placeholder="Description"
            ></textarea>
          </div>
          <button
            className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
            type="submit"
          >
            Add Food
          </button>
          <ToastContainer autoClose={3000} />
        </form>
      </div>
    </div>
  );
};

export default Addfood;
