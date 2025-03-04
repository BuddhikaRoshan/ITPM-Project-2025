import React from 'react';
import m1 from "../assets/m1.jpg";
import m2 from "../assets/m2.png";

const teamMembers = [
  {
    name: 'Buddhika Roshan',
    role: 'IT Undergraduate',
    image: m1, // Use the imported logo
  },
  {
    name: 'Shamith Udesha',
    role: 'IT Undergraduate',
    image: m2, // Use the imported logo
  },
  {
    name: 'Sonali Liyanahetti',
    role: 'IT Undergraduate',
    image: m1, // Use the imported logo
  },
  {
    name: 'Heshani Niwanthika',
    role: 'IT Undergraduate',
    image: m1, // Use the imported logo
  },
];

const TeamSection = () => {
  return (
    <section className="py-10 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;