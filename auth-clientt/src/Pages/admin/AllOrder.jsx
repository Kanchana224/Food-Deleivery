import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AllOrder = () => {
    const [orders, setOrders] = useState([]);

    const getAllOrders = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/order/getAllOrders", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.data.success) {
                setOrders(res.data.data);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch orders. Please try again later.");
        }
    };

    const handleDelivered = async (id) => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/order/status", {
                orderId: id
            });
            if (res.data.success) {
                toast.success(res.data.message);
                // Update orders after delivery status change
                getAllOrders();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update delivery status. Please try again later.");
        }
    };

    const OrderFoods = ({ order }) => (
        <div className="food-card rounded-xl flex flex-col cursor-pointer items-center p-5 mb-4 mt-20">
            <div className="relative mb-3">
                <div className="flex w-full">
                    {order?.items?.map((item, index) => (
                        <div key={index} className="flex flex-col items-center justify-between mx-4">
                            {item?.food?.foodImage && (
                                <img src={item?.food?.foodImage} alt="" className="h-48 w-auto mb-2" />
                            )}
                            <span className="font-bold text-lg text-center text-wrap">{item?.food?.name}</span>
                            <span className="flex items-center space-x-2 font-bold text-lg text-center">
                                Qty:{" "}
                                <span className="text-red-500 px-3 py-2 bg-slate-50 text-lg font-bold">{item?.Qty}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="font-bold text-lg text-green-500"> Amount: Rs.{order?.totalAmount}</div>
                <div className="font-bold text-lg text-center"> Status: {order?.status}</div>
                <div className="font-bold text-lg text-center"> Created Date: {order?.createdAt}</div>
                <div className="font-bold text-lg text-center">
                    Status: {order?.payment ? <span className="text-green-600">Paid</span> : <span className="font-bold text-lg">Not Paid</span>}
                </div>
                <div className="font-bold text-lg text-center">
                    <button className="bg-black active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-md font-medium text-white mx-auto text-center" onClick={() => handleDelivered(order?._id)}>Delivered</button>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <div>
            {orders.map((order, index) => (
                <OrderFoods key={index} order={order} />
            ))}
            <ToastContainer />
        </div>
    );
};

export default AllOrder;
