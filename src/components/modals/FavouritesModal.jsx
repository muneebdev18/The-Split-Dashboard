import { motion } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const FavouritesModal = ({ setFavouriteModal,setRecentlyViewModal,title,id,favouritesData}) => {

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[#202020b8] z-[99999]"
            >
                <div className="relative flex flex-col bg-gray-300 sm:px-[20px] w-[600px] sm:py-[10px] xsm:p-4 mx-2 shadow rounded-xl">
                    
                    {/* Fixed Header Section */}
                    <div className="flex justify-center items-center relative pb-4 border-b border-gray-600">
                        <p className="text-black text-2xl font-semibold">{title}</p>
                        <IoCloseCircle 
                          size={28} 
                          color="black"
                          className="absolute right-3 cursor-pointer" 
                          onClick={()=>{
                            if(id === "recentlyViewed"){
                                setRecentlyViewModal(false)
                            }
                            else{
                                setFavouriteModal(false)
                            }
                          }}
                        />
                    </div>

                    {/* Scrollable Modal Content */}
                    <div className="flex flex-col overflow-y-auto max-h-[300px] my-[24px] px-4">
                        {favouritesData?.map((item, index) => (
                            <div key={index} className="bg-gray-100 py-2 px-3 my-2 rounded-md flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <img src={`https://thesplit.testdevlink.net/${item?.profile}`} alt="" className="w-9 h-9 rounded-full" />
                                <p className="text-black font-medium">{item?.fullname}</p>
                                </div>
                                <FaHeart color="#ff0000" size={20}/>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </motion.div>
        </>
    );
};

export default FavouritesModal;
