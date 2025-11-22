import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sparkles } from "lucide-react";
import { AppSidebar } from "../AppSidebar";
import { ChatHeader } from "../ChatHeader";

interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  features: string[];
  icon: string;
}

interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: string;
  locked?: boolean;
}

const models = [
  {
    name: "BLK Renaissance",
    description: "Classical artistry meets contemporary Black excellence",
    category: "Art",
    featured: true,
  },
  {
    name: "Afrodiasic",
    description: "Celebrating African diaspora culture and aesthetics",
    category: "Culture",
    featured: true,
  },
  {
    name: "Tones of Essence",
    description: "Capturing authentic skin tones and natural beauty",
    category: "Portrait",
    featured: false,
  },
  {
    name: "God Particles",
    description: "Spiritual and cosmic creative expressions",
    category: "Abstract",
    featured: false,
  },
  {
    name: "Professionals",
    description: "Modern workplace and career-focused imagery",
    category: "Business",
    featured: false,
  },
  {
    name: "Timeless Portraits",
    description: "Heritage and legacy through portraiture",
    category: "Portrait",
    featured: true,
  },
];

export default function ModalsPage() {
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

        {/* main content */}
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
              <h1 className="text-3xl font-bold text-foreground">
                Ebonix AI Models
              </h1>
              <p className="text-muted-foreground">
                Specialized AI models designed for diverse, culturally elevated
                creative content
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <Card
                  key={model.name}
                  className="bg-card border-border hover:border-primary/50 overflow-hidden group cursor-pointer hover:shadow-glow-subtle transition-all"
                >
                  <div className="h-40 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 flex items-center justify-center relative">
                    <Sparkles className="w-16 h-16 text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all" />
                    {model.featured && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary text-primary-foreground border-none">
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {model.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className="border-border text-muted-foreground"
                        >
                          {model.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {model.description}
                      </p>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-lime">
                      Use Model
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
