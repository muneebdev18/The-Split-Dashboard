import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PieChartDist = ({pieChartData}) => {
    const categoryData = [
        { name: "Electronics", value: 4500 },
        { name: "Clothing", value: 3200 },
        { name: "Home & Garden", value: 2800 },
        { name: "Books", value: 2100 },
        { name: "Sports", value: 1900 },
    ];
    console.log(pieChartData);

    const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];
    return (
        <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl px-6 pt-5 pb-11 border border-gray-700 h-[395px]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.9 }}
        >
            <p className="font-medium text-[17px] mb-3">Category Distribution Overview</p>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart>
                    <Pie
                        data={pieChartData}
                        cx={"50%"}
                        cy={"50%"}
                        labelLine={false}
                        outerRadius={80}
                        fill='#8884d8'
                        dataKey='value'
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {pieChartData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(31, 41, 55, 0.8)",
                            borderColor: "#4B5563",
                        }}
                        itemStyle={{ color: "#E5E7EB" }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </motion.div>
    )
}

export default PieChartDist