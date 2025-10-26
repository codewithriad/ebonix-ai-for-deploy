import { IconArrowRight, IconMessageCircle } from "@tabler/icons-react";
import img5 from "/avater10.webp";
import img4 from "/avater2.webp";

const AiChatBot: React.FC = () => {
  return (
    <div className="lg:max-w-7xl lg:max-h-[580px] overflow-visible mx-auto rounded-2xl border-[8px] border-grayBackground bg-background flex flex-col md:flex-row items-center justify-center p-4 lg:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/20 relative">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 w-full">
        {/* Left Section */}

        <div className="w-full lg:max-w-[45%] flex flex-col justify-center space-y-6 lg:pr-16">
          <div className="text-foreground p-2 border-foreground border-t border-l border-b-4 border-r-4 rounded-xl max-w-fit">
            <p>Ai Chat Bot</p>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            That's remarkably human- <br className="hidden sm:block" />
            like and engaging...
          </h1>
          <p className="text-base sm:text-lg text-foreground tracking-wide pt-4 max-w-[95%]">
            Simply choose your assistant and engage with a friendly chatbot to
            generate ideas, enhance your content, or even bring a smile to your
            face.
          </p>
          <p className="text-para text-sm sm:text-base pt-10 md:pt-20">
            Coming soon...
          </p>
        </div>

        {/* Right Section */}
        <div className="relative w-full lg:max-w-[55%] bg-background rounded-3xl p-4 sm:p-6 shadow-lg flex flex-col space-y-4 border border-r-0 border-y border-l border-grayBackground">
          {/* Overlay gradient */}
          <div className="absolute bottom-0 left-0 w-full h-32 sm:h-48 md:h-80 bg-gradient-to-t from-background to-transparent pointer-events-none z-30" />

          {/* Chat Bot Label */}
          <div className="flex items-center space-x-3 sm:space-x-4 bg-speechTextBg rounded-xl mt-4 p-3 sm:p-4 border-r-2 border-t-2 border-l-4 border-b-4 border-para transform rotate-[-3deg] sm:rotate-[-5deg] absolute -top-4 sm:top-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-grayBackground rounded-full flex items-center justify-center">
              <IconMessageCircle size={20} className="text-foreground" />
            </div>
            <div className="text-sm sm:text-base">
              <h2 className="font-semibold">Ebonix AI Chat Bot</h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Introducing Ebonix AI Chat Bot - like ChatGPT but with 10X
                superpowers
              </p>
            </div>

            {/* Role label */}
            <div className="absolute -bottom-6 sm:-bottom-8 right-4 sm:right-6 h-10 sm:h-12 w-24 sm:w-32 bg-[#E8F1F3] text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-xl flex justify-center items-center border-[#1C738C] border-t-2 border-b-4 border-l-4 border-r-2 transform rotate-[5deg] sm:rotate-[10deg]">
              <p className="text-[#1C738C] text-sm sm:text-base">Life Coach</p>
            </div>
          </div>

          {/* AI response bubble */}
          <div className="mt-20 sm:mt-24 flex items-start space-x-2 bg-speechTextBg rounded-xl p-3 sm:p-4 max-w-full sm:max-w-[400px] ml-0 sm:ml-14">
            <p className="text-para text-sm sm:text-base">
              Creating a daily exercise plan depends on your fitness level,
              goals, and available time. Here's a sample you can adjust.
            </p>
          </div>

          {/* Client message */}
          <div className="flex justify-end items-center gap-2">
            <div className="bg-grayBackground text-para px-3 py-2 rounded-xl max-w-[90%] sm:max-w-sm text-xs sm:text-sm">
              <p>Provide daily exercise plan</p>
            </div>
            <img
              src={img4}
              alt="avatar"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
            />
          </div>

          {/* AI reply with avatar */}
          <div className="rounded-xl ml-4 sm:ml-10 p-3 sm:p-4 text-sm max-w-full sm:max-w-[430px]">
            <div className="flex items-start space-x-2 bg-speechTextBg rounded-xl p-3 relative">
              <p className="text-para text-sm sm:text-base">
                Creating a daily exercise plan depends on your fitness level...
              </p>
              <div className="absolute top-2 -left-12">
                <img
                  src={img5}
                  alt="avatar"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="bg-speechTextBg bg-opacity-50 px-3 pt-3 rounded-lg">
                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                  Day 1: Cardiovascular Exercise
                </h3>
                <ul className="list-disc list-inside text-gray-400 mt-1 text-xs sm:text-sm">
                  <li>Warm-up (5 to 10 minutes light jogging)</li>
                  <li>Main workout:</li>
                  <ul className="ml-4">
                    <li>30–45 min brisk walking or running</li>
                    <li>30–45 min cycling or swimming</li>
                  </ul>
                </ul>
              </div>
            </div>
          </div>

          {/* Chat input field */}
          <div className="w-full lg:w-[90%] px-2 sm:px-4 absolute bottom-2 sm:bottom-3 left-1 sm:left-6 z-40">
            <div className="flex items-center bg-background rounded-xl p-2 sm:p-3 border border-grayBackground w-full">
              <input
                type="text"
                placeholder="Type your message"
                className="flex-grow bg-transparent outline-none placeholder-gray-500 text-sm"
              />
              <button className="text-para ml-2">
                <IconArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatBot;
