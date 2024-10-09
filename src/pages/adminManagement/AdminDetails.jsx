import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { motion } from "framer-motion";
import Footer from "../../components/footer/Footer";
import useSWR from "swr";
import { ADMIN_API_CONSTANTS } from "../../utils/constants";
const { GET_ADMIN_ID } = ADMIN_API_CONSTANTS
const AdminDetails = () => {
//   const [blockModal, setBlockModal] = useState(false)
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
  const { data, isLoading } = useSWR([`${GET_ADMIN_ID}${id}`], fetcherWithToken);
  const USERDATA = data?.data

  // --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen relative">
      <Header title={"Admin Details"} />
      <div className="flex flex-col flex-grow w-full lg:px-7 lg:py-7 sm:px-8 sm:py-2 xsm:px-0 xsm:py-0 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="h-[auto] bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-5 pb-8 border border-gray-700 overflow-y-hidden"
        >
          <div>
            <p className="text-2xl font-semibold mb-5">Admin Details</p>
            <div className="flex justify-between">
              <div className="flex gap-7">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-md" htmlFor="">
                    Admin Name :{" "}
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
              {isLoading ? (
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                    <div className="flex items-center justify-center w-[240px] h-[240px] bg-gray-300 rounded-full sm:w-[220px] sm:h-[220px] dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                    </div>
                )
            :
            (
                <img src={`https://thesplit.testdevlink.net/${USERDATA?.profile}`} className='w-[220px] h-[220px] rounded-full object-cover' />

            )
            }
              </div>
            </div>
          </div>
        </motion.div>
        {/* <motion.div
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
        </motion.div> */}
      </div>
      <Footer />
      {/* {blockModal && <WarningModal title={"Are you sure you want to block this User ? "} setBlockModal={setBlockModal} />} */}
    </div>
  );
};

export default AdminDetails;
