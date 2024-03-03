const Food = require("../model/Food");

const createFood = async (req, res) => {
    try {
        const { name, price, description, category, weight, foodImage } = req.body; // Corrected spelling of category and Weight
        const newFood = new Food({
            name,
            price,
            description,
            category,
            weight,
            foodImage,
        });
        const savedFood = await newFood.save(); // Await the save() method
        res.status(201).json({ // Changed status to 201 for successful creation
            message: "Food added successfully",
            success: true,
            data: {
                food: savedFood,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
};


const getAllFoods = async (req, res) => {
    try {
        const { category } = req.query;
        let foodItems;
        if (category === "all") {
            foodItems = await Food.find();
        } else {
            foodItems = await Food.find({ category: category });
        }

        // Mark out of stock items
        foodItems.forEach(food => {
            if (food.weight === 0) {
                food.outOfStock = true;
            }
        });

        res.status(200).json({
            message: "Foods fetched successfully",
            success: true,
            data: {
                food: foodItems,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
};


const getFoodById = async (req, res) => {
    try {
        const {id}=req.params;
            const foodItems = await Food.findById(id);
            res.status(200).json({
                message: "Foods Details are here",
                success: true,
                data: {
                    food: foodItems,
                },
            });
        
         } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
};

const getNewFoods = async (req, res) => {
    try {
            const foodItems = await Food.find().sort({createAt:-1}).limit(12);
            res.status(200).json({
                message: "12 NewFoods are showing for you",
                success: true,
                data: {
                    food: foodItems,
                },
            });
        } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }

}

const getFoodsFromDistinctCategory = async (req, res) => {
    try {
            const distinctCategory = await Food.distinct("category");
            const distinctFood=await Promise.all(
               distinctCategory.slice(0,4).map(async (category)=>{
                const food=await Food.findOne({category})
                return food
               })
            )
            res.status(200).json({
                message: "4 different category food",
                success: true,
                data: {
                    food: distinctFood,
                },
            });
        } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }

}

const getFoodsFromDistinctCategory1 = async (req, res) => {
    try {
            const distinctCategory = await Food.distinct("category");
            const distinctFood=await Promise.all(
               distinctCategory.slice(0,25).map(async (category)=>{
                const food=await Food.findOne({category}).limit(30)
                return food
               })
            )
            res.status(200).json({
                message: "4 different category food",
                success: true,
                data: {
                    food: distinctFood,
                },
            });
        } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }

}


const getTopRating = async (req, res) => {
    try {
            const topRatedFood = await Food.find().sort({"reviews.rating":-1}).limit(4);
            
            res.status(200).json({
                message: "4 different category food",
                success: true,
                data: {
                    food: topRatedFood,
                },
            });
        } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }

}

const getAllFoods1 = async (req, res) => {
    try {
        const foodItems = await Food.find();
        res.status(200).json({
            message: "Foods fetched successfully",
            success: true,
            data: {
                food: foodItems,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
};


// Delete food item by ID
const deleteFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        await Food.findByIdAndDelete(id);
        res.status(200).json({
            message: "Food deleted successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
};

// Update food item by ID
const updateFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, weight, foodImage } = req.body;
        const updatedFood = await Food.findByIdAndUpdate(id, req.body, {
            name,
            price,
            description,
            category,
            weight,
            foodImage,},{ new: true });
        res.status(200).json({
            message: "Food updated successfully",
            success: true,
            data: {
                food: updatedFood,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
};

const searchFoods = async (req, res) => {
    try {
        const { query } = req.params;
        // Use a regular expression to perform a case-insensitive search
        const regex = new RegExp(query, 'i');
        const foodItems = await Food.find({ name: regex }).limit(10); // Limiting to 10 suggestions
        res.status(200).json({
            message: "Search results",
            success: true,
            data: {
                food: foodItems,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
};

module.exports = { createFood, getAllFoods,getFoodById,getNewFoods,getFoodsFromDistinctCategory,
    getTopRating,getFoodsFromDistinctCategory1,getAllFoods1, deleteFoodById, updateFoodById,searchFoods};