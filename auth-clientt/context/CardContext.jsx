import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedItems = localStorage.getItem("cartItems");
        return storedItems ? JSON.parse(storedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (food) => {
        const existingItemIndex = cartItems.findIndex((item) => item._id === food._id);
        
        if (existingItemIndex !== -1) {
            // If the item exists, increase its quantity
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].Qty += 1;
            setCartItems(updatedCartItems);
        } else {
            // If the item doesn't exist in the cart, add it with Qty: 1
            setCartItems([...cartItems, { ...food, Qty: 1 }]);
        }
    };

    const removeItem = (food) => {
        const existingItem = cartItems.find((item) => item._id === food._id);
        if (existingItem) {
            if (existingItem.Qty > 1) {
                const updatedCartItems = cartItems.map((item) =>
                    item._id === food._id ? { ...item, Qty: item.Qty - 1 } : item
                );
                setCartItems(updatedCartItems);
            } else {
                const updatedCartItems = cartItems.filter((item) => item._id !== food._id);
                setCartItems(updatedCartItems);
            }
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, removeItem, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };
