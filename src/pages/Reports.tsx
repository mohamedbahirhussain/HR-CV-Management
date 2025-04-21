import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  Download, 
  Filter, 
  Calendar, 
  Share2, 
  ChevronDown, 
  Users, 
  Briefcase, 
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';

// Mock data for reports
const applicationData = [
  { name: 'Jan', applications: 45 },
  { name: 'Feb', applications: 52 },
  { name: 'Mar', applications: 49 },
  { name: 'Apr', applications: 63 },
  { name: 'May', applications: 58 },
  { name: 'Jun', applications: 64 },
  { name: 'Jul', applications: 78 },
  { name: 'Aug', applications: 85 },
  { name: 'Sep', applications: 73 },
  { name: 'Oct', applications: 68 },
  { name: 'Nov', applications: 72 },
  { name: 'Dec', applications: 79 }
];

const departmentData = [
  { name: 'Engineering', value: 45 },
  { name: 'Design', value: 20 },
  { name: 'Product', value: 15 },
  { name: 'Marketing', value: 10 },
  { name: 'Sales', value: 10 }
];

const hiringPipelineData = [
  { name: 'Screening', applied: 120, passed: 75 },
  { name: 'Technical', applied: 75, passed: 50 },
  { name: 'HR', applied: 50, passed: 35 },
  { name: 'CEO', applied: 35, passed: 25 },
  { name: 'Offer', applied: 25, passed: 18 }
];

const timeToHireData = [
  { name: 'Engineering', days: 35 },
  { name: 'Design', days: 28 },
  { name: 'Product', days: 32 },
  { name: 'Marketing', days: 25 },
  { name: 'Sales', days: 22 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('This Year');
  const [showTimeRangeOptions, setShowTimeRangeOptions] = useState(false);
  
  const timeRangeOptions = ['Last Week', 'Last Month', 'Last Quarter', 'This Year', 'All Time'];
  
  return (
    <div>
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recruitment Reports</h1>
            <p className="text-gray-500">Analytics and insights for the recruitment process</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <div className="relative">
              <button
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                onClick={() => setShowTimeRangeOptions(!showTimeRangeOptions)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {timeRange}
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              
              {showTimeRangeOptions && (
                <motion.div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-1">
                    {timeRangeOptions.map((option) => (
                      <button
                        key={option}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          timeRange === option ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setTimeRange(option);
                          setShowTimeRangeOptions(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
            
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
            
            <button
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <motion.div 
          className="bg-white rounded-lg shadow p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Applications</p>
              <h3 className="text-2xl font-bold text-gray-900">786</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-green-500 text-sm">
            <span className="font-medium">+12%</span>
            <span className="ml-1">vs previous period</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Open Positions</p>
              <h3 className="text-2xl font-bold text-gray-900">24</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-green-500 text-sm">
            <span className="font-medium">+5%</span>
            <span className="ml-1">vs previous period</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg. Time to Hire</p>
              <h3 className="text-2xl font-bold text-gray-900">28 days</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-red-500 text-sm">
            <span className="font-medium">+3 days</span>
            <span className="ml-1">vs previous period</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Positions Filled</p>
              <h3 className="text-2xl font-bold text-gray-900">18</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-green-500 text-sm">
            <span className="font-medium">+20%</span>
            <span className="ml-1">vs previous period</span>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
          className="bg-white rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Applications Over Time</h3>
            <p className="text-sm text-gray-500">Total applications received per month</p>
          </div>
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={applicationData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Applications by Department</h3>
            <p className="text-sm text-gray-500">Distribution of applications across departments</p>
          </div>
          <div className="p-5 h-72 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
          className="bg-white rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Hiring Pipeline</h3>
            <p className="text-sm text-gray-500">Candidates at each stage of the hiring process</p>
          </div>
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hiringPipelineData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applied" stackId="a" fill="#8884d8" name="Total Candidates" />
                <Bar dataKey="passed" stackId="a" fill="#82ca9d" name="Passed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Average Time to Hire</h3>
            <p className="text-sm text-gray-500">Days to hire by department</p>
          </div>
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeToHireData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="days" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-white rounded-lg shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recruitment Summary</h3>
          <p className="text-sm text-gray-500">Key metrics and statistics for the current period</p>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Open Positions
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interviews
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Offers
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hired
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Engineering
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    345
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    78
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    8
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2.3%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Design
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    4
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    156
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    42
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    8
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    3.2%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Product
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    3
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    112
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    29
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    4
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1.8%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Marketing
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    98
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    18
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    3
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2.0%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Sales
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    75
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    24
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    6
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1.3%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;