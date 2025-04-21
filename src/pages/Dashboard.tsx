import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  XCircle, 
  Clock,
  Briefcase,
  ChevronUp,
  ChevronDown,
  Code,
  Palette,
  LineChart,
  Megaphone,
  DollarSign
} from 'lucide-react';
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
  Cell
} from 'recharts';

// Mock data for job categories and applications
const jobCategories = [
  {
    id: 1,
    title: 'Software Development',
    icon: Code,
    positions: [
      { title: 'Frontend Developer', applications: 45, trend: '+12%' },
      { title: 'Backend Developer', applications: 38, trend: '+8%' },
      { title: 'Full Stack Developer', applications: 32, trend: '+15%' },
      { title: 'Mobile Developer', applications: 28, trend: '+5%' }
    ],
    totalApplications: 143,
    trend: '+10%',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    id: 2,
    title: 'Design',
    icon: Palette,
    positions: [
      { title: 'UI/UX Designer', applications: 35, trend: '+18%' },
      { title: 'Product Designer', applications: 28, trend: '+7%' },
      { title: 'Graphic Designer', applications: 22, trend: '+4%' }
    ],
    totalApplications: 85,
    trend: '+9%',
    color: 'text-purple-600 bg-purple-100'
  },
  {
    id: 3,
    title: 'Marketing',
    icon: Megaphone,
    positions: [
      { title: 'Digital Marketing Manager', applications: 25, trend: '+6%' },
      { title: 'Content Strategist', applications: 20, trend: '+12%' },
      { title: 'SEO Specialist', applications: 18, trend: '+3%' }
    ],
    totalApplications: 63,
    trend: '+7%',
    color: 'text-green-600 bg-green-100'
  },
  {
    id: 4,
    title: 'Sales',
    icon: DollarSign,
    positions: [
      { title: 'Sales Manager', applications: 30, trend: '+15%' },
      { title: 'Account Executive', applications: 25, trend: '+8%' },
      { title: 'Sales Representative', applications: 22, trend: '+5%' }
    ],
    totalApplications: 77,
    trend: '+9%',
    color: 'text-yellow-600 bg-yellow-100'
  }
];

const applicationData = [
  { name: 'Mon', applications: 12 },
  { name: 'Tue', applications: 19 },
  { name: 'Wed', applications: 10 },
  { name: 'Thu', applications: 22 },
  { name: 'Fri', applications: 15 },
  { name: 'Sat', applications: 8 },
  { name: 'Sun', applications: 5 },
];

const statusData = [
  { name: 'Screening', value: 30 },
  { name: 'Technical', value: 45 },
  { name: 'HR Interview', value: 20 },
  { name: 'CEO Review', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentCandidates = [
  { id: 1, name: 'Jane Cooper', position: 'Frontend Developer', date: '10 Feb 2025', status: 'Technical Interview', avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 2, name: 'Michael Johnson', position: 'UX Designer', date: '10 Feb 2025', status: 'HR Interview', avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 3, name: 'Sarah Williams', position: 'Project Manager', date: '09 Feb 2025', status: 'Screening Call', avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 4, name: 'Robert Davis', position: 'Backend Developer', date: '08 Feb 2025', status: 'Technical Interview', avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

const Dashboard: React.FC = () => {
  const { currentUser, userRole } = useAuth();
  
  return (
    <div>
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {currentUser?.name}</p>
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
              <h3 className="text-2xl font-bold text-gray-900">368</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-green-500 text-sm">
            <ChevronUp className="h-4 w-4" />
            <span className="font-medium">12%</span>
            <span className="ml-1">vs last month</span>
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
              <h3 className="text-2xl font-bold text-gray-900">13</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Briefcase className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-green-500 text-sm">
            <ChevronUp className="h-4 w-4" />
            <span className="font-medium">8%</span>
            <span className="ml-1">vs last month</span>
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
              <p className="text-gray-500 text-sm">Interviews This Week</p>
              <h3 className="text-2xl font-bold text-gray-900">45</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-green-500 text-sm">
            <ChevronUp className="h-4 w-4" />
            <span className="font-medium">24%</span>
            <span className="ml-1">vs last week</span>
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
              <p className="text-gray-500 text-sm">Time to Hire (Avg)</p>
              <h3 className="text-2xl font-bold text-gray-900">28 days</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-red-500 text-sm">
            <ChevronDown className="h-4 w-4" />
            <span className="font-medium">2 days</span>
            <span className="ml-1">vs last month</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {jobCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              className="bg-white rounded-lg shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-500">{category.positions.length} open positions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{category.totalApplications}</p>
                    <p className="text-sm text-green-500">{category.trend} this month</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  {category.positions.map((position, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{position.title}</h4>
                        <p className="text-xs text-gray-500">{position.applications} applications</p>
                      </div>
                      <div className="flex items-center text-green-500 text-sm">
                        <ChevronUp className="h-4 w-4" />
                        <span>{position.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div 
          className="bg-white rounded-lg shadow lg:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Application Trends</h3>
            <p className="text-sm text-gray-500">Daily applications received in the last week</p>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Candidates by Stage</h3>
            <p className="text-sm text-gray-500">Current recruitment pipeline</p>
          </div>
          <div className="p-5 h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-white rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Candidates</h3>
          <p className="text-sm text-gray-500">Latest applications and updates</p>
        </div>
        <div className="divide-y divide-gray-200">
          {recentCandidates.map((candidate) => (
            <div key={candidate.id} className="p-5 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={candidate.avatarUrl}
                    alt={candidate.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">{candidate.name}</h4>
                    <p className="text-sm text-gray-500">{candidate.position}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-4">
                    <p className="text-sm text-gray-500">Applied on</p>
                    <p className="text-sm font-medium text-gray-900">{candidate.date}</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {candidate.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all candidates
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;