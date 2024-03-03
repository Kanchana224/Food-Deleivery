import React, { createContext, useState, useContext } from "react";

const FoodContext = createContext();

const FoodProvider = ({ children }) => {
    const [Food, setFood] = useState(null);
    return (
        <FoodContext.Provider value={{ Food, setFood }}>
            {children}
        </FoodContext.Provider>
    );
};

const useFoodContext = () => {
    return useContext(FoodContext);
};

export { FoodProvider, useFoodContext };
