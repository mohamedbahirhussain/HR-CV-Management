import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CVManagement from './pages/CVManagement';
import InterviewProcess from './pages/InterviewProcess';
import CandidateReview from './pages/CandidateReview';
import FinalApproval from './pages/FinalApproval';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['hr', 'technical', 'executive']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            <Route path="cv-management" element={
              <ProtectedRoute allowedRoles={['hr', 'technical']}>
                <CVManagement />
              </ProtectedRoute>
            } />
            
            <Route path="interview-process" element={
              <ProtectedRoute allowedRoles={['hr', 'technical']}>
                <InterviewProcess />
              </ProtectedRoute>
            } />
            
            <Route path="candidate-review" element={
              <ProtectedRoute allowedRoles={['hr', 'technical']}>
                <CandidateReview />
              </ProtectedRoute>
            } />
            
            <Route path="final-approval" element={
              <ProtectedRoute allowedRoles={['executive']}>
                <FinalApproval />
              </ProtectedRoute>
            } />
            
            <Route path="reports" element={
              <ProtectedRoute allowedRoles={['hr', 'executive']}>
                <Reports />
              </ProtectedRoute>
            } />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;