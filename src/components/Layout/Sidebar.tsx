import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Users, 
  CheckSquare, 
  PieChart,
  X,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { userRole } = useAuth();
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard',
      roles: ['hr', 'technical', 'executive'],
    },
    {
      name: 'CV Management',
      icon: <FileText size={20} />,
      path: '/cv-management',
      roles: ['hr', 'technical'],
    },
    {
      name: 'Interview Process',
      icon: <Calendar size={20} />,
      path: '/interview-process',
      roles: ['hr', 'technical'],
    },
    {
      name: 'Candidate Review',
      icon: <Users size={20} />,
      path: '/candidate-review',
      roles: ['hr', 'technical'],
    },
    {
      name: 'Final Approval',
      icon: <CheckSquare size={20} />,
      path: '/final-approval',
      roles: ['executive'],
    },
    {
      name: 'Reports',
      icon: <PieChart size={20} />,
      path: '/reports',
      roles: ['hr', 'executive'],
    },
  ];
  
  const sidebarVariants = {
    open: { x: 0, transition: { duration: 0.3 } },
    closed: { x: '-100%', transition: { duration: 0.3 } }
  };
  
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole as string)
  );
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform md:translate-x-0 md:static md:inset-auto md:h-screen transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        initial={false}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">HR Recruit</span>
          </div>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-5 px-2 space-y-1">
          {filteredMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <div className="mr-3">{item.icon}</div>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;