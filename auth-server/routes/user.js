const express= require("express")
const { registerController, authController, loginController, verifyOtpController, updateUserProfile } = require("../controller/user.js")
const protect = require("../middleware/authMiddleware")

const router=express.Router()

router.post("/register",registerController)
router.post("/get-user",protect,authController)
router.post("/login",loginController)
router.post("/verify-otp",verifyOtpController)
router.put("/update",protect,updateUserProfile)
module.exports = router


