import React, { useState,useEffect } from 'react'
import moose from "../assets/moose.png"
import chickenBur from "../assets/chiken-burger.png"
import cheese from "../assets/cheese loaded-pizza.png"
import combo from "../assets/combo1.png"
import { useFoodContext } from '../../context/foodContext.jsx'
import Foods from './Food.jsx'
import axios from "axios";
import {FaHeart,FaStar} from "react-icons/fa"

const NewFoods = () => {
     const[newFood,setNewFood]=useState([])
     const { Food, setFood } = useFoodContext()
     const getFoods = async () => {
          try {
            const res = await axios.get(`https://food-deleivery.onrender.com/api/v1/food/getNewFoods`);
            if (res.data.success) {
              setNewFood(res.data.data.food)
            }
          } catch (error) {
            console.log(error);
          }
        }

     //    console.log(newFood);
      
        useEffect(() => {
          getFoods()
        }, [newFood])
  return (
    <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
       <div className='container mx-auto py-[2vh]'>
         <div className='text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl mb-8'>
             New <span className="text-[#f54748]">Foods</span>
         </div>
         <div className="grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
              {
               newFood?.map(curElem=><Foods curElem={curElem}/>)
              }
         </div>
       </div>
    </div>
  )
}

export default NewFoods