import {useNavigate } from 'react-router-dom'
import Logout from '../../assets/images/log-out.png'
import {motion} from 'framer-motion'
import { useDispatch } from 'react-redux'
import { logoutHandler } from '../../global/features/auth/auth.js'
const LogoutModal = ({setActiveModal}) => {
const dispatch = useDispatch()
const navigate = useNavigate()
const logoutHandle = () =>{
    dispatch(logoutHandler())
    navigate('/')

}
    return (
        <>
                    <motion.div initial={{opacity:0}} animate={{opacity:1,scale:1.1}} transition={{duration:0.4,delay:0.2}}className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[#202020b8] z-[99999]">
                        <div className="flex flex-col bg-gray-100  sm:px-[100px] sm:py-[30px] xsm:p-4 mx-2 relative shadow rounded-xl items-center">
                            <div className="flex justify-center items-center flex-col mb-[24px]">
                                <img src={Logout} alt="" className="w-[70px] h-[70px] mb-2" />
                                <p className="text-black font-semibold text-[23px] text-center">
                                    Are You Sure You Want to Logout?
                                </p>
                            </div>
                            <div className="flex gap-[30px]  my-3">
                                <button
                                    className="h-[50px] bg-blue-500 px-[50px] text-[16px] rounded-md text-white font-medium hover:bg-[#3a2a88]"
                                    onClick={() => setActiveModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                onClick={logoutHandle}
                                    className="h-[50px] text-[16px] bg-[#ff0000] px-[50px]  font-medium rounded-md text-white hover:opacity-70"
                                >
                                    Logout
                                </button>

                            </div>
                        </div>
                    </motion.div>

        </>
    )
}

export default LogoutModal