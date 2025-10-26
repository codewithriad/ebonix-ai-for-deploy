import {
  Code,
  Cpu,
  CreditCard,
  Database,
  Facebook,
  FileText,
  Headphones,
  LayoutGrid,
  Moon,
  MousePointerClick,
  Sparkles,
} from "lucide-react";

type FeatureCard = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function CoolestFeatures() {
  const features: FeatureCard[] = [
    {
      icon: <Code className="w-6 h-auto text-foreground" />,
      title: "High Quality Code",
      description:
        "Developed using Domain-Driven Design and Clean Architecture Principles.",
    },
    {
      icon: <Sparkles className="w-6 h-auto text-foreground" />,
      title: "Modern Technologies",
      description:
        "Built with modern technologies for fast execution and maximum performance.",
    },
    {
      icon: <MousePointerClick className="w-6 h-auto text-foreground" />,
      title: "Friendly UI and UX",
      description:
        "Enjoy a modern interface that enhances your digital experience.",
    },
    {
      icon: <Moon className="w-6 h-auto text-foreground" />,
      title: "Dark Mode",
      description:
        "Turn off the lights and switch to dark mode your interface with one click.",
    },
    {
      icon: <FileText className="w-6 h-auto text-foreground" />,
      title: "Documentation",
      description:
        "Complete documentation with package downloads integrated into our community.",
    },
    {
      icon: <CreditCard className="w-6 h-auto text-foreground" />,
      title: "Payment Gateways",
      description:
        "Simplify transactions and boost returns with payment gateway solutions.",
    },
    {
      icon: <Cpu className="w-6 h-auto text-foreground" />,
      title: "AI Generator",
      description: "Unlock creative potential with our AI content generator.",
    },
    {
      icon: <Database className="w-6 h-auto text-foreground" />,
      title: "SEO Friendly",
      description:
        "Increase your visibility and reach your audience effectively.",
    },
    {
      icon: <LayoutGrid className="w-6 h-auto text-foreground" />,
      title: "Advanced Dashboard",
      description: "Monitor your insights with our cutting-edge dashboard.",
    },
    {
      icon: <LayoutGrid className="w-6 h-auto text-foreground" />,
      title: "Custom Templates",
      description:
        "Transform your content creation with customizable templates.",
    },
    {
      icon: <Facebook className="w-6 h-auto text-foreground" />,
      title: "Login via Social Media",
      description: "Use Facebook or Google accounts for easy login.",
    },
    {
      icon: <Headphones className="w-6 h-auto text-foreground" />,
      title: "Ticket Management",
      description:
        "View and manage your tickets and requests from the user dashboard.",
    },
  ];

  return (
    <div
      className={`min-h-screen mt-8 py-12 px-4 transition-colors duration-300
         bg-background text-foreground`}
    >
      <div className="container-custom relative z-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Coolest Features
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 shadow-lg transition-all hover:scale-105 bg-background text-pretty max-w-[22rem] mx-auto max-h-[18rem] rounded-[2.5rem] border-[.5rem] border-grayBackground`}
            >
              <p className="flex items-center justify-center w-12 h-12 border-2 border-foreground rounded-xl mb-8">
                {feature.icon}
              </p>
              <h2 className="text-xl font-bold mb-3">{feature.title}</h2>
              <p className="text-para text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
