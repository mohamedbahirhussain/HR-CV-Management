import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Star, Check, X, Clock, AlertCircle } from 'lucide-react';

// Mock data for final approval candidates
const mockCandidates = [
  {
    id: '1',
    name: 'Jane Cooper',
    position: 'Frontend Developer',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Engineering',
    salary: '$95,000',
    experience: '4 years',
    education: 'BS Computer Science',
    location: 'New York, NY',
    appliedDate: '10 Feb 2025',
    completedStages: ['Screening Call', 'Technical Interview', 'HR Interview'],
    rating: 4.5,
    status: 'Pending Approval',
    hireRecommendation: true,
    notes: 'Excellent candidate with strong React skills. Technical team highly recommends.'
  },
  {
    id: '2',
    name: 'Michael Johnson',
    position: 'UX Designer',
    avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Design',
    salary: '$85,000',
    experience: '3 years',
    education: 'BA Graphic Design',
    location: 'San Francisco, CA',
    appliedDate: '08 Feb 2025',
    completedStages: ['Screening Call', 'Portfolio Review', 'Technical Interview', 'HR Interview'],
    rating: 4.8,
    status: 'Pending Approval',
    hireRecommendation: true,
    notes: 'Outstanding portfolio and excellent design skills. Strong culture fit.'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    position: 'Project Manager',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Product',
    salary: '$105,000',
    experience: '6 years',
    education: 'MBA',
    location: 'Chicago, IL',
    appliedDate: '05 Feb 2025',
    completedStages: ['Screening Call', 'Technical Interview', 'HR Interview'],
    rating: 4.2,
    status: 'Approved',
    hireRecommendation: true,
    notes: 'Strong leadership skills and experience with agile methodologies.'
  },
  {
    id: '4',
    name: 'Robert Davis',
    position: 'Backend Developer',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Engineering',
    salary: '$98,000',
    experience: '5 years',
    education: 'MS Computer Science',
    location: 'Boston, MA',
    appliedDate: '03 Feb 2025',
    completedStages: ['Screening Call', 'Technical Interview', 'HR Interview'],
    rating: 3.8,
    status: 'Rejected',
    hireRecommendation: false,
    notes: 'Good technical skills but concerns about team fit and communication.'
  }
];

// Status component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending Approval':
        return <Clock size={14} className="mr-1" />;
      case 'Approved':
        return <Check size={14} className="mr-1" />;
      case 'Rejected':
        return <X size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {getStatusIcon(status)}
      {status}
    </span>
  );
};

const FinalApproval: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);
  
  // Department and status options
  const departmentOptions = ['All Departments', 'Engineering', 'Design', 'Product', 'Marketing', 'Sales'];
  const statusOptions = ['All Statuses', 'Pending Approval', 'Approved', 'Rejected'];
  
  // Filter candidates
  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartment === 'All Departments' || candidate.department === selectedDepartment;
    
    const matchesStatus = 
      selectedStatus === 'All Statuses' || candidate.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  // Toggle candidate details
  const toggleCandidateDetails = (id: string) => {
    if (expandedCandidate === id) {
      setExpandedCandidate(null);
    } else {
      setExpandedCandidate(id);
    }
  };
  
  // Render stars based on rating
  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
        />
      );
    }
    return stars;
  };
  
  const handleApprove = (id: string) => {
    console.log(`Approve candidate ${id}`);
    // In a real app, this would update the candidate status
    setExpandedCandidate(null);
  };
  
  const handleReject = (id: string) => {
    console.log(`Reject candidate ${id}`);
    // In a real app, this would update the candidate status
    setExpandedCandidate(null);
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
            <h1 className="text-2xl font-bold text-gray-900">Final Approval</h1>
            <p className="text-gray-500">Review and approve candidates for hiring</p>
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
              placeholder="Search by name or position..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCandidates.map((candidate) => (
              <React.Fragment key={candidate.id}>
                <tr 
                  className={`${expandedCandidate === candidate.id ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer`}
                  onClick={() => toggleCandidateDetails(candidate.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={candidate.avatarUrl} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                        <div className="text-sm text-gray-500">{candidate.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{candidate.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {renderRating(candidate.rating)}
                      <span className="ml-1 text-sm text-gray-500">{candidate.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={candidate.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {candidate.appliedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      Details
                    </button>
                  </td>
                </tr>
                
                {expandedCandidate === candidate.id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Candidate Details</h4>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-gray-500">Position</p>
                                <p className="text-sm font-medium text-gray-900">{candidate.position}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Department</p>
                                <p className="text-sm font-medium text-gray-900">{candidate.department}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Experience</p>
                                <p className="text-sm font-medium text-gray-900">{candidate.experience}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Education</p>
                                <p className="text-sm font-medium text-gray-900">{candidate.education}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Location</p>
                                <p className="text-sm font-medium text-gray-900">{candidate.location}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Proposed Salary</p>
                                <p className="text-sm font-medium text-gray-900">{candidate.salary}</p>
                              </div>
                            </div>
                            
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Interview Process</h4>
                            <div className="mb-4">
                              <div className="space-y-2">
                                {candidate.completedStages.map((stage, index) => (
                                  <div key={index} className="flex items-center">
                                    <div className="flex-shrink-0">
                                      <Check size={16} className="text-green-500" />
                                    </div>
                                    <div className="ml-2">
                                      <p className="text-sm text-gray-600">{stage}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="mb-4">
                              {candidate.hireRecommendation ? (
                                <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start">
                                  <Check size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                  <div>
                                    <h4 className="text-sm font-medium text-green-800">Recommended for Hire</h4>
                                    <p className="text-sm text-green-700 mt-1">The hiring team recommends this candidate for approval.</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
                                  <AlertCircle size={16} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                                  <div>
                                    <h4 className="text-sm font-medium text-red-800">Not Recommended</h4>
                                    <p className="text-sm text-red-700 mt-1">The hiring team does not recommend this candidate.</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                            <div className="bg-white p-3 rounded-md border border-gray-200 mb-4">
                              <p className="text-sm text-gray-600">{candidate.notes}</p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button 
                                className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Download resume');
                                }}
                              >
                                <Download size={16} className="inline mr-1" />
                                Resume
                              </button>
                              
                              {candidate.status === 'Pending Approval' && (
                                <>
                                  <button 
                                    className="flex-1 px-4 py-2 bg-green-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApprove(candidate.id);
                                    }}
                                  >
                                    <Check size={16} className="inline mr-1" />
                                    Approve
                                  </button>
                                  <button 
                                    className="flex-1 px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleReject(candidate.id);
                                    }}
                                  >
                                    <X size={16} className="inline mr-1" />
                                    Reject
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
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

export default FinalApproval;