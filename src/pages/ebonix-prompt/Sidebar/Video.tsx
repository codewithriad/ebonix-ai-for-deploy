import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Play, Sparkles } from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "../AppSidebar";
import { ChatHeader } from "../ChatHeader";

type Props = {};

const Video = (props: Props) => {
  const [prompt, setPrompt] = useState("");
  const [voiceNarration, setVoiceNarration] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row w-full min-h-screen overflow-x-hidden">
        <div className="w-full md:w-auto flex-shrink-0">
          <AppSidebar
            onNewChat={() => {}}
            chatHistory={[]}
            onSelectChat={() => {}}
            onDeleteChat={() => {}}
          />
        </div>

        <main className="flex-1 bg-background text-foreground p-4 sm:p-6 md:p-8 w-full h-full">
          <div className="block md:hidden">
            <ChatHeader />
          </div>

          <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Play className="w-8 h-8 text-accent" />
                Video Generator
              </h1>
              <p className="text-muted-foreground">
                Create dynamic video content with AI
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Scene Description
                      </label>
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the video scene you want to create..."
                        className="min-h-[120px] bg-background border-border"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Duration
                        </label>
                        <Select defaultValue="5">
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="5">5 seconds</SelectItem>
                            <SelectItem value="10">10 seconds</SelectItem>
                            <SelectItem value="15">15 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Style
                        </label>
                        <Select defaultValue="cinematic">
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="cinematic">Cinematic</SelectItem>
                            <SelectItem value="documentary">
                              Documentary
                            </SelectItem>
                            <SelectItem value="abstract">Abstract</SelectItem>
                            <SelectItem value="commercial">
                              Commercial
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="narration"
                        checked={voiceNarration}
                        onCheckedChange={setVoiceNarration}
                      />
                      <Label htmlFor="narration" className="text-foreground">
                        Enable voice narration
                      </Label>
                    </div>

                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-blue">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Video
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Play className="w-16 h-16 text-accent/50 mx-auto" />
                        <p className="text-muted-foreground">
                          Your generated video will appear here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Recent Videos
                </h3>
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="bg-card border-border hover:border-accent/50 cursor-pointer hover:shadow-glow-subtle transition-all"
                  >
                    <CardContent className="p-3">
                      <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg mb-2 flex items-center justify-center">
                        <Play className="w-8 h-8 text-accent/50" />
                      </div>
                      <p className="text-sm text-foreground font-medium">
                        Video {i}
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Video;
