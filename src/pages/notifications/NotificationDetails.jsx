import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { motion } from "framer-motion";
import Profile from '../../assets/images/profile.jpg'
// import { IoIosUnlock } from "react-icons/io";
// import WarningModal from "../../components/modals/WarningModal";
import Footer from "../../components/footer/Footer";
import useSWR from "swr";
import { NOTIFICATION_CONSTANTS } from "../../utils/constants";
const {GET_NOTIFICATION_ID} = NOTIFICATION_CONSTANTS
import { MdVerifiedUser } from "react-icons/md";

const NotificationDetails = () => {
//   const [blockModal, setBlockModal] = useState(false)
  const { id } = useParams()

//   -------- GET NOTIFICATION BY ID API --------
  const adminDataLocal = JSON.parse(localStorage.getItem('admin'))
  const token = adminDataLocal?.token

  const fetcherWithToken = async (url, ...args) => {
    const response = await fetch(url, {
      ...args,
      headers: {
        ...args.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  };
  const { data, isLoading } = useSWR([`${GET_NOTIFICATION_ID}${id}`], fetcherWithToken);
  const NOTIFICATION_DATA = data?.data
  console.log(NOTIFICATION_DATA);

  // --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen relative">
      <Header title={"Notification Details"} />
      <div className="flex flex-col flex-grow w-full lg:px-7 lg:py-7 sm:px-8 sm:py-2 xsm:px-0 xsm:py-0 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="h-[auto] bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-5 pb-8 border border-gray-700 overflow-y-hidden"
        >
          <div>
            <p className="text-2xl font-semibold mb-5">Notification Details</p>
            <div className="flex justify-between">
              <div className="flex gap-7">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-md" htmlFor="">
                    Notification Title :{" "}
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Sent By :{" "}
                  </label>

                  <label className="font-semibold text-md" htmlFor="">
                  Notification Details :{" "}
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Created At:{" "}
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Status :{" "}
                  </label>
                </div>
                {
                  isLoading ? (
                    <div className=" flex flex-col gap-[2px] mt-2">
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-4"></div>
                      </div>
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-4"></div>
                      </div>
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-4"></div>
                      </div>
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-4"></div>
                      </div>
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-4"></div>
                      </div>
                    </div>
                  )
                    :
                    (
                      <div className="flex flex-col gap-1">
                        <p>{NOTIFICATION_DATA?.title ? NOTIFICATION_DATA?.title :"N/A"}</p>
                        <p>{NOTIFICATION_DATA?.userId?.fullname}</p>
                        <p>{NOTIFICATION_DATA?.details}</p>
                        <p>{NOTIFICATION_DATA?.createdAt}</p>
                        {
                            NOTIFICATION_DATA?.isRead ? 
                            (<div className="flex gap-2 items-center"><p>Notification is Read</p><span><MdVerifiedUser size={22} color="#06D001"/></span></div>)
                            :
                            (<div className="flex gap-2 items-center"><p>Notification is UnRead</p><span><MdVerifiedUser size={22} color="#ff0000"/></span></div>)
                        }
                      </div>
                    )
                }

              </div>
              <div>
                <img src={`https://thesplit.testdevlink.net/${NOTIFICATION_DATA?.NotifImage}`} className='w-[190px] h-[190px] rounded-full object-cover' />
                {/* <img src={Profile} className='w-[170px] h-[170px] rounded-full object-cover' /> */}
              </div>
            </div>
          </div>
        </motion.div>
       
      </div>
      <Footer />
    </div>
  );
};

export default NotificationDetails;
