import { useRef } from "react";
import TutorialVideo from "../assets/TutorialVideo.mp4";

const Tutorial = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="Tutorial" data-nav="dark" className="relative w-full min-h-[600px] flex flex-col items-center justify-start bg-white pt-12 pb-24 px-4 overflow-hidden">
<div
  className="absolute inset-x-0 bottom-0 h-[50%] clip-blob z-0"
  style={{
    background:
      " linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%)",
  }}
/>      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        <h2 className="text-xl md:text-3xl font-semibold  text-gray-900 font-heading">
         <span className="text-5xl">T</span>utorial  <span className="text-5xl">F</span>or <span className="text-5xl">G</span>uide
        </h2>
        <span className="font-body py-5 text-[#915af0]">
          “ Watch a quick walkthrough to understand how the system works in minutes.”</span>
        <div className="w-full aspect-video max-w-3xl relative overflow-hidden">
          <video
            ref={videoRef}
            src={TutorialVideo}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>       
      </div>
    </section>
  );
};
export default Tutorial;