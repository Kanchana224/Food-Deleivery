import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";

const UpdateFood = () => {
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchFood = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/food/getFood/${id}`);
            setFood(response.data.data.food); // Set the fetched food data to the state
        } catch (error) {
            console.error("Error fetching food:", error);
        }
    };

    fetchFood();
  }, [id]);
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/all/upload-image",
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
    const updatedFoodData = { name, price, category, weight, location, description, foodImage };

    try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle case where token is not present (user not authenticated)
          toast.error("User not authenticated");
          return;
        }
    
        const res = await axios.put(`http://localhost:8000/api/v1/food/updateFood/${id}`, updatedFoodData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.success) {
          toast.success(res.data.message);
          // Redirect to food list page or any other page after successful update
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error updating food:", error);
        if (error.response && error.response.data && error.response.data.message) {
          // Handle specific error message from server
          toast.error(error.response.data.message);
        } else {
          // Handle generic error
          toast.error("Error updating food. Please try again.");
        }
      }
    };

  return (
    <div className="update-food" style={{ marginTop: "20vh" }}>
      <div className="h-screen w-full mx-auto">
        <form
          onSubmit={handleSubmit}
          className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5"
        >
          <img
            src={logo}
            alt=""
            className=" mx-auto logo h-24 w-40 mb-6 cursor-pointer text-center"
            style={{ width: "250px", height: "200px" }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Food Name"
              defaultValue={food.name}
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
              defaultValue={food.price}
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <select
              className="select bg-red-500 text-white select-md w-full max-w-xs"
              name="category"
              defaultValue={food.category}
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
              defaultValue={food.weight}
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              defaultValue={food.location}
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <textarea
              className="textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full col-span-2 py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              placeholder="Description"
              defaultValue={food.description}
            ></textarea>
          </div>
          <button
            className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
            type="submit"
          >
            Update Food
          </button>
          <ToastContainer autoClose={3000} />
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
