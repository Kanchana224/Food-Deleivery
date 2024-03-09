const mongoose=require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
      required: function () {
        return this.isModified('password') || this.isNew;
      },
    },
    profileImage: {
      type: String,
      required: false,
    },
    role: { // Add role field
      type: String,
      enum: ["user", "admin"], // Define roles
      default: "user", // Set default role to "user"
    },
  },
  {
    timestamps: true,
  }
);


// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
