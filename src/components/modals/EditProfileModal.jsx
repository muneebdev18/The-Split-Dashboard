import { motion } from 'framer-motion';
import Loader from '../../components/loader/Loader'
import { IoMdCamera } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUpdateProfileReducer, updateProfileApi } from '../../global/features/profile/updateProfile';
import { toast } from 'react-toastify';

const EditProfileModal = ({ setEditProfileModal, adminData, mutate }) => {
    const [values, setValues] = useState({
        fullname: adminData?.fullname || '',
        profile: ''
    });

    const dispatch = useDispatch()
    const { isLoading, message, success } = useSelector((value) => value.updateProfile)

    //  Profile Image 
    const profileSrc = values?.profile
        ? URL.createObjectURL(values?.profile) // Create object URL for file
        : 'https://thesplit.testdevlink.net/' + adminData?.profile;


    // Update Profile Handler
    const updateProfileHandler = (e) => {
        e.preventDefault()
        dispatch(updateProfileApi({
            values: values,
            mutate: mutate
        }))
    }
    useEffect(() => {
        if (success) {
            toast.success(message, {
                position: "top-right"
            })
            dispatch(clearUpdateProfileReducer())
            setEditProfileModal(false)
        }
        else if (success === null) {
            return;
        }
        else {
            toast.error(message, {
                position: "top-right"
            })
            dispatch(clearUpdateProfileReducer())
        }
    }, [success, message])

    // ------ LOADER STYLE -------
    const loaderStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    return (
        <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[#202020b8] z-40"
        >
            <div className="flex flex-col bg-gray-800 sm:px-[30px] sm:py-[20px] xsm:p-4 mx-2 relative shadow rounded-xl items-center">
                <form onSubmit={updateProfileHandler} action="">
                    <div className="flex justify-center items-center flex-col mb-[24px]">
                        <p className="text-white font-semibold text-[23px] text-center mb-5">
                            {`Edit Your Profile`}
                        </p>
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <img
                                    src={profileSrc}
                                    className="w-[110px] h-[110px] rounded-full object-cover"
                                    alt="Profile"
                                />
                                <label className={"absolute sm:right-[23px] xsm:right-[24px] sm:top-[95px] xsm:top-[97px]"}>
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => {
                                            if (e.target.files[0]) {
                                                setValues({ ...values, profile: e.target.files[0] });
                                            }
                                        }}
                                    />
                                    <IoMdCamera style={{ cursor: 'pointer' }} color="white" size={16} />
                                </label>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium">
                                    Name :
                                    <input
                                        type="text"
                                        value={values.fullname}
                                        onChange={(e) => setValues({ ...values, fullname: e.target.value })}
                                        className="bg-gray-900 text-white py-3 px-4 outline-none rounded-sm ml-2"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-[30px] my-3">
                        <button
                            className="py-[11px] bg-[#ff0000] px-[50px] text-[16px] rounded-md text-white font-medium hover:opacity-70"
                            onClick={() => setEditProfileModal(false)}
                        >
                            Cancel
                        </button>
                        <button  type='submit' className={`${isLoading ? 'pointer-events-none' :''}  h-[50px] text-[16px] bg-[#295F98] px-[50px] font-medium rounded-md text-white hover:opacity-70`}>
                            {isLoading ? <Loader loaderStyle={loaderStyle}/> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
        
        </>
    );
};

export default EditProfileModal;
