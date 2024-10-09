import React from "react";
import Success from '../../assets/images/success.png'
import { motion } from "framer-motion";

const SuccessModal = ({title,setSuccessModal}) => {

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[#202020b8] z-[99999]"
      >
        <div className="flex flex-col bg-gray-100  sm:px-[20px] w-[600px]  sm:py-[40px] xsm:p-4 mx-2 relative shadow rounded-xl items-center">
          <div className="flex justify-center items-center flex-col mb-[24px]">
            <img src={Success} alt="" className="w-[70px] h-[70px] mb-2" />
            <p className="text-black font-semibold text-[23px] text-center">
              Congratulations! {title}
            </p>
          </div>
          <div className="flex gap-[30px]">
            <button
              className="h-[50px] bg-[#ff0000] px-[50px] text-[16px] rounded-md text-white font-medium hover:bg-green-500"
              onClick={() => setSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SuccessModal;
