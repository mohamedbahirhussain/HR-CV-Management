import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Upload } from 'lucide-react';
import CandidateCard from '../components/candidates/CandidateCard';

// Mock data for candidates
const mockCandidates = [
  {
    id: '1',
    name: 'Jane Cooper',
    position: 'Frontend Developer',
    email: 'jane.cooper@example.com',
    phone: '(555) 123-4567',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    appliedDate: '10 Feb 2025',
    status: 'Screening Call',
    rating: 4.5,
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    department: 'Engineering',
    experience: '4 years',
    education: 'BS Computer Science',
  },
  {
    id: '2',
    name: 'Michael Johnson',
    position: 'UX Designer',
    email: 'michael.johnson@example.com',
    phone: '(555) 234-5678',
    avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    appliedDate: '10 Feb 2025',
    status: 'HR Interview',
    rating: 4.0,
    skills: ['Figma', 'UI Design', 'User Research', 'Prototyping'],
    department: 'Design',
    experience: '3 years',
    education: 'BA Graphic Design',
    isShortlisted: true,
  },
  {
    id: '3',
    name: 'Sarah Williams',
    position: 'Project Manager',
    email: 'sarah.williams@example.com',
    phone: '(555) 345-6789',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    appliedDate: '09 Feb 2025',
    status: 'Technical Interview',
    rating: 3.5,
    skills: ['Agile', 'Scrum', 'JIRA', 'Team Leadership'],
    department: 'Product',
    experience: '5 years',
    education: 'MBA',
  },
  {
    id: '4',
    name: 'Robert Davis',
    position: 'Backend Developer',
    email: 'robert.davis@example.com',
    phone: '(555) 456-7890',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    appliedDate: '08 Feb 2025',
    status: 'Technical Interview',
    rating: 4.0,
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
    department: 'Engineering',
    experience: '6 years',
    education: 'MS Computer Science',
  },
];

// Filter options
const departmentOptions = ['All Departments', 'Engineering', 'Design', 'Product', 'Marketing', 'Sales'];
const statusOptions = ['All Statuses', 'Screening Call', 'Technical Interview', 'HR Interview', 'CEO Interview', 'Rejected', 'Hired'];

const CVManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter candidates
  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartment === 'All Departments' || candidate.department === selectedDepartment;
    
    const matchesStatus = 
      selectedStatus === 'All Statuses' || candidate.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  const handleViewDetails = (id: string) => {
    // In a real app, this would navigate to a detailed view
    console.log('View details for candidate:', id);
  };
  
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
            <h1 className="text-2xl font-bold text-gray-900">CV Management</h1>
            <p className="text-gray-500">Browse and manage candidate applications</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <motion.button
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload CVs
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Candidate
            </motion.button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by name, position, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-5 w-5 text-gray-400" />
            Filters
          </button>
        </div>
        
        {showFilters && (
          <motion.div 
            className="mt-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  id="department"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departmentOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="date-range" className="block text-sm font-medium text-gray-700">Date Range</label>
                <select
                  id="date-range"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Custom Range</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  setSelectedDepartment('All Departments');
                  setSelectedStatus('All Statuses');
                }}
              >
                Reset Filters
              </button>
              <button
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate, index) => (
          <CandidateCard
            key={candidate.id}
            {...candidate}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
      
      {filteredCandidates.length === 0 && (
        <div className="mt-10 text-center py-12 bg-white rounded-lg shadow">
          <div className="text-gray-400 mx-auto">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default CVManagement;