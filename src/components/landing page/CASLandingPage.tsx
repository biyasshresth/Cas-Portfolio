import React, { useRef, useState } from "react";
import File from "../../assets/File.png";
import LandingBg from "../../assets/LandingBg.mp4";
import "./CASLandingPage.css";
import CASIntroSequence from "./CASIntroSequence";
import CASBackgroundFX from "./CASBackgroundFX";

interface CASLandingPageProps {
  onStart?: () => void;
}

const CASLandingPage: React.FC<CASLandingPageProps> = ({ onStart }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const casHeadingRef = useRef<HTMLHeadingElement>(null);
  const fileImgRef = useRef<HTMLImageElement>(null);

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
          casHeadingRef={casHeadingRef}
          fileImgRef={fileImgRef}
        />
      )}

      <div
        onClick={handleStart}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleStart();
        }}
        className={`landing-root page-content ${introDone ? "revealed" : ""}`}
        aria-label="Click anywhere to start the accounting application"
      >
        {/* Background video */}
        <video
          className="landing-video"
          src={LandingBg}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* ── Blur overlay ── */}
        <div className="landing-blur-overlay" />

        {/* Overlays */}
        <div className="landing-overlay-dark" />
        <div className="grid-overlay landing-fill" />
        <div className="scanline landing-fill" />

        <CASBackgroundFX />

        {/* ── Top-left: corner bracket + system label ── */}
        <span className="corner-bracket corner-tl" />
        <span className="landing-system-label font-display mt-2">
          • CAS SYSTEM V1.0.0
        </span>

        {/* ── Top-right: tick marks ── */}
        <div className="landing-ticks">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="landing-tick"
              style={{ "--tick-index": i } as React.CSSProperties}
            />
          ))}
        </div>

        {/* ── Bottom-right: corner bracket + year ── */}
        <span className="corner-bracket corner-br" />
        <div className="landing-year-block font-display">
          <span className="landing-diamond">✦</span>
          <span className="landing-year mb-5">2025</span>
        </div>

        {/* ── Main center content ── */}
        <div className="landing-center">

          {/* CAS heading — in front of the file */}
          <h1 ref={casHeadingRef} className="landing-cas font-cas">
            CAS
          </h1>

          {/* "CENTRAL ANALYTICS SYSTEM" slides up just below CAS heading */}
          <p className={`landing-cas-fullform font-display ${introDone ? "landing-cas-fullform--visible" : ""}`}>
            CENTRAL ANALYTICS SYSTEM
          </p>

          {/* File image — behind the CAS text */}
          <img
            ref={fileImgRef}
            src={File}
            alt="CAS folder"
            draggable={false}
            className={`landing-file file-hover ${isPressed ? "landing-file--pressed" : ""}`}
          />

          {/* Bottom text block */}
          <div className="landing-bottom-text">
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