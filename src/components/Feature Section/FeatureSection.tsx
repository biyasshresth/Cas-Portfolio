import React from "react";
import { DashboardImage, FeatureList, SectionHeading } from "./FeatureCard";
import HrdashBoard from "../../assets/HrdashBoard.png";
const FeatureSection: React.FC = () => {
  return (
    <div
      id="features"
      data-nav="dark"
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#1a0b2e 0%,#2d1b4e 50%,#1a0b2e 100%)",
      }} >
      {/* ambient blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        <h1
          className="text-center text-3xl md:text-4xl font-semibold text-gray-200 mb-16"
          style={{ fontFamily: "Georgia, serif" }} >
          Features Section
        </h1>
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-14">
          {/* <div className="lg:w-56 flex-shrink-0">
            <SectionHeading>Financial Management</SectionHeading>
            <div className="mt-4">
              <FinanceCard />
            </div>
          </div> */}
          <div className="flex-1">
            <DashboardImage src={HrdashBoard} />
          </div>
          <div className="lg:w-52 mt-20 flex-shrink-0">
            <SectionHeading className="text-base">
              Human Resource Management:
            </SectionHeading>
            <FeatureList
              items={[
                "Employee Profiles",
                "KYE Records",
                "Employee Tracking",
                "Organized Staff Data",
                 "Employee Salary",
              ]} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-14">
          <div className="lg:w-56 mt-20 flex-shrink-0">
            <SectionHeading>Reporting &amp; Ledger:</SectionHeading>
            <FeatureList
              items={[
                "Ledger Generation",
                "Download Reports",
                "Financial Summary",
                "Transaction History",
              ]}
            />
          </div>
          <div className="flex-1">
            <DashboardImage src={HrdashBoard}  />
          </div>
        </div>
         <div className="flex flex-col lg:flex-row items-start gap-8 mb-14">
          <div className="flex-1">
            <DashboardImage src={HrdashBoard}  />
          </div>
          <div className="lg:w-64 flex-shrink-0">
            <SectionHeading>Stakeholder Management:</SectionHeading>
            <FeatureList
              items={[
                "Supplier Records",
                "Customer Records",
                "Transaction History",
                "Relationship Tracking",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeatureSection;
