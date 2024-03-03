const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createOrder, getAllOrders, getSingleOrder, markOrderAsDelivered, handlePaymentSuccess, getOrderStatus, createSession } = require("../controller/order.js");


const router = express.Router();

router.post("/order", createOrder);
router.get("/getAllorders", protect, getAllOrders); 
router.post("/getorder", protect, getSingleOrder);
router.post("/delivered", protect, markOrderAsDelivered);
router.post("/payment/success", handlePaymentSuccess);
router.get("/status", protect, getOrderStatus); 
router.post("/session", protect, createSession);

module.exports = router;