import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EmailVerify = () => {
  const navigate = useNavigate();
  const { backendUrl, userData, isLoggedin, getUserData } = useContext(AppContent);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedin) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    // If user is already verified, redirect to home
    if (userData && userData.isAccountVerified) {
      toast.info('Your account is already verified');
      navigate('/');
    }
  }, [isLoggedin, userData, navigate]);

  const sendVerificationOtp = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-Verify-Otp`, {}, { withCredentials: true });
      
      if (data.success) {
        toast.success(data.message);
        setOtpSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to send OTP');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/Verify-account`, { otp }, { withCredentials: true });
      
      if (data.success) {
        toast.success(data.message);
        getUserData(); // Refresh user data
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Verification failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Email Verification</h1>
          
          {!otpSent ? (
            <div className="text-center">
              <p className="mb-6 text-gray-600">
                Please verify your email address to access all features of MyFinanceMate.
              </p>
              <button
                onClick={sendVerificationOtp}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {isLoading ? 'Sending...' : 'Send Verification OTP'}
              </button>
            </div>
          ) : (
            <form onSubmit={verifyEmail} className="space-y-4">
              <p className="text-gray-600 mb-4">
                We've sent a verification code to your email address. Please enter it below.
              </p>
              
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 6-digit OTP"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !otp}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </button>
              
              <p className="text-sm text-center text-gray-500 mt-4">
                Didn't receive the code?{' '}
                <button 
                  type="button"
                  onClick={sendVerificationOtp} 
                  className="text-blue-600 hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmailVerify;