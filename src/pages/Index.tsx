import Dashboard from "@/components/Dashboard/Dashboard";
import WhatItWork from "@/components/Dashboard/WhatItWork";
import ChatWidget from "@/components/Fixed/ChatWidget";

import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import MarketingTeam from "@/pages/HomePage/MarketingTeam";
import PricingSection from "@/pages/HomePage/PricingSection";
import TestimonialsSection from "@/pages/HomePage/TestimonialsSection";
import React from "react";
import AiDemoComingSoon from "./HomePage/AiDemoComingSoon";
import GetStartedSection from "./HomePage/GetStartedSection";
import HeroSection from "./HomePage/HeroSection";
import PromptFeature from "./HomePage/Prompt/PromptFeature";
import TextToVoice from "./HomePage/TextToVoice";

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
        <PromptFeature />
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
