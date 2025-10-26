import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  DollarSign,
  Heart,
  Lightbulb,
  PenTool,
  Plane,
  Settings,
} from "lucide-react";
import React from "react";

interface ProjectModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const categories = [
  {
    id: "investing",
    label: "Investing",
    icon: DollarSign,
    color: "text-emerald-500",
  },
  { id: "homework", label: "Homework", icon: BookOpen, color: "text-blue-500" },
  { id: "writing", label: "Writing", icon: PenTool, color: "text-purple-500" },
  { id: "health", label: "Health", icon: Heart, color: "text-red-500" },
  { id: "travel", label: "Travel", icon: Plane, color: "text-amber-500" },
];

export function ProjectModal({ open, setOpen }: ProjectModalProps) {
  const [projectName, setProjectName] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleCreate = () => {
    if (!projectName.trim()) return;
    console.log(
      "✅ New Project Created:",
      projectName,
      "Category:",
      selectedCategory
    );
    setProjectName("");
    setSelectedCategory("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-zinc-900 border-zinc-800 text-white p-0 gap-0 rounded-xl">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-zinc-800 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-medium text-white">
            Project name
          </DialogTitle>
          <div className="mr-2">
            <button
              onClick={() => setOpen(false)}
              className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
            ></button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Project Name Input */}
          <div className="relative">
            <Settings className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <Input
              placeholder="Copenhagen Trip"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 h-12 rounded-lg"
            />
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                    isSelected
                      ? "bg-zinc-800 border-zinc-600"
                      : "bg-transparent border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${category.color}`} />
                  <span className="text-sm text-zinc-200">
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Info Box */}
          <div className="flex gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-800">
            <Lightbulb className="h-5 w-5 text-zinc-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-400 leading-relaxed">
              Projects keep chats, files, and custom instructions in one place.
              Use them for ongoing work, or just to keep things tidy.
            </p>
          </div>

          {/* Create Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleCreate}
              disabled={!projectName.trim()}
              className="bg-zinc-200 text-zinc-900 hover:bg-white font-medium px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
