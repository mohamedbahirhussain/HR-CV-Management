import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Search, Calendar, Filter, Plus } from 'lucide-react';
import InterviewStageCard from '../components/interview/InterviewStageCard';

interface Candidate {
  id: string;
  name: string;
  position: string;
  avatarUrl: string;
  date?: string;
}

interface InterviewStage {
  id: string;
  title: string;
  color: string;
  candidates: Candidate[];
}

// Mock data for the interview process board
const initialStages: InterviewStage[] = [
  {
    id: 'screening',
    title: 'Screening Call',
    color: 'bg-blue-500',
    candidates: [
      {
        id: 'c1',
        name: 'Sarah Williams',
        position: 'Project Manager',
        avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        date: 'Feb 15, 2025'
      },
      {
        id: 'c2',
        name: 'James Wilson',
        position: 'Marketing Specialist',
        avatarUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
        date: 'Feb 16, 2025'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Interview',
    color: 'bg-purple-500',
    candidates: [
      {
        id: 'c3',
        name: 'Jane Cooper',
        position: 'Frontend Developer',
        avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        date: 'Feb 14, 2025'
      },
      {
        id: 'c4',
        name: 'Robert Davis',
        position: 'Backend Developer',
        avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        date: 'Feb 17, 2025'
      }
    ]
  },
  {
    id: 'hr',
    title: 'HR Interview',
    color: 'bg-green-500',
    candidates: [
      {
        id: 'c5',
        name: 'Michael Johnson',
        position: 'UX Designer',
        avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
        date: 'Feb 13, 2025'
      }
    ]
  },
  {
    id: 'ceo',
    title: 'CEO Interview',
    color: 'bg-yellow-500',
    candidates: []
  },
  {
    id: 'reference',
    title: 'Reference Check',
    color: 'bg-orange-500',
    candidates: []
  }
];

const InterviewProcess: React.FC = () => {
  const [stages, setStages] = useState<InterviewStage[]>(initialStages);
  const [searchTerm, setSearchTerm] = useState('');

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    // If dropped outside a droppable area
    if (!destination) {
      return;
    }
    
    // If dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    
    // Find source and destination stages
    const sourceStage = stages.find(stage => stage.id === source.droppableId);
    const destinationStage = stages.find(stage => stage.id === destination.droppableId);
    
    if (!sourceStage || !destinationStage) {
      return;
    }
    
    // Create new array of stages
    const newStages = [...stages];
    
    // Remove candidate from source stage
    const [movedCandidate] = sourceStage.candidates.splice(source.index, 1);
    
    // Add candidate to destination stage
    destinationStage.candidates.splice(destination.index, 0, movedCandidate);
    
    // Update state with new stages
    setStages(newStages);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Interview Process</h1>
              <p className="text-gray-500">Manage and track candidate interviews</p>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-2">
              <motion.button
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Interview
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
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter className="mr-2 h-5 w-5 text-gray-400" />
              Filter
            </button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stages.map((stage) => (
            <InterviewStageCard
              key={stage.id}
              id={stage.id}
              title={stage.title}
              count={stage.candidates.length}
              color={stage.color}
              candidates={stage.candidates.filter(candidate => 
                candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
              )}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default InterviewProcess;