import React, { useEffect, useState } from 'react'
import straw from "../assets/straw.png"
import {FaHeart,FaStar} from "react-icons/fa"
import chickenBur from "../assets/chiken-burger.png"
import cheese from "../assets/cheese loaded-pizza.png"
import combo from "../assets/combo1.png"
import KFC from "../assets/KFC.png"
import { useFoodContext } from '../../context/foodContext.jsx'
import axios from 'axios'
import Foods from './Food.jsx'

const RecommendedFood = () => {
     const[ratedFood,setRatedFood]=useState([])
     const { Food, setFood } = useFoodContext()
     const getFoods = async () => {
          try {
            const res = await axios.get(`https://food-deleivery.onrender.com/api/v1/food/getTopRated`);
            if (res.data.success) {
              setRatedFood(res.data.data.food)
            }
          } catch (error) {
            console.log(error);
          }
        }

     //    console.log(newFood);
      
        useEffect(() => {
          getFoods()
        }, [ratedFood])
  return (
    <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
       <div className='container mx-auto py-[2vh]'>
         <div className='text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl mb-8'>
             Recommendate <span className="text-[#f54748]">Foods</span>
         </div>
         <div className="grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
              {
               ratedFood?.map(curElem=><Foods curElem={curElem}/>)
              }
         </div>
       </div>
    </div>
  )
}

export default RecommendedFood