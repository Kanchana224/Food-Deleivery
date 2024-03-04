const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const User = require("../model/User");

const registerController = async (req, res) => {
  try {
    if (!req.body.password || !req.body.passwordconfirm) {
      return res.status(400).send({
        message: "Both password and passwordconfirm are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        message: "User already exists",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const confirmPassword = await bcrypt.hash(req.body.passwordconfirm, salt);

    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCase: false,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    if (!req.body.profileImage) {
      return res.status(400).send({
        message: "Profile image is required",
        success: false,
      });
    }

    if (hashPassword !== confirmPassword) {
      return res.status(400).send({
        message: "Passwords do not match",
        success: false,
      });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      profileImage: req.body.profileImage,
      password: hashPassword,
      passwordconfirm: confirmPassword,
      otp: otp,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "20d",
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: "Auth client webdev warriors",
      to: req.body.email,
      subject: "OTP for email verification",
      text: `Your verify OTP is ${otp}`,
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error sending email...");
      }
      res.send({
        message: "OTP sent to email",
      });
    });

    return res.status(201).send({
      message: "Register successfully",
      data: {
        user: newUser,
        token,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Register error",
      success: false,
    });
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

const verifyOtpController = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    const combineOtp = parseInt(req.body.combineOtp, 10); // Convert to number
    if (user.otp === combineOtp) {
      // Compare as numbers
      user.isVerified = true;
      await user.save();
      return res.status(200).send({
        success: true,
        message: "OTP verified",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "OTP not verified",
      });
    }
  } catch (error) {
    console.error("Error in verifyOtpController:", error);
    return res.status(500).send({
      success: false,
      message: "Failed to verify OTP",
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
  verifyOtpController,
  updateUserProfile,
};
