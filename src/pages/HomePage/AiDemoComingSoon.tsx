import { BellRing, Mail } from "lucide-react";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";

const AIDemoComingSoon = () => {
  return (
    <section className="w-full min-h-[60vh] flex items-center justify-center bg-transparent text-foreground px-6 py-16">
      <div className="text-center max-w-xl mx-auto relative">
        {/* Thumbs up emoji */}
        <div className="text-4xl mb-2">👍</div>

        {/* Sub headline */}
        <p className="text-para text-base font-medium mb-2 tracking-wide uppercase">
          We're Still
        </p>

        {/* Main headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-600 mb-4">
          Cooking Our Website.
        </h1>

        {/* Description */}
        <p className="text-para text-base sm:text-lg leading-relaxed">
          We are going to launch our website very soon. <br />
          Stay tune.
        </p>

        {/* Notify Button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="flex items-center gap-3 bg-grayBackground text-foreground py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition"
          >
            <MdOutlineMail className="text-xl" />
            <span className="text-sm font-semibold">Notify Me</span>
            <BsArrowRight className="text-lg" />
          </button>
        </div>

        {/* Optional: Decorative pasta shapes */}

        <div className="absolute top-0 md:-top-8 left-0 md:-left-24 rotate-12 w-12 h-12 bg-[#e8f9ee] border-t border-l border-r-4 border-b-4 border-green-400 rounded-xl flex justify-center items-center z-20">
          <Mail className="w-8 h-auto rotate-[20deg] text-green-400" />
        </div>

        {/* bottom right side */}
        <div className="absolute bottom-0 md:-bottom-8 right-0 md:-right-32 rotate-12 w-12 h-12 bg-[#e8f9ee] border-t border-l border-r-4 border-b-4 border-indigo-700 rounded-xl flex justify-center items-center z-20">
          <BellRing className="w-8 text-indigo-700 rotate-[-12deg]" />
        </div>
      </div>
    </section>
  );
};

export default AIDemoComingSoon;
