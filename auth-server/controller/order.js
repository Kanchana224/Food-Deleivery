const Order = require("../model/Order");
const Food = require("../model/Food")
const mongoose = require('mongoose');
const stripe=require("stripe")(
    "sk_test_51Om8PESBtUcYrYBCk2Q1Xkz6CDRMyAqUwX91ABf9m6goRMfuQ6lgeiVBKdpDhvSSIvowQWqG0mjfLp3baNGg9XGs00FSfqxsOJ"
)

const createSession = async (req, res) => {
    try {
        const { userId, items, totalAmount, taxPrice, shippingPrice } = req.body;
        const totalPrice = totalAmount + taxPrice + shippingPrice;

        const lineItems = await Promise.all(items.map(async (item) => {
            const foodItem = await Food.findById(item.food);
            if (!foodItem || foodItem.quantity < item.Qty) {
                throw new Error(`${foodItem.name} is out of stock`);
            }
            return {
                price_data: {
                    currency: 'usd',
                    unit_amount:  Math.round(foodItem.price * 100), 
                    product_data: {
                        name: foodItem.name, 
                    },
                },
                quantity: item.Qty,
            };
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [...lineItems, {
                price_data: {
                    currency: 'usd',
                    unit_amount:  Math.round(taxPrice * 100), 
                    product_data: {
                        name: 'Tax', 
                    },
                },
                quantity: 1,
            }, {
                price_data: {
                    currency: 'usd',
                    unit_amount:  Math.round (shippingPrice * 100), 
                    product_data: {
                        name: 'Shipping', 
                    },
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:5173/success', 
            cancel_url: 'http://localhost:5173/cancel', 
            metadata: {
                userId: userId,
            },
        });

        await createOrder({
            userId: userId,
            items: items,
            totalAmount: totalAmount,
            payment: false, 
            status: 'pending', 
        });

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Session creation failed: ' + error.message });
    }
};


const handleStripeCheckoutRedirect = async (req, res) => {
    try {
        const { sessionId } = req.query;
        res.redirect(`https://checkout.stripe.com/pay/${sessionId}`);
    } catch (error) {
        console.error('Error redirecting to Stripe checkout:', error);
        res.status(500).json({ error: 'Redirect to Stripe checkout failed: ' + error.message });
    }
};

const createOrder = async ({ userId, items, totalAmount, payment, status }) => {
    let savedOrder;
    let outOfStockItems = [];

    try {
        // Loop through each item in the order
        for (const item of items) {
            // Find the food item by ID
            const food = await Food.findById(item.food);

            // Check if the food item is available in stock
            if (!food || food.quantity < item.Qty) {
                throw new Error(`${food ? food.name : 'Food item'} is out of stock`);
            }

            // Reduce the quantity of the food item
            food.quantity -= item.Qty;

            // If the quantity becomes zero, mark it as out of stock
            if (food.quantity === 0) {
                food.outOfStock = true;
                outOfStockItems.push(food.name);
            }

            // Save the updated food item
            await food.save();
        }

        // If there are items that are out of stock, return a response with those items
        if (outOfStockItems.length > 0) {
            return {
                success: false,
                message: "The following items are out of stock",
                data: {
                    outOfStockItems: outOfStockItems
                }
            };
        }

        // Create a new order instance
        const order = new Order({
            user: userId,
            items: items,
            totalAmount: totalAmount,
            payment: payment,
            status: status
        });

        // Save the new order
        savedOrder = await order.save();
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Order creation failed: ' + error.message);
    }

    // Return the saved order
    return {
        success: true,
        message: "Order created successfully",
        data: {
            order: savedOrder
        }
    };
};




const handlePaymentSuccess = async (req, res) => {
    try {
        const session_id = req.query.session_id;
        console.log('Session ID:', session_id); // Debugging statement
        const session = await stripe.checkout.sessions.retrieve(session_id);
        console.log('Retrieved Session:', session); // Debugging statement
        
        if (session.payment_status === 'paid') {
            const orderId = session.metadata.userId;
            console.log('Order ID:', orderId); // Debugging statement
            
            const order = await Order.findById(orderId);
            console.log('Retrieved Order:', order); // Debugging statement
            
            if (!order) {
                console.log('Order not found'); // Debugging statement
                return res.status(404).json({ success: false, message: 'Order not found' });
            }
            
            // Update order payment status and status
            order.payment = true;
            order.status = 'delivered';
            
            // Save the updated order
            await order.save();

            console.log('Order updated successfully:', order); // Debugging statement
            return res.status(200).json({ success: true, message: 'Order payment successful' });
        } else {
            console.log('Payment not successful'); // Debugging statement
            return res.status(400).json({ success: false, message: 'Payment not successful' });
        }
    } catch (error) {
        console.error('Error handling payment success:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};





const markOrderAsDelivered = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findById(orderId);
        order.status = "Delivered";
        await order.save();

        res.status(200).json({
            success: true,
            data: order,
            message: "Delivered",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server Error",
        });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find().populate("items.food").populate("user");

        res.status(200).json({
            success: true,
            data: allOrders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server Error",
        });
    }
};

const getSingleOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        const userOrders = await Order.find({ user: userId }).populate("items.food").populate("user");

        res.status(200).json({
            success: true,
            data: userOrders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server Error",
        });
    }
}
const markOrderAsPaid = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.status = "paid";
        await order.save();

        res.status(200).json({ success: true, message: "Order marked as paid", data: order });
    } catch (error) {
        console.error("Error marking order as paid:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getOrderStatus = async (req, res) => {
    try {
        const user = req.user._id;
        const orders = await Order.find({ user: user }).select('status payment');

        if (!orders) {
            return res.status(404).json({
                success: false,
                message: 'No orders found for the user',
            });
        }

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.error('Error fetching order status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message, // Send the error message for debugging
        });
    }
};






module.exports = { createOrder,handleStripeCheckoutRedirect, getAllOrders, getSingleOrder, markOrderAsDelivered,handlePaymentSuccess,markOrderAsPaid,getOrderStatus,createSession };