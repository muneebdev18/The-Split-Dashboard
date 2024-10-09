import Header from "../../components/header/Header";
import StatsCard from "../../components/statsCard/StatsCard";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import Footer from '../../components/footer/Footer'
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import DeleteModal from "../../components/modals/DeleteModal"
import useSWR from "swr";
import { PROPERTY_API_CONSTANTS } from "../../utils/constants";
import SkeletonTable from "../../components/skeletonTable/SkeletonTable";
import { Link } from "react-router-dom";
const { GET_ALL_PROPERTY } = PROPERTY_API_CONSTANTS
const Property = () => {
  // const [activeModal, setActiveModal] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  let postPerPage = 10;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  // -------- GET ALL PROPERTIES API --------
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
  const { data, isLoading } = useSWR([`${GET_ALL_PROPERTY}?limit=10&page=1`], fetcherWithToken);
  const PROPERTYDATA = data?.data

  const PROPERTYCARDS = data?.data?.cardData

  //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col min-h-screen relative">
      <Header title={"Property"} />
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
          {PROPERTYCARDS?.map((item, index) => {
            return (
              <div key={index}>
                <StatsCard
                  title={item?.title}
                  value={item?.value}
                  icon={item?.icon}
                  color={item?.color}
                  id="property"
                />
              </div>
            )
          })}
        </motion.div>
        {/*-------- Table Section ------- */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="h-auto bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-5 pb-11 border border-gray-700">
          {/* ------- Table Header ------- */}
          <div className="flex justify-between items-center">
            <p className="text-2xl font-medium">Property List</p>
            {/* <div className="relative bg-transparent">
              <input
                type="text"
                placeholder="Search Property"
                className="bg-gray-800 bg-opacity-80 py-3 px-[38px] backdrop-blur-md outline-none rounded-lg"
              />
              <FaSearch className="absolute top-4 left-3" />
            </div> */}
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                    Category
                  </th>
                  <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                    Country
                  </th>
                  <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                    Price
                  </th>
                  <th className="py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                    Property Status
                  </th>
                  <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                    Status
                  </th>
                  <th className="px-6 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading && <SkeletonTable rows={7} columns={9} />}
                {/* ------- Table Row ------- */}
                {PROPERTYDATA?.propertyData?.results?.map((item, index) => {
                  return (
                    <tr key={item?._id} className="space-y-2">
                      <td className="px-6 py-4 text-sm text-gray-100 border-b border-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-100 border-b border-gray-700">
                        {item?.propertyName?.split(' ')[0] + (item?.propertyName?.split(' ').length > 1 ? '...' : '')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-100 border-b border-gray-700">
                        {item?.userId?.fullname}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-100 border-b border-gray-700">
                        {item?.propertyCategory}
                      </td>
                      <td className="px-4 py-4 text-[12px] text-gray-100 border-b border-gray-700">{item?.country}</td>
                      <td className="px-6 py-4 text-sm text-gray-100 border-b border-gray-700">${item?.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-100 border-b border-gray-700">
                        {item?.isPurchased
                          ? (<p className="text-green-500 font-semibold">Sold</p>)
                          : (<p className="text-yellow-400 font-semibold">Available</p>)
                        }

                      </td>
                      <td className="px-1 py-4 text-sm text-gray-100 border-b border-gray-700">
                        {
                          item?.isDeleted ?
                            (<div className="bg-[#FF0000] text-center px-7 py-2 w-fit rounded-3xl font-semibold">Inactive</div>)
                            :
                            (<div className="bg-[#06D001] text-center px-7 py-2 w-fit rounded-3xl font-semibold">Active</div>)
                        }
                      </td>
                      <td className="px-9 py-4 text-sm text-gray-100 border-b border-gray-700 ">

                        <div className="flex items-center gap-1">
                          <Link to={`/property/details/${item?._id}`}>
                            <FaEye size={25} color="#556df4" className="cursor-pointer" />
                          </Link>
                          {/* <BiSolidEdit size={25} color="#6366f1" className="cursor-pointer" /> */}
                          {/* <MdDeleteForever onClick={() => setActiveModal(true)} size={25} color="#ff0000" className="cursor-pointer" /> */}
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {/* -------- If isLoading is true then, To View and Center the Loader --------- */}
                {/* <tr className="overflow-y-hidden">
                <td colSpan="7" className="text-center align-middle py-10">
                  <Loader loaderStyle={loaderStyle} />
                </td>
              </tr> */}
              </tbody>
            </table>

          </div>
          {
            isLoading ? '' :
              (
                <div className="flex flex-col md:flex-row mt-5 justify-between items-center gap-3 text-[11px]">
                  <p className=" text-gray-100 text-[15px]">
                    {firstPostIndex + 1}-{
                      lastPostIndex > PROPERTYDATA?.count ? PROPERTYDATA?.count : lastPostIndex
                    } <span className="ml-1">of</span> {PROPERTYDATA?.count}
                  </p>

                
              {/* Add Pagination When do API Integration */}

          <div className="flex sm:flex-row xsm:flex-col space-x-4">
            <Pagination
            totalPost={PROPERTYDATA?.count}
            postPerPage={PROPERTYDATA?.propertyData?.results?.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            temp={
              lastPostIndex > PROPERTYDATA?.count ? PROPERTYDATA?.count : lastPostIndex
          }
            />
          </div>
      </div>
      )
          }

    </motion.div>
        {/* ------- Modal for Delete Product ------- */ }
  {/* { activeModal && <DeleteModal title="User" activeModal={activeModal} setActiveModal={setActiveModal} /> } */}
      </div >
  <Footer />
    </div >
  );
};

export default Property;
