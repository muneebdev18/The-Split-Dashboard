import Lottie from "react-lottie";
import NotFoundAnimation from '../../assets/animation/notFound-animation.json';
import { Link } from 'react-router-dom';

const NotFound = () => {
  // Animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen bg-gray-900">
      <div className="max-w-screen-lg w-full px-4">
        <Lottie options={defaultOptions} height={300} width="50%" />
      </div>
      <p className='text-lg'>Go Back to The Dashboard <Link to={"/"} className='text-blue-300 font-medium '>Click Here</Link></p>
    </div>
  );
};

export default NotFound;
