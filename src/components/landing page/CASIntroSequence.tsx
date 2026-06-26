import React, { useEffect, useState, useCallback } from "react";
import File from "../../assets/File.png";
import Logo from "../../assets/Logo.png";
import LandingBg from "../../assets/LandingBg.mp4";
import YearOdometer from "./OdometerDigit";

// ─── Fixed file dimensions ────────────────────────────────────────────────────
// Must match .landing-file { width: 240px } in CASLandingPage.css.
// We never measure these — getBoundingClientRect on CDN-delayed assets is
// unreliable and was the source of the "tiny file" bug on Netlify.
const FILE_W = 240;
const FILE_H = 300; // ← set to your File.png natural height at width=240

interface CASIntroSequenceProps {
  onComplete: () => void;
  // casHeadingRef removed — logo is no longer measured, it uses CSS classes directly
  fileImgRef: React.RefObject<HTMLImageElement | null>;
  bottomTextRef: React.RefObject<HTMLDivElement | null>;
}

type Stage =
  | "videoFadeIn"
  | "fileDrop"
  | "logoFadeIn"
  | "textSlideIn"
  | "hold"
  | "fading";

const CASIntroSequence: React.FC<CASIntroSequenceProps> = ({
  onComplete,
  fileImgRef,
  bottomTextRef,
}) => {
  const [stage, setStage] = useState<Stage>("videoFadeIn");
  const [fileVisible, setFileVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [textSlid, setTextSlid] = useState(false);
  const [yearVisible, setYearVisible] = useState(false);

  const [filePos, setFilePos] = useState<{ cx: number; cy: number } | null>(null);
  const [bottomRect, setBottomRect] = useState<DOMRect | null>(null);

  // Only measure file position and bottom text — the logo is never measured.
  // The logo clone uses the same CSS class (.landing-logo-overlay) as the real
  // logo, so it sits in the exact same place by definition, on every environment,
  // with zero dependency on asset load timing or getBoundingClientRect.
  const measureRefs = useCallback((): boolean => {
    const fileEl = fileImgRef.current;
    const bottomEl = bottomTextRef.current;

    if (!fileEl || !bottomEl) return false;

    const fr = fileEl.getBoundingClientRect();
    const br = bottomEl.getBoundingClientRect();

    if (fr.width < 50 || br.width === 0) return false;

    setFilePos({
      cx: fr.left + fr.width / 2,
      cy: fr.top + fr.height / 2,
    });
    setBottomRect(br);
    return true;
  }, [fileImgRef, bottomTextRef]);

  useEffect(() => {
    if (stage !== "videoFadeIn") return;

    let rafId: number;
    let pollCount = 0;
    const MAX_POLLS = 120; // ~2 seconds at 60fps

    const poll = () => {
      pollCount++;
      if (measureRefs()) {
        window.setTimeout(() => {
          setFileVisible(true);
          setStage("fileDrop");
          window.setTimeout(() => setYearVisible(true), 600);
        }, 300);
      } else if (pollCount < MAX_POLLS) {
        rafId = requestAnimationFrame(poll);
      } else {
        measureRefs();
        setFileVisible(true);
        setStage("fileDrop");
        window.setTimeout(() => setYearVisible(true), 600);
      }
    };

    rafId = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(rafId);
  }, [stage, measureRefs]);

  useEffect(() => {
    if (stage !== "fileDrop") return;
    const t = window.setTimeout(() => {
      setLogoVisible(true);
      setStage("logoFadeIn");
    }, 1100);
    return () => window.clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "logoFadeIn") return;
    const t = window.setTimeout(() => {
      setStage("textSlideIn");
      window.setTimeout(() => setTextSlid(true), 40);
    }, 950);
    return () => window.clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "textSlideIn") return;
    const t = window.setTimeout(() => setStage("hold"), 1000);
    return () => window.clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "hold") return;
    const t = window.setTimeout(() => setStage("fading"), 700);
    return () => window.clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "fading") return;
    const t = window.setTimeout(onComplete, 500);
    return () => window.clearTimeout(t);
  }, [stage, onComplete]);

  useEffect(() => {
    const onResize = () => {
      if (stage !== "videoFadeIn") measureRefs();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [stage, measureRefs]);

  const isFading = stage === "fading";

  const fileStyle: React.CSSProperties = filePos
    ? {
        position: "fixed" as const,
        left: filePos.cx - FILE_W / 2,
        top: filePos.cy - FILE_H / 2,
        width: FILE_W,
        height: FILE_H,
        objectFit: "contain" as const,
        margin: 0,
        opacity: fileVisible ? 1 : 0,
        pointerEvents: "none" as const,
        zIndex: 60,
      }
    : { display: "none" };

  const textStyle: React.CSSProperties = bottomRect
    ? {
        position: "fixed",
        top: bottomRect.top,
        left: bottomRect.left,
        width: bottomRect.width,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        opacity: textSlid ? 1 : 0,
        transform: textSlid ? "translateY(0)" : "translateY(-24px)",
        transition: "opacity 0.9s ease, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: "none" as const,
        zIndex: 62,
      }
    : { display: "none" };

  return (
    <div
      className={`intro-backdrop ${isFading ? "intro-fading" : ""}`}
      aria-hidden="true"
    >
      <video
        src={LandingBg}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={(e) => {
          (e.target as HTMLVideoElement).play().catch(() => {});
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: stage !== "videoFadeIn" ? 1 : 0,
          transition: "opacity 0.9s ease",
          filter: "blur(6px)",
          transform: "scale(1.05)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.55)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <span className="intro-corner intro-corner-tl" style={{ zIndex: 2 }} />
      <span className="intro-corner intro-corner-br" style={{ zIndex: 2 }} />

      <div
        className="intro-year-block font-display mb-5"
        style={{
          zIndex: 2,
          opacity: yearVisible ? 1 : 0,
          transform: yearVisible ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
        }}
      >
        <span className="intro-diamond">✦</span>
        <YearOdometer year="2026" className="intro-year" spinKey={yearVisible} />
      </div>

      {/* File clone — position from ref, size from constants */}
      {filePos && (
        <img
          src={File}
          alt=""
          draggable={false}
          className="intro-file-final"
          style={fileStyle}
        />
      )}

      {/*
        Logo clone — uses the SAME CSS class as the real logo in CASLandingPage.
        This means it naturally sits at the exact same position with zero measurement.
        The only thing we control is opacity for the fade-in timing.
        This is immune to CDN delays, asset load timing, and transform math errors.
      */}
      <img
        src={Logo}
        alt="CAS — Central Analytics System"
        draggable={false}
        className="landing-logo-overlay"
        style={{
          opacity: logoVisible ? 0.9 : 0,
          transition: "opacity 0.85s ease",
          zIndex: 61,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {bottomRect && (
        <div style={textStyle}>
          <p className="landing-subtitle font-display">
            <span className="landing-pipe">|</span>
            &nbsp;&nbsp;COMPLETE ACCOUNTING SYSTEM&nbsp;&nbsp;
            <span className="landing-pipe">|</span>
          </p>
          <div className="cas-underline" />
          <p className="landing-cta font-display">
            CLICK ANYWHERE TO INITIALIZE SYSTEM
          </p>
        </div>
      )}
    </div>
  );
};

export default CASIntroSequence;