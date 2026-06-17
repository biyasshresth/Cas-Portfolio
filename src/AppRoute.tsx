import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Tutorial from "./components/Tutorial";
import CasChallengeSolution from "./components/Cas challange and solution/CasChallengeSolution";
import OperationStats from "./Operation Stats/OperationStats";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CasChallengeSolution />
      <Tutorial />
      <OperationStats />
    </>
  );
};

export default AppRoutes;
