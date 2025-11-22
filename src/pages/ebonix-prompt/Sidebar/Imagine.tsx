import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { IconSparkles } from "@tabler/icons-react";
import {
  ChevronDown,
  History,
  Repeat,
  Settings,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "../AppSidebar";

type Props = {};

const Imagine = (props: Props) => {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("renaissance");
  const [style, setStyle] = useState("realistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [creativity, setCreativity] = useState([50]);
  const [detailLevel, setDetailLevel] = useState([70]);
  const [sharpness, setSharpness] = useState([60]);
  const [styleStrength, setStyleStrength] = useState([75]);
  const [fastMode, setFastMode] = useState(true);
  const [hqMode, setHqMode] = useState(false);
  const [seedLock, setSeedLock] = useState(false);
  const [seed, setSeed] = useState("");

  const aspectRatios = [
    { label: "1:1", value: "1:1" },
    { label: "9:16", value: "9:16" },
    { label: "16:9", value: "16:9" },
    { label: "3:2", value: "3:2" },
    { label: "2:3", value: "2:3" },
  ];

  // Controls Panel Component (reusable for desktop and mobile)
  const ControlsPanel = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Prompt */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">Prompt</label>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your vision in detail..."
          className="min-h-[80px] md:min-h-[100px] bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Model Selector */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">Model</label>
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="bg-background border-border hover:border-primary/50 transition-all">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="renaissance">BLK Renaissance</SelectItem>
            <SelectItem value="afrodiasic">Afrodiasic</SelectItem>
            <SelectItem value="tones">Tones of Essence</SelectItem>
            <SelectItem value="timeless">Timeless Portraits</SelectItem>
            <SelectItem value="godparticles">God Particles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Style Selector */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">Style</label>
        <Select value={style} onValueChange={setStyle}>
          <SelectTrigger className="bg-background border-border hover:border-primary/50 transition-all">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="realistic">Realistic</SelectItem>
            <SelectItem value="artistic">Artistic</SelectItem>
            <SelectItem value="abstract">Abstract</SelectItem>
            <SelectItem value="cinematic">Cinematic</SelectItem>
            <SelectItem value="portrait">Portrait</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Aspect Ratio */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Aspect Ratio
        </label>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-2">
          {aspectRatios.map((ratio) => (
            <Button
              key={ratio.value}
              variant={aspectRatio === ratio.value ? "default" : "outline"}
              size="sm"
              onClick={() => setAspectRatio(ratio.value)}
              className={
                aspectRatio === ratio.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border-border hover:border-primary/50"
              }
            >
              {ratio.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Advanced Toggle */}
      <div className="pt-2 border-t border-border">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <span>Advanced Settings</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showAdvanced ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Advanced Settings */}
      {showAdvanced && (
        <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-top-2">
          {/* Creativity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Creativity
              </label>
              <span className="text-xs text-muted-foreground">
                {creativity[0]}%
              </span>
            </div>
            <Slider
              value={creativity}
              onValueChange={setCreativity}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Detail Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Detail Level
              </label>
              <span className="text-xs text-muted-foreground">
                {detailLevel[0]}%
              </span>
            </div>
            <Slider
              value={detailLevel}
              onValueChange={setDetailLevel}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Sharpness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Sharpness
              </label>
              <span className="text-xs text-muted-foreground">
                {sharpness[0]}%
              </span>
            </div>
            <Slider
              value={sharpness}
              onValueChange={setSharpness}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Style Strength */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Style Strength
              </label>
              <span className="text-xs text-muted-foreground">
                {styleStrength[0]}%
              </span>
            </div>
            <Slider
              value={styleStrength}
              onValueChange={setStyleStrength}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Fast Mode
              </label>
              <Switch checked={fastMode} onCheckedChange={setFastMode} />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                HQ Mode
              </label>
              <Switch checked={hqMode} onCheckedChange={setHqMode} />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Seed Lock
              </label>
              <Switch checked={seedLock} onCheckedChange={setSeedLock} />
            </div>
            {seedLock && (
              <Input
                type="text"
                placeholder="Enter seed value"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                className="bg-background border-border"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row w-full min-h-screen overflow-hidden">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block md:w-auto flex-shrink-0">
          <AppSidebar
            onNewChat={() => {}}
            chatHistory={[]}
            onSelectChat={() => {}}
            onDeleteChat={() => {}}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 bg-background text-foreground w-full h-screen overflow-hidden">
          <div className="h-full flex flex-col lg:flex-row gap-4 p-2 sm:p-4">
            {/* DESKTOP: LEFT PANEL - Controls */}
            <Card className="hidden lg:block w-80 flex-shrink-0 bg-card border-border">
              <ScrollArea className="h-full">
                <CardContent className="p-6">
                  <ControlsPanel />

                  {/* Generate Button */}
                  <Button className="w-full h-12 mt-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 font-semibold text-base transition-all">
                    <IconSparkles className="w-5 h-5 mr-2" />
                    Generate Image
                  </Button>
                </CardContent>
              </ScrollArea>
            </Card>

            {/* MOBILE: Top Controls Bar */}
            <div className="lg:hidden flex gap-2">
              {/* Settings Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-2 border-border hover:border-primary/50"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[85vw] sm:w-[400px] bg-card border-border overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle className="text-foreground">
                      Generation Settings
                    </SheetTitle>
                    <SheetDescription className="text-muted-foreground">
                      Configure your image generation parameters
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <ControlsPanel />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Gallery Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-2 border-border hover:border-primary/50"
                  >
                    <History className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85vw] sm:w-[400px] bg-card border-border"
                >
                  <SheetHeader>
                    <SheetTitle className="text-foreground">Gallery</SheetTitle>
                    <SheetDescription className="text-muted-foreground">
                      Browse your creations and discover
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <Tabs
                      defaultValue="history"
                      className="flex flex-col h-[calc(100vh-180px)]"
                    >
                      <TabsList className="grid w-full grid-cols-3 bg-muted/50 mb-4">
                        <TabsTrigger
                          value="discover"
                          className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          Discover
                        </TabsTrigger>
                        <TabsTrigger
                          value="history"
                          className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          History
                        </TabsTrigger>
                        <TabsTrigger
                          value="assets"
                          className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          Assets
                        </TabsTrigger>
                      </TabsList>

                      <ScrollArea className="flex-1">
                        <TabsContent
                          value="discover"
                          className="mt-0 space-y-3"
                        >
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Card
                              key={i}
                              className="bg-card/50 border-border hover:border-primary/50 cursor-pointer transition-all group"
                            >
                              <CardContent className="p-3">
                                <div className="aspect-square bg-gradient-to-br from-lime-400/20 to-cyan-400/20 dark:from-primary/20 dark:to-accent/20 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                                  <Sparkles className="w-8 h-8 text-lime-600 dark:text-primary/50" />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-foreground font-medium">
                                      Discover {i}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      by creator
                                    </p>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Repeat className="w-4 h-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="history" className="mt-0 space-y-3">
                          {[1, 2, 3, 4].map((i) => (
                            <Card
                              key={i}
                              className="bg-card/50 border-border hover:border-accent/50 cursor-pointer transition-all group"
                            >
                              <CardContent className="p-3">
                                <div className="aspect-square bg-gradient-to-br from-cyan-400/20 to-lime-400/20 dark:from-accent/20 dark:to-primary/20 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                                  <Sparkles className="w-8 h-8 text-cyan-600 dark:text-accent/50" />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-foreground font-medium">
                                      Generation {i}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {i * 2} hours ago
                                    </p>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Repeat className="w-4 h-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="assets" className="mt-0 space-y-3">
                          {[1, 2, 3].map((i) => (
                            <Card
                              key={i}
                              className="bg-card/50 border-border hover:border-primary/50 cursor-pointer transition-all group"
                            >
                              <CardContent className="p-3">
                                <div className="aspect-square bg-gradient-to-br from-lime-400/20 to-cyan-400/20 dark:from-primary/20 dark:to-accent/20 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                                  <Wand2 className="w-8 h-8 text-lime-600 dark:text-primary/50" />
                                </div>
                                <div>
                                  <p className="text-sm text-foreground font-medium">
                                    Asset {i}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Saved
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>
                      </ScrollArea>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* CENTER PANEL - Main Canvas (All Devices) */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <Card className="flex-1 bg-card border-border">
                <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                  {/* Canvas */}
                  <div className="flex-1 bg-gradient-to-br from-lime-400/10 to-cyan-400/10 dark:from-primary/5 dark:via-accent/5 dark:to-primary/10 rounded-xl flex items-center justify-center border border-border/50 min-h-[300px] sm:min-h-[400px]">
                    <div className="text-center space-y-4 px-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-lime-400/30 to-cyan-400/30 dark:from-primary/20 dark:to-accent/20 rounded-full flex items-center justify-center border-2 border-lime-400/40 dark:border-primary/30 shadow-lg">
                        <Wand2 className="w-10 h-10 sm:w-12 sm:h-12 text-lime-600 dark:text-primary" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-medium text-foreground">
                          Your masterpiece will appear here
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Start by describing your vision
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* MOBILE: Generate Button */}
              <Button className="lg:hidden w-full h-12 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 font-semibold text-base transition-all">
                <IconSparkles className="w-5 h-5 mr-2" />
                Generate Image
              </Button>
            </div>

            {/* DESKTOP: RIGHT PANEL - Gallery */}
            <Card className="hidden lg:block w-80 flex-shrink-0 bg-card border-border">
              <CardContent className="p-4 h-full flex flex-col">
                <Tabs defaultValue="history" className="flex-1 flex flex-col">
                  <TabsList className="grid w-full grid-cols-3 bg-muted/50 mb-4">
                    <TabsTrigger
                      value="discover"
                      className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Discover
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      History
                    </TabsTrigger>
                    <TabsTrigger
                      value="assets"
                      className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Assets
                    </TabsTrigger>
                  </TabsList>

                  <ScrollArea className="flex-1">
                    <TabsContent value="discover" className="mt-0 space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Card
                          key={i}
                          className="bg-card/50 border-border hover:border-primary/50 cursor-pointer transition-all group"
                        >
                          <CardContent className="p-3">
                            <div className="aspect-square bg-gradient-to-br from-lime-400/20 to-cyan-400/20 dark:from-primary/20 dark:to-accent/20 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                              <Sparkles className="w-8 h-8 text-lime-600 dark:text-primary/50" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-foreground font-medium">
                                  Discover {i}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  by creator
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Repeat className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="history" className="mt-0 space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <Card
                          key={i}
                          className="bg-card/50 border-border hover:border-accent/50 cursor-pointer transition-all group"
                        >
                          <CardContent className="p-3">
                            <div className="aspect-square bg-gradient-to-br from-cyan-400/20 to-lime-400/20 dark:from-accent/20 dark:to-primary/20 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                              <Sparkles className="w-8 h-8 text-cyan-600 dark:text-accent/50" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-foreground font-medium">
                                  Generation {i}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {i * 2} hours ago
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Repeat className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="assets" className="mt-0 space-y-3">
                      {[1, 2, 3].map((i) => (
                        <Card
                          key={i}
                          className="bg-card/50 border-border hover:border-primary/50 cursor-pointer transition-all group"
                        >
                          <CardContent className="p-3">
                            <div className="aspect-square bg-gradient-to-br from-lime-400/20 to-cyan-400/20 dark:from-primary/20 dark:to-accent/20 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                              <Wand2 className="w-8 h-8 text-lime-600 dark:text-primary/50" />
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">
                                Asset {i}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Saved
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Imagine;
