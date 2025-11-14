import ComingSoonModal from "@/components/Shared/ComingSoonModal";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="bg-background">
      {/* hero typography */}
      <div className="w-full mx-auto flex justify-center items-center flex-col max-w-[960px]">
        <h1
          className="text-foreground text-[56px] font-[900] lg:leading-[5rem] text-center"
          style={{ fontFamily: "Inter" }}
        >
          Transforming ideas into AI generated masterpieces
        </h1>
        <p className="text-xl leading-8 text-center text-para mt-4 md:mx-28">
          Effortlessly generate high-quality AI-driven content tailored to your
          needs. Unlock limitless possibilities, save your time and start making
          money today!
        </p>
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
