import Lottie from "react-lottie";
import SuccessAnimation from "../../assets/animation/Success-Animation - 1725549566408.json";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Success = () => {
  // Animation options
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: SuccessAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -30 }}
      transition={{ duration: 1.1, delay: 0.3 }}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="flex flex-col justify-center items-center bg-white/30 backdrop-blur-xl p-8 rounded-lg shadow-lg  w-full max-w-md">
        <Lottie options={defaultOptions} width={180} />
        <h1 className="font-bold text-[#ffffff] text-3xl mt-4">Congratulations</h1>
        <p className="text-[#ffffff] text-[18px] mt-2 text-center">
          Your password has been reset successfully
        </p>
        <Link to={"/auth/login"}>
          <button
            type="submit"
            className="rounded-lg text-white bg-[#070029] hover:bg-[#3a2a88] transition-colors duration-300 mt-6 py-3 px-8 w-full max-w-xs"
          >
            Continue
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Success;
