import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, StarHalf, ChevronDown, MessageSquare, Plus, Check, X } from 'lucide-react';

// Mock data for candidate reviews
const mockCandidates = [
  {
    id: '1',
    name: 'Jane Cooper',
    position: 'Frontend Developer',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Engineering',
    appliedDate: '10 Feb 2025',
    interviewDate: '15 Feb 2025',
    status: 'Technical Interview Completed',
    interviewers: ['Michael Scott', 'Jim Halpert'],
    technicalRating: 4.5,
    communicationRating: 4.0,
    cultureRating: 4.2,
    overallRating: 4.2,
    notes: 'Excellent knowledge of React and state management. Could improve on system design.',
    feedback: [
      { id: 1, author: 'Michael Scott', role: 'Engineering Manager', content: 'Strong technical skills, especially in React and TypeScript. Solved the algorithmic challenge effectively.', date: '15 Feb 2025' },
      { id: 2, author: 'Jim Halpert', role: 'Senior Developer', content: 'Good communication, explained thought process clearly. Has potential to grow into a senior role.', date: '15 Feb 2025' }
    ]
  },
  {
    id: '2',
    name: 'Michael Johnson',
    position: 'UX Designer',
    avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Design',
    appliedDate: '08 Feb 2025',
    interviewDate: '14 Feb 2025',
    status: 'HR Interview Scheduled',
    interviewers: ['Pam Beesly', 'Dwight Schrute'],
    technicalRating: 4.7,
    communicationRating: 4.5,
    cultureRating: 4.8,
    overallRating: 4.7,
    notes: 'Exceptional portfolio and great eye for design. Strong understanding of UX principles.',
    feedback: [
      { id: 1, author: 'Pam Beesly', role: 'Design Lead', content: 'Impressive portfolio with a great understanding of user-centered design. Good knowledge of modern design tools and workflows.', date: '14 Feb 2025' },
      { id: 2, author: 'Dwight Schrute', role: 'Product Manager', content: 'Asked insightful questions about our product. Showed enthusiasm about our mission and values.', date: '14 Feb 2025' }
    ]
  },
  {
    id: '3',
    name: 'Sarah Williams',
    position: 'Project Manager',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Product',
    appliedDate: '05 Feb 2025',
    interviewDate: '12 Feb 2025',
    status: 'Pending Decision',
    interviewers: ['Andy Bernard', 'Angela Martin'],
    technicalRating: 3.8,
    communicationRating: 4.6,
    cultureRating: 4.2,
    overallRating: 4.2,
    notes: 'Strong leadership skills and great experience with agile methodologies.',
    feedback: [
      { id: 1, author: 'Andy Bernard', role: 'Regional Manager', content: 'Excellent communication skills and leadership qualities. Has managed teams of 10+ people effectively.', date: '12 Feb 2025' },
      { id: 2, author: 'Angela Martin', role: 'Head of Accounting', content: 'Detail-oriented and organized. Good understanding of budget management for projects.', date: '12 Feb 2025' }
    ]
  }
];

const CandidateReview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);
  
  // Department and status options
  const departmentOptions = ['All Departments', 'Engineering', 'Design', 'Product', 'Marketing', 'Sales'];
  const statusOptions = ['All Statuses', 'Technical Interview Completed', 'HR Interview Scheduled', 'Pending Decision'];
  
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
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={16} className="text-yellow-400 fill-current" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }

    return stars;
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
            <h1 className="text-2xl font-bold text-gray-900">Candidate Review</h1>
            <p className="text-gray-500">Review and rate candidates after interviews</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <motion.button
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Review
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
      
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <motion.div
            key={candidate.id}
            className="bg-white rounded-lg shadow overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="p-5 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleCandidateDetails(candidate.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img
                    src={candidate.avatarUrl}
                    alt={candidate.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-600 mr-2">{candidate.position}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {candidate.department}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-2">
                    {candidate.status}
                  </span>
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {renderRating(candidate.overallRating)}
                    </div>
                    <span className="text-sm text-gray-600">{candidate.overallRating.toFixed(1)}</span>
                    <ChevronDown 
                      size={20} 
                      className={`ml-2 text-gray-400 transition-transform duration-200 ${expandedCandidate === candidate.id ? 'transform rotate-180' : ''}`} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {expandedCandidate === candidate.id && (
              <motion.div
                className="p-5 border-t border-gray-200 bg-gray-50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Interview Details</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Applied Date</p>
                        <p className="text-sm font-medium text-gray-900">{candidate.appliedDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Interview Date</p>
                        <p className="text-sm font-medium text-gray-900">{candidate.interviewDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Interviewers</p>
                        <p className="text-sm font-medium text-gray-900">{candidate.interviewers.join(', ')}</p>
                      </div>
                    </div>
                    
                    <h4 className="text-sm font-medium text-gray-500 mt-4 mb-2">Ratings</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Technical Skills</span>
                        <div className="flex items-center">
                          <div className="flex mr-1">
                            {renderRating(candidate.technicalRating)}
                          </div>
                          <span className="text-sm text-gray-600">{candidate.technicalRating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Communication</span>
                        <div className="flex items-center">
                          <div className="flex mr-1">
                            {renderRating(candidate.communicationRating)}
                          </div>
                          <span className="text-sm text-gray-600">{candidate.communicationRating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Cultural Fit</span>
                        <div className="flex items-center">
                          <div className="flex mr-1">
                            {renderRating(candidate.cultureRating)}
                          </div>
                          <span className="text-sm text-gray-600">{candidate.cultureRating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Overall</span>
                        <div className="flex items-center">
                          <div className="flex mr-1">
                            {renderRating(candidate.overallRating)}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{candidate.overallRating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                    <p className="text-sm text-gray-600 mb-4">{candidate.notes}</p>
                    
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Feedback</h4>
                    <div className="space-y-3">
                      {candidate.feedback.map(item => (
                        <div key={item.id} className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.author}</p>
                              <p className="text-xs text-gray-500">{item.role}</p>
                            </div>
                            <span className="text-xs text-gray-500">{item.date}</span>
                          </div>
                          <p className="text-sm text-gray-600">{item.content}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex mt-4 space-x-2">
                      <button className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Add Feedback
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center">
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
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

export default CandidateReview;