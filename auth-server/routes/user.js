// userRouter.js
const express = require("express");
const { authController, loginController, updateUserProfile, registerController } = require("../controller/user.js");
const protect = require("../middleware/authMiddleware");

router = express.Router();

router.post("/register",registerController );
router.post("/get-user", protect, authController);
router.post("/login", loginController);
router.put("/update", protect, updateUserProfile);

module.exports = router;
