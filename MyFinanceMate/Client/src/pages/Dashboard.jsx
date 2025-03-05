import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { userData, isLoggedin } = useContext(AppContent);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/login');
    } else if (!userData?.isAccountVerified) {
      navigate('/email-verify');
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {userData?.name}</h1>
        {/* Dashboard content */}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;