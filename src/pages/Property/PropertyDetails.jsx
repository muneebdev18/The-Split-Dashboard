import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { motion } from "framer-motion";
import Profile from "../../assets/images/profile.jpg";
import Footer from "../../components/footer/Footer";
import ImageGallery from "react-image-gallery";
import Gimage1 from "../../assets/images/image-gallery-2.jpg";
import Gimage2 from "../../assets/images/image-gallery-3.jpg";
import Gimage3 from "../../assets/images/image-gallery-5.jpg";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { PROPERTY_API_CONSTANTS } from "../../utils/constants";
const { GET_PROPERTY_ID } = PROPERTY_API_CONSTANTS;
import FavouritesModal from "../../components/modals/FavouritesModal";

const PropertyDetails = () => {
  const [favouriteModal, setFavouriteModal] = useState(false);
  // const [recentlyViewModal,setRecentlyViewModal] = useState(false)
  const { id } = useParams();
  console.log(id);
  // -------- GET PROPERTIES BY ID API --------
  const adminDataLocal = JSON.parse(localStorage.getItem("admin"));
  const token = adminDataLocal?.token;

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
  const { data, isLoading } = useSWR(
    [`${GET_PROPERTY_ID}${id}`],
    fetcherWithToken
  );
  const PROPERTYDATA = data?.data;
  //   ------ Images Gallery ------
  const propertyImg = PROPERTYDATA?.propertyImages || []; // Default to empty array if undefined
const images = propertyImg.map((item) => {
  return {
    original: 'https://thesplit.testdevlink.net/' + item,
    thumbnail: 'https://thesplit.testdevlink.net/' + item,
  };
});
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col min-h-screen relative">
      <Header title={"Property Details"} />
      <div className="flex flex-col flex-grow w-full lg:px-7 lg:py-7 sm:px-8 sm:py-2 xsm:px-0 xsm:py-0 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="h-[auto] bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-5 pb-8 border border-gray-700 overflow-y-hidden"
        >
          <div>
            <p className="text-2xl font-semibold mb-5">Property Details</p>
            <div className="flex justify-between">
              <div className="flex gap-7">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-md" htmlFor="">
                    Property Name :
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Property Owner :{" "}
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Phone # :{" "}
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Address :
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    City :
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Country :
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Property Description :
                  </label>
                  <label className="font-semibold text-md" htmlFor="">
                    Status :
                  </label>
                </div>

                <div className="flex flex-col gap-1">
                  {isLoading ? (
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
                  ) : (
                    <>
                      <p>{PROPERTYDATA?.propertyName}</p>
                      <p>{PROPERTYDATA?.email}</p>
                      <p>{PROPERTYDATA?.phoneNumber} </p>
                      <p>
                        {PROPERTYDATA?.loaction
                          ? PROPERTYDATA?.loaction
                          : "N/A"}
                      </p>
                      <p>{PROPERTYDATA?.city ? PROPERTYDATA?.city : "N/A"}</p>
                      <p>
                        {PROPERTYDATA?.country ? PROPERTYDATA?.country : "N/A"}
                      </p>
                      <p>
                        {PROPERTYDATA?.propertyDescription
                          ? PROPERTYDATA?.propertyDescription
                          : "N/A"}{" "}
                      </p>
                      <p>{PROPERTYDATA?.isPurchased ? "Sold" : "Available"}</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                {isLoading && (
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                    <div className="flex items-center justify-center w-full h-[240px] bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                    </div>
                )}
                <ImageGallery
                  autoPlay={false}
                  showNav={false}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  showBullets={false}
                  items={images}
                />
              </div>
            </div>
          </div>
        </motion.div>
        {/*--------- Second Section --------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="h-[auto] my-5 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-4 pb-5 border border-gray-700 overflow-y-hidden"
        >
          <div>
            <p className="text-2xl font-semibold mb-5">Sizes & Facilities</p>
            <div className="flex gap-7">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-md" htmlFor="">
                  Area Size :
                </label>
                <label className="font-semibold text-md" htmlFor="">
                  Lot Size :{" "}
                </label>
                <label className="font-semibold text-md" htmlFor="">
                  Longitude & Latitude :{" "}
                </label>
                <label className="font-semibold text-md" htmlFor="">
                  No fo Rooms :
                </label>
                <label className="font-semibold text-md" htmlFor="">
                  No fo Washrooms :
                </label>
              </div>
              <div className="flex flex-col gap-1">
                {isLoading ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <p>
                      {PROPERTYDATA?.areaSize} - {PROPERTYDATA?.areaUnit}
                    </p>
                    <p>
                      {PROPERTYDATA?.lotSize ? PROPERTYDATA?.lotSize : "N/A"}
                    </p>
                    <p>
                      {PROPERTYDATA?.longitude} , {PROPERTYDATA?.latitude}
                    </p>
                    <p>{PROPERTYDATA?.bedroomCount}</p>
                    <p>{PROPERTYDATA?.bathroomCount}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        {/* -------- Third Section ---------*/}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="h-[auto] my-5 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-4 pb-5 border border-gray-700 overflow-y-hidden"
        >
          <div>
            <p className="text-2xl font-semibold mb-5">
              Added Properties to Favourites
            </p>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-md" htmlFor="">
                  Total Add To Favourites :
                </label>
              </div>
              <div className="flex flex-col ">
                {isLoading ? <div role="status" className="max-w-sm animate-pulse">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-4"></div>
                    </div> :
                <p>{PROPERTYDATA?.favouriteCount}</p>

                    }
              </div>
            </div>
            {PROPERTYDATA?.favouriteCount > 0 ? (
              <button
                onClick={() => setFavouriteModal(true)}
                className="mt-4 bg-[#2d8cbb] py-3 px-5 font-semibold rounded-lg"
              >
                Click Here to View
              </button>
            )
        :
        (
            ''
        )
        }
          </div>
        </motion.div>
        {favouriteModal && (
          <FavouritesModal
            id="addToFavourite"
            title={"Add To Favourites List"}
            setFavouriteModal={setFavouriteModal}
            favouritesData={PROPERTYDATA?.addToFavorite}
          />
        )}
        {/* -------- Fourth Section -------- */}
        {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3 }}
                    className="h-[auto] my-5 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-4 pb-5 border border-gray-700 overflow-y-hidden"
                >
                    <div>
                        <p className="text-2xl font-semibold mb-5">Recently Viewed To This Property</p>
                        <div className="flex gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold text-md" htmlFor="">
                                    No of Recently Views: 
                                </label>


                            </div>
                            <div className="flex flex-col gap-1">
                                <p>30</p>

                            </div>
                        </div>
                            <button onClick={()=>setRecentlyViewModal(true)} className="mt-4 bg-[#2d8cbb] py-3 px-5 font-semibold rounded-lg">Click Here to View</button>
                    </div>
                
                </motion.div>
                {recentlyViewModal && <FavouritesModal setRecentlyViewModal={setFavouriteModal} id="recentlyViewed" title={"Recently Viewed List"}/>} */}
      </div>
      <Footer />
      {/* {blockModal && <WarningModal title={"Are you sure you want to block this User ? "} setBlockModal={setBlockModal}/>} */}
    </div>
  );
};

export default PropertyDetails;
