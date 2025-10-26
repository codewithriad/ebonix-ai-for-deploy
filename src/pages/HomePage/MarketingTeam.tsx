"use client";

import AIBlogSection from "@/pages/HomePage/AIBlogSection";
import AiChatBot from "./AiChatBot";
import AiCode from "./AiCode";
import AIImageHero from "./AiImageHero";
import SpeechTextApp from "./SpeechTextApp";
import Template from "./Template";
import { useTheme } from "./ThemeProvider";
import DarkPageLogo from "/dark-nav-logo.png";
import LightPageLogo from "/light-nav-logo.png";
import TextToVoice from "@/pages/HomePage/TextToVoice";

const MarketingTeam = () => {
  const { theme } = useTheme();

  const src = theme === "dark" ? DarkPageLogo : LightPageLogo;

  return (
    <>
      <section className="mt-20">
        <div className="mt-8">
          <h2 className="text-center text-4xl text-foreground font-bold">
            <div className="flex justify-center items-center space-x-2">
              <img src={src} alt="main-logo" className="w-60 h-14" />
              <span>helps</span>
            </div>
            <span className="block text-transparent bg-gradient-to-r from-[#D3F36B] to-[#6BAAF3] bg-clip-text">
              Marketing Teams
            </span>
          </h2>
        </div>
        {/* ai blog section */}
        <div className="mt-16">
          <AIBlogSection />
        </div>

        {/* ai templates */}

        <div className="mt-16">
          <Template />
        </div>

        {/* ai code */}
        <div className="mt-16">
          <AiCode />
        </div>

        {/* ai image hero */}
        <div className="mt-16">
          <AIImageHero />
        </div>

        {/* chat with ai section */}
        <div className="mt-16">
          <AiChatBot />
        </div>

        {/* ai speech to text section */}
        <div className="mt-20">
          <SpeechTextApp />
        </div>
      </section>
    </>
  );
};

export default MarketingTeam;
