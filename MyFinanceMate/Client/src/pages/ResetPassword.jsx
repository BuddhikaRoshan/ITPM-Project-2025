import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';


const ResetPassword = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [isLoading, setIsLoading] = useState(false);

  // Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      
      if (data.success) {
        toast.success(data.message);
        setStep(2); // Move to OTP verification step
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

  // Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    // Move to password reset step (actual verification happens at reset)
    setStep(3);
  };

  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, { 
        email, 
        otp, 
        newPassword 
      });
      
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Password reset failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
    
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h1>
          
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <p className="text-gray-600 mb-4">
                Enter your email address and we'll send you a code to reset your password.
              </p>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {isLoading ? 'Sending...' : 'Send Reset Code'}
              </button>
              
              <p className="text-sm text-center mt-4">
                <button 
                  type="button"
                  onClick={() => navigate('/login')} 
                  className="text-blue-600 hover:underline"
                >
                  Back to Login
                </button>
              </p>
            </form>
          )}
          
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-gray-600 mb-4">
                We've sent a verification code to <strong>{email}</strong>. Please enter it below.
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
                disabled={!otp}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                Verify Code
              </button>
              
              <div className="flex justify-between text-sm mt-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)} 
                  className="text-blue-600 hover:underline"
                >
                  Change Email
                </button>
                <button 
                  type="button"
                  onClick={handleSendOtp} 
                  className="text-blue-600 hover:underline"
                >
                  Resend Code
                </button>
              </div>
            </form>
          )}
          
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-gray-600 mb-4">
                Create a new password for your account.
              </p>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new password"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !newPassword || !confirmPassword}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </main>
     
    </div>
  );
};

export default ResetPassword;