import React from "react";
import { aboutfeature } from "../../assets/dummydata";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import AboutImage from '../../assets/AboutImage1.jpeg';
import FloatingParticle from "../FloatingParticle/FloatingParticle";
// import './AboutHome.css'

const AboutHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a0a] via-[#1a1212] to-[#2a1e1e] text-white py-16 px-6 sm:px-12 lg:px-24 font-[Poppins] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl mix-blend-soft-light" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl mix-blend-soft-light" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center lg:gap-16">
          {/* Image section - moved to left */}
          <div className="w-full lg:w-1/2 order-1 lg:order-1 mb-12 lg:mb-0 relative group transform hover:scale-[1.01] transition-all duration-500">
            <div className="relative  rounded-[4rem] overflow-hidden border-4 border-amber-900/30 hover:border-amber-600/40 transition-all duration-500 shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/15 via-transparent to-amber-600/10 mix-blend-soft-light" />
              <img 
                src={AboutImage} 
                alt="Restaurant" 
                className="w-full h-auto object-cover aspect-[3/4] transform -rotate-1 hover:rotate-0 transition-all duration-500" 
              />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-amber-900/30 blur-3xl z-0"/>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"/>
            </div>
          </div>

          {/* Text content - moved to right */}
          <div className="w-full lg:w-1/2 order-2 lg:order-2 space-y-8 sm:space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight font-[Playfair_Display] italic">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Epicurean Elegance
                </span>
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl opacity-90 font-light">
                  Where Flavours Dance &amp; Memories Bloom
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl tracking-wide leading-relaxed italic border-l-4 border-amber-500/60 pl-6 py-2 bg-gradient-to-r from-white/5 to-transparent">
                "In our kitchen, passion meets precision. We craft not just
                meals, but culinary journeys that linger on the palate and in
                the heart"
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {aboutfeature.map((item, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-[#4b3b3b]/50 hover:bg-[#4b3b3b]/70 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 border border-transparent hover:border-amber-500/20"
                >
                  <div
                    className={`p-4 rounded-full bg-gradient-to-b ${item.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <item.icon className="text-2xl sm:text-3xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-[Playfair_Display] italic text-amber-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base mt-2">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-center mt-6 sm:mt-8 px-4 sm:px-0 ">
              <Link
                to="/about"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-bold hover:scale-[1.02] transition-transform duration-300 flex items-center gap-3 shadow-xl hover:shadow-amber-500/20 group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <FaInfoCircle className="text-xl animate-pulse" />
                <span className="font-cursive text-lg sm:text-xl">
                  Unveil Our Legacy
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FloatingParticle/>
    </div>
  );
};

export default AboutHome;