import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import WorkSection from "../components/WorkSection";

const LandingPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <WorkSection />
    </>
  );
};

export default LandingPage;
