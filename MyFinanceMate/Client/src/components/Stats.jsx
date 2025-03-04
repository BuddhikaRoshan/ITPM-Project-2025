import React from 'react';

const Stats = () => (
  <section className="py-20 bg-gray-900 text-white">
    <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
      {[
        { value: "95%", label: "User Satisfaction Rate" },
        { value: "1M+", label: "Transactions Analyzed" },
        { value: "24/7", label: "AI-Powered Support" },
      ].map((stat, index) => (
        <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="text-5xl font-bold mb-2 text-green-400">{stat.value}</div>
          <div className="text-gray-300">{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);


export default Stats;


