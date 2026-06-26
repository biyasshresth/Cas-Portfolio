import React, { useRef, useState } from "react";
import File from "../../assets/File.png";
import Logo from "../../assets/Logo.png";
import LandingBg from "../../assets/LandingBg.mp4";
import "./CASLandingPage.css";
import CASIntroSequence from "./CASIntroSequence";
import CASBackgroundFX from "./CASBackgroundFX";
import YearOdometer from "./OdometerDigit";

interface CASLandingPageProps {
  onStart?: () => void;
}

const CASLandingPage: React.FC<CASLandingPageProps> = ({ onStart }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  // casHeadingRef removed — CASIntroSequence no longer measures the logo.
  // The intro renders the logo using the same CSS class directly, so it always
  // matches the real logo's position with no measurement or timing dependency.
  const fileImgRef   = useRef<HTMLImageElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    if (!introDone) return;
    setIsPressed(true);
    window.setTimeout(() => setIsPressed(false), 180);
    onStart?.();
  };

  return (
    <>
      {!introDone && (
        <CASIntroSequence
          onComplete={() => setIntroDone(true)}
          fileImgRef={fileImgRef}
          bottomTextRef={bottomTextRef}
        />
      )}
      <div
        onClick={handleStart}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleStart();
        }}
        className="landing-root"
        aria-label="Click anywhere to start the accounting application"
      >
        <video
          className="landing-video"
          src={LandingBg}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="landing-blur-overlay" />
        <div className="landing-overlay-dark" />
        <div className="grid-overlay landing-fill" />
        <div className="scanline landing-fill" />

        <CASBackgroundFX />
        <span className="corner-bracket corner-tl" />
        <span className="landing-system-label font-display mt-2">
          • Powerd by " R P R E "
        </span>
        <span className="corner-bracket corner-br" />

        <div className="landing-year-block font-display">
          <span className="landing-diamond">✦</span>
          <YearOdometer year="2026" className="landing-year mb-5" />
        </div>

        <div className="landing-center mt-26">
          <div className="landing-file-logo-stack mt-24">
            <img
              ref={fileImgRef}
              src={File}
              alt="CAS folder"
              draggable={false}
              className={`landing-file file-hover ${isPressed ? "landing-file--pressed" : ""}`}
            />
            {/*
              No ref needed here anymore. The intro sequence renders its own
              logo clone using this same class, so positioning is always in sync.
            */}
            <img
              src={Logo}
              alt="CAS — Central Analytics System"
              draggable={false}
              className="landing-logo-overlay landing-logo-overlay--visible"
            />
          </div>

          <div ref={bottomTextRef} className="landing-bottom-text mt-16">
            <p className="landing-subtitle font-display">
              <span className="landing-pipe">|</span>
              &nbsp;&nbsp;COMPLETE ACCOUNTING SYSTEM&nbsp;&nbsp;
              <span className="landing-pipe">|</span>
            </p>
            <div className="cas-underline" />
            <p className="landing-cta cta-subtitle font-display">
              CLICK ANYWHERE TO INITIALIZE SYSTEM
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CASLandingPage;