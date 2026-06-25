import React from "react";
import CasChallengeImage from "../../assets/CasChallengeImage.png";
import CasSolutionImage from "../../assets/CasSolutionImage.png";
import {
  ScrollRevealProvider,
  ScrollReveal,
  ScrollSentinel,
} from "./ScrollReveal";
import {
  challenges,
  ImageWithFallback,
  solutions,
} from "./ChallengeSolutionData";
import { AlertTriangle, CheckCircle } from "lucide-react";
import MobileCasChallengeSolution from "./MobileCasChallengeSolution";
 
const CasChallengeSolution: React.FC = () => {
  return (
    <ScrollRevealProvider>
      {/* ── MOBILE VIEW (hidden on md+) ───────────────────────────── */}
      <section data-nav="light" className="md:hidden w-full max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center font-heading py-10 px-4">
          Challenges And Solution
          <br />
          With CAS
        </h2>
        <MobileCasChallengeSolution />
      </section>

      {/* ── DESKTOP VIEW (hidden below md) ───────────────────────── */}
      <section
        data-nav="light"
        className="hidden md:block w-full max-w-7xl mx-auto px-6 font-sans bg-white">
        <ScrollSentinel step={0} />
        <ScrollReveal step={0}>
          <h2 className="text-4xl font-bold text-gray-900 text-center font-heading py-14">
            Challenges And Solution
            <br />
            With CAS
          </h2>
        </ScrollReveal>
        <ScrollSentinel step={1} />
        <div className="grid grid-cols-[1fr_auto_auto_1fr] gap-6 items-center mb-6">
          <ScrollReveal step={1}>
            <div className="flex flex-col gap-2 text-sm">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-red-500 px-1 py-0.5 border border-red-300 rounded-full w-fit">
                Without CAS
                <AlertTriangle
                  size={14}
                  className="text-red-500 animate-pulse"
                />
              </span>
              <h3 className="text-3xl font-bold text-gray-900 font-heading mt-1">
                Challenges
              </h3>
              <p className="text-sm font-semibold text-gray-700 font-body">
                Manages The
                <br />
                Financial &amp; Employee Data Together
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal step={1} delay={80}>
            <div className="w-56 h-44 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex items-center justify-center p-3">
              <ImageWithFallback
                src={CasChallengeImage}
                alt="Diagram showing disconnected systems causing fragmentation"
                label="Complexity & Fragmentation"
                filename="CasChallengeImage.png"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal step={1} delay={160}>
            <div className="w-56 h-44 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex items-center justify-center p-3">
              <ImageWithFallback
                src={CasSolutionImage}
                alt="Diagram showing CAS integrated solution"
                label="CAS Solution Overview"
                filename="CasSolutionImage.png"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal step={1} delay={240}>
            <div className="flex flex-col gap-2 items-end text-right">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-green-500 px-1 py-0.5 border border-green-300 rounded-full w-fit">
                <CheckCircle
                  size={14}
                  className="text-green-500 animate-pulse"
                />
                With CAS
              </span>
              <h3 className="text-3xl font-bold text-gray-900 font-heading mt-1">
                Solution
              </h3>
              <p className="text-base font-semibold text-gray-700 font-body">
                Solves Managing The
                <br />
                Financial &amp; Employee Data Together
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="h-3 bg-white border border-b-0 border-gray-100 rounded-t-2xl shadow-sm" />
          <div className="h-3 bg-white border border-b-0 border-gray-100 rounded-t-2xl shadow-sm" />
        </div>
        {challenges.map((challenge, i) => {
          const solution = solutions[i];
          const isLast = i === challenges.length - 1;
          const step = i + 2;

          return (
            <React.Fragment key={challenge.id}>
              <div
                style={{ paddingTop: i === 0 ? "0" : "25vh" }}
                aria-hidden="true"
              />
              <ScrollSentinel step={step} />
              <div style={{ marginTop: i === 0 ? "0" : "-25vh" }}>
                {/* Equal-height row: grid with items-stretch forces both cards
                    to match the taller sibling automatically */}
                <div className="grid grid-cols-2 gap-6 items-stretch">
                  <ScrollReveal step={step}>
                    <div
                      className={`h-full bg-white border-x border-b border-gray-100 shadow-sm flex gap-4 px-8 py-5 ${
                        isLast ? "rounded-b-2xl" : ""
                      }`}
                    >
                      <div className="w-[3px] bg-red-600 self-stretch flex-shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-semibold text-gray-900 leading-snug">
                          {challenge.title}
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal step={step}>
                    <div
                      className={`h-full bg-white border-x border-b border-gray-100 shadow-sm flex gap-4 px-8 py-5 ${
                        isLast ? "rounded-b-2xl" : ""
                      }`}
                    >
                      <div className="w-[3px] bg-green-600 self-stretch flex-shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-semibold text-gray-900 leading-snug">
                          {solution.title}
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div className="pb-20" />
      </section>
    </ScrollRevealProvider>
  );
};

export default CasChallengeSolution;