import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppContent } from '../context/AppContext';

const Settings = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name:</label>
            <p className="p-2 bg-gray-100 rounded">{userData?.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <p className="p-2 bg-gray-100 rounded">{userData?.email}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;