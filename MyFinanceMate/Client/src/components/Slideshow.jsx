import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import video1 from '../assets/v1.mp4';
import video2 from '../assets/v1.mp4'; 

const HeroSlideshow = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AppContent) || { isLoggedin: false };

  const slides = [
    { video: video1, heading: "Financial Freedom Awaits", text: "AI-powered insights for your finances", cta: "Get Started" },
    { video: video2, heading: "Smart Money Management", text: "Real-time tracking meets AI forecasting", cta: "Learn More" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleCTAClick = (index) => {
    if (index === 0) {
      navigate(isLoggedin ? '/dashboard' : '/login');
    } else {
      navigate('/about');
    }
  };

  return (
    <section className="relative h-[80vh] overflow-hidden" aria-live="polite">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <video autoPlay muted loop className="w-full h-full object-cover brightness-75">
            <source src={slide.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-8">
            <h1 className="text-4xl md:text-6xl font-extrabold">{slide.heading}</h1>
            <p className="text-xl md:text-2xl font-semibold max-w-2xl text-center">{slide.text}</p>
            <button 
              onClick={() => handleCTAClick(index)} 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-lg font-bold mt-4 transition-all"
            >
              {slide.cta}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSlideshow;
