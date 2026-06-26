import React, { useEffect, useState, useCallback } from "react";
import File from "../../assets/File.png";
import Logo from "../../assets/Logo.png";
import LandingBg from "../../assets/LandingBg.mp4";
import YearOdometer from "./OdometerDigit";

// ─── Hardcoded file image size ────────────────────────────────────────────────
// Must match .landing-file { width: 240px } in CASLandingPage.css.
// Using fixed dimensions here prevents the intro clone from rendering tiny on
// Netlify, where getBoundingClientRect() can fire before File.png has loaded
// and returns near-zero dimensions from the CDN-delayed asset.
const FILE_W = 240;
// Compute FILE_H from your actual File.png natural aspect ratio.
// If unsure, temporarily log fr.height on localhost and paste it here.
const FILE_H = 300; // ← adjust to match your File.png height at width=240

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

  // filePos stores only CENTER coordinates — size comes from FILE_W/FILE_H constants.
  // logoPos stores the VISUAL center of the logo accounting for its CSS transform,
  // so the intro clone can be placed with position:fixed without transform issues.
  const [filePos, setFilePos] = useState<{ cx: number; cy: number } | null>(null);
  const [logoPos, setLogoPos] = useState<{ cx: number; cy: number; w: number; h: number } | null>(null);
  const [bottomRect, setBottomRect] = useState<DOMRect | null>(null);

  // Robust measurement: poll until all refs have non-zero dimensions.
  // We use a minimum size threshold (50px) instead of checking for zero,
  // because on Netlify the image can render at a tiny interim size (e.g. 1–2px)
  // while the CDN asset is still loading, which would previously pass the zero check.
  //
  // KEY FIX FOR LOGO: casHeadingRef points to the logo <img> which has
  // `transform: translate(-50%, -65%)` applied via CSS. getBoundingClientRect()
  // returns the POST-transform visual rect, so top/left are the actual screen
  // position — which is correct. We store the visual center + size from this rect
  // and use them directly with position:fixed (no transform on the clone), so the
  // clone sits exactly where the real logo appears on screen.
  const measureRefs = useCallback((): boolean => {
    const fileEl = fileImgRef.current;
    const logoEl = casHeadingRef.current;
    const bottomEl = bottomTextRef.current;

    if (!fileEl || !logoEl || !bottomEl) return false;

    const fr = fileEl.getBoundingClientRect();
    const lr = logoEl.getBoundingClientRect();
    const br = bottomEl.getBoundingClientRect();

    // Require a meaningful rendered size before proceeding.
    // fr only needs a center point — but if it's < 50px the image hasn't loaded yet.
    // lr must be large enough to confirm the logo image is painted.
    if (fr.width < 50 || lr.width < 50 || br.width === 0) return false;

    setFilePos({
      cx: fr.left + fr.width / 2,
      cy: fr.top + fr.height / 2,
    });

    // Store the visual center + dimensions of the logo as rendered on screen.
    // getBoundingClientRect() already accounts for the CSS transform, so these
    // values reflect exactly where the logo visually appears — no further offset needed.
    setLogoPos({
      cx: lr.left + lr.width / 2,
      cy: lr.top + lr.height / 2,
      w: lr.width,
      h: lr.height,
    });

    setBottomRect(br);
    return true;
  }, [fileImgRef, casHeadingRef, bottomTextRef]);

  useEffect(() => {
    if (stage !== "videoFadeIn") return;

    let rafId: number;
    let pollCount = 0;
    const MAX_POLLS = 60; // ~1 second at 60fps

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
        // Fallback: force-measure whatever we have and proceed anyway
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

  // Re-measure on window resize (handles mobile orientation changes)
  useEffect(() => {
    const onResize = () => {
      if (stage !== "videoFadeIn") measureRefs();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [stage, measureRefs]);

  const isFading = stage === "fading";

  // File clone uses fixed FILE_W × FILE_H — NOT the measured rect dimensions.
  // This is the core fix: the intro overlay file always matches the CSS size
  // regardless of when the asset finishes loading on the CDN.
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

  // Logo clone is positioned using the VISUAL center from logoPos.
  // We anchor to the visual center (no CSS transform on the clone itself)
  // because the original logo has transform:translate(-50%,-65%) applied,
  // which would make a naive top/left copy appear at the wrong location.
  const logoStyle: React.CSSProperties = logoPos
    ? {
        position: "fixed",
        top: logoPos.cy - logoPos.h / 2,
        left: logoPos.cx - logoPos.w / 2,
        width: logoPos.w,
        height: logoPos.h,
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
      {filePos && (
        <img
          src={File}
          alt=""
          draggable={false}
          className="intro-file-final"
          style={fileStyle}
        />
      )}
      {logoPos && (
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