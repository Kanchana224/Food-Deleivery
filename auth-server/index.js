// server.js or app.js

const express = require ("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const imageRouter = require("./routes/image");
const userRouter = require("./routes/user");
const foodRouter =require("./routes/food")
const orderRouter =require("./routes/order")
const cors = require("cors");

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "3mb" }));

// Default route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Mongo_DB Connected");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
});

mongoose.connection.on("connected", () => {
    console.log("connected");
});

// Routes
app.use("/api/v1/all", imageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/order", orderRouter);

// Start server
app.listen(port, () => {
    connect();
    console.log(`App is listening from ${port}`);
});
