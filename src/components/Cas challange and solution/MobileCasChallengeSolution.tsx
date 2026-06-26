import React, { useState } from "react";
import CasChallengeImage from "../../assets/CasChallengeImage.png";
import CasSolutionImage from "../../assets/CasSolutionImage.png";
import { challenges, ImageWithFallback, solutions } from "./ChallengeSolutionData";
import { AlertTriangle, CheckCircle } from "lucide-react";


const MobileCasChallengeSolution: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"challenges" | "solution">(
    "challenges"
  );

  return (
    <div className="md:hidden w-full font-sans px-4 bg-white">
      {/* ── Tab bar ─────────────────────────────────────────────── */}
      <div className="flex rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm ">
        <button
          onClick={() => setActiveTab("challenges")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold tracking-widest uppercase transition-colors ${
            activeTab === "challenges"
              ? "bg-red-50 text-red-600 border-r border-red-200"
              : "bg-white border-gray-200"
          }`}
        >
          <AlertTriangle
            size={13}
            className={activeTab === "challenges" ? "animate-pulse" : ""}
          />
          Challenges
        </button>
        <button
          onClick={() => setActiveTab("solution")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold tracking-widest uppercase transition-colors ${
            activeTab === "solution"
              ? "bg-green-50 text-green-600"
              : "bg-white text-gray-400"
          }`}
        >
          <CheckCircle
            size={13}
            className={activeTab === "solution" ? "animate-pulse" : ""}
          />
          Solution
        </button>
      </div>

      {/* ── Tab header text ─────────────────────────────────────── */}
      <div className="mb-4">
        {activeTab === "challenges" ? (
          <>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-red-500 px-2 py-0.5 border border-red-300 rounded-full mb-2">
              Without CAS
              <AlertTriangle size={12} className="text-red-500 animate-pulse" />
            </span>
            <h3 className="text-3xl font-bold text-gray-900 font-heading">
              Challenges
            </h3>
            <p className="text-sm font-semibold text-gray-700 font-body mt-1">
              Manages The Financial &amp; Employee Data Together
            </p>
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-green-500 px-2 py-0.5 border border-green-300 rounded-full mb-2">
              <CheckCircle size={12} className="text-green-500 animate-pulse" />
              With CAS
            </span>
            <h3 className="text-3xl font-bold text-gray-900 font-heading">
              Solution
            </h3>
            <p className="text-sm font-semibold text-gray-700 font-body mt-1">
              Solves Managing The Financial &amp; Employee Data Together
            </p>
          </>
        )}
      </div>

      {/* ── Both images side-by-side (no extra vertical space) ─── */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex items-center justify-center p-2 h-32">
          <ImageWithFallback
            src={CasChallengeImage}
            alt="Diagram showing disconnected systems causing fragmentation"
            label="Complexity & Fragmentation"
            filename="CasChallengeImage.png"
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex items-center justify-center p-2 h-32">
          <ImageWithFallback
            src={CasSolutionImage}
            alt="Diagram showing CAS integrated solution"
            label="CAS Solution Overview"
            filename="CasSolutionImage.png"
          />
        </div>
      </div>

      {/* ── Cards — equal height per row via grid ───────────────── */}
      {/* Top cap */}
      <div className="h-3 bg-white border border-b-0 border-gray-100 rounded-t-2xl shadow-sm" />

      {challenges.map((challenge, i) => {
        const solution = solutions[i];
        const isLast = i === challenges.length - 1;
        const accentColor =
          activeTab === "challenges" ? "bg-red-600" : "bg-green-600";
        const item = activeTab === "challenges" ? challenge : solution;

        return (
          <div
            key={challenge.id}
            className={`bg-white border-x border-b border-gray-100 shadow-sm flex gap-4 px-5 py-4 ${
              isLast ? "rounded-b-2xl" : ""
            }`}
            /* equal height: let all cards be at least as tall as the tallest
               sibling. We use `min-h` instead of a fixed height so short
               content still looks natural. */
            style={{ minHeight: "5.5rem" }}
          >
            <div className={`w-[3px] ${accentColor} self-stretch flex-shrink-0`} />
            <div className="flex flex-col justify-center gap-1">
              <h4 className="text-sm font-semibold text-gray-900 leading-snug">
                {item.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}

      <div className="pb-10" />
    </div>
  );
};

export default MobileCasChallengeSolution;