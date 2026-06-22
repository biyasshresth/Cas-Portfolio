import React, { useEffect, useState } from "react";
import File from "../../assets/File.png";
import LandingBg from "../../assets/LandingBg.mp4";

interface CASIntroSequenceProps {
  onComplete: () => void;
  casHeadingRef: React.RefObject<HTMLHeadingElement | null>;
  fileImgRef: React.RefObject<HTMLImageElement | null>;
}

const LETTERS = ["C", "A", "S"];

type Stage =
  | "videoFadeIn"   // black → video fades in
  | "fileDrop"      // file Polaroid drops in from above
  | "lettersIn"     // CAS letters drop in on top of file
  | "hold"          // brief hold on the final composed frame
  | "subtitleSlide" // "Central Analytics System" slides in below CAS
  | "fading";       // everything fades out → onComplete

const CASIntroSequence: React.FC<CASIntroSequenceProps> = ({
  onComplete,
  casHeadingRef,
  fileImgRef,
}) => {
  const [stage, setStage] = useState<Stage>("videoFadeIn");
  const [fileVisible, setFileVisible] = useState(false);
  const [lettersVisible, setLettersVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [subtitleSlid, setSubtitleSlid] = useState(false);

  const [fileRect, setFileRect] = useState<DOMRect | null>(null);
  const [casRect, setCasRect] = useState<DOMRect | null>(null);

  // Stage 1 — video fades in; measure real elements
  useEffect(() => {
    if (stage !== "videoFadeIn") return;
    const t = window.setTimeout(() => {
      if (fileImgRef.current) setFileRect(fileImgRef.current.getBoundingClientRect());
      if (casHeadingRef.current) setCasRect(casHeadingRef.current.getBoundingClientRect());
      setFileVisible(true);
      setStage("fileDrop");
    }, 1000);
    return () => window.clearTimeout(t);
  }, [stage, fileImgRef, casHeadingRef]);

  // Stage 2 — file animation plays; then show letters
  useEffect(() => {
    if (stage !== "fileDrop") return;
    const t = window.setTimeout(() => {
      setLettersVisible(true);
      setStage("lettersIn");
    }, 1100);
    return () => window.clearTimeout(t);
  }, [stage]);

  // Stage 3 — letters animate in
  useEffect(() => {
    if (stage !== "lettersIn") return;
    const t = window.setTimeout(() => setStage("hold"), 1400);
    return () => window.clearTimeout(t);
  }, [stage]);

  // Stage 4 — hold, then trigger subtitle slide
  useEffect(() => {
    if (stage !== "hold") return;
    const t = window.setTimeout(() => {
      setSubtitleVisible(true);
      setStage("subtitleSlide");
      // Slight delay so the element mounts before we trigger the slide-in transition
      window.setTimeout(() => setSubtitleSlid(true), 60);
    }, 500);
    return () => window.clearTimeout(t);
  }, [stage]);

  // Stage 5 — subtitle has slid in; hold briefly then fade out
  useEffect(() => {
    if (stage !== "subtitleSlide") return;
    const t = window.setTimeout(() => setStage("fading"), 1200);
    return () => window.clearTimeout(t);
  }, [stage]);

  // Stage 6 — fade out, hand off
  useEffect(() => {
    if (stage !== "fading") return;
    const t = window.setTimeout(onComplete, 500);
    return () => window.clearTimeout(t);
  }, [stage, onComplete]);

  const isFading = stage === "fading";

  const fileStyle: React.CSSProperties = fileRect
    ? {
        position: "fixed",
        top: fileRect.top,
        left: fileRect.left,
        width: fileRect.width,
        height: fileRect.height,
        margin: 0,
      }
    : { display: "none" };

  const casStyle: React.CSSProperties = casRect
    ? {
        position: "fixed",
        top: casRect.top,
        left: casRect.left,
        width: casRect.width,
        height: casRect.height,
        fontSize: casRect.height,
        margin: 0,
      }
    : { display: "none" };

  // Subtitle appears just below the CAS heading
  const subtitleStyle: React.CSSProperties = casRect
    ? {
        position: "fixed",
        top: casRect.bottom + 8,
        left: casRect.left,
        width: casRect.width,
        textAlign: "center" as const,
        // Slide from where "COMPLETE ACCOUNTING SYSTEM" sits (below) up to just under CAS
        transform: subtitleSlid ? "translateY(0)" : "translateY(32px)",
        opacity: subtitleSlid ? 1 : 0,
        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease",
      }
    : { display: "none" };

  return (
    <div
      className={`intro-backdrop ${isFading ? "intro-fading" : ""}`}
      aria-hidden="true"
    >
      {/* ── 1. Background video ── */}
      <video
        className={`intro-video ${stage !== "videoFadeIn" ? "intro-video--visible" : ""}`}
        src={LandingBg}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ── Blur + dark overlay ── */}
      <div className="intro-blur-overlay" />
      <div className="intro-overlay-dark" />

      {/* ── Corner brackets ── */}
      <span className="intro-corner intro-corner-tl" />
      <span className="intro-corner intro-corner-br" />

      {/* ── 2025 year block ── */}
      <div className="intro-year-block font-display">
        <span className="intro-diamond">✦</span>
        <span className="intro-year">2025</span>
      </div>

      {/* ── 2. File: Polaroid drop ── */}
      {fileVisible && fileRect && (
        <img
          src={File}
          alt=""
          draggable={false}
          className="intro-file-final"
          style={fileStyle}
        />
      )}

      {/* ── 3. CAS letters ── */}
      {lettersVisible && casRect && (
        <h1 className="intro-cas-final font-cas" style={casStyle}>
          {LETTERS.map((letter, i) => (
            <span
              key={letter}
              className="intro-letter"
              style={{ animationDelay: `${i * 0.22}s` }}
            >
              {letter}
            </span>
          ))}
        </h1>
      )}

      {/* ── 4. Subtitle slides in below CAS ── */}
      {subtitleVisible && casRect && (
        <p className="intro-subtitle font-display" style={subtitleStyle}>
          <span className="landing-pipe">|</span>
          &nbsp;&nbsp;CENTRAL ANALYTICS SYSTEM&nbsp;&nbsp;
          <span className="landing-pipe">|</span>
        </p>
      )}
    </div>
  );
};

export default CASIntroSequence;