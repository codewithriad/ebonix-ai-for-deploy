import {
  Activity,
  Box,
  Circle,
  Cloud,
  Code,
  Cpu,
  CreditCard,
  Database,
  FileText,
  Globe,
  Grid3x3,
  HardDrive,
  Key,
  Layers,
  Mail,
  Paintbrush,
  Plus,
  Search,
  Server,
  Shield,
  Smartphone,
  Tag,
  TrendingUp,
  Triangle,
  User,
  Users,
  Zap,
} from "lucide-react";
import React from "react";
import Sidebar from "../Sidebar";

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  onClick: (path: string) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  description,
  path,
  onClick,
}) => (
  <div
    onClick={() => onClick(path)}
    className="bg-background rounded-lg p-3 sm:p-4 hover:bg-gray-750 transition-colors cursor-pointer group"
  >
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="text-para group-hover:text-gray-300 mt-0.5 flex-shrink-0 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium text-sm mb-0.5 truncate group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-para text-xs line-clamp-2">{description}</p>
      </div>
    </div>
  </div>
);

interface SettingPageProps {
  title: string;
  icon: React.ReactNode;
  onBack: () => void;
}

const SettingPage: React.FC<SettingPageProps> = ({ title, icon, onBack }) => (
  <div className="min-h-screen bg-background text-foreground overflow-y-auto">
    <div className="lg:ml-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8">
        <button
          onClick={onBack}
          className="mb-4 text-para hover:text-foreground transition-colors flex items-center gap-2"
        >
          <span>←</span> Back to Settings
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="text-blue-400">{icon}</div>
          <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        </div>

        <div className="bg-background rounded-lg p-6">
          <p className="text-para">
            This is the {title} settings page. Configure your settings here.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Settings: React.FC = () => {
  const [currentPath, setCurrentPath] = React.useState<string>(
    "/dashboard/settings"
  );

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    // In a real app, you would use React Router or similar
    // window.history.pushState({}, '', path);
  };

  const handleBack = () => {
    setCurrentPath("/dashboard/settings");
  };

  const iconSize = 18;
  const iconClass = "sm:w-5 sm:h-5";

  // Settings configuration
  const settingsConfig = [
    {
      section: "Common",
      items: [
        {
          icon: <Globe size={iconSize} className={iconClass} />,
          title: "General",
          description: "Webhooks and SEO",
          path: "/dashboard/settings/general",
        },
        {
          icon: <Shield size={iconSize} className={iconClass} />,
          title: "Public details",
          description: "Addresses, Certificates etc.",
          path: "/dashboard/settings/public-details",
        },
        {
          icon: <FileText size={iconSize} className={iconClass} />,
          title: "Policies",
          description: "Legal terms etc.",
          path: "/dashboard/settings/policies",
        },
        {
          icon: <Smartphone size={iconSize} className={iconClass} />,
          title: "PWA",
          description: "Progressive Web App settings",
          path: "/dashboard/settings/pwa",
        },
        {
          icon: <Grid3x3 size={iconSize} className={iconClass} />,
          title: "Features",
          description: "Configure features",
          path: "/dashboard/settings/features",
        },
        {
          icon: <Box size={iconSize} className={iconClass} />,
          title: "Models",
          description: "Configure AI models",
          path: "/dashboard/settings/models",
        },
      ],
    },
    {
      section: "Branding",
      items: [
        {
          icon: <Circle size={iconSize} className={iconClass} />,
          title: "Logo",
          description: "Logo and favicon",
          path: "/dashboard/settings/logo",
        },
        {
          icon: <Paintbrush size={iconSize} className={iconClass} />,
          title: "Appearance",
          description: "Color schemes etc.",
          path: "/dashboard/settings/appearance",
        },
      ],
    },
    {
      section: "Finance",
      items: [
        {
          icon: <FileText size={iconSize} className={iconClass} />,
          title: "Billing",
          description: "Currency and subscriptions",
          path: "/dashboard/settings/billing",
        },
        {
          icon: <CreditCard size={iconSize} className={iconClass} />,
          title: "Payments",
          description: "Payment gateway integrations",
          path: "/dashboard/settings/payments",
        },
        {
          icon: <TrendingUp size={iconSize} className={iconClass} />,
          title: "Credit ratios",
          description: "Credit usage rates",
          path: "/dashboard/settings/credit-ratios",
        },
        {
          icon: <TrendingUp size={iconSize} className={iconClass} />,
          title: "Exchange",
          description: "Currency exchange rate providers",
          path: "/dashboard/settings/exchange",
        },
        {
          icon: <Users size={iconSize} className={iconClass} />,
          title: "Affiliates",
          description: "Affiliate program settings",
          path: "/dashboard/settings/affiliates",
        },
      ],
    },
    {
      section: "Email",
      items: [
        {
          icon: <Mail size={iconSize} className={iconClass} />,
          title: "Mail",
          description: "Transport and sender details",
          path: "/dashboard/settings/mail",
        },
        {
          icon: <Server size={iconSize} className={iconClass} />,
          title: "SMTP",
          description: "SMTP transport details",
          path: "/dashboard/settings/smtp",
        },
      ],
    },
    {
      section: "User accounts",
      items: [
        {
          icon: <User size={iconSize} className={iconClass} />,
          title: "Account settings",
          description: "Accounts per sign up form",
          path: "/dashboard/settings/account-settings",
        },
        {
          icon: <Key size={iconSize} className={iconClass} />,
          title: "Identity providers",
          description: "3rd party identity providers",
          path: "/dashboard/settings/identity-providers",
        },
        {
          icon: <Shield size={iconSize} className={iconClass} />,
          title: "CAPTCHA",
          description: "Google reCAPTCHA",
          path: "/dashboard/settings/captcha",
        },
      ],
    },
    {
      section: "File storage",
      items: [
        {
          icon: <HardDrive size={iconSize} className={iconClass} />,
          title: "Storage settings",
          description: "File storage settings",
          path: "/dashboard/settings/storage-settings",
        },
        {
          icon: <Cloud size={iconSize} className={iconClass} />,
          title: "Cloud storage",
          description: "Integrated cloud storage options",
          path: "/dashboard/settings/cloud-storage",
        },
      ],
    },
    {
      section: "Integrations",
      items: [
        {
          icon: <Cpu size={iconSize} className={iconClass} />,
          title: "OpenAI",
          description: "API keys and service config",
          path: "/dashboard/settings/openai",
        },
        {
          icon: <Layers size={iconSize} className={iconClass} />,
          title: "Cohere",
          description: "API keys and service config",
          path: "/dashboard/settings/cohere",
        },
        {
          icon: <Triangle size={iconSize} className={iconClass} />,
          title: "Anthropic / Claude AI",
          description: "API keys and service config",
          path: "/dashboard/settings/anthropic-claude-ai",
        },
        {
          icon: <Activity size={iconSize} className={iconClass} />,
          title: "xAI / Grok",
          description: "API keys and service config",
          path: "/dashboard/settings/xai-grok",
        },
        {
          icon: <Database size={iconSize} className={iconClass} />,
          title: "ElevenLabs",
          description: "API keys and service config",
          path: "/dashboard/settings/elevenlabs",
        },
        {
          icon: <Zap size={iconSize} className={iconClass} />,
          title: "Speechify",
          description: "API keys and service config",
          path: "/dashboard/settings/speechify",
        },
        {
          icon: <Cloud size={iconSize} className={iconClass} />,
          title: "Google Cloud Platform",
          description: "Google credentials for TTS etc.",
          path: "/dashboard/settings/google-cloud-platform",
        },
        {
          icon: <Triangle size={iconSize} className={iconClass} />,
          title: "Azure",
          description: "Credentials for Azure TTS etc.",
          path: "/dashboard/settings/azure",
        },
        {
          icon: <Box size={iconSize} className={iconClass} />,
          title: "Fal AI",
          description: "API keys and service config",
          path: "/dashboard/settings/fal-ai",
        },
        {
          icon: <Circle size={iconSize} className={iconClass} />,
          title: "Luma AI",
          description: "API keys and service config",
          path: "/dashboard/settings/luma-ai",
        },
        {
          icon: <Activity size={iconSize} className={iconClass} />,
          title: "Stability AI",
          description: "API keys and service config",
          path: "/dashboard/settings/stability-ai",
        },
        {
          icon: <Layers size={iconSize} className={iconClass} />,
          title: "Clipdrop",
          description: "API keys and service config",
          path: "/dashboard/settings/clipdrop",
        },
        {
          icon: <Mail size={iconSize} className={iconClass} />,
          title: "OneSignal",
          description: "Push notifications",
          path: "/dashboard/settings/onesignal",
        },
        {
          icon: <Search size={iconSize} className={iconClass} />,
          title: "Serper",
          description: "Google search API",
          path: "/dashboard/settings/serper",
        },
        {
          icon: <Code size={iconSize} className={iconClass} />,
          title: "Search API",
          description: "Google search & YouTube API",
          path: "/dashboard/settings/search-api",
        },
        {
          icon: <Tag size={iconSize} className={iconClass} />,
          title: "Script Tags",
          description: "Custom tags, Google Analytics etc.",
          path: "/dashboard/settings/script-tags",
        },
      ],
    },
    {
      section: "Custom LLM Servers",
      items: [
        {
          icon: <Server size={iconSize} className={iconClass} />,
          title: "Ollama",
          description: "Local LLM server for various models",
          path: "/dashboard/settings/ollama",
        },
        {
          icon: <Database size={iconSize} className={iconClass} />,
          title: "Groq",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/groq",
        },
        {
          icon: <Cpu size={iconSize} className={iconClass} />,
          title: "Together AI",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/together-ai",
        },
        {
          icon: <Activity size={iconSize} className={iconClass} />,
          title: "Open Router",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/open-router",
        },
        {
          icon: <Cloud size={iconSize} className={iconClass} />,
          title: "Google AI",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/google-ai",
        },
        {
          icon: <Box size={iconSize} className={iconClass} />,
          title: "Hugging Face",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/hugging-face",
        },
        {
          icon: <Layers size={iconSize} className={iconClass} />,
          title: "DeepSeek",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/deepseek",
        },
        {
          icon: <Triangle size={iconSize} className={iconClass} />,
          title: "AIML API",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/aiml-api",
        },
        {
          icon: <Database size={iconSize} className={iconClass} />,
          title: "Nebius",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/nebius",
        },
        {
          icon: <Activity size={iconSize} className={iconClass} />,
          title: "Perplexity",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/perplexity",
        },
        {
          icon: <Code size={iconSize} className={iconClass} />,
          title: "vQ",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/vq",
        },
        {
          icon: <Plus size={iconSize} className={iconClass} />,
          title: "New server",
          description: "Custom OpenAI-compatible LLM server",
          path: "/dashboard/settings/new-server",
        },
      ],
    },
  ];

  // Find current page
  const currentPage = settingsConfig
    .flatMap((section) => section.items)
    .find((item) => item.path === currentPath);

  // If on a specific settings page, show that page
  if (currentPage) {
    return (
      <SettingPage
        title={currentPage.title}
        icon={currentPage.icon}
        onBack={handleBack}
      />
    );
  }

  // Otherwise show the main settings list
  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto">
      <div className="hidden lg:block fixed left-0 top-0 w-16 h-full bg-background">
        <Sidebar />
      </div>

      <div className="lg:ml-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
            Settings
          </h1>

          {settingsConfig.map((section, idx) => (
            <section key={idx} className="mb-6 sm:mb-8">
              <h2 className="text-xs sm:text-sm font-semibold text-para mb-3 uppercase tracking-wider">
                {section.section}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {section.items.map((item, itemIdx) => (
                  <SettingItem
                    key={itemIdx}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    path={item.path}
                    onClick={handleNavigate}
                  />
                ))}
              </div>
            </section>
          ))}

          <footer className="text-center text-gray-500 text-xs py-4 sm:py-6 border-t border-backbg-background">
            All rights reserved. © 2025 Anseela | Version 3.8.1
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Settings;
