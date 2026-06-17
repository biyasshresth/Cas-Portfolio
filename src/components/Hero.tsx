import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import BannerImg from "../assets/BannerImg.png";

const Hero = () => {
  const [clicked, setClicked] = useState(false);

  const handleLaunch = () => {
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 400);
  };

  return (
    <section  id="Hero" data-nav="dark" className="min-h-screen pt-24 pb-16 px-6 relative overflow-hidden">
      <img
        src={BannerImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center font-body">
          <div className="animate-fade-in [animation-delay:0.1s]">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-2 py-1 shadow-sm">
              <div className="w-2 h-2 bg-[#9b6fe7] rounded-full animate-pulse" />
              <span className="text-xs text-white/80 font-semibold font-heading">
                Trusted by Leading Organizations
              </span>
            </div>
          </div>
          <div className="h-10 md:h-12" />
          <div className="animate-fade-in [animation-delay:0.3s] -mt-5">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">
              C A S
            </h1>
            <p className="text-base md:text-2xl text-[#9b6fe7] font-semibold uppercase font-body -mt-3">
              <span className="text-5xl">C</span>entral Analytics Syste
              <span className="text-5xl">M</span>
            </p>
          </div>
          <div className="h-10 md:h-14" />
          <div className="flex flex-col items-center gap-6 animate-fade-in [animation-delay:0.5s]">
            <h2 className="text-xl font-bold text-white max-w-4xl leading-tight font-body">
              One Platform. Every Transaction. <br />
              Complete Financial Control.
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-24">
              <button
                type="button"
                onClick={handleLaunch}
                className="group flex items-center space-x-2 px-4 py-1 bg-[#9b6fe7] hover:bg-[#b898f0] text-black rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105" >
                <span>Launch Your Accounting Hub</span>
                <ArrowRight
                  className={`w-5 h-5 transition-all duration-300 ${
                    clicked
                      ? "translate-x-6 opacity-0"
                      : "group-hover:translate-x-1 opacity-100"}`}   />
              </button>
              <button
                type="button"
                className="group flex items-center space-x-2 px-5 py-1 bg-transparent border-2 border-white/30 hover:border-[#9b6fe7] text-white hover:text-[#9b6fe7] rounded-lg font-semibold transition-all duration-300 transform hover:scale-105" >
               <Play className="w-5 h-5 transition-transform duration-1000 ease-in-out  group-hover:rotate-[360deg]" />
                <span>Take a Product Tour</span>
              </button>
            </div>
          </div>
          <div className="h-12 md:h-16 -mt-6" />
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-6xl">
              {[
                "Cheque Books",
                "Purchases",
                "Sales",
                "Credit",
                "Payments",
                "Procurement",
                "Loans",
              ].map((type) => (
                <div
                  key={type}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm font-medium text-white/80 hover:border-blue-300 hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                  {type}
                </div>
              ))}
            </div> */}
            <div className="flex flex-wrap items-center justify-center gap-8 -mt-2">
              {[
                "Bank-Grade Security",
                "Real-Time Sync",
                "24/7 Support",
              ].map((text) => (
                <div key={text} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#9b6fe7] rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-white/70">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;