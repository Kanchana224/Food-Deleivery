import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FoodList = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        // Fetch food items from the backend
        const fetchFoods = async () => {
            try {
                const response = await axios.get('https://food-deleivery.onrender.com/api/v1/food/getAllFoods');
                setFoods(response.data.data.food);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };

        fetchFoods();
    }, []);

    const deleteFood = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("User not authenticated");
                // Handle the case where the user is not authenticated
                return;
            }
    
            await axios.delete(`https://food-deleivery.onrender.com/api/v1/food/deleteFood/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Refresh the food list after deletion
            setFoods(foods.filter(food => food._id !== id));
        } catch (error) {
            console.error('Error deleting food:', error);
            // Handle the error as needed
        }
    };
    

    // Function to update a food item
    const updateFood = async (id) => {
        window.location.href = `/update/${id}`;
    };

    return (
        <div className="food-list-container mt-20">
        <h2 className='font-bold text-2xl mt-5 text-red-600'>Food List</h2>
        <ul className='mt-4'>
            {foods.map(food => (
                <li key={food._id} className="food-item" style={{ color: food.outOfStock ? "red" : "black" }}>
                    <div className='font-bold text-md mt-4'> Food Name:<span className="text-red-500"> {food.name}</span></div>
                    <div className='font-bold text-md mt-4'> Price:<span className="text-red-500"> {food.price}</span> </div>
                    <div className='font-bold text-md mt-4'> Category:<span className="text-red-500"> {food.category}</span> </div>
                    <div className='font-bold text-md mt-4'> Quantity:<span className="text-red-500"> {food.weight}</span> </div>
                    <div className='font-bold text-md mt-4'> Description:<span className="text-red-500 text-sm"> {food.description}</span> </div>
                    <div>
                        <img src={food.foodImage} alt={food.name} style={{ maxWidth: '150px', maxHeight: '150px' }} />
                    </div>
                    <div className="button-container">
                        <button onClick={() => deleteFood(food._id)}>Delete</button>
                        <button onClick={() => updateFood(food._id)}>Edit</button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
    );
}

export default FoodList;
