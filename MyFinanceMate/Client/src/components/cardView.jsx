import React from 'react';

const Card = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-72 m-3">
      <h3 className="text-blue-900 mt-0 font-semibold text-lg">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

const CardView = () => {
  const cards = [
    { title: 'Budget Tracking', content: 'Track your expenses and income' },
    { title: 'Financial Reports', content: 'Generate detailed financial reports' },
    { title: 'Goal Setting', content: 'Set and achieve financial goals' },
    { title: 'Investment Tracking', content: 'Monitor your investments' },
    { title: 'Debt Management', content: 'Manage your debts effectively' }
  ];

  return (
    <div className="max-w-7xl mx-auto my-10 px-5">
      <div className="flex flex-wrap justify-center">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} content={card.content} />
        ))}
      </div>
    </div>
  );
};

export default CardView;