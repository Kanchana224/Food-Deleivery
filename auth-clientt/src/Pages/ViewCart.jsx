import React from 'react'
import { useCartContext } from '../../context/CardContext.jsx'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const ViewCart = () => {
    const { cartItems, removeItem, addToCart } = useCartContext();

    // Calculate total quantity of items in the cart
    const totalItemsCount = cartItems.reduce((total, item) => total + item.Qty, 0);

    // Calculate total price of items in the cart
    const itemsPrice = cartItems.reduce((a, e) => a + e.Qty * e.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const taxPriceLength = taxPrice.toFixed(2);
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = Math.round(itemsPrice + Number(taxPrice) + shippingPrice);

    return (
        <div className="container-fluid mx-auto px-4 sm:px-6 md:px-8">
        <div className=" pt-14">
            <div className={cartItems?.length === 0 ? 'bg-gray-100 h-96' : 'bg-gray-100'}>
                <div className="container mx-auto py-6 ">
                    <div className="w-full bg-white px-10 py-5 text-black rounded-md">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">
                                My Food Cart
                            </h1>
                            <h2 className="font-semibold text-2xl">
                                {totalItemsCount} {/* Display total quantity of items */}
                            </h2>
                        </div>
                       
                        {cartItems?.map((food) => {
                            return <CartFood key={food._id} food={food} />;
                        })}

                        <div
                            className={
                                cartItems.length === 0
                                    ? 'mx-auto hidden items-end justify-center px-6 flex-col'
                                    : 'mx-auto justify-center  px-6 flex-col'
                            }
                        >
                            <div className="text-right mb-2 font-semibold text-green-600">
                                Shipping Amount: {shippingPrice}
                            </div>
                            <div className="text-right mb-2 font-semibold text-green-600">
                                Tax Amount: {taxPriceLength}
                            </div>
                            <div className="text-right mb-2 font-semibold text-green-600">
                                Total Price: {totalPrice}
                            </div>
                            <Link to="/order">
                                <button className="btn text-right ml-auto text-white hover:bg-red-600 hover:border-red-600 btn-sm bg-red-500">
                                    Check Out
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ViewCart;

const CartFood = ({ food }) => {
    const { removeItem, addToCart } = useCartContext();

    const handleAddToCart = (event) => {
        event.preventDefault(); // Prevent page refresh
        addToCart(food);
    };

    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex">
                <div className="w-20">
                    <img src={food?.foodImage} alt="" className="h-20" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{food.name}</span>
                    <span className="flex items-center space-x-4">
                        <div
                            className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative"
                            onClick={() => removeItem(food)}
                        >
                            <AiOutlineMinus
                                size={20}
                                className="absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        </div>

                        <span className="text-red-500 px-3 py-2 bg-slate-100 text-lg font-medium">
                            {food.Qty}
                        </span>

                        <div
                            className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative"
                            onClick={handleAddToCart}
                        >
                            <AiOutlinePlus
                                size={20}
                                className="absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div className="hidden md:flex justify-center w-1/5 cursor-pointer">
               <span className="font-bold text-sm">{food?.category}</span>
              </div>
           <span className="hidden md:block font-bold text-sm w-1/5 text-center">
                {food.price} * {food.Qty}
                </span>
            <span className="font-bold text-sm w-1/5 text-center">{food.Qty * food.price}</span>
        </div>
       
    );
};
