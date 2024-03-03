
const mongoose=require("mongoose")
const orderSchema = new mongoose.Schema(
  {
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
          required: true,
      },
      items: [
          {
              food: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Food", // Reference to the Food model
                  required: true,
              },
              Qty: {
                  type: Number,
                  required: true,
                  min: 1,
              },
          }
      ],
      totalAmount: {
          type: Number,
          required: true,
      },
      payment: {
          type: Boolean,
          default:false,
      },
      status: {
          type: String,
          enum: ["pending", "delivered"],
          default: "pending",
      },
      createdAt: {
          type: Date,
          default: Date.now,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
  