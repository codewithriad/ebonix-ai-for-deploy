import {
  Facebook,
  FileEdit,
  Instagram,
  Linkedin,
  Music2,
  PackageSearch,
  Twitter,
  Youtube,
} from "lucide-react";
const Template = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center  bg-gradient-to-bl from-[#3F4246] to-[#16191B] rounded-[40px] px-4 sm:px-6 md:px-10 py-8 w-full max-w-[100vw] lg:max-w-7xl mx-auto shadow-lg border-[8px] border-grayBackground overflow-hidden">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 text-white space-y-6">
        <span className="inline-block bg-[#3A3A3C] text-sm font-semibold text-white px-4 py-1 rounded-md border-t-2 border-l-2 border-b-4 border-r-4 border-white">
          100+ AI Writer Templates
        </span>
        <h1 className="text-2xl md:text-3xl font-bold py-2">
          What can Ebonix Ai write for you?
        </h1>
        <p className="text-white text-base md:text-lg pb-2">
          Write with remarkable speed, captivate your audience, and bid farewell
          to writer's block forever.
        </p>
        <button className="bg-lime-300 text-black font-semibold px-6 py-3 rounded-md hover:bg-lime-400 transition">
          Get Started for Free
        </button>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4 transform lg:rotate-[5deg]">
        {[
          [
            "Article Rewriter",
            "bg-pink-500",
            <FileEdit size={18} className="text-white" />,
          ],
          [
            "Product Descriptions",
            "bg-rose-500",
            <PackageSearch size={18} className="text-white" />,
          ],
          [
            "Social Media Post",
            "bg-blue-800",
            <Facebook size={18} className="text-white" />,
          ],
          [
            "Youtube Titles",
            "bg-red-600",
            <Youtube size={18} className="text-white" />,
          ],
          [
            "Twitter Tweets",
            "bg-sky-500",
            <Twitter size={18} className="text-white" />,
          ],
          [
            "LinkedIn Posts",
            "bg-cyan-700",
            <Linkedin size={18} className="text-white" />,
          ],
          [
            "TikTok Video Scripts",
            "bg-pink-600",
            <Music2 size={18} className="text-white" />,
          ],
          [
            "Article Rewriter",
            "bg-pink-500",
            <FileEdit size={18} className="text-white" />,
          ],
          [
            "Youtube Titles",
            "bg-red-600",
            <Youtube size={18} className="text-white" />,
          ],
          [
            "Instagram Captions",
            "bg-blue-600",
            <Instagram size={18} className="text-white" />,
          ],
          [
            "Product Descriptions",
            "bg-rose-500",
            <PackageSearch size={18} className="text-white" />,
          ],
          [
            "Twitter Tweets",
            "bg-sky-500",
            <Twitter size={18} className="text-white" />,
          ],
        ].map(([label, bg, Icon], idx) => (
          <div
            key={idx}
            className="flex items-center space-x-3 bg-transparent w-fit lg:w-full px-4 py-3 rounded-2xl border"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${bg}`}
            >
              {Icon}
            </div>
            <span className="text-white text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Template;
