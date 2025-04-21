import React from 'react';
import { motion } from 'framer-motion';
import { Star, StarHalf, Download, Mail, Phone, Plus, Calendar } from 'lucide-react';

interface CandidateProps {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  avatarUrl: string;
  appliedDate: string;
  status: string;
  rating: number;
  skills: string[];
  department: string;
  experience: string;
  education: string;
  isShortlisted?: boolean;
  onViewDetails: (id: string) => void;
  onUpdateStatus?: (id: string, status: string) => void;
}

const CandidateCard: React.FC<CandidateProps> = ({
  id,
  name,
  position,
  email,
  phone,
  avatarUrl,
  appliedDate,
  status,
  rating,
  skills,
  department,
  onViewDetails,
  isShortlisted,
}) => {
  // Determine background color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Screening Call':
        return 'bg-blue-100 text-blue-800';
      case 'Technical Interview':
        return 'bg-purple-100 text-purple-800';
      case 'HR Interview':
        return 'bg-green-100 text-green-800';
      case 'CEO Interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Hired':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    <motion.div
      className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 ${
        isShortlisted ? 'border-l-4 border-green-500' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <img
              src={avatarUrl}
              alt={name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600">{position}</p>
            </div>
          </div>
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-1">
            <Mail size={16} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{email}</span>
          </div>
          <div className="flex items-center">
            <Phone size={16} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{phone}</span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <Calendar size={16} className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">Applied: {appliedDate}</span>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Department</p>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
            {department}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Rating</p>
          <div className="flex items-center">
            {renderRating(rating)}
            <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}/5</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={() => onViewDetails(id)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Details
          </button>
          <div className="flex space-x-2">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <Download size={18} className="text-gray-500" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <Plus size={18} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateCard;