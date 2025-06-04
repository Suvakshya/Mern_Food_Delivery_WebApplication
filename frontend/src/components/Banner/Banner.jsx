import React, { useState } from "react";
import { FaSearch, FaDownload, FaPlay, FaTimes } from "react-icons/fa";
import { bannerAssets } from "../../assets/dummydata";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const { bannerImage, orbitImages, video } = bannerAssets;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative">
      {/* Increased padding from py-8 to py-10 */}
      <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-10 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-700/10"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10"> {/* Increased gap from gap-8 */}
          {/* Left content - increased text sizes and spacing */}
          <div className="flex-1 space-y-6 relative md:pr-8 lg:pr-10 text-center md:text-left"> {/* Increased padding and spacing */}
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-tight font-serif drop-shadow-md"> {/* Increased text sizes */}
              We're Here <br />
              <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                For Food & Delivery
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-lg font-playfair italic text-amber-100 max-w-lg opacity-90 mx-auto md:mx-0"> {/* Increased text size and max-width */}
              "Top chefs and speedy delivery at your service — enjoy hot,
              delicious food delivered to your door."
            </p>
            
            {/* Slightly larger search form */}
            <form onSubmit={handleSearch} className="relative max-w-lg mx-auto md:mx-0">
              <div className="relative flex items-center bg-amber-900/30 rounded-xl border-2 border-amber-500/30 shadow-xl hover:bg-amber-400/50 transition-all duration-300">
                <div className="pl-5 pr-3 py-3">
                  <FaSearch className="text-lg text-amber-400/80" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Discover your next meal..."
                  className="w-full py-3 pr-5 bg-transparent outline-none placeholder-amber-200/70 text-base font-medium"
                />
                <button
                  type="submit"
                  className="mr-3 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-lg font-semibold text-amber-900 hover:from-amber-300 hover:to-amber-200 transition-all duration-300 shadow-lg hover:shadow-amber-300/20 text-sm"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-5"> {/* Increased spacing */}
              <button className="group flex items-center gap-2 bg-amber-800/30 hover:bg-amber-800/50 px-5 py-2.5 rounded-lg transition-all duration-300 border-2 border-amber-700/50 hover:border-amber-400 text-sm">
                <FaDownload className="text-lg text-amber-400 group-hover:animate-bounce" />
                <span>Download app</span>
              </button>

              <button 
                onClick={() => setShowVideo(true)} 
                className="group flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-300/30 text-sm"
              >
                <FaPlay className="text-lg text-amber-900" />
                <span className="text-amber-900 font-semibold">Watch Video</span>
              </button>
            </div>
          </div>
          
          {/* Right Images container - increased size */}
          <div className="flex-1 relative group mt-8 md:mt-0 min-h-[250px] sm:min-h-[300px]"> {/* Increased min-height */}
            {/* MAIN IMG - increased size */}
            <div className="relative rounded-full p-1 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-400 shadow-xl z-20 w-[220px] xs:w-[240px] sm:w-[280px] h-[220px] xs:h-[240px] sm:h-[280px] mx-auto">
              <img 
                src={bannerImage} 
                alt="Banner" 
                className="rounded-full border-3 xs:border-5 border-amber-900/50 w-full h-full object-cover object-top" 
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-amber-900/40 mix-blend-multiply"/>
            </div>
            {/* Orbital images - increased size */}
            {orbitImages.map((ImgSrc, index) => (
              <div 
                key={index} 
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${index === 0 ? 'orbit' : `orbit-delay-${index * 5}`} w-[70px] xs:w-[90px] sm:w-[120px] h-[70px] xs:h-[90px] sm:h-[120px]`}
              >
                <img 
                  src={ImgSrc} 
                  alt={`Orbiting ${index + 1}`} 
                  className="w-full h-full rounded-full border-amber-500/30 shadow-lg border-amber-900/20 p-1 object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Video Modal (unchanged) */}
      {showVideo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-lg p-4">
          <button 
            onClick={() => setShowVideo(false)} 
            className="absolute top-6 right-6 text-amber-400 hover:text-amber-300 text-3xl z-10 transition-all"
          >
            <FaTimes />
          </button>
          <div className="w-full max-w-4xl mx-auto">
            <video controls autoPlay className="w-full aspect-video object-contain rounded-lg shadow-2xl">
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;