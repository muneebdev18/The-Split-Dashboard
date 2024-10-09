import Header from '../../components/header/Header'
import { FiUser } from "react-icons/fi";
import { FiUnlock } from "react-icons/fi";
import Profile from '../../assets/images/profileImg.png'
import Footer from '../../components/footer/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react';
import EditProfileModal from '../../components/modals/EditProfileModal';
import ChangePasswordModal from '../../components/modals/ChangePasswordModal';
import useSWR from 'swr';
import { PROFILE_API_CONSTANTS } from '../../utils/constants'
const { GET_ADMIN_ID } = PROFILE_API_CONSTANTS
const Settings = () => {

  const [editProfileModal, setEditProfileModal] = useState(false)
  const [changePasswordModal, setChangePasswordModal] = useState(false)

  // -------- GET ADMIN BY ID API --------
  const adminDataLocal = JSON.parse(localStorage.getItem('admin'))
  const token = adminDataLocal?.token
  const adminId = adminDataLocal?.user?._id

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
  const { data, isLoading,mutate } = useSWR([`${GET_ADMIN_ID}${adminId}`], fetcherWithToken);
  const adminData = data?.data


  return (
    <div className="w-full flex flex-col min-h-screen relative">
      <Header title={"Settings"} />
      <div className="flex flex-col flex-grow w-full lg:px-6 lg:py-7 sm:px-8 sm:py-2 xsm:px-0 xsm:py-0 overflow-y-auto">
        {/*-------- Profile Section -------- */}
        <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -20 }} transition={{ duration: 1, delay: 0.2 }} className=" my-5 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-5 pb-5 border border-gray-700 overflow-y-hidden">
          <div className='flex gap-3 items-center mb-4'>
            <FiUser color='#818CF8' size={24} className='font-medium' />
            <p className='font-medium text-xl'>Profile</p>
          </div>
          {/* Image with details*/}
          <div className='flex items-center gap-5'>
            {isLoading ? (
              <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
              <div className="flex items-center justify-center w-[120px] h-[120px] bg-gray-300 rounded-full  dark:bg-gray-700">
                  <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                  </svg>
              </div>
              </div>
            ):(
              
            <img src={`https://thesplit.testdevlink.net/${adminData?.profile}`} className='w-[110px] h-[110px] rounded-full object-cover' />
            )}
            <div className='flex flex-col'>
              <p className='text-[17px] font-medium text-gray-200'>
                {isLoading ? (
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-4"></div>
                  </div>
                ) : (
                  adminData?.fullname
                )}
              </p>
              <p className='text-[16px] text-gray-400'>
              {isLoading ? (
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-4"></div>
                  </div>
                ) : (
                  adminData?.email
                )}
              </p>
            </div>
          </div>
          {/* Edit Profile Button */}
          <button onClick={() => setEditProfileModal(true)} className='py-[12px] mt-9 px-5 rounded-lg  bg-[#4338CA] text-white font-medium hover:bg-[#5c4ef5]'>Edit Profile</button>
        </motion.div>
        {/* ------- Modal For Edit Profile ------- */}
        {editProfileModal && <EditProfileModal editProfileModal={editProfileModal}  setEditProfileModal={setEditProfileModal} adminData={adminData} mutate={mutate}/>}
        {/*------------- Change Password Section ----------------- */}
        <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -20 }} transition={{ duration: 1, delay: 0.5 }} className=" bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-5 pb-5 border border-gray-700 overflow-y-hidden">
          <div className='flex gap-3 items-center mb-4'>
            <FiUnlock color='#818CF8' size={24} className='font-medium' />
            <p className='font-medium text-xl'>Security</p>
          </div>
          {/* Change Password Button */}
          <button onClick={() => setChangePasswordModal(true)} className='py-[12px] mt-6 px-5 rounded-lg  bg-[#4338CA] text-white font-medium hover:bg-[#5c4ef5]'>Change Password</button>
        </motion.div>
        {changePasswordModal && <ChangePasswordModal setChangePasswordModal={setChangePasswordModal} />}
      </div>
      <Footer />
    </div>
  )
}

export default Settings