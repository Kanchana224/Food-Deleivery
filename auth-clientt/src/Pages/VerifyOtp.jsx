import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const { user } = useUserContext();
    const handleInputChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };
    const navigate = useNavigate();
    const combineOtp = parseInt(otp.join(""), 10);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.user || !user.user.email) {
            console.error("User email is undefined");
            return;
        }
        const email = user.user.email;
        const dataOtp = { email, combineOtp };
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/verify-otp", dataOtp);
            if (response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => navigate("/"), 1000); // Navigate to the home page after successful verification
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error occurred while verifying OTP:", error);
            toast.error("Failed to verify OTP. Please try again.");
        }
    };
    
    
    

    return (
        <div className="relative pt-[15vh] flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto max-w-lg rounded-2xl">
                <div className="max-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            Verification mail sent to your email: {user && user.user && user.user.email}
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
                            <div className="flex space-x-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={digit}
                                        maxLength="1"
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        className='w-12 h-12 border border-gray-300 rounded text-center text-xl'
                                    />
                                ))}
                            </div>
                            <button type='submit' className='w-full py-3 px-4 bg-green-600 mt-4'>Verify Account</button>
                        </form>
                        <ToastContainer autoClose={3000} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
