import React, { useEffect, useState } from "react";

/* ── Single spinning drum ── */
interface DrumProps {
  target: number; // 0–9
}

const Drum: React.FC<DrumProps> = ({ target }) => {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    // Small delay so element paints at 0 first, then transitions to target
    const t = window.setTimeout(() => setPos(target), 80);
    return () => window.clearTimeout(t);
  }, [target]);

  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: "1em",
        lineHeight: "1em",
        verticalAlign: "top",
      }}
    >
      <span
        style={{
          display: "block",
          transform: `translateY(-${pos}em)`,
          transition: "transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span
            key={d}
            style={{
              display: "block",
              height: "1em",
              lineHeight: "1em",
              userSelect: "none",
            }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
};

/* ── Full year with spinning last digit ── */
interface YearOdometerProps {
  year?: string;
  className?: string;
  /** Pass introDone so the drum remounts exactly when the page reveals */
  spinKey?: boolean | number | string;
}

const YearOdometer: React.FC<YearOdometerProps> = ({
  year = "2026",
  className,
  spinKey,
}) => {
  const staticPart = year.slice(0, -1);
  const lastDigit = parseInt(year.slice(-1), 10);

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        lineHeight: 1,
      }}
    >
      <span style={{ display: "inline-block", lineHeight: 1 }}>
        {staticPart}
      </span>
      {/* key forces full remount (resets to 0, then spins) when spinKey changes */}
      <Drum key={String(spinKey)} target={lastDigit} />
    </span>
  );
};

export default YearOdometer;
