import { motion } from 'framer-motion'
import ImageDragDropUploader from '../../components/imageDragDrop/ImageDragDropUploader'
import { useEffect, useState } from 'react'
import SelectOptionCard from '../selectOptionCard/SelectOptionCard'
import useSWR from 'swr'
import { PROPERTY_CATEGORY_CONSTANTS } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { clearCreateCategoryReducer, createCategoryApi } from '../../global/features/propertyCategory/createCategory'
import { toast } from 'react-toastify'
import Loader from '../loader/Loader'
const { GET_CATEGORY_LIST } = PROPERTY_CATEGORY_CONSTANTS
// import Loader from '../../components/loader/Loader'
const CreatePropertyCategoryModal = ({ setCreateCategoryModal, mutate }) => {
    const [values, setValues] = useState({
        name: '',
        category: '',
        image: ''
    })


    const dispatch = useDispatch()
    const { isLoading, success, message } = useSelector((value) => value.createCategory)
    // -------- Change Password Handler --------
    const createCategoryHandler = (e) => {
        e.preventDefault()
        dispatch(createCategoryApi({
            name: values.name,
            category: values.category,
            icon: values.image,
            mutate: mutate
        }))
    }
    useEffect(() => {
        if (success) {
            toast.success(message, {
                position: "top-right"
            })
            dispatch(clearCreateCategoryReducer())
            setCreateCategoryModal(false)

        }
        else if (success === null) {
            return;
        }
        else {
            toast.error(message, {
                position: "top-right"
            })
            dispatch(clearCreateCategoryReducer())
        }
    }, [success, message])

    // ------ LOADER STYLE -------
    const loaderStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

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

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, scale: 1.1 }} transition={{ duration: 0.4, delay: 0.2 }} className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[#202020b8] z-40">
            <form className='w-[500px]' onSubmit={createCategoryHandler}>
                <div className="flex flex-col bg-gray-800  sm:px-[30px] sm:py-[20px] xsm:p-4 mx-2 relative shadow rounded-xl items-center">
                    <div className="flex w-full flex-col ">
                        <p className="text-white font-semibold text-[23px] text-center mb-5">
                            Create Property Category
                        </p>
                        {/* <div className='flex gap-5'> */}
                        <div className='flex flex-col gap-2 '>
                            <div className="relative flex flex-col gap-2 my-2">
                                <label htmlFor="" className='font-semibold text-[15px]'>Category Name: </label>
                                <input
                                    type="text"
                                    placeholder="Enter Category Name"
                                    value={values.name}
                                    onChange={(e) => setValues({ ...values, name: e.target.value })}
                                    className="bg-gray-900 bg-opacity-80 py-3 w-full px-4  outline-none rounded-md"
                                />
                            </div>
                            {/* Select Options */}
                            <SelectOptionCard CATEGORY_DATA={CATEGORY_DATA} isLoading={loading} values={values} setValues={setValues} />
                            <div className="relative ">
                                <ImageDragDropUploader values={values} setValues={setValues} />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                    <div className="flex gap-[30px]">
                        <button
                            className="h-[50px] bg-[#ff0000] px-[50px] text-[16px] rounded-md text-white font-medium  hover:opacity-70"
                            onClick={() => setCreateCategoryModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className={`${isLoading && 'pointer-events-none'} h-[50px] text-[16px] bg-[#3b82f6] px-[50px]  font-medium rounded-md text-white hover:opacity-70`}
                        >
                            {/* Create */}
                            {isLoading ? <Loader loaderStyle={loaderStyle} /> : "Create"}
                        </button>
                    </div>
                </div>
            </form>
            {/* {successModal && <SuccessModal title={"dadasda"} setSuccessModal={setSuccessModal} setChangePasswordModal={setChangePasswordModal}/>} */}
        </motion.div>
    )
}

export default CreatePropertyCategoryModal