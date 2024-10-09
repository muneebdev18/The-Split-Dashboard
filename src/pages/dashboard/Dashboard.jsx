import Header from "../../components/header/Header";
import StatsCard from "../../components/statsCard/StatsCard";
import { motion } from 'framer-motion';

import LineChartOverview from "../../components/lineChart/LineChartOverview";
import PieChartDist from "../../components/pieChart/PieChartDist";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import useSWR from "swr";
import { DASHBOARD_API_CONSTANTS } from "../../utils/constants";
const { GET_DASHBOARD_DATA } = DASHBOARD_API_CONSTANTS
const Dashboard = () => {

  // -------- GET Dashboard Data API --------
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
  const { data, isLoading } = useSWR([`${GET_DASHBOARD_DATA}`], fetcherWithToken);
  const DASHBOARD_DATA = data?.data


  //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col min-h-screen relative">
      <Header title={"Dashboard"} />
      <div className="flex flex-col flex-grow w-full lg:px-7 lg:py-7 sm:px-8 sm:py-2 xsm:px-0 xsm:py-0 overflow-y-auto">
        {/*-------- Stats Card Section ----------*/}
        <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
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
          {DASHBOARD_DATA?.cardData?.map((item, key) => {
            return (
              <div key={key}>
                <StatsCard title={item?.title} value={item?.value} icon={item?.icon} color={item?.color} id="dashboard_overview" />
              </div>
            )
          })}
        </motion.div>
        {/*-------- Stats Charts Section ----------*/}
        <div className="flex-grow my-10 grid md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 gap-7 justify-between items-center">
          {isLoading ? (
            <>
              <div role="status" className="flex items-center justify-center h-[340px]  bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
              </div>
              <div role="status" className="flex items-center justify-center h-[340px]  bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
              </div>
            </>
          ) : (
            <>
              <LineChartOverview lineChartData={DASHBOARD_DATA?.lineData} />
              <PieChartDist pieChartData={DASHBOARD_DATA?.pieData} />
            </>
          )}

        </div>
      </div>
      {/*-------- Footer ---------*/}
      <Footer />
    </div>
  )
}

export default Dashboard;
