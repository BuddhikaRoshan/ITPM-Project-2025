import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const CTA = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AppContent) || { isLoggedin: false };

  const handleGetStarted = () => {
    navigate(isLoggedin ? '/dashboard' : '/login');
  };

  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <h2 className="text-4xl font-bold mb-4">Start Your AI Finance Journey Today</h2>
      <p className="text-lg max-w-2xl mx-auto text-gray-200 mb-6">
        Join thousands who are optimizing their finances with AI-powered insights.
      </p>
      <button 
        onClick={handleGetStarted} 
        className="bg-white text-green-700 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all"
      >
        {isLoggedin ? 'Go to Dashboard' : 'Get Started'}
      </button>
    </section>
  );
};

export default CTA;
