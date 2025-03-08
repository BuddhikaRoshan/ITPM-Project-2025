import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
  const [isLoggedin, setIsLoggedin] = useState(undefined); // undefined to indicate loading
  const [userData, setUserData] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const getUserData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });
      if (data.success) {
        setUserData(data.userData);
      } else {
        setIsLoggedin(false);
        setUserData(null);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Get user data error:", error);
      if (error.response && error.response.status === 401) {
        setIsLoggedin(false);
        setUserData(null);
      }
    }
  }, [backendUrl]);

  const getAuthState = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, { withCredentials: true });
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();  // Ensure user data is fetched after successful auth check
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsLoggedin(false);
    } finally {
      setAuthChecked(true);
    }
  }, [backendUrl, getUserData]);

  // Check auth state on component mount
  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  const logout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        toast.success('Logged out successfully');
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  const value = {
    backendUrl,
    isLoggedin, 
    setIsLoggedin,
    userData, 
    setUserData,
    getUserData,
    getAuthState,
    logout,
    authChecked
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
