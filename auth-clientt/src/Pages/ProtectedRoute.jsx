import React, { useEffect } from 'react'
import axios from "axios"
import { useUserContext } from '../../context/UserContext.jsx'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({children}){
    const {user,setUser}=useUserContext()

    const getUser=async()=>{
      try {
    const res=await axios.post(
        "https://food-deleivery.onrender.com/api/v1/user/get-user",{
            token:localStorage.getItem("token")
        },{
            headers:{
             Authorization:`Bearer ${localStorage.getItem("token")}`   
            }
        }
    )
    if(res.data.success){
        setUser(res.data.data)
    }else{
        <Navigate to="/login"/>
        localStorage.clear()
    }
} catch (error) {
    localStorage.clear()
   console.log(error); 
}
    }

  useEffect(()=>{
    if(!user){
        getUser()
    }
  },[user]) 
  
  if(localStorage.getItem("token")){
    return children
  }else{
    return <Navigate to="/login"/>
  }
}