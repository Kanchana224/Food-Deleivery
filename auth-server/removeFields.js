const User=require("./model/User")

const removeFields = async () => {
    try {
      // Update documents to unset isVerified and otp fields
      await User.updateMany({}, { $unset: { isVerified: "", otp: "" } }, { timeout: false });
      console.log("Fields removed successfully.");
    } catch (error) {
      console.error("Error removing fields:", error);
    }
  };
  
  removeFields();
  