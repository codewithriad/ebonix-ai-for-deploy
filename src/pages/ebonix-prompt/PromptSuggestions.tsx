import { Lightbulb, Code, PenTool, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

const suggestions = [
  {
    icon: Lightbulb,
    title: "Creative Ideas",
    prompt: "Help me brainstorm creative ideas for my next project",
    color: "text-yellow-500"
  },
  {
    icon: Code,
    title: "Code Review",
    prompt: "Review my code and suggest improvements",
    color: "text-blue-500"
  },
  {
    icon: PenTool,
    title: "Writing Help",
    prompt: "Help me write compelling content for my audience",
    color: "text-green-500"
  },
  {
    icon: Search,
    title: "Research",
    prompt: "Research the latest trends in AI and technology",
    color: "text-purple-500"
  }
];

export function PromptSuggestions({ onSelectPrompt }: PromptSuggestionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {suggestions.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <Card
            key={index}
            className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-border/50 hover:border-primary/20 bg-gradient-to-br from-background to-muted/30"
            onClick={() => onSelectPrompt(suggestion.prompt)}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-muted/50 ${suggestion.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-1">{suggestion.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {suggestion.prompt}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}