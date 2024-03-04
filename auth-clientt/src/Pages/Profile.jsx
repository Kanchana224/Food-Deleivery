import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../context/UserContext.jsx";

const Profile = () => {
  const [image, setImage] = useState({});
  const { user } = useUserContext();
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
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again.");
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const country = form.country.value;
    const state = form.state.value;
    const city = form.city.value;
    const zipcode = form.zipcode.value;
    const profileImage = image?.url;

    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/user/update",
        {
          userId: user._id,
          name,
          country,
          state,
          city,
          profileImage,
          zipcode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
          form.reset();
        }, 2000);
        location.reload()
        // localStorage.reload() // Not sure what this line is intended for
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="profile" style={{ marginTop: "20vh" }}>
      <div className="h-screen w-full mx-auto">
        <form className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5" onSubmit={handleOnSubmit}>
          <label htmlFor="file-upload" className="custom-file-uploadimg h-34">
            <img
              src={ image?.url || user?.user?.profileImage }
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

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <input
              type="text"
              id="name"
              name="name"
              value={user?.user?.name}
              placeholder={user?.user?.name}
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <input
              type="email"
              disabled
              id="email"
              name="email"
              placeholder={user?.user?.email}
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <input
              type="text"
              id="country"
              name="country"
              placeholder={user?.user?.country || "Country"}
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <input
              type="text"
              id="city"
              name="city"
              placeholder={user?.user?.city || "City"}
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <input
              type="text"
              id="state"
              name="state"
              placeholder={user?.user?.state || "State"}
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <input
              type="text"
              id="zipcode"
              name="zipcode"
              placeholder={user?.user?.zipcode || "zipcode"}
              className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
            type="submit"
          >
            Update Profile
          </button>

          <ToastContainer autoClose={3000} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
