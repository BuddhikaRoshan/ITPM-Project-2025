import React from 'react';
import { FiTrendingUp, FiPieChart, FiDollarSign, FiSmartphone, FiShield, FiGlobe, FiBarChart, FiUserCheck } from 'react-icons/fi';

const FeatureCard = ({ icon, title, text }) => (
  <div className="bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="text-emerald-400 text-4xl mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{text}</p>
  </div>
);

const Features = () => (
  <section className="py-20 bg-gray-900 text-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-8 text-emerald-400">Why Choose Us?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[ 
          { icon: <FiTrendingUp />, title: "Smart Analytics", text: "AI-driven insights for better decisions." },
          { icon: <FiPieChart />, title: "Budget Tracking", text: "Effortless budget optimization." },
          { icon: <FiDollarSign />, title: "AI Forecasts", text: "Predictive financial modeling." },
          { icon: <FiSmartphone />, title: "Voice Control", text: "Manage finances hands-free." },
          { icon: <FiShield />, title: "Secure Transactions", text: "Industry-leading encryption and security." },
          { icon: <FiGlobe />, title: "Global Access", text: "Manage your finances anywhere, anytime." },
          { icon: <FiBarChart />, title: "Investment Insights", text: "Track and optimize your investments." },
          { icon: <FiUserCheck />, title: "Personalized Advice", text: "Tailored financial guidance powered by AI." }
        ].map((feature, index) => (
          <FeatureCard key={index} icon={feature.icon} title={feature.title} text={feature.text} />
        ))}
      </div>
    </div>
  </section>
);

export default Features;
