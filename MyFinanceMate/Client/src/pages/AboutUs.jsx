import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaChartLine, FaMicrophone, FaComments, FaRocket, FaGlobe, FaShieldAlt, FaWallet, FaCogs, FaSyncAlt, FaLightbulb, FaBrain, FaGamepad } from "react-icons/fa";
import logo from "../assets/logo.png";
import Header from "../components/Header";

const AboutUs = () => {
  return (
  
    <div className="min-h-screen bg-gray-900 text-white transition-colors duration-500">
          <Header />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-8xl mx-auto text-center transition-colors duration-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo at the top */}
          <motion.img
            src={logo}
            alt="MyFinanceMate Logo"
            className="h-16 mx-auto mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          <h1 className="text-4xl font-bold mb-6">About MyFinanceMate</h1>
          <p className="text-gray-300 mb-8 text-lg">
            MyFinanceMate is your AI-powered personal finance assistant, designed to help you manage your
            income and expenses effortlessly. With smart analytics and a voice & text-enabled chatbot,
            we simplify financial tracking for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FaGlobe className="text-blue-400 text-4xl" />}
              title="Our Vision"
              description="Empower individuals with AI-powered financial insights, enabling smarter money management for a stress-free future."
            />
            <FeatureCard
              icon={<FaRocket className="text-blue-400 text-4xl" />}
              title="Our Mission"
              description="To provide a seamless, interactive, and intuitive financial tracking experience using voice recognition, chatbot assistance, and smart analytics."
            />
            <FeatureCard
              icon={<FaRobot className="text-blue-400 text-4xl" />}
              title="AI-Powered Insights"
              description="Leverage AI-driven analytics to gain financial insights and improve your money management."
            />
            <FeatureCard
              icon={<FaMicrophone className="text-green-400 text-4xl" />}
              title="Voice-Enabled Assistant"
              description="Interact with MyFinanceMate using voice commands for seamless financial tracking."
            />
            <FeatureCard
              icon={<FaComments className="text-purple-400 text-4xl" />}
              title="Smart Text Chatbot"
              description="Ask questions, track expenses, and get instant financial guidance via chat."
            />
            <FeatureCard
              icon={<FaChartLine className="text-red-400 text-4xl" />}
              title="Smart Financial Analytics"
              description="Get real-time data analysis, budget recommendations, and spending trends at a glance."
            />
            <FeatureCard
              icon={<FaWallet className="text-teal-400 text-4xl" />}
              title="Expense Management"
              description="Easily track and categorize your expenses for better financial control."
            />
            <FeatureCard
              icon={<FaCogs className="text-orange-400 text-4xl" />}
              title="Customizable Settings"
              description="Tailor MyFinanceMate to suit your personal finance needs and preferences."
            />
            <FeatureCard
              icon={<FaSyncAlt className="text-indigo-400 text-4xl" />}
              title="Automated Sync"
              description="Seamless synchronization of your financial data across multiple devices."
            />
            <FeatureCard
              icon={<FaLightbulb className="text-yellow-400 text-4xl" />}
              title="Prediction"
              description="AI-driven predictions help you anticipate future expenses and optimize financial planning."
            />
            <FeatureCard
              icon={<FaBrain className="text-blue-400 text-4xl" />}
              title="AI-Powered Financial Health Coach"
              description="Personalized financial coaching using AI to improve money management habits."
            />
            <FeatureCard
              icon={<FaGamepad className="text-green-400 text-4xl" />}
              title="Gamification"
              description="Engage with fun challenges and rewards to improve your financial discipline."
            />
          </div>
        </motion.div>
      </div>
      <footer className="bg-gray-800 text-gray-400 text-center py-4 mt-12">
        <p>&copy; {new Date().getFullYear()} MyFinanceMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-colors duration-500"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {icon}
      <h2 className="text-xl font-semibold text-white mt-3">{title}</h2>
      <p className="text-gray-300 mt-2">{description}</p>
    </motion.div>
  );
};

export default AboutUs;