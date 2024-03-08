const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const multer = require("multer")


const registerController = async (request, response) => {
  try {
    const exist = await User.findOne({ email: request.body.email });
    if (exist) {
      return response.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = new User(request.body);
    await newUser.save();
    response.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    response.status(500).json({ success: false, message: "An error occurred while registering. Please try again.", error: error.message });
  }
};



const authController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Register successfully",
        data: {
          user,
        },
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Auth error`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid password and Email",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20d",
    });

    return res.status(201).send({
      message: "Login successful",
      data: {
        user,
        token,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while logging in",
    });
  }
};



const updateUserProfile = async (req, res) => {
    try {
      const {
        name,
        profileImage,
        userId,
        street,
        city,
        state,
        zipcode,
        country,
      } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }
  
      user.name = name || user.name;
      user.profileImage = profileImage || user.profileImage; // Update profile image here
      user.street = street || user.street;
      user.city = city || user.city;
      user.state = state || user.state;
      user.zipcode = zipcode || user.zipcode;
      user.country = country || user.country;
  
      await user.save();
      return res.status(200).send({
        message: "Profile updated successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Internal server error",
        success: false,
      });
    }
  };
  
  

module.exports = {
  registerController,
  authController,
  loginController,
  updateUserProfile,
};
