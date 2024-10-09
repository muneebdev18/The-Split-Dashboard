import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const LineChartOverview = ({lineChartData}) => {
    
  return (
   <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-5 pb-11 border border-gray-700 h-[395px]"
   initial={{opacity:0,y:-50}}
   animate={{opacity:1,y:0}}
   transition={{duration:0.2,delay:0.5}}
   >
    <p className="font-medium text-[17px] mb-3">Dashboard Overview</p>

    <ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={lineChartData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey={"name"} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotoneX'
							dataKey='userData'
							stroke='#F59E0B'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
            <Line
							type='monotoneX'
							dataKey='propertiesData'
							stroke='#ec4899'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
            <Line
							type='monotoneX'
							dataKey='requestTourData'
							stroke='#6366F1'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
            <Line
							type='monotoneX'
							dataKey='notificationsData'
							stroke='#10B981'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
   </motion.div>
  )
}

export default LineChartOverview