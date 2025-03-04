import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import logo from "../assets/logo.png";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData, isLoggedin } = useContext(AppContent);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold">MyFinanceMate</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="hover:text-blue-300">Home</Link>
          {isLoggedin && <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>}
          <Link to="/about" className="hover:text-blue-300">About</Link>
          <Link 
            to={isLoggedin ? "/dashboard" : "/login"} 
            className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-200 flex items-center space-x-2"
          >
            <FiUser className="text-blue-900 text-xl" />
            <span>
              {isLoggedin ? (userData?.name || 'Account') : 'Get Started'}
            </span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-800">Home</Link>
          <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-gray-800">Dashboard</Link>
          <Link to="/about" className="block px-3 py-2 rounded-md hover:bg-gray-800">About</Link>
          <Link to={isLoggedin ? "/dashboard" : "/login"} className="block px-3 py-2 rounded-md bg-blue-600 text-white">
            {userData ? userData.name : 'Get Started'}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;