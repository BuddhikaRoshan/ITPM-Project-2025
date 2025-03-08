import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const ProtectedRoute = () => {
  const { isLoggedin, userData, getUserData } = useContext(AppContent);
  
  // Ensure user data is loaded if the user is logged in
  useEffect(() => {
    if (isLoggedin && !userData) {
      getUserData();
    }
  }, [isLoggedin, userData, getUserData]);

  // Show loading state while checking authentication
  if (isLoggedin === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isLoggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;