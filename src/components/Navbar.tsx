import { useEffect, useRef, useState } from "react";
 
// ─── Nav Links Data ───────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "#solutions", id: "solutions", label: "Solutions" },
  { href: "#features", id: "features", label: "Features" },
  { href: "#industries", id: "industries", label: "Industries" },
  { href: "#pricing", id: "pricing", label: "Pricing" },
];

// ─── Custom Animated Icons ────────────────────────────────────────────────────

const BulbIcon = ({ hovered }: { hovered: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ overflow: "visible", flexShrink: 0 }}
  >
    {/* Glow halo behind bulb */}
    <circle
      cx="12"
      cy="11"
      r="7"
      fill={hovered ? "#9b6fe7" : "none"}
      stroke="none"
      style={{
        opacity: hovered ? 0.25 : 0,
        filter: "blur(4px)",
        transition: "opacity 0.4s ease",
      }}
    />

    {/* Ray 1 — top */}
    <line
      x1="12" y1="1"
      x2="12" y2={hovered ? "3.5" : "3"}
      style={{
        opacity: hovered ? 1 : 0,
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transition: "opacity 0.3s ease 0.05s, stroke 0.3s ease",
        strokeWidth: 2,
      }}
    />
    {/* Ray 2 — top-left */}
    <line
      x1={hovered ? "4.5" : "5"} y1={hovered ? "3.5" : "4"}
      x2={hovered ? "5.8" : "6"} y2={hovered ? "4.8" : "5"}
      style={{
        opacity: hovered ? 1 : 0,
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transition: "opacity 0.3s ease 0.1s, stroke 0.3s ease",
        strokeWidth: 2,
      }}
    />
    {/* Ray 3 — top-right */}
    <line
      x1={hovered ? "19.5" : "19"} y1={hovered ? "3.5" : "4"}
      x2={hovered ? "18.2" : "18"} y2={hovered ? "4.8" : "5"}
      style={{
        opacity: hovered ? 1 : 0,
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transition: "opacity 0.3s ease 0.15s, stroke 0.3s ease",
        strokeWidth: 2,
      }}
    />

    {/* Bulb body */}
    <path
      d="M9 21h6M10 17h4M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 6H9c-1.5-1.5-3-3.5-3-6a6 6 0 0 1 6-6z"
      style={{
        fill: hovered ? "#9b6fe7" : "none",
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transition: "fill 0.35s ease, stroke 0.35s ease",
      }}
    />
  </svg>
);

const LayersIcon = ({ hovered }: { hovered: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ overflow: "visible", flexShrink: 0 }}
  >
    {/* Bottom layer — slides down */}
    <polygon
      points="12 2 2 7 12 12 22 7 12 2"
      style={{
        transform: hovered ? "translateY(6px)" : "translateY(0px)",
        transformOrigin: "12px 7px",
        fill: hovered ? "rgba(155,111,231,0.15)" : "none",
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), fill 0.35s ease, stroke 0.35s ease",
      }}
    />
    {/* Middle layer — stays */}
    <polyline
      points="2 12 12 17 22 12"
      style={{
        stroke: hovered ? "#b08ef0" : "currentColor",
        opacity: hovered ? 1 : 0.6,
        transition: "stroke 0.35s ease, opacity 0.35s ease",
      }}
    />
    {/* Top layer — slides up */}
    <polyline
      points="2 17 12 22 22 17"
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0px)",
        transformOrigin: "12px 17px",
        stroke: hovered ? "#9b6fe7" : "currentColor",
        opacity: hovered ? 1 : 0.6,
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.05s, stroke 0.35s ease, opacity 0.35s ease",
      }}
    />
  </svg>
);

const BuildingIcon = ({ hovered }: { hovered: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ overflow: "visible", flexShrink: 0 }}
  >
    {/* Main building — stays */}
    <rect
      x="3" y="9" width="13" height="13"
      style={{
        fill: hovered ? "rgba(155,111,231,0.15)" : "none",
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transition: "fill 0.3s ease, stroke 0.3s ease",
      }}
    />
    {/* Side building — slides right */}
    <path
      d="M16 6h5v16h-5"
      style={{
        transform: hovered ? "translateX(3px)" : "translateX(0px)",
        stroke: hovered ? "#b08ef0" : "currentColor",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), stroke 0.3s ease",
      }}
    />
    {/* Roof line */}
    <polyline
      points="3 9 9 3 16 9"
      style={{
        transform: hovered ? "translateY(-2px)" : "translateY(0px)",
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.05s, stroke 0.3s ease",
      }}
    />
    {/* Door */}
    <rect
      x="7" y="16" width="4" height="6"
      style={{
        fill: hovered ? "rgba(155,111,231,0.5)" : "none",
        stroke: hovered ? "#9b6fe7" : "currentColor",
        transition: "fill 0.3s ease 0.1s, stroke 0.3s ease",
      }}
    />
    {/* Windows */}
    <rect x="5" y="12" width="2" height="2"
      style={{
        fill: hovered ? "#c4a8f5" : "none",
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transition: "fill 0.3s ease 0.15s",
      }}
    />
    <rect x="10" y="12" width="2" height="2"
      style={{
        fill: hovered ? "#c4a8f5" : "none",
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transition: "fill 0.3s ease 0.2s",
      }}
    />
  </svg>
);

const PricingIcon = ({ hovered }: { hovered: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ overflow: "visible", flexShrink: 0 }}
  >
    {/* Coin circle */}
    <circle
      cx="12" cy="12" r="9"
      style={{
        fill: hovered ? "rgba(155,111,231,0.2)" : "none",
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transform: hovered ? "scale(1.12)" : "scale(1)",
        transformOrigin: "12px 12px",
        transition: "fill 0.3s ease, stroke 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    />
    {/* Dollar sign vertical bar */}
    <line
      x1="12" y1="7"
      x2="12" y2="17"
      style={{
        stroke: hovered ? "#c4a8f5" : "currentColor",
        transition: "stroke 0.3s ease",
      }}
    />
    {/* Dollar top arc */}
    <path
      d="M9.5 9.5 C9.5 8 14.5 8 14.5 10.5 C14.5 13 9.5 13 9.5 13"
      style={{
        stroke: hovered ? "#9b6fe7" : "currentColor",
        strokeWidth: hovered ? 2.2 : 2,
        transform: hovered ? "translateY(-1px)" : "translateY(0px)",
        transition: "stroke 0.3s ease, transform 0.35s ease, strokeWidth 0.3s ease",
      }}
    />
    {/* Dollar bottom arc */}
    <path
      d="M14.5 14.5 C14.5 16 9.5 16 9.5 13.5 C9.5 11 14.5 11 14.5 11"
      style={{
        stroke: hovered ? "#9b6fe7" : "currentColor",
        strokeWidth: hovered ? 2.2 : 2,
        transform: hovered ? "translateY(1px)" : "translateY(0px)",
        transition: "stroke 0.3s ease, transform 0.35s ease 0.05s",
      }}
    />
  </svg>
);

const ICON_MAP: Record<string, React.FC<{ hovered: boolean }>> = {
  solutions: BulbIcon,
  features: LayersIcon,
  industries: BuildingIcon,
  pricing: PricingIcon,
};

// ─── NavLink ──────────────────────────────────────────────────────────────────

const NavLink = ({
  href,
  id,
  label,
  dark,
}: {
  href: string;
  id: string;
  label: string;
  dark: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[id];

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium select-none"
      style={{
        color: hovered ? "#c4a8f5" : dark ? "rgba(255,255,255,0.85)" : "#1f2937",
        background: hovered ? "rgba(155,111,231,0.12)" : "transparent",
        border: `1px solid ${hovered ? "rgba(155,111,231,0.4)" : "transparent"}`,
        transition: "color 0.3s ease, background 0.3s ease, border-color 0.3s ease",
        textDecoration: "none",
      }}
    >
      {/* Glow blur behind pill */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-2px",
          borderRadius: "9999px",
          background: "radial-gradient(ellipse at center, rgba(155,111,231,0.4) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          filter: "blur(10px)",
          zIndex: 0,
        }}
      />

      <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center" }}>
        <Icon hovered={hovered} />
      </span>

      <span style={{ position: "relative", zIndex: 1, letterSpacing: "0.03em" }}>
        {label}
      </span>

      {/* Shimmer underline */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 3,
          left: "50%",
          width: "55%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #9b6fe7, transparent)",
          borderRadius: "9999px",
          transform: hovered ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
          transition: "transform 0.35s ease",
          pointerEvents: "none",
        }}
      />
    </a>
  );
};

// ─── Mobile Nav Link ──────────────────────────────────────────────────────────

const MobileNavLink = ({
  href,
  id,
  label,
  onClick,
}: {
  href: string;
  id: string;
  label: string;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[id];

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
      style={{
        color: hovered ? "#c4a8f5" : "rgba(255,255,255,0.8)",
        background: hovered ? "rgba(155,111,231,0.08)" : "transparent",
        textDecoration: "none",
      }}
    >
      <Icon hovered={hovered} />
      {label}
    </a>
  );
};

// ─── NavBar ───────────────────────────────────────────────────────────────────

const NavBar = () => {
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastScrollY.current) < 5) return;
      setHidden(currentY > lastScrollY.current && currentY > 80);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-nav]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setDark((entry.target as HTMLElement).dataset.nav === "dark");
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm transition-transform duration-500 ease-out bg-black/30 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <h1
                className="text-xl font-bold font-heading transition-colors duration-300"
                style={{ color: dark ? "#ffffff" : "#111827" }}
              >
                C A S
              </h1>
              <p
                className="text-xs -mt-1 font-body transition-colors duration-300"
                style={{ color: dark ? "#cab6ec" : "#6b7280" }}
              >
                Central Analytics System
              </p>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, id, label }) => (
                <NavLink key={id} href={href} id={id} label={label} dark={dark} />
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg transition-colors duration-300"
              style={{ color: dark ? "#ffffff" : "#111827" }}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          style={{
            maxHeight: mobileOpen ? "320px" : "0px",
            opacity: mobileOpen ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.35s ease, opacity 0.25s ease",
          }}
          className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur-md"
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, id, label }) => (
              <MobileNavLink
                key={id}
                href={href}
                id={id}
                label={label}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;