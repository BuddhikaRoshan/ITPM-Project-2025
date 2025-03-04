import React from "react";
import Header from "../components/Header";
import HeroSlideshow from "../components/Slideshow";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import TeamSection from "../components/TeamSection ";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSlideshow />
        <Features />
        <Stats />
        <TeamSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;