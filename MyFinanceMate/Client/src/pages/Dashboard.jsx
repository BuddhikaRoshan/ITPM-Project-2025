import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { userData, isLoggedin, getUserData } = useContext(AppContent);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If explicitly not logged in, redirect
    if (isLoggedin === false) {
      navigate('/login');
      return;
    }
    
    // If logged in but no user data, try to fetch it
    if (isLoggedin === true && !userData) {
      getUserData();
    }
    
    // If logged in but not verified, redirect to verification
    if (isLoggedin === true && userData && !userData.isAccountVerified) {
      navigate('/email-verify');
    }
    
    // Set loading to false when we have definitive information
    if (isLoggedin !== undefined) {
      setLoading(false);
    }
  }, [isLoggedin, userData, navigate, getUserData]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="spinner-border animate-spin inline-block w-7 h-7 border-4 rounded-full text-blue-600" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {userData?.name}</h1>
        
        {/* Dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
            <p>Email: {userData?.email}</p>
            <p>Account Status: {userData?.isAccountVerified ? 'Verified' : 'Not Verified'}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Add Transaction
              </button>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Set Budget Goal
              </button>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
                View Reports
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-500 italic">No recent activity to display.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;