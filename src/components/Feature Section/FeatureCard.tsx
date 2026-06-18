import React from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
export type MockVariant = "hr" | "project" | "ledger";

// ── DashboardImage ─────────────────────────────────────────────────────────────
// Swap `src` for your real screenshot later. Keeps the same rounded frame.
const PLACEHOLDER_IMAGES: Record<MockVariant, string> = {
  hr: "https://placehold.co/600x340/2d1b4e/c4b0e0?text=HR+Dashboard",
  project: "https://placehold.co/600x340/2d1b4e/c4b0e0?text=Project+Dashboard",
  ledger: "https://placehold.co/600x340/2d1b4e/c4b0e0?text=Ledger+Dashboard",
};

export const DashboardImage: React.FC<{
  variant?: MockVariant;
  src?: string;
}> = ({ variant = "hr", src }) => (
  <div className="rounded-2xl overflow-hidden border border-purple-500/20 shadow-lg">
    <img
      src={src ?? PLACEHOLDER_IMAGES[variant]}
      alt={`${variant} dashboard`}
      className="w-full h-auto object-cover block"
    />
  </div>
);

// ── FeatureList ────────────────────────────────────────────────────────────────
export const FeatureList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2.5 mt-4">
    {items.map((item) => (
      <li
        key={item}
        className="flex items-center gap-2.5 text-purple-100/90 text-sm"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-purple-300/70 flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

// ── FinanceCard ────────────────────────────────────────────────────────────────
export const FinanceCard: React.FC = () => (
  <div className="bg-white/8 border border-white/12 rounded-2xl p-5">
    <div className="w-9 h-9 rounded-lg bg-purple-500/30 flex items-center justify-center mb-3">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d4b0f0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <circle cx="17" cy="15" r="1" fill="#d4b0f0" />
      </svg>
    </div>
    <p className="text-purple-100 font-semibold text-sm mb-1">Finance Module</p>
    <FeatureList
      items={[
        "Purchases",
        "Sales",
        "Loans",
        "Credits",
        "Expenses",
        "Procurement",
      ]}
    />
  </div>
);

// ── SectionHeading ─────────────────────────────────────────────────────────────
export const SectionHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <h2
    className={`text-[#d4884a] font-bold text-xl tracking-wide ${className}`}
    style={{ fontFamily: "Georgia, serif" }}
  >
    {children}
  </h2>
);
