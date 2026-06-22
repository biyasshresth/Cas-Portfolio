import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Tutorial from "./components/Tutorial";
import CasChallengeSolution from "./components/Cas challange and solution/CasChallengeSolution";
import OperationStats from "./Operation Stats/OperationStats";
import FeatureSection from "./components/Feature Section/FeatureSection";
import CASLandingPage from "./components/landing page/CASLandingPage";
import "./Approutes.css";

const AppRoutes = () => {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <CASLandingPage onStart={() => setEntered(true)} />;
  }

  return (
    <div className="app-reveal">
      <Navbar />
      <Hero />
      <CasChallengeSolution />
      <OperationStats />
      <FeatureSection />
      <Tutorial />
    </div>
  );
};

export default AppRoutes;
