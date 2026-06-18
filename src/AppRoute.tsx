import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Tutorial from "./components/Tutorial";
import CasChallengeSolution from "./components/Cas challange and solution/CasChallengeSolution";
import OperationStats from "./Operation Stats/OperationStats";
import FeatureSection from "./components/Feature Section/FeatureSection";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CasChallengeSolution />
      <OperationStats />
       <FeatureSection />
      <Tutorial />
    </>
  );
};

export default AppRoutes;
