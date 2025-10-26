import CoolestFeatures from "@/pages/HomePage/CoolestFeatures";
import Dashboard from "@/components/Dashboard/Dashboard";
import WhatItWork from "@/components/Dashboard/WhatItWork";
import ChatWidget from "@/components/Fixed/ChatWidget";

import MarketingTeam from "@/pages/HomePage/MarketingTeam";
import PricingSection from "@/pages/HomePage/PricingSection";
import TestimonialsSection from "@/pages/HomePage/TestimonialsSection";
import React from "react";
import AiDemoComingSoon from "./HomePage/AiDemoComingSoon";
import TextToVoice from "./HomePage/TextToVoice";
import Navbar from "@/components/Shared/Navbar";
import GetStartedSection from "./HomePage/GetStartedSection";
import HeroSection from "./HomePage/HeroSection";
import Footer from "@/components/Shared/Footer";

const Index = React.memo(() => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-[7rem] bg-background">
        <HeroSection />
        <Dashboard />
        <AiDemoComingSoon />
        <TextToVoice />
        <MarketingTeam />
        <WhatItWork />
        <CoolestFeatures />
        <PricingSection />
        <TestimonialsSection />
        <GetStartedSection />
        <ChatWidget />
      </main>
      <Footer />
    </div>
  );
});

export default Index;
