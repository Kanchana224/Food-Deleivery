// user.js

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: { // Corrected spelling of category
      type: String,
      required: true,
    },
    weight: { // Corrected spelling of weight
      type: Number,
      required: true,
    },
    reviews: [reviewSchema],
    foodImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
//   { timestamps: true, collection: "admin" }
);

module.exports = mongoose.model("Food", foodSchema);
