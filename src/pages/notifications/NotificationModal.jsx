import { motion } from 'framer-motion'
// import { useEffect, useState } from 'react'
// import { GoLock } from 'react-icons/go'
// import { useDispatch, useSelector } from 'react-redux'
// import { toast } from 'react-toastify'
import ImageDragDropUploader from '../../components/imageDragDrop/ImageDragDropUploader'
import { useEffect, useState } from 'react'
import { clearCreateNotificationReducer, createNotificationApi } from '../../global/features/notifications/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
const NotificationModal = ({setNotificationModal,mutate}) => {
    const [values,setValues] = useState({
        title:'',
        body:'',
        image:''
    })
    const {isLoading,success,message} = useSelector((value)=>value.notification)
    
    const dispatch = useDispatch()
    // -------- Change Password Handler --------
    const changePasswordHandler = (e) => {
        e.preventDefault()
        dispatch(createNotificationApi({
            title: values?.title,
            body: values.body,
            image: values.image,
            mutate:mutate
        }))
    }
    useEffect(() => {
        if (success) {
            toast.success(message, {
                position: "top-right"
            })
            dispatch(clearCreateNotificationReducer())
        setNotificationModal(false)

        }
        else if (success === null) {
            return;
        }
        else {
            toast.error(message, {
                position: "top-right"
            })
            dispatch(clearCreateNotificationReducer())
        }
    }, [success, message])

    console.log(values?.title);
    
    // ------ LOADER STYLE -------
    const loaderStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, scale: 1.1 }} transition={{ duration: 0.4, delay: 0.2 }} className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[#202020b8] z-40">
            <form className='w-[600px]' onSubmit={changePasswordHandler}>
                <div className="flex flex-col bg-gray-800  sm:px-[30px] sm:py-[20px] xsm:p-4 mx-2 relative shadow rounded-xl items-center">
                    <div className="flex w-full flex-col ">
                        <p className="text-white font-semibold text-[23px] text-center mb-5">
                            Create Notifications
                        </p>
                        {/* <div className='flex gap-5'> */}
                        <div className='flex flex-col gap-2 '>
                            <div className="relative flex flex-col gap-2 my-2">
                                <label htmlFor="" className='font-semibold text-[15px]'>Title: </label>
                                <input
                                    type="text"
                                    placeholder="Enter Title of Notification"
                                    value={values.title}
                                    onChange={(e)=>setValues({...values,title:e.target.value})}
                                    className="bg-gray-900 bg-opacity-80 py-3 w-full px-4  outline-none rounded-md"
                                />
                            </div>
                            <div className="relative flex flex-col gap-2 ">
                            <label htmlFor="" className='font-semibold text-[15px]'>Description: </label>
                                <textarea value={values.body} onChange={(e)=>setValues({...values,body:e.target.value})} placeholder='Enter Description' className='bg-gray-900 bg-opacity-80 py-3 px-4  w-full  outline-none rounded-lg' id="w3review" name="w3review" rows="4" cols="50">
                                </textarea>
                            </div>
                            <div className="relative ">
                               <ImageDragDropUploader values={values} setValues={setValues}/>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                    <div className="flex gap-[30px]">
                        <button
                            className="h-[50px] bg-[#ff0000] px-[50px] text-[16px] rounded-md text-white font-medium  hover:opacity-70"
                        onClick={() => setNotificationModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className={`${isLoading && 'pointer-events-none'} h-[50px] text-[16px] bg-[#295F98] px-[50px]  font-medium rounded-md text-white hover:opacity-70`}
                        >
                            
                            {isLoading ? <Loader loaderStyle={loaderStyle} /> : "Create"}
                        </button>
                    </div>
                </div>
            </form>
            {/* {successModal && <SuccessModal title={"dadasda"} setSuccessModal={setSuccessModal} setChangePasswordModal={setChangePasswordModal}/>} */}
        </motion.div>
    )
}

export default NotificationModal