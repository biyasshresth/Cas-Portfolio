import React, { useEffect, useState } from "react";
import File from "../../assets/File.png";
import Logo from "../../assets/Logo.png";
import LandingBg from "../../assets/LandingBg.mp4";
import YearOdometer from "./OdometerDigit";

interface CASIntroSequenceProps {
  onComplete: () => void;
  casHeadingRef: React.RefObject<HTMLHeadingElement | null>;
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
  casHeadingRef,
  fileImgRef,
  bottomTextRef,
}) => {
  const [stage, setStage] = useState<Stage>("videoFadeIn");
  const [fileVisible, setFileVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [textSlid, setTextSlid] = useState(false);
  const [yearVisible, setYearVisible] = useState(false);

  const [filePos, setFilePos] = useState<{
    cx: number;
    cy: number;
    width: number;
  } | null>(null);
  const [logoRect, setLogoRect] = useState<DOMRect | null>(null);
  const [bottomRect, setBottomRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (stage !== "videoFadeIn") return;

    const raf = requestAnimationFrame(() => {
      if (fileImgRef.current) {
        const r = fileImgRef.current.getBoundingClientRect();
        setFilePos({
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          width: fileImgRef.current.offsetWidth,
        });
      }
      if (casHeadingRef.current)
        setLogoRect(casHeadingRef.current.getBoundingClientRect());
      if (bottomTextRef.current)
        setBottomRect(bottomTextRef.current.getBoundingClientRect());

      const t = window.setTimeout(() => {
        setFileVisible(true);
        setStage("fileDrop");
        window.setTimeout(() => setYearVisible(true), 600);
      }, 1000);

      return () => window.clearTimeout(t);
    });

    return () => cancelAnimationFrame(raf);
  }, [stage, fileImgRef, casHeadingRef, bottomTextRef]);

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

  const isFading = stage === "fading";

  const fileStyle: React.CSSProperties = filePos
    ? (() => {
        const w = filePos.width;
        const h = fileImgRef.current?.offsetHeight ?? w;
        return {
          position: "fixed" as const,
          left: filePos.cx - w / 2,
          top: filePos.cy - h / 2,
          width: w,
          height: h,
          margin: 0,
          opacity: fileVisible ? 1 : 0,
          pointerEvents: "none" as const,
          zIndex: 60,
        };
      })()
    : { display: "none" };

  const logoStyle: React.CSSProperties = logoRect
    ? {
        position: "fixed",
        top: logoRect.top,
        left: logoRect.left,
        width: logoRect.width,
        height: logoRect.height,
        margin: 0,
        objectFit: "contain" as const,
        opacity: logoVisible ? 1 : 0,
        transition: "opacity 0.85s ease",
        filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))",
        pointerEvents: "none" as const,
        userSelect: "none" as const,
        zIndex: 61,
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
        transition:
          "opacity 0.9s ease, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
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
      {filePos && (
        <img
          src={File}
          alt=""
          draggable={false}
          className="intro-file-final"
          style={fileStyle}
        />
      )}
      {logoRect && (
        <img
          src={Logo}
          alt="CAS — Central Analytics System"
          draggable={false}
          style={logoStyle}
        />
      )}
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