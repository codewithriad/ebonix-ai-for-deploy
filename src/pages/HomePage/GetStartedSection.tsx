// components/GetStartedSection.tsx
import {
  IconLayoutGrid,
  IconPhoto,
  IconRocket,
  IconSeo,
  IconSun,
  IconUsers,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

const iconStyle = "w-6 h-6";

const icons = [
  {
    Icon: IconUsers,
    color: "text-[#9C73F1]",
    BorderColor: "#9C73F1",
    bgColor: "bg-[#FDF9EE]",
    position: "top-[-20px] left-14 rotate-[-15deg]",
  },
  {
    Icon: IconSeo,
    color: "text-[#00A6FB]",
    BorderColor: "#00A6FB",
    bgColor: "bg-[#E2F5FF]",
    position: "top-[38%] left-4 md:left-20 rotate-[15deg]",
  },
  {
    Icon: IconRocket,
    color: "text-[#BCE143]",
    BorderColor: "#BCE143",
    bgColor: "bg-[#F9FDEC]",
    position: "bottom-0 left-[50px] rotate-[-10deg]",
  },
  {
    Icon: IconLayoutGrid,
    color: "text-[#FE5157]",
    BorderColor: "#FE5157",
    bgColor: "bg-[#FFECEC]",
    position: "top-0 right-[50px] rotate-[12deg]",
  },
  {
    Icon: IconSun,
    color: "text-[#353C45]",
    BorderColor: "#353C45",
    bgColor: "bg-[#F5F6F6]",
    position: "top-[38%] right-4 md:right-20 rotate-[-8deg]",
  },
  {
    Icon: IconPhoto,
    color: "text-[#30C862]",
    BorderColor: "#30C862",
    bgColor: "bg-[#E8F9EE]",
    position: "bottom-[-20px] right-14 rotate-[8deg]",
  },
];

const GetStartedSection = () => {
  return (
    <section className="relative py-24 px-4 bg-background text-foreground ">
      <div className="relative max-w-5xl mx-auto p-[10px] rounded-[3rem] bg-gradient-to-r from-lime-300 via-blue-300 to-indigo-400 dark:from-lime-400 dark:via-blue-500 dark:to-indigo-500">
        <div className="rounded-[3rem] bg-background p-10 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to level-up?
          </h2>
          <p className="text-para mb-8 text-lg">
            See how easy it can be to write amazing content.
          </p>
          <NavLink to="/app">
            <button className="inline-flex items-center gap-2 bg-foreground text-background hover:shadow-xl font-medium px-6 py-3 rounded-lg transition duration-300 group">
              Get Started Now
              <span className="transform transition-all duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </NavLink>
        </div>

        {icons.map(({ Icon, color, bgColor, BorderColor, position }, idx) => (
          <div
            key={idx}
            className={`absolute ${position} w-12 h-12 ${bgColor} z-20 rounded-xl border-t-2 border-l-2 border-r-[4px] border-b-[4px] border- flex justify-center items-center`}
            style={{
              borderColor: BorderColor,
            }}
          >
            <Icon className={`${iconStyle} ${color}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetStartedSection;
