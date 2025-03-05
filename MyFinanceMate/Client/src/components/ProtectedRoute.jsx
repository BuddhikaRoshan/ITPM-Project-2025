import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const ProtectedRoute = () => {
  const { isLoggedin, authChecked } = useContext(AppContent);

  if (!authChecked) return <div className="text-center p-8">Loading...</div>;
  
  return isLoggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;