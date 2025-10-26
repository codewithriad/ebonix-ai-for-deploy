import {
  IconAlignJustified,
  IconBold,
  IconCircleCheckFilled,
  IconCopy,
  IconDeviceFloppy,
  IconFileDownload,
  IconItalic,
  IconLoader3,
  IconTrash,
  IconUnderline,
} from "@tabler/icons-react";
import { Sparkles, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const AIBlogSection = () => {
  const { theme } = useTheme();

  const mutedText = theme === "dark" ? "text-[#B1B5C3]" : "text-[#6B7280]";
  const headingText = theme === "dark" ? "text-white" : "text-[#181A20]";
  const generateCard = theme === "dark" ? "bg-[#3F4246]" : "bg-[#F5F6F6]";
  const buttonBg =
    theme === "dark"
      ? "bg-white text-[#181A20] hover:bg-[#F4F5F6]"
      : "bg-[#181A20] text-white hover:bg-[#23262F]";

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start bg-background border-[4px] lg:border-[8px] border-grayBackground rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-10 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/20 text-pretty relative overflow-hidden">
      {/* Left Section */}
      <div className="w-full lg:flex-1">
        <div className="inline-block bg-white/10 text-white px-3 py-1 rounded-lg text-xs sm:text-sm mb-4 lg:mb-8">
          AI Writer
        </div>

        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-8 ${headingText}`}
        >
          Write SEO optimized blogs, <br className="hidden sm:block" /> sales
          emails and more...
        </h2>

        <p
          className={`text-sm sm:text-base font-bold my-4 lg:my-8 ${mutedText}`}
        >
          Achieve superior outcomes in a fraction of the time. At last, a
          writing tool that you'll genuinely utilize.
        </p>

        <button className="mt-6 sm:mt-8 bg-foreground text-background font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition">
          See all features →
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full lg:flex-1 relative mt-4 sm:mt-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mock Card UI */}
          <div
            className={`flex-1 ${generateCard} rounded-lg p-4 sm:p-6 relative min-h-[500px]`}
          >
            <div>
              <h3 className="text-sm sm:text-base font-bold">Title</h3>
              <div className="w-16 h-2 mt-2 bg-white/10 rounded"></div>
            </div>

            <div className="my-6">
              <h3 className="text-sm sm:text-base font-bold">Description</h3>
              <div className="w-32 h-2 mt-2 bg-white/10 rounded"></div>
              <div className="w-20 h-2 mt-2 bg-white/10 rounded"></div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold">Tone of Voice</h3>
              <div className="mt-2 space-y-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-2">
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={j}
                        className={`h-2 rounded-lg ${
                          j === 2
                            ? "bg-white/25 w-8 sm:w-10"
                            : "bg-white/10 w-10 sm:w-16"
                        }`}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 px-4">
              <button className="w-full bg-grayBackground text-sm sm:text-base rounded-xl py-2">
                Generate result
              </button>
            </div>
          </div>

          {/* Hero Text */}

          <div>
            <div className="flex-1 bg-background p-4 sm:p-6 rounded-xl shadow-xl text-xs sm:text-sm w-[400px] max-h-fit overflow-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {[IconCopy, IconFileDownload, IconDeviceFloppy, IconTrash].map(
                  (Icon, i) => (
                    <Icon
                      key={i}
                      className={`${
                        i === 3 ? "text-[#FFB2B5]" : "text-para"
                      } w-4 h-4 sm:w-5 sm:h-5`}
                    />
                  )
                )}
              </div>

              <h3 className="font-bold text-sm sm:text-base mb-2 text-para">
                Hero titles for e-commerce websites
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  1. "Mastering the Art of Design: Creating Stunning e-Commerce
                  Websites"
                </li>
                <li>
                  2. "
                  <span className={`underline bg-[#596364] relative`}>
                    <div className="absolute -top-9 left-9 h-fit p-1 flex justify-center items-center gap-3 text-para bg-foreground rounded-lg">
                      <IconBold />
                      <IconUnderline />
                      <IconItalic />
                      <IconAlignJustified />
                    </div>
                    Ultimate Guide to Crafting Creative
                  </span>{" "}
                  and Engaging e-Commerce Websites"
                </li>
                <li>3. "Unleashing Your Creative Potential..."</li>
                <li>4. "Unleashing Your Creative Potential..."</li>
                <li>
                  5. "From Concept to Reality: Guide to Designing Beautiful
                  e-Commerce Websites"
                </li>
              </ul>
            </div>
            {/* Checklist */}

            <div className="ml-auto w-fit space-y-3 text-right mt-4">
              {[
                { icon: IconCircleCheckFilled, label: "Title" },
                { icon: IconCircleCheckFilled, label: "Descriptions" },
                { icon: IconCircleCheckFilled, label: "Inputs" },
                { icon: IconLoader3, label: "Inputs", color: "text-[#D3F36B]" },
              ].map(({ icon: Icon, label, color }, idx) => (
                <p
                  key={idx}
                  className={`text-sm sm:text-base flex items-center gap-2 text-para ${
                    color || ""
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {label}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Card */}
        <div
          className={`absolute hidden md:flex md:flex-col bottom-2 left-1/2 transform -translate-x-1/2 ${generateCard} p-4 sm:p-6 rounded-2xl shadow-lg text-white w-44 sm:w-60 rotate-[-5deg] border border-para`}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-grayBackground flex justify-center items-center mb-2">
            <IconAlignJustified className="text-para w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-foreground mb-1">
            Blog Writer
          </h4>
          <p className="text-xs sm:text-sm text-gray-300">
            An AI-powered blog generator - Effortlessly create engaging content
            in seconds.
          </p>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-2 right-2">
          <Sun className="text-green-400 bg-white/10 p-1 rounded-xl w-10 h-10 sm:w-8 sm:h-8 border-t border-l border-r-4 border-b-4 border-green-400" />
        </div>
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
          <Sparkles className="text-purple-400 bg-white/10 p-1 rounded-xl w-10 h-10 sm:w-8 sm:h-8 border-purple-400 border-t border-l border-b-4 border-r-4" />
        </div>
      </div>
    </div>
  );
};

export default AIBlogSection;
