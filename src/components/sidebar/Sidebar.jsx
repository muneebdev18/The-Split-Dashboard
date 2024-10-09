import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { TbLogout } from "react-icons/tb";
import Logo from '../../assets/images/Split-Logo.png'  
import { SIDEBAR_ITEMS } from '../../utils/constants.js';
import LogoutModal from '../modals/LogoutModal';
const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeModal,setActiveModal] = useState(false)
    
    // Checking the size of the screen
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 991) {
                setSidebarOpen(false);
                console.log('Screen size is less than or equal to 991 pixels.');
            } else {
                setSidebarOpen(true);
                console.log('Screen size is greater than 991 pixels.');
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <motion.div
            className={`relative z-101 transition-all duration-200 ease-linear flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className="h-screen bg-gray-800 bg-opacity-50 backdrop-blur-sm flex flex-col py-2 px-4 border-r border-gray-700">
                <div className="flex justify-between items-center">
                    {/* <p className={`${isSidebarOpen ? 'block' : 'invisible'} text-2xl font-semibold`}>The Split</p> */}
                    <img src={Logo} className={`${isSidebarOpen ? 'block' : 'invisible'} text-2xl font-semibold object-cover `}/>
                    <motion.button
                        // whileHover={{scale:1.2}}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md transition-colors hover:bg-slate-600 absolute right-[18px]"
                    >
                        <Menu size={26} />
                    </motion.button>
                </div>
                <nav className="mt-9 flex-grow">
                    {SIDEBAR_ITEMS?.map((item) => {
                        return (
                            <NavLink
                                to={item.href}
                                key={item.href}
                                className={({ isActive }) =>
                                    `block my-2 ${isSidebarOpen ? 'px-4 py-3' : 'py-3 px-3 flex justify-center items-center'} font-medium text-white hover:bg-gray-700 transition-colors duration-150 rounded-md cursor-pointer ${isActive ? 'bg-gray-700' : ''}`
                                }
                            >
                                <div className={`w-full ${isSidebarOpen ? 'flex items-center' : ''}`}>
                                    <item.Icon size={24} className="mr-2 text-gray-300" fill={item.color} />
                                    {isSidebarOpen && item.name}
                                </div>
                            </NavLink>
                        )
                    })}
                </nav>
                {
                    isSidebarOpen ? (
                        <button onClick={()=>setActiveModal(true)} className='bg-[#48CFCB] text-gray-800  text-[18px] font-medium py-4 px-3 rounded-xl flex justify-center items-center'>
                    <span className='mr-2'><TbLogout size={23} /></span>
                    Logout
                </button>
                    ):
                    (
                        <div onClick={()=>setActiveModal(true)} className='bg-[#48CFCB] cursor-pointer text-gray-800  text-[18px] font-medium py-3 px-3 flex justify-normal items-center rounded-xl'>
                        <span className=''><TbLogout size={23} /></span>
                        </div>
                    )
                }
                
               
            </div>
            {activeModal && <LogoutModal setActiveModal = {setActiveModal}/> }
            

        </motion.div>
    )
}

export default Sidebar;
