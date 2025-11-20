import { Facebook, Twitter } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background max-w-full py-10">
      <div className="bg-grayBackground px-6 py-10 rounded-[3rem] max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left */}
          <div className="space-y-6">
            {/* Logo for Light and Dark */}
            <div className="h-8">
              {/* <img src={DarkLogo} alt="dark-logo" className="h-full" /> */}
              <img
                src="/dark-nav-logo.png"
                alt="Ebonix"
                className="hidden dark:block h-full"
              />
              <img
                src="/light-nav-logo.png"
                alt="Ebonix Ai"
                className="block dark:hidden h-full"
              />
            </div>
            <address className="not-italic text-base text-para leading-relaxed">
              1680 Michigan Avenue Suite 700 <br />
              Miami Beach, FL 33139 USA
            </address>
          </div>

          {/* Middle */}
          <div className="flex gap-20">
            <div className="space-y-2">
              <h4 className="font-semibold text-base text-para">Product</h4>
              <ul className="space-y-4 text-para text-base font-bold">
                <li>
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-base text-para">
                Terms of services
              </h4>
              <ul className="space-y-4 text-para text-base font-bold">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Refund policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-base text-para">
          <p>
            © 2023 Copyright <span className="font-bold">Ebonix</span>
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 md:mr-20">
            <a href="#" aria-label="Facebook" className="hover:text-foreground">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
