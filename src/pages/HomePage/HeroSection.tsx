import ComingSoonModal from "@/components/Shared/ComingSoonModal";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="bg-background">
      {/* hero typography */}
      <div className="w-full mx-auto flex justify-center items-center flex-col max-w-[1400px]">
        <h1
          className="
    text-[56px] 
    font-[900] 
    lg:leading-[5rem] 
    text-center 
    bg-gradient-to-r 
    from-[#D3F36B] 
    to-[#6BAAF3] 
    bg-clip-text 
    text-transparent
  "
          style={{ fontFamily: "Inter" }}
        >
          Ai that Gets us!
        </h1>

        <p className="text-para font-inter text-[20px] leading-[32px] font-normal text-center mt-4 md:mx-28 max-w-7xl">
          Generate high-quality videos, pictures, and content concepts and ideas
          from BLACK human experiences.
        </p>
        <h3 className="text-para font-inter text-2xl leading-[32px] font-bold text-center mt-4 md:mx-28">
          No dry, generic AI. No forced code-switching.
        </h3>
        <>
          <button
            type="button"
            // onClick={() => setIsOpen(true)}
            className="text-background flex justify-center items-center gap-6 bg-foreground px-4 py-[10px] rounded-lg mt-10"
          >
            <Link to={"/app"}>
              <span className="text-base leading-6 text-center font-medium">
                Get Ebonix Ai
              </span>
            </Link>
            <BsArrowRight className="w-6 h-auto" />
          </button>

          {/* Modal goes outside the button */}
          <ComingSoonModal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
        </>
      </div>
    </section>
  );
};

export default HeroSection;
