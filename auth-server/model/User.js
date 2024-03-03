// user.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema(



    {
        name: {
            type: String,
            required: [true,"Please provide your name"],
            unique: true,
        },
        email: {
            type: String,
            required:[true,"please provide your email"],
            unique: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        password: {
            type: String,
            required:[true,"please provide your password"],
            minlength: 8,
            select: false,
        },
        passwordconfirm: {
            type: String,
            required: [true,"please confirm your password"],
            minlength: 8,
            select: false,
            validate: {
                validator: function(el) {
                    return el === this.password;
                },
                message: "Passwords are do not match",
            },
            select:false,
        },

        passwordChangedAt:Date,

        isVerified: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: Number,
        },

        street:{
                type:String,
                required:false,
        },
        city:{
            type:String,
            required:false,
        },
        state:{
                type:String,
                required:false,
        },
        zipcode:{
                type:String,
                required:false,
        },
        country:{
                type:String,
                required:false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        profileImage: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
