import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import PricingSection from "@/pages/HomePage/PricingSection";
import React from "react";
import GetStartedSection from "./HomePage/GetStartedSection";
import HeroSection from "./HomePage/HeroSection";
import ImageGallery from "./HomePage/ImageGallary/ImageGallary";
import PromptFeature from "./HomePage/Prompt/PromptFeature";

const Index = React.memo(() => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-[7rem] bg-background">
        <HeroSection />
        <ImageGallery />
        {/* <Dashboard /> */}
        {/* <AiDemoComingSoon /> */}
        {/* <TextToVoice />
        <MarketingTeam />
        <WhatItWork /> */}
        <PromptFeature />
        <PricingSection />
        {/* <TestimonialsSection /> */}
        /* <GetStartedSection />
        {/* <ChatWidget />  */}
      </main>
      <Footer />
    </div>
  );
});

export default Index;
