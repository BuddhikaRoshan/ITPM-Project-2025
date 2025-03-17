import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import logo from "../assets/favicon.svg";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData, isLoggedin, authChecked, logout } = useContext(AppContent);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50" data-testid="header">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3" data-testid="logo-link">
          <img src={logo} alt="Logo" className="h-14 w-14" data-testid="logo-img"/>
          <span className="text-2xl font-bold">MyFinanceMate</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className={`hover:text-blue-300 ${location.pathname === '/' ? 'text-blue-300' : ''}`} data-testid="nav-home">Home</Link>
          <Link to="/about" className={`hover:text-blue-300 ${location.pathname === '/about' ? 'text-blue-300' : ''}`} data-testid="nav-about">About</Link>
          
          {isLoggedin && (
            <>
              <Link to="/chatbot" className="hover:text-blue-300" data-testid="nav-chatbot">Chatbot</Link>
              <Link to="/calendar" className="hover:text-blue-300" data-testid="nav-calendar">Calendar</Link>
              <Link to="/settings" className="hover:text-blue-300" data-testid="nav-settings">Settings</Link>
            </>
          )}

          {authChecked ? (
            isLoggedin ? (
              <div className="flex items-center space-x-4">
                <span className="flex items-center bg-white text-blue-900 px-6 py-2 rounded-full font-semibold" data-testid="user-info">
                  <FiUser className="text-blue-900 text-xl mr-2" />
                  {userData?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 flex items-center"
                  data-testid="logout-btn"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-white text-blue-900 px-4 py-2 rounded-full font-semibold hover:bg-blue-200 flex items-center" data-testid="login-btn">
                <FiUser className="text-blue-900 text-2xl mr-3" />
                Get Started
              </Link>
            )
          ) : (
            <span className="text-gray-400" data-testid="auth-loading">Loading...</span>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          data-testid="mobile-menu-btn"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} data-testid="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-800" data-testid="mobile-nav-home">Home</Link>
          <Link to="/about" className="block px-3 py-2 rounded-md hover:bg-gray-800" data-testid="mobile-nav-about">About</Link>

          {isLoggedin && (
            <>
              <Link to="/chatbot" className="block px-3 py-2 rounded-md hover:bg-gray-800" data-testid="mobile-nav-chatbot">Chatbot</Link>
              <Link to="/calendar" className="block px-3 py-2 rounded-md hover:bg-gray-800" data-testid="mobile-nav-calendar">Calendar</Link>
              <Link to="/settings" className="block px-3 py-2 rounded-md hover:bg-gray-800" data-testid="mobile-nav-settings">Settings</Link>
            </>
          )}

          {authChecked ? (
            isLoggedin ? (
              <>
                <span className="block px-3 py-2 rounded-md bg-gray-700 text-white" data-testid="mobile-user-info">
                  {userData?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md bg-red-500 text-white"
                  data-testid="mobile-logout-btn"
                >
                  <FiLogOut className="inline mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block px-3 py-2 rounded-md bg-blue-600 text-white" data-testid="mobile-login-btn">Get Started</Link>
            )
          ) : (
            <span className="block px-3 py-2 rounded-md text-gray-400" data-testid="mobile-auth-loading">Loading...</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;