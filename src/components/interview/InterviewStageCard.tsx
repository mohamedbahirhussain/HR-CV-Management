import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { MoreVertical, Plus } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  position: string;
  avatarUrl: string;
  date?: string;
}

interface InterviewStageCardProps {
  id: string;
  title: string;
  count: number;
  color: string;
  candidates: Candidate[];
}

const InterviewStageCard: React.FC<InterviewStageCardProps> = ({ 
  id, 
  title, 
  count, 
  color, 
  candidates 
}) => {
  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full mr-2 ${color}`}></div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            {count}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <Plus size={16} />
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 overflow-y-auto min-h-[150px] ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {candidates.map((candidate, index) => (
              <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                {(provided, snapshot) => (
                  <motion.div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-2 p-3 bg-white rounded-md border border-gray-200 ${
                      snapshot.isDragging ? 'shadow-md' : ''
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center">
                      <img
                        src={candidate.avatarUrl}
                        alt={candidate.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          {candidate.name}
                        </h4>
                        <p className="text-xs text-gray-500">{candidate.position}</p>
                      </div>
                    </div>
                    {candidate.date && (
                      <div className="mt-2 text-xs text-gray-500">
                        {candidate.date}
                      </div>
                    )}
                  </motion.div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default InterviewStageCard;