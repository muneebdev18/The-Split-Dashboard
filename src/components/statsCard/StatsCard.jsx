import { FaUser } from "react-icons/fa";
import { IoMdStats } from "react-icons/io"
import {FaUserSlash, FaUserShield } from "react-icons/fa"
import { motion } from 'framer-motion';
import { FaShoppingCart } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { BsHouseUpFill } from "react-icons/bs";
import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";
import { CgPathDivide } from "react-icons/cg";
import { BiSolidCategory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";


const StatsCard = ({ title, value, icon: Icon, color,id}) => {  
  const iconMap = {
    FaUser: id === "dashboard_overview" ? FaUser : id === "property" ? FaHouse: id === "property_category" ?  BiSolidCategory: FaUser,
    MdOutlinePostAdd:id === "dashboard_overview" ? FaHouse : id === "property" ? BsFillHouseCheckFill : id === "property_category" ? FaHome : FaUserShield,
    FaBookOpen: id === "dashboard_overview" ? FaShoppingCart : id === "property" ? BsHouseUpFill  : id === "property_category" ? FaHouse : FaUserSlash,
    GrChapterAdd: id === "dashboard_overview" ? IoNotifications : id === "property" ? IoMdStats : id === "property_category" ? FaBuilding :  IoMdStats,
    IoIosNotifications:id === "notification" ? IoNotifications :'',
    CiRead: id === "notification" ? CiRead:"",
    CiUnread: id === "notification" ? CiUnread:"",
    CgPathDivide: id === "notification" ? CgPathDivide:"",  // for notification page
  }


  // Find the icon component from the iconMap
  const IconComponent = iconMap[Icon];


  return (
    <motion.div className={`h-32 flex px-7 items-center w-[100%] rounded-lg bg-gray-800 backdrop-blur-md shadow-lg border-b border-gray-700 `}
      whileHover={{ y: -5, boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.5)' }}
    >
      <div className='flex flex-col gap-3'>
        <div className='flex gap-2 items-center'>
          <span>{IconComponent && <IconComponent size={25} color={color} />}</span>
          <p className='text-gray-300 text-[15px] font-medium capitalize'>{title}</p>
        </div>
        <p className='text-[28px] font-semibold text-gray-300'>{value}</p>
      </div>
    </motion.div>
  )
}

export default StatsCard;