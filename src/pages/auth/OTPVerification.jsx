import { useState, useEffect } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { clearForgotPassReducer, forgotPasswordApi } from '../../global/features/auth/auth.js';
import { otpVerifyApi,clearOtpVerifyReducer } from '../../global/features/auth/otpVerify.js';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader.jsx';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(3); // Timer starting from 30 seconds
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    // Only run the timer if it's greater than 0
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      // Clear the interval when the component unmounts or timer hits 0
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const location = useLocation()
  const {data,email} = location.state

  const {success,message} = useSelector((value)=>value.auth)
  const {success:otpSuccess,message:otpMessage,isLoading:otpLoading} = useSelector((value)=>value.otpVerify)
  
  // --------- OTP Verification Handler ---------
  const otpVerificationHandler = (e) =>{
    e.preventDefault()

    dispatch(otpVerifyApi({
      code:otp,
      userId:data?.userId
    }))
  }

    // Function to resend OTP and reset the timer
    const resendOTP = () => {
      setOtp('');
      setTimer(30); 
      dispatch(forgotPasswordApi({
        email:email
      }))
    };

// --------- Resent OTP Handlings --------
  useEffect(()=>{
      if(success){
        toast.success(message,{
          position:"top-right"
        })
        // navigate("/auth/newpassword")
        dispatch(clearForgotPassReducer())
      }
      else if(success === null) {
        return;
      }
      else{
        toast.error(message,{
          position:"top-right"
        })
        dispatch(clearForgotPassReducer())
      }
  },[success, message])
// --------- OTP Verify Handlings --------
  useEffect(()=>{
    if(otpSuccess){
      toast.success(otpMessage,{
        position:"top-right"
      })
      navigate("/auth/newpassword",{state:{id:data?.userId}})
      dispatch(clearOtpVerifyReducer())
    }
    else if(otpSuccess === null) {
      return;
    }
    else{
      toast.error(otpMessage,{
        position:"top-right"
      })
      setOtp('')
      dispatch(clearOtpVerifyReducer())
    }
  },[otpSuccess,otpMessage])
        // ------ LOADER STYLE -------

        const loaderStyle = {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -30 }}
      transition={{ duration: 1.1, delay: 0.3 }}
      className="flex flex-row justify-center items-center min-h-screen bg-gray-900 text-white"
    >
      <div className="px-8 py-8 flex flex-col justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold mb-2 text-white">OTP Verification</h1>
        <p className="text-lg text-gray-400 mb-8">Enter the OTP sent to your email.</p>

        <p className="text-lg text-gray-300 mb-4">
          {timer > 0 ? `Resend OTP in 0:${timer < 10 ? `0${timer}` : timer}` : "OTP expired. Click below to resend."}
        </p>

        <form className="space-y-6" onSubmit={otpVerificationHandler}>
          {/* OTP Input */}
          <div className="relative">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className="text-gray-300 mx-2">-</span>}
              inputStyle={{
                display: "flex",
                justifyContent: "space-between",
                width: "4.7rem",
                height: "4.5rem",
                margin: "0 0.5rem",
                fontSize: "1.5rem",
                borderRadius: "0.375rem",
                border: "1px solid #4B5563", // Border color (gray-600)
                backgroundColor: "#1F2937", // Background color (gray-800)
                color: "#FFFFFF", // Text color (white)
                textAlign: "center",
              }}
              focusStyle={{
                border: "2px solid #7C3AED", // Focus border color (purple-500)
                outline: "none",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          {/* Continue Button */}
            <button
              type="submit"
              className={`${otpLoading && 'pointer-events-none'} w-full h-[50px] mt-8 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md transition duration-300`}
              // disabled={timer > 0} // Disable button if timer is still running
            >
              {otpLoading? <Loader loaderStyle={loaderStyle} /> : 'Continue'}
            </button>
        </form>

        {/* Resend OTP */}
        <p className="mt-3  text-[17px]">
          Didn't receive OTP?{' '}
          <span
            className={`cursor-pointer text-blue-500 font-semibold ${timer > 0 ? 'pointer-events-none opacity-50' : ''}`}
            onClick={resendOTP}
          >
            {timer > 0 ? 'Try Again After Timer Ends' : 'Click Here to Resend'}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default OTPVerification;
