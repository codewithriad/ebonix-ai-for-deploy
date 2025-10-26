import { Gem, Sun, Zap } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$9",
      description: "Perfect for individual developers.",
      features: [
        "Access to Starter Components",
        "1 Project",
        "Email Support",
        "Basic Analytics",
      ],
      button: "Get started",
      highlighted: false,
      icon: <Zap className="w-6 h-6 text-foreground" />,
    },
    {
      name: "Pro",
      price: "$19",
      description: "Great for small teams and client work.",
      features: [
        "Access to All Components",
        "10 Projects",
        "Priority Email Support",
        "Full Analytics",
        "Team Collaboration",
      ],
      button: "Get started",
      highlighted: false,
      icon: <Sun className="w-6 h-6 text-foreground" />,
    },
    {
      name: "Pro Plus",
      price: "$29",
      description: "Best for agencies and startups.",
      features: [
        "Unlimited Projects",
        "Custom Component Requests",
        "1:1 Support",
        "Advanced Analytics",
        "Premium API Access",
      ],
      button: "Upgrade now",
      highlighted: true,
      icon: <Gem className="w-6 h-6 text-foreground" />,
    },
  ];

  return (
    <section className="py-20 px-6 bg-background text-foreground" id="pricing">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold">Pricing</h2>
        <p className="mt-2 text-muted-foreground md:max-w-[45%] mx-auto">
          Discover the perfect plan to suit your needs and unlock a world of
          possibilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`transition-all p-4 rounded-3xl outline-[.5rem] outline-grayBackground ${
              plan.highlighted
                ? "transition-all p-4 rounded-3xl outline outline-gradientColor"
                : "outline"
            }`}
          >
            {/* Icon + text */}
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 rounded-full border shadow-xl p-2 my-4 flex items-center justify-center">
                {plan.icon}
              </div>
              <div>
                {plan.highlighted && (
                  <button className="text-[#24282C] p-2 text-base font-bold bg-gradient-to-r from-[#E7FF9B] to-[#CFE6FF] rounded-xl">
                    Most Popular
                  </button>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground mb-2">
              {plan.name}
            </h3>

            {/* Description */}
            <p className="text-para text-base">{plan.description}</p>

            {/* Price */}
            <div className="mt-4 flex items-center gap-2">
              <p className="text-4xl font-bold text-foreground">{plan.price}</p>
              <span className="text-muted-foreground text-base">/month</span>
            </div>

            {/* Button */}
            <button
              className={`mt-6 w-full rounded-lg px-4 py-2 text-sm font-medium transition ${
                plan.highlighted
                  ? "bg-white text-black hover:bg-gray-100"
                  : "border border-white hover:bg-white hover:text-black"
              }`}
            >
              {plan.button}
            </button>

            {/* Features */}
            <ul className="mt-6 space-y-3 text-sm text-left">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
