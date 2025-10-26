import { SidebarProvider } from "@/components/ui/sidebar";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { IconFileUpload } from "@tabler/icons-react";
import { MdGraphicEq } from "react-icons/md";
import { AppSidebar } from "../AppSidebar";

type Props = {};

const VoiceIsolotor = (props: Props) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Sidebar */}
        <div className="w-full md:w-auto flex-shrink-0">
          <AppSidebar
            onNewChat={() => {}}
            chatHistory={[]}
            onSelectChat={() => {}}
            onDeleteChat={() => {}}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 bg-background text-foreground p-4 sm:p-6 md:p-8 w-full min-h-screen overflow-y-auto">
          <div className="max-w-[1800px] mx-auto">
            {/* Center Content */}
            <div className="flex flex-col justify-center items-center h-[80vh] text-center px-4  transition-colors duration-500">
              {/* wave Button */}
              <div className="relative group">
                {/* Outer glow animation */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-400 to-cyan-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* Button core */}
                <div
                  className="relative w-20 h-20 flex justify-center items-center rounded-3xl 
  bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 
  shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] 
  cursor-pointer transform hover:scale-110 transition-all duration-300 ease-out
  dark:from-cyan-600 dark:via-blue-700 dark:to-indigo-800 dark:shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                >
                  <MdGraphicEq className="h-12 w-12 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]" />

                  {/* soft glow background */}
                  <div className="absolute inset-0 blur-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 opacity-40 -z-10 animate-pulse"></div>
                </div>
              </div>

              {/* Text Section */}
              <h3 className="text-foreground  text-xl sm:text-3xl font-bold mt-8 mb-3 tracking-tight">
                Voice Isolator
              </h3>
              <p className="text-para text-lg sm:text-xl max-w-md">
                Isolate voice from background noise.
              </p>
            </div>

            {/* chat input */}
            <div className="relative flex items-center gap-3 w-full max-w-6xl mx-auto mt-10 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] px-4 py-3 transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]">
              {/* Plus Icon */}
              <button className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 text-white hover:scale-110 transition-transform duration-200 shadow-md">
                <IconFileUpload className="h-5 w-5" />
              </button>

              {/* Input */}
              <input
                type="text"
                name="text"
                id="text"
                placeholder="Type your prompt here..."
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-lg caret-cyan-500"
              />

              {/* Send Icon */}
              <button className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white hover:scale-110 transition-transform duration-200 shadow-md">
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </button>

              {/* subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-400 -z-10 animate-pulse"></div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default VoiceIsolotor;
