import {
  IconCloudDownload,
  IconCopy,
  IconDeviceFloppy,
  IconPlayerPlay,
  IconTrash,
  IconVolume,
} from "@tabler/icons-react";

const AiCode = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 lg:flex-row justify-between items-center bg-background p-6 md:p-12 border-[8px] border-grayBackground rounded-2xl shadow-lg">
      <div>
        <div className="mb-8">
          <span className="inline-block px-3 py-2 border border-foreground border-t-2 border-l-2 border-r-4 border-b-4 rounded-xl text-sm font-semibold">
            Ai Code
          </span>
        </div>

        <h2 className="text-foreground text-2xl lg:text-4xl font-bold mb-4 leading-tight">
          Ready to write code at the <br /> speed of light?
        </h2>

        <p className="text-foreground py-4 text-lg">
          Effortless coding with AI Code Generator: <br /> Instant solutions for
          your programming needs.
        </p>

        <button className="my-6 bg-foreground text-background text-base px-4 py-2 rounded-xl">
          Start Generate Code {"->"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Mobile mockup */}
        <div className="w-full max-w-[220px] h-[500px] sm:h-[520px] bg-mockupBg rounded-xl p-6 relative mx-auto">
          <div>
            <p className="text-para text-base font-bold mb-4">Your Message</p>
            <div className="space-y-2">
              <div className="h-2 w-36 bg-white/5 rounded-xl" />
              <div className="h-2 w-28 bg-white/5 rounded-xl" />
              <div className="h-2 w-32 bg-white/5 rounded-xl" />
              <div className="h-2 w-20 bg-white/5 rounded-xl" />
            </div>
          </div>
          <button className="absolute bottom-6 left-4 right-4 bg-grayBackground text-para px-5 py-2 rounded-md font-medium">
            Generate result
          </button>
        </div>

        <div>
          {/* code mockup */}
          <div className="p-4 bg-mockupBg border-2 border-para rounded-xl relative">
            {/* html card */}
            <div className="absolute bg-[#FFECEC] right-4 -top-4 w-20 h-14 border-t-2 border-l-2 border-r-4 border-b-4 border-[#FE5157] flex justify-center items-center rounded-xl transform rotate-[5deg]">
              <span className="text-[#FE5157] text-base">HTML</span>
            </div>
            {/* copy trash div */}
            <div className="flex justify-start items-center gap-3 text-para mb-2">
              <IconCopy className="w-5 h-5" />
              <IconDeviceFloppy className="w-5 h-5" />
              <IconTrash className="text-[#FFB2B5] w-5 h-5" />
            </div>

            {/* code block div */}
            <div>
              <ol>
                <li>
                  <span className="text-para">{"<!DOCTYPE "}</span>
                  <span className="text-sky-600">html</span>
                  {">"}
                </li>

                <li className="text-gray-400">
                  {"<html "} <span className="text-red-500">lang</span>{" "}
                  <span className="text-para">{"="}</span>{" "}
                  <span className="text-green-500">
                    {`"en"`}
                    <span>{">"}</span>
                  </span>
                </li>
                <li>
                  <span className="text-gray-400">{"<head>"}</span>
                </li>
                <li>
                  <span className="text-gray-400 pl-4">
                    {"<meta "}
                    <span className="text-red-500">charset</span>
                    {"="}
                    <span className="text-green-500">{`"UTF-8"`}</span>
                    {">"}
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 pl-4">
                    {"<meta "}
                    <span className="text-red-500">name</span>
                    {"="}
                    <span className="text-green-500">{`"viewport"`}</span>
                    {">"}
                  </span>
                </li>
                <li>
                  <span className="text-red-500">content</span>
                  <span className="text-gray-400">{"="}</span>
                  <span className="text-green-500">{`"width=device-width, initial-"`}</span>
                </li>
                <li>
                  <span className="text-green-500">scale=1.0"</span>
                </li>
                <li className="text-gray-400 ml-4">
                  {"<title>Your Landing Page</title>"}
                </li>
                <li className="text-gray-400">{"</head>"}</li>
                <li className="text-gray-400">{"</body>"}</li>
              </ol>
            </div>
          </div>

          {/* Voice Feature Area */}
          <div className="relative w-full mx-auto">
            <div className="transform rotate-[-5deg] bg-mockupBg">
              <div className="text-para p-4 border-t-2 border-l-4 border-b-4 border-r-2 border-para rounded-xl md:mt-0 md:w-[330px] mt-0">
                <div className="w-12 h-12 bg-grayBackground rounded-full p-1 flex justify-center items-center">
                  <IconVolume className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold my-2">Our Text to Voice</h3>
                <p>
                  Turn Text into Real Voices of Culture: Ebonix AI Text-to-Voice
                  Like Never Before.
                </p>
              </div>
            </div>

            <div className="absolute right-10 -top-4 w-12 h-12 rounded-xl flex justify-center items-center bg-[#FFF9F4] border-t-2 border-l-4 border-b-4 border-r-2 border-[#FFC091] transform rotate-[-30deg]">
              <IconCloudDownload className="text-[#FFC091] w-6 h-6" />
            </div>

            <div className="absolute right-4 bottom-24 md:right-12 md:bottom-24">
              <div className="relative">
                <div className="absolute top-16 -left-32 border-t-2 border-r-2 border-b-4 border-l-4 border-[#6184EB] bg-[#EFF3FD] w-12 h-12 rounded-xl flex justify-center items-center transform rotate-[-30deg]">
                  <IconPlayerPlay className="text-[#6184EB] w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiCode;
