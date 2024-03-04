import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useCartContext } from '../../context/CardContext.jsx'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext.jsx'

import axios from 'axios'
import { FaStar } from 'react-icons/fa'

const MyOrder = () => {
    const { cartItems,removeItem,addToCart } = useCartContext();
    const{user,setUser}=useUserContext()
    const[order,setOrder]=useState([])

    const getMyOrders = async () => {
        try {
    
            const res = await axios.post("https://food-deleivery.onrender.com/api/v1/order/getorder", {
                userId: user?.user._id,
                token:localStorage.getItem("token")
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            
            if (res.data.success) {
               setOrder(res.data.data)
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Oops...Something went Wrong");
        }
    }

    useEffect(()=>{
        getMyOrders()
    },[])

  return (
 <div>
    <div className="pt-14">
       
            <div className="container mx-auto py-6 ">
                <div className="w-full bg-white px-10 py-5 text-black rounded-md">
                     <div className="flex justify-between border-b pb-8">
                         <h1 className="font-semibold text-2xl text-center ml-10">
                            My Food Cart
                         </h1>
                        
                     </div>

                     {
                        order?.map((food,index)=>{
                            return(
                             <CartFood food={food} key={index}/>
                            )
                        })
                     }

                     
                </div>

            </div>
    </div>
</div>
  )
}

export default MyOrder


const CartFood=({food})=>{
    console.log(food);
    const {cartItems,removeItem, addToCart}=useCartContext() 

    if (!food || !food.items) {
        return null; // or render an appropriate placeholder or loading indicator
    }
    

    return(
        <div className="food-card rounded-xl flex flex-col cursor-pointer items-center p-5 mb-4">
            <div className="relative mb-3">
                <div className="flex w-full">
                    {food.items.map((item, index) => (
                        <div key={index} className="flex flex-col items-center justify-between mx-4">
                            {item.food && item.food.foodImage && (
                                <img src={item.food.foodImage} alt="" className="h-48 w-auto mb-2" />
                            )}
                            <span className="font-bold text-lg text-center text-wrap">{item.food?.name}</span>
                            <span className="flex items-center space-x-2 font-bold text-lg text-center">
                                Qty:{" "}
                                <span className="text-red-500 px-3 py-2 bg-slate-50 text-lg font-bold">{item.Qty}</span>
                            </span>
                        </div>
                        
                    ))}
                     
                </div>
                
            </div>
            
            <div className="flex flex-col items-center gap-2">
    <div className="font-bold text-lg text-green-500"> Amount: Rs.{food?.totalAmount}</div>
    <div className="text-lg text-center font-bold text-[#f54748]">
        <span className="text-black"> Names:</span> 
        <span className="text-red-500 text-lg"> {food.items.map((item) => item.food?.name).join(', ')}</span>
    </div>
    <div className="font-bold text-lg"> Status:
        {food?.payment === false && <span className="font-bold text-lg">Not Paid</span>}
        {food?.payment && <span className="font-bold text-lg text-green-600">Paid</span>}
    </div>
    <div className="font-bold text-lg text-center"> Status: {food?.status}</div>
    <div className="font-bold text-lg text-center"> Created Date: {food?.createdAt}</div>
</div>
        </div>
    ) 
}