import {
  IconCircleCheckFilled,
  IconDiamond,
  IconSparkles,
  IconStar,
} from "@tabler/icons-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$9",
      description: "Perfect for creators starting out",
      features: [
        "Access to Standard Templates",
        "10,000 Word limit",
        "5,000 Image limit",
        "ChatGPT 3.5",
        "Basic Support",
        "10,000 Word Tokens",
        "5,000 Image Tokens",
      ],
      button: "Get started",
      highlighted: false,
      icon: <IconSparkles className="w-6 h-6 text-foreground" />,
    },
    {
      name: "Pro",
      price: "$19",
      description: "For professional creators",
      features: [
        "Access to All Templates",
        "30,000 Word limit",
        "10,000 Image limit",
        "ChatGPT 4",
        "Support Priority",
        "30,000 Word Tokens",
        "10,000 Image Tokens",
      ],
      button: "Get started",
      highlighted: false,
      icon: <IconStar className="w-6 h-6 text-foreground" />,
    },
    {
      name: "Pro Plus",
      price: "$29",
      description: "For content studios and agencies.",
      features: [
        "Access to All Templates",
        "Unlimited Word limit",
        "Unlimited Image limit",
        "ChatGPT 4",
        "Support Priority",
        "Unlimited Word Tokens",
        "Unlimited Image Tokens",
      ],
      button: "Get started",
      highlighted: true, // 🌈 Highlight last plan
      icon: <IconDiamond className="w-6 h-6 text-foreground" />,
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
            className={`relative p-[10px] rounded-3xl transition-all 
              ${
                plan.highlighted
                  ? "bg-gradient-to-r from-[#D3F36B] to-[#6BAAF3]"
                  : "bg-grayBackground hover:bg-gradient-to-r from-[#D3F36B] to-[#6BAAF3] transition-all duration-300"
              }`}
          >
            <div className="bg-background rounded-3xl p-6 h-full">
              {/* Badge */}
              {plan.highlighted && (
                <div className="absolute top-4 right-4">
                  <button className="text-[#24282C] px-3 py-1 text-sm font-bold bg-gradient-to-r from-[#E7FF9B] to-[#CFE6FF] rounded-xl mt-4 mr-2">
                    Most Popular
                  </button>
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-full border shadow-xl p-2 my-4 flex items-center justify-center">
                {plan.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="text-para text-base">{plan.description}</p>

              {/* Price */}
              <div className="mt-4 flex items-center gap-2">
                <p className="text-4xl font-bold text-foreground">
                  {plan.price}
                </p>
                <span className="text-muted-foreground text-base">/month</span>
              </div>

              {/* Button */}
              <button
                className={`mt-6 w-full rounded-lg px-4 py-2 text-sm font-medium transition 
                  ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#D3F36B] to-[#6BAAF3] text-black hover:opacity-90"
                      : "border border-white hover:bg-white hover:text-black"
                  }`}
              >
                {plan.button}
              </button>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-sm text-left">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-green-500">
                      <IconCircleCheckFilled className="w-4 h-4" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
