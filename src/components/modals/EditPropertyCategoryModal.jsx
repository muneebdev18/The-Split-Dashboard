import { motion } from 'framer-motion';
// import Loader from '../../components/loader/Loader'
import { IoMdCamera } from 'react-icons/io';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { PROPERTY_CATEGORY_CONSTANTS } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { clearUpdateCategoryReducer, updateCategoryApi } from '../../global/features/propertyCategory/updateCategory';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';
const { GET_CATEGORY_LIST } = PROPERTY_CATEGORY_CONSTANTS

const EditPropertyCategoryModal = ({ setEditCategoryModal, categoryData,mutate }) => {
    const [values, setValues] = useState({
        name: categoryData?.name || '',
        icon: '',
        category: categoryData?.category || ''
    });
    console.log(values);

    const dispatch = useDispatch()
    const { isLoading, message, success } = useSelector((value) => value.updateCategory)

    //  Profile Image 
    const profileSrc = values?.icon instanceof File
        ? URL.createObjectURL(values?.icon) // Create object URL for a File
        : categoryData?.icon
        && `https://thesplit.testdevlink.net/${categoryData?.icon}`

    // -------- GET CATEGORY LIST API --------
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
    const { data, isLoading: loading } = useSWR([`${GET_CATEGORY_LIST}`], fetcherWithToken);
    const CATEGORY_DATA = data?.data


    // Update Category Handler
    const updateCategoryHandler = (e) =>{
        e.preventDefault()
        dispatch(updateCategoryApi({
            name:values.name,
            icon:values.icon,
            category:values.category,
            mutate:mutate,
            id:categoryData?.id
        }))
    }
       useEffect(()=>{
        if(success){
            toast.success(message,{
                position:"top-right"
            });
            dispatch(clearUpdateCategoryReducer())
            setEditCategoryModal(false)
        }
        else if (success === null) return;
        else{
            toast.error(message,{
                position:"top-right"
            })
            dispatch(clearUpdateCategoryReducer())
        }
       },[success,message])
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
                    <form action="" onSubmit={updateCategoryHandler}>
                        <div className="flex justify-center items-center flex-col mb-[24px]">
                            <p className="text-white font-semibold text-[23px] text-center mb-5">
                                {`Edit Property Category`}
                            </p>
                            <div className="flex items-center gap-5">
                                <div className="relative bg-white rounded-full p-3">
                                    <img
                                        src={profileSrc}
                                        className="w-[70px] h-[70px] rounded-full object-cover"
                                        alt="Profile"
                                    />
                                    <label className={"absolute sm:right-[13px] xsm:right-[24px] sm:top-[73px] xsm:top-[97px]"}>
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => {
                                                if (e.target.files[0]) {
                                                    setValues({ ...values, icon: e.target.files[0] });
                                                }
                                            }}
                                        />
                                        <IoMdCamera style={{ cursor: 'pointer' }} color="black" size={18} />
                                    </label>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <label className="text-sm font-medium">
                                        Property Name :
                                        <input
                                            type="text"
                                            value={values.name}
                                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                                            className="bg-gray-900 font-normal text-white py-3 px-4 outline-none rounded-sm ml-2"
                                        />
                                    </label>
                                    <label className="text-sm font-medium flex items-center relative">
                                        Category Name :
                                        {loading ? (
                                            <div role="status" className="max-w-sm animate-pulse">
                                                <div className="h-[50px] bg-gray-900 rounded-sm ml-[6px]  w-[190px]"></div>
                                            </div>
                                        )
                                            : (
                                                <div className="relative w-[188px] ml-[6px]">
                                                    <select
                                                        value={values.category}
                                                        onChange={(e) => setValues({ ...values, category: e.target.value })}
                                                        className="bg-gray-900 text-white font-normal py-3 px-4 outline-none rounded-sm w-full appearance-none cursor-pointer"
                                                    >
                                                        {CATEGORY_DATA?.map((item, key) => (
                                                            <option key={key} className='capitalize' value={item?.category}>
                                                                {item?.category}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {/* Dropdown Icon */}
                                                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}

                                    </label>


                                </div>

                            </div>
                        </div>
                        <div className="flex justify-center gap-[30px] my-3">
                            <button
                                className="py-[11px] bg-[#ff0000] px-[50px] text-[16px] rounded-md text-white font-medium hover:opacity-70"
                                onClick={() => setEditCategoryModal(false)}
                            >
                                Cancel
                            </button>
                            <button type='submit' className={`${isLoading && 'pointer-events-none'} h-[50px] text-[16px] bg-[#295F98] px-[50px] font-medium rounded-md text-white hover:opacity-70`}>
                                {isLoading ? <Loader loaderStyle={loaderStyle}/> : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>

        </>
    );
};

export default EditPropertyCategoryModal;
