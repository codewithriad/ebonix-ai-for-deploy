import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/ebonix-prompt/AppSidebar";
import {
  Brain,
  Code2,
  CopyCheck,
  FileText,
  Headphones,
  Image,
  MessageSquare,
  Mic,
  Video,
  Volume2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { ChatHeader } from "../ChatHeader";

const cards = [
  {
    title: "Conversations",
    desc: "Chat conversations created with the Chat tool",
    icon: <MessageSquare className="h-6 w-6 text-sky-500" />,
  },
  {
    title: "Documents",
    desc: "Documents created with the Writer tool",
    icon: <FileText className="h-6 w-6 text-orange-400" />,
  },
  {
    title: "Code documents",
    desc: "Code related documents created with the Coder tool",
    icon: <Code2 className="h-6 w-6 text-pink-500" />,
  },
  {
    title: "Images",
    desc: "Image files created with the Imagine tool",
    icon: <Image className="h-6 w-6 text-purple-400" />,
  },
  {
    title: "Videos",
    desc: "Video files created with the Video tool",
    icon: <Video className="h-6 w-6 text-rose-400" />,
  },
  {
    title: "Transcriptions",
    desc: "Transcriptions created with the Transcriber tool",
    icon: <Mic className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Speeches",
    desc: "Audio speeches created from text inputs",
    icon: <Volume2 className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Cloned voices",
    desc: "Your cloned voices",
    icon: <Headphones className="h-6 w-6 text-emerald-400" />,
  },
  {
    title: "Isolated voices",
    desc: "Voices isolated from background noise",
    icon: <Brain className="h-6 w-6 text-indigo-400" />,
  },
  {
    title: "Classifications",
    desc: "Reports created with the Classifier tool",
    icon: <CopyCheck className="h-6 w-6 text-fuchsia-400" />,
  },
];

export default function LibraryPage() {
  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row w-full min-h-screen overflow-x-hidden">
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
        <main
          className="
            flex-1
            bg-background 
            text-foreground 
            p-4 sm:p-6 md:p-8 
            w-full 
            min-h-screen 
            overflow-y-auto
          "
        >
          <div className="block md:hidden">
            <ChatHeader />
          </div>
          <div className="max-w-[1800px] mx-auto">
            {/* Header */}
            <div className="mb-8">
              <NavLink
                to={"/app"}
                className="text-xs sm:text-sm text-muted-foreground hover:text-gray-200 mb-1 block"
              >
                Dashboard
              </NavLink>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
                Library
              </h1>
            </div>

            {/* Card grid */}
            <div
              className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4 
                gap-4 
                sm:gap-6
              "
            >
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="
                    p-4 sm:p-5 
                    bg-card 
                    rounded-xl 
                    border 
                    hover:bg-accent/20 
                    transition-all 
                    cursor-pointer 
                    shadow-sm 
                    flex 
                    flex-col 
                    justify-between
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-md bg-muted flex items-center justify-center">
                      {card.icon}
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
