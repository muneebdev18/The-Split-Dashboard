import { useEffect, useState } from "react";
import {motion} from 'framer-motion'
import { MdOutlineHighlightOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearForgotPassReducer, forgotPasswordApi } from "../../global/features/auth/auth.js";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {success,message,isLoading,data} = useSelector((value)=>value.auth)

    // Forgot Password API Handler 
    const forgotPasswordHandler = (e) =>{
        e.preventDefault()
        dispatch(forgotPasswordApi({
            email:email
        }))
    }

    useEffect(()=>{
        if(success){
            toast.success(message,{
                position:"top-right"
            })
            navigate("/auth/otpverification",{state:{data:data,email:email}})
            dispatch(clearForgotPassReducer())
        }
        else if(success === null){
            return;
        }
        else{
            toast.error(message,{
                position:"top-right"
            })
            setEmail('')
            dispatch(clearForgotPassReducer())
        }
    },[success,message])
      // ------ LOADER STYLE -------

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
    return (
        <motion.div initial={{opacity:0,y:0}} animate={{opacity:1,y:-30}} transition={{duration:1.1,delay:0.3}} className="flex flex-row justify-center items-center min-h-screen  text-white">
            <div className="xl:w-1/2 md:w-[500px] px-8 py-8 flex flex-col justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg">
                <h1 className="text-4xl font-semibold mb-2 text-white">
                    Forgot Password ?
                </h1>
                <p className="text-lg text-gray-100 mb-8">
                    Enter your email address to reset your password.
                </p>

                <form className="space-y-6" onSubmit={forgotPasswordHandler}>
                    {/* Email Input */}
                    <div className="relative">
                        <label className="text-gray-300 text-lg">Email</label>
                        <input
                            type="email"
                            className="mt-2 w-full text-lg p-4 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {email && (
                            <MdOutlineHighlightOff
                                className="absolute top-[53px] right-3 text-gray-500 cursor-pointer"
                                onClick={() => setEmail('')}
                                size={25}
                            />
                        )}
                    </div>
                        <button
                            type="submit"
                            className={`${isLoading && 'pointer-events-none'} w-full h-[50px] mt-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md transition duration-300`}
                        >
                            {isLoading ? <Loader loaderStyle={loaderStyle}/> :"Continue"}
                        </button>
                </form>
            </div>
        </motion.div>
    );
};

export default ForgotPassword;
