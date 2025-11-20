import {
  IconLayoutDashboard,
  IconMicrophone,
  IconPlayerPlay,
  IconTopologyStar3,
  IconWand,
} from "@tabler/icons-react";
import { Sparkles } from "lucide-react";

type FeatureCard = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type Props = {};

const PromptFeature = (props: Props) => {
  const features: FeatureCard[] = [
    {
      icon: (
        <Sparkles className="text-[#6BAAF3] bg-[#f2eefd] w-14 h-14 rotate-12 p-2 border border-t-2 border-l-0 border-r-4 border-b-4 border-[#6baaf3] rounded-xl" />
      ),
      title: "High-Impact Prompts",
      description:
        "Unlock elite-level content creation with prompt templates that hit every single time.Get repeatable results without guessing or struggling,  just plug in and create magic.",
    },
    {
      icon: (
        <IconMicrophone className="text-[#B9B0CF] bg-[#f2eefd] w-14 h-14 rotate-[5] p-2 border border-t-2 border-l-4 border-r-2 border-b-4 border-[#B9B0CF] rounded-xl" />
      ),
      title: "Creative Voices",
      description:
        "Talk to AI that sounds like our people. Choose from familiar personas:  Auntie with the gems, Unc with the humor, the Wise Friend, the Chill Cousin, or the Sister/Brotha ..Voices that feel like home, finally in AI.",
    },
    {
      icon: (
        <IconLayoutDashboard className="text-[#6BAAF3] bg-[#f2eefd] w-14 h-14 p-2 border border-t-2 border-l-0 border-r-4 border-b-4 border-[#6baaf3] rounded-xl" />
      ),
      title: "Creative Dashboard",
      description:
        "A beautiful, intuitive dashboard designed for how you work. Manage projects, switch models, track outputs, remix ideas all in one smooth flow.",
    },
    {
      icon: (
        <IconTopologyStar3 className="text-[#8B6BF3] bg-[#f2eefd] w-14 h-14 rotate-12 p-2 border border-t-2 border-l-4 border-r-2 border-b-4 border-[#8B6BF3] rounded-xl" />
      ),
      title: "Culturally Intelligent Models",
      description:
        "Our signature AI models are trained to reflect Black identity, artistry, and excellence without bias or distortion. No longer explain to AI that you’re a “black” woman or man. We know who you are just speak normal. ",
    },
    {
      icon: (
        <IconPlayerPlay className="text-[#6184EB] bg-[#f2eefd] w-14 h-14 rotate-[5] p-2 border border-t-2 border-l-0 border-r-4 border-b-4 border-[#6184EB] rounded-xl" />
      ),
      title: "Next-Level Video Generation",
      description:
        "Produce cinematic, high-resolution videos that feel real, rich, and expressive. From storytelling to branding, elevate your visuals without touching a camera.",
    },
    {
      icon: (
        <IconWand className="text-[#68F0CA] bg-[#f2eefd] w-14 h-14 -rotate-[8.75] p-2 border border-t-2 border-l-0 border-r-4 border-b-4 border-[#68F0CA] rounded-xl" />
      ),
      title: "Stunning Visuals",
      description:
        "Create images that truly look like us. Our AI preserves real Black features: melanin-rich skin, natural textures, braids, coils, locs, fades, frontals, wigs, bust-down middle parts, baby hairs, and everything in between.",
    },
  ];
  return (
    <div
      className={`min-h-screen mt-8 py-12 px-4 transition-colors duration-300
         bg-background text-foreground`}
    >
      <div className="container-custom relative z-10">
        <h1 className="text-4xl font-bold text-center mb-4">
          Prompts Built Different
        </h1>

        <p className="text-xl text-para text-center mb-4">
          Ebonix AI speaks how we speak and creates how we create.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 shadow-lg transition-all hover:scale-105 bg-background text-pretty max-w-[22rem] mx-auto max-h-[18rem] rounded-[2.5rem] border-[.5rem] border-grayBackground`}
            >
              <div className="flex justify-start items-center gap-2">
                <div className="flex items-center justify-center w-auto h-auto bg-transparent mb-8">
                  {feature.icon}
                </div>
                <h2 className="text-xl font-bold mb-3">{feature.title}</h2>
              </div>
              <p className="text-para text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptFeature;
