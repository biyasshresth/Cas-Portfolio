import React, { useMemo } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  opacity: number;
  twinkle: boolean;
}

const PARTICLE_COUNT = 38;

const generateParticles = (): Particle[] =>
  Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 14 + 14,
    delay: Math.random() * 20,
    driftX: (Math.random() - 0.5) * 80,
    opacity: Math.random() * 0.5 + 0.2,
    twinkle: Math.random() > 0.6,
  }));

const CASBackgroundFX: React.FC = () => {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <>
      {/* Purple fog blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
        <div
          className="absolute rounded-full blur-[120px] opacity-50"
          style={{
            width: "60vw", height: "60vw",
            background: "radial-gradient(circle, rgba(147,51,234,0.6) 0%, rgba(147,51,234,0) 70%)",
            top: "-10%", left: "-10%",
            animation: "fogDrift1 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full blur-[120px] opacity-45"
          style={{
            width: "50vw", height: "50vw",
            background: "radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(168,85,247,0) 70%)",
            bottom: "-15%", right: "-10%",
            animation: "fogDrift2 28s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full blur-[140px] opacity-40"
          style={{
            width: "45vw", height: "45vw",
            background: "radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0) 70%)",
            top: "30%", left: "40%",
            animation: "fogDrift3 25s ease-in-out infinite",
          }}
        />
      </div>

      {/* Micro-particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`particle ${p.twinkle ? "particle-twinkle" : ""}`}
            style={{
              left: `${p.left}vw`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: p.twinkle
                ? `${p.duration}s, ${(Math.random() * 2 + 2).toFixed(2)}s`
                : `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              ["--drift-x" as string]: `${p.driftX}px`,
              ["--particle-opacity" as string]: p.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
};

export default CASBackgroundFX;