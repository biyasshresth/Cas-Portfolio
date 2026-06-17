import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Item {
  id: number;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const challenges: Item[] = [
  {
    id: 1,
    title: "Data Fragmentation",
    description:
      "Financial and employee records are spread across multiple systems, making it difficult to establish a single source of truth.",
  },
  {
    id: 2,
    title: "Manual Reconciliation",
    description:
      "Cheque, sales, procurement, credit, and payment transactions require frequent cross-checking, increasing workload and delays.",
  },
  {
    id: 3,
    title: "Limited Financial Visibility",
    description:
      "Leadership lacks a real-time view of cash flow, liabilities, receivables, and operational performance.",
  },
  {
    id: 4,
    title: "Higher Risk of Errors",
    description:
      "Duplicate entries, missing records, and inconsistent data can lead to reporting inaccuracies and costly corrections.",
  },
];

export const solutions: Item[] = [
  {
    id: 1,
    title: "Unified Data Platform",
    description:
      "CAS consolidates financial, HR, and operational data into a single system, eliminating fragmentation and ensuring a single source of truth.",
  },
  {
    id: 2,
    title: "Automated Reconciliation",
    description:
      "Transactions across sales, payments, procurement, and payroll are automatically matched, reducing manual effort and speeding up financial closing.",
  },
  {
    id: 3,
    title: "Real-Time Financial Visibility",
    description:
      "CAS provides live dashboards for cash flow, liabilities, receivables, and performance metrics to support faster and smarter decisions.",
  },
  {
    id: 4,
    title: "Error Reduction Through Automation",
    description:
      "Built-in validation and automated data syncing minimize duplicates, missing entries, and reporting inconsistencies.",
  },
];

// ─── ImageWithFallback ────────────────────────────────────────────────────────

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  label: string;
  filename: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  label,
  filename,
}) => {
  const [error, setError] = useState(false);

  if (!error) {
    return (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain rounded-xl"
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-400 text-center h-full py-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3l18 18"
        />
      </svg>
      <p className="text-xs">{label}</p>
      <p className="text-xs">
        Place{" "}
        <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">
          {filename}
        </code>{" "}
        in{" "}
        <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">
          src/assets/
        </code>
      </p>
    </div>
  );
};