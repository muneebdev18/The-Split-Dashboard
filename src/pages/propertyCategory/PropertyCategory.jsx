import Header from "../../components/header/Header"
import { motion } from 'framer-motion'
import StatsCard from "../../components/statsCard/StatsCard"
import Footer from "../../components/footer/Footer"
import { useEffect, useState } from "react"
import SkeletonTable from '../../components/skeletonTable/SkeletonTable'
import { BiSolidEdit } from "react-icons/bi"
import { MdDeleteForever } from "react-icons/md"
import EditPropertyCategoryModal from "../../components/modals/EditPropertyCategoryModal"
import CreatePropertyCategoryModal from "../../components/modals/CreatePropertyCategoryModal"
import useSWR from "swr"
import Pagination from '../../components/pagination/Pagination'
import { PROPERTY_CATEGORY_CONSTANTS } from "../../utils/constants"
const {GET_ALL_CATEGORY} = PROPERTY_CATEGORY_CONSTANTS
const PropertyCategory = () => {
    const [editCategoryModal,setEditCategoryModal] = useState(false)
    const [createCategoryModal,setCreateCategoryModal] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    let postPerPage = 10;
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;

    const [categoryData,setCategoryData] = useState('')
    // -------- GET ALL CATEGORY API --------
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
    const { data, isLoading, mutate } = useSWR([`${GET_ALL_CATEGORY}?limit=10&page=1`], fetcherWithToken);
    const CATEGORY_DATA = data?.data

    //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    return (
        <div className="w-full flex flex-col min-h-screen relative">
            <Header title={"Property Category"} />
            <div className="flex flex-col flex-grow w-full lg:px-7 lg:py-7 sm:px-8 sm:py-2 xsm:px-0 xsm:py-0 overflow-y-auto">
                {/*-------- Stats Card Section ----------*/}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {isLoading && (
                        <>
                            <div role="status" className="flex items-center justify-center h-[140px] max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                            </div>
                            <div role="status" className="flex items-center justify-center h-[140px] max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                            </div>
                            <div role="status" className="flex items-center justify-center h-[140px] max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                            </div>
                            <div role="status" className="flex items-center justify-center h-[140px] max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                            </div>
                        </>
                    )}
                
                    {
                        CATEGORY_DATA?.propertyCategoryData?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <StatsCard
                                        title={item?.title}
                                        value={item?.value}
                                        icon={item?.icon}
                                        color={item?.color}
                                        id="property_category"
                                    />
                                </div>
                            )
                        })
                    }
                </motion.div>
                {/*-------- Table Section ------- */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="h-[auto] bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-5 pb-11 border border-gray-700 overflow-y-hidden">
                    {/* ------- Table Header ------- */}
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-medium">Property Category List</p>
                        <div className="relative bg-transparent">
                            <button onClick={()=>setCreateCategoryModal(true)} className="py-[12px] text-white  text-[16px] font-semibold px-5 bg-[#34a7a3] rounded-lg">Create Category</button>
                        </div>
                    </div>
                    {/* ------- Table Body ------- */}
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full divide-y divide-gray-700  text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                                        Property Name
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                                    Property Category
                                    </th>

                                    <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                                        Created At
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading && (
                                    <>
                                        <SkeletonTable rows={8} columns={6} />
                                    </>
                                )}
                                {/* ------- Table Row ------- */}

                                {
                                    CATEGORY_DATA?.results?.results?.map((item, index) => {
                                        const date = new Date(item?.createdAt);
                                        const day = String(date.getDate()).padStart(2, "0");
                                        const month = String(date.getMonth() + 1).padStart(2, "0");
                                        const year = String(date.getFullYear()).slice(-2);
                                        const tempData = ` ${day}/${month}/20${year}`;
                                        return (
                                            <>
                                                <tr key={index} className="space-y-2" >
                                                    <td className="px-6 py-4 text-sm text-gray-100 border-b border-gray-700">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-100 border-b border-gray-700">
                                                        <div className="flex items-center gap-[8px]">
                                                            <div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center">
                                                            <img src={`https://thesplit.testdevlink.net/${item?.icon}`} className="w-[42px] h-[40px] rounded-full object-cover" />
                                                            </div>
                                                            <p className="capitalize">{item?.name}</p>
                                                       
                                                        </div>

                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-100 border-b border-gray-700">
                                                        <div className="flex items-center gap-[8px]">
                                                           
                                                           <p className="capitalize">{item?.category}</p>
                                                        </div>
                                                    </td>

                                                    <td className="px-1 py-4 text-sm text-gray-100 border-b border-gray-700">
                                                        {
                                                            item?.isDeleted ? (
                                                                <div className="bg-[#e43535] text-center px-7 py-2 w-fit rounded-3xl font-semibold">InActive</div>

                                                            ) : (
                                                                <div className="bg-[#06D001] text-center px-7 py-2 w-fit rounded-3xl font-semibold">Active</div>

                                                            )
                                                        }
                                                            

                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-100 border-b border-gray-700">
                                                        {tempData}
                                                       
                                                    </td>
                                                    <td className="px-9 py-4 text-sm text-gray-100 border-b border-gray-700 ">
                                                        <div className="flex items-center gap-1">
                                                            <BiSolidEdit onClick={()=>{
                                                                setEditCategoryModal(true)
                                                                setCategoryData({
                                                                    id:item?._id,
                                                                    icon:item?.icon,
                                                                    name:item?.name,
                                                                    category:item?.category
                                                                })
                                                            }} size={25} color="#6366f1" className="cursor-pointer" />
                                                            {/* <Link to={`/notification/details/${item?._id}`}> */}
                                                                {/* <FaEye size={25} color="#556df4" className="cursor-pointer" /> */}
                                                            {/* </Link> */}
                                                            <MdDeleteForever  size={25} color="#ff0000" className="cursor-pointer" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                {/* -------- If isLoading is true then, To View and Center the Loader --------- */}
                                {/* <tr className="overflow-y-hidden">
                <td colSpan="7" className="text-center align-middle py-10">
                  <Loader loaderStyle={loaderStyle} />
                </td>
              </tr> */}
                            </tbody>
                        </table>
                    </div>
                    {/*---------- Pagination ---------- */}
                    {isLoading ? (
                        ''
                    )
                        : (
                            <div className="flex flex-col md:flex-row mt-5 justify-between items-center gap-3 text-[11px]">
                                <p className=" text-gray-100 text-[15px]">
                                    {firstPostIndex + 1}-{
                                        lastPostIndex > CATEGORY_DATA?.count ? CATEGORY_DATA?.count : lastPostIndex
                                    } <span className="ml-1">of</span> {CATEGORY_DATA?.count}
                                </p>
                                <div className="flex sm:flex-row xsm:flex-col space-x-4">
                                    <Pagination
                                        totalPost={CATEGORY_DATA?.count}
                                        postPerPage={CATEGORY_DATA?.results?.results?.length}
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </div>
                        )
                    }


                </motion.div>
                {/* ------- Modal for Create & Edit Category ------- */}
                {createCategoryModal && <CreatePropertyCategoryModal mutate={mutate} setCreateCategoryModal = {setCreateCategoryModal}/>}
                {editCategoryModal && <EditPropertyCategoryModal mutate={mutate} setEditCategoryModal={setEditCategoryModal} categoryData={categoryData} setCategoryData={setCategoryData}/>}
            </div>
            {/* ------ Footer ------ */}
            <Footer />
        </div>
    )
}

export default PropertyCategory