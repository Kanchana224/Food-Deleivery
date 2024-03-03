import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { UserProvider } from '../context/UserContext.jsx'
import { FoodProvider } from '../context/foodContext.jsx'
import { CartProvider } from '../context/CardContext.jsx'
import { LikedFoodProvider } from '../context/LikedFoodContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
     <FoodProvider>
    <CartProvider>
      <LikedFoodProvider>
    <App />
    </LikedFoodProvider>
    </CartProvider>
    </FoodProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
