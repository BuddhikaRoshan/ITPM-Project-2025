import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/assets';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      let response;
      if (state === 'signup') {
        response = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });
      } else {
        response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
      }

      const { data } = response;
      if (data.success) {
        if (state === 'signup') {
          // Handle successful registration
          toast.success('Registration successful! Please login.');
          setName('');
          setEmail('');
          setPassword('');
          setState('login'); // Switch to login form
        } else {
          // Handle successful login
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center relative">
      <ToastContainer position="top-center" />
      <div className="absolute inset-0 bg-opacity-25 bg-black" />
      
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="absolute left-8 top-8 w-36 cursor-pointer filter brightness-0 invert"
      />

      <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full mx-4 backdrop-blur-lg border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {state === 'signup' ? 'Create Account' : 'Secure Login'}
          </h2>
          <p className="text-gray-600 text-sm">
            {state === 'signup' 
              ? 'Join our financial network' 
              : 'Manage your finances securely'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          {state === 'signup' && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors focus-within:border-blue-500">
              <img src={assets.person_icon} alt="person" className="h-5 w-5 text-gray-400" />
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-400 text-sm"
                type="text"
                placeholder="Full Legal Name"
                required
              />
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors focus-within:border-blue-500">
            <img src={assets.mail_icon} alt="mail" className="h-5 w-5 text-gray-400" />
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-400 text-sm"
              type="email"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors focus-within:border-blue-500">
            <img src={assets.lock_icon} alt="lock" className="h-5 w-5 text-gray-400" />
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-400 text-sm"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          {state === 'login' && (
            <div className="flex justify-between items-center">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button 
                type="button"
                onClick={() => navigate('/reset-password')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all transform hover:scale-[1.02]"
          >
            {state === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            {state === 'signup' ? 'Already registered? ' : 'Need an account? '}
            <button
              onClick={() => setState(state === 'signup' ? 'login' : 'signup')}
              className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2"
            >
              {state === 'signup' ? 'Sign In' : 'Register Now'}
            </button>
          </p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-500 text-center">
            <span className="inline-block mr-2">🔒</span>
            Your financial security is our top priority. All data is encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;