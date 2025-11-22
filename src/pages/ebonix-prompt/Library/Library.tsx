import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppSidebar } from "@/pages/ebonix-prompt/AppSidebar";
import { IconFolderOpen } from "@tabler/icons-react";
import { FolderOpen, Image, MessageSquare, Video } from "lucide-react";
import { ChatHeader } from "../ChatHeader";

const items = {
  chats: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Chat Session ${i + 1}`,
    date: "2 days ago",
  })),
  images: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Generated Image ${i + 1}`,
    date: "3 days ago",
  })),
  videos: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Video Project ${i + 1}`,
    date: "1 week ago",
  })),
  projects: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Project ${i + 1}`,
    date: "5 days ago",
  })),
};

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
          <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Library</h1>
              <p className="text-muted-foreground">
                All your saved creations in one place
              </p>
            </div>

            <Tabs defaultValue="chats" className="w-full">
              <TabsList className="bg-card border border-border">
                <TabsTrigger
                  value="chats"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chats
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Images
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Videos
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <IconFolderOpen className="w-4 h-4 mr-2" />
                  Projects
                </TabsTrigger>
              </TabsList>

              {Object.entries(items).map(([key, itemList]) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {itemList.map((item) => (
                      <Card
                        key={item.id}
                        className="bg-card border-border hover:border-primary/50 cursor-pointer hover:shadow-glow-subtle transition-all group"
                      >
                        <CardContent className="p-4">
                          <div className="aspect-video bg-gradient-lime-blue rounded-lg mb-3 flex items-center justify-center">
                            {key === "chats" && (
                              <MessageSquare className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                            )}
                            {key === "images" && (
                              <Image className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                            )}
                            {key === "videos" && (
                              <Video className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                            )}
                            {key === "projects" && (
                              <FolderOpen className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                            )}
                          </div>
                          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.date}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
