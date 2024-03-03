// routes/foodRoutes.js

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createFood, getAllFoods, getFoodById, getNewFoods, getFoodsFromDistinctCategory, getTopRating, getFoodsFromDistinctCategory1, getAllFoods1, deleteFoodById, updateFoodById } = require("../controller/food");

// Food routes
router.post("/addfood", protect, createFood);
router.get("/getAllFood", getAllFoods);
router.get("/getFood/:id", getFoodById);
router.get("/getNewFoods", getNewFoods);
router.get("/specialFoods", getFoodsFromDistinctCategory);
router.get("/todaySpecial", getFoodsFromDistinctCategory1);
router.get("/getTopRated", getTopRating);
router.get("/getAllFoods", getAllFoods1);
router.delete("/deleteFood/:id", protect, deleteFoodById);
router.put("/updateFood/:id", protect, updateFoodById);


module.exports = router;
