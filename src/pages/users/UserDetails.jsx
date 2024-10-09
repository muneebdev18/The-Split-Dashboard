import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { motion } from "framer-motion";
import Profile from '../../assets/images/profile.jpg'
import { IoIosUnlock } from "react-icons/io";
import WarningModal from "../../components/modals/WarningModal";
import Footer from "../../components/footer/Footer";
import useSWR from "swr";
import { USER_API_CONSTANTS } from "../../utils/constants";
const { GET_USER_ID } = USER_API_CONSTANTS
const UserDetails = () => {
  const [blockModal, setBlockModal] = useState(false)
  const { id } = useParams()

  // -------- GET USERS Y ID API --------
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
  const { data, isLoading } = useSWR([`${GET_USER_ID}${id}`], fetcherWithToken);
  const USERDATA = data?.data
  console.log(USERDATA);

  // --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen relative">
      <Header title={"User Details"} />
      <div className="flex flex-col flex-grow w-full lg:px-7 lg:py-7 sm:px-8 sm:py-2 xsm:px-0 xsm:py-0 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="h-[auto] bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-5 pb-8 border border-gray-700 overflow-y-hidden"
        >
          <div>
            <p className="text-2xl font-semibold mb-5">User Details</p>
            <div className="flex justify-between">
              <div className="flex gap-7">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-md" htmlFor="">
                    User Name :{" "}
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Email :{" "}
                  </label>

                  <label className="font-semibold text-md" htmlFor="">
                    Country:{" "}
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Created At:{" "}
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Verified :{" "}
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
                        <p>{USERDATA?.fullname}</p>
                        <p>{USERDATA?.email}</p>
                        <p>{USERDATA?.country ? USERDATA?.country : 'N/A'}</p>
                        <p>{USERDATA?.createdAt}</p>
                        <p>{USERDATA?.fullname} is a {USERDATA?.verified ? <span className="text-green-500 font-semibold"> Verified</span> : <span className="text-red-500 font-semibold">Non Verified</span>} User </p>
                      </div>
                    )
                }

              </div>
              <div>
                <img src={`https://thesplit.testdevlink.net/${USERDATA?.profile}`} className='w-[220px] h-[220px] rounded-full object-cover' />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="h-[auto] my-10 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-4 pb-5 border border-gray-700 overflow-y-hidden"
        >
          <div>
            <p className="text-2xl font-semibold mb-5">Security</p>
            {isLoading 
            ? (
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-500 w-[300px] mb-4"></div>
              </div>
            )
            : (
            <p className="text-lg flex items-center gap-1 font-semibold mb-5 ">{USERDATA?.fullname} is a <span>{USERDATA?.isDeleted ? "Inactive" : "Active"}</span> User <span>{USERDATA?.isDeleted ? <IoIosUnlock size={22} color="#FF0000" /> : <IoIosUnlock size={22} color="#22c55e" />}</span></p>
            )}
            <button onClick={() => setBlockModal(true)} className="bg-[#ed3737] text-white font-semibold py-[12px] px-[44px] rounded-lg">Block User</button>
          </div>
        </motion.div>
      </div>
      <Footer />
      {blockModal && <WarningModal title={"Are you sure you want to block this User ? "} setBlockModal={setBlockModal} />}
    </div>
  );
};

export default UserDetails;
