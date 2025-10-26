import {
  IconCloudDownload,
  IconCopy,
  IconDeviceFloppy,
  IconFileDownload,
  IconHeadphones,
  IconMicrophone,
  IconPlayerPauseFilled,
  IconPlayerPlay,
  IconTrash,
  IconVolume,
  IconWand,
} from "@tabler/icons-react";
import React from "react";
import Avatar from "./Avater";
import VoiceWaveformIcon from "../../components/VoiceWaveForIcon";
import Waveform from "../../components/WaveForm";

const SpeechTextApp: React.FC = () => {
  return (
    <div className="max-h-fit bg-background max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 lg:px-8">
      {/* Speech to Text Section */}
      <div className="flex-1 bg-background p-6 md:p-12 border-[8px] border-grayBackground rounded-2xl shadow-lg">
        {/* title box */}
        <div className="mb-8">
          <span className="inline-block px-3 py-2 border border-foreground border-t-2 border-l-2 border-r-4 border-b-4 rounded-xl text-sm font-semibold">
            Speech to Text
          </span>
        </div>

        {/* main title */}
        <h2 className="text-foreground text-2xl font-bold mb-2 leading-10">
          Transforming Spoken <br /> Words into Text
        </h2>

        {/* description */}
        <p className="text-para mb-8">
          Instantly Transcribe Spoken Words into Text for Enhanced Productivity
          and Accessibility.
        </p>

        {/* button */}
        <button className="bg-foreground text-background px-5 py-2 rounded-md font-medium mb-6">
          Convert now →
        </button>

        {/* Audio Upload Section */}
        <div className="bg-speechTextBg p-4 rounded-xl flex justify-center items-center gap-4 mt-4 mb-16 transform rotate-[-5deg] border-t-2 border-r-2 border-l-4 border-b-4 border-para relative">
          {/* headphone */}
          <div className="p-1 bg-grayBackground rounded-full h-10 w-10 flex justify-center items-center">
            <IconHeadphones className="w-6 h-6 text-para" />
          </div>
          {/* text */}
          <div>
            <h4 className="text-base text-foreground font-bold mb-1">
              Speech to Text
            </h4>
            <p className="text-sm text-para">
              Unlocking the Power of Voice: Transforming Spoken Words into Text
            </p>
          </div>
          {/* microphone */}
          <div className="absolute -bottom-6 right-12 w-12 h-12 p-2 rounded-xl bg-[#F8F7FA] border-t-2 border-l-2 border-b-4 border-r-4 border-[#B9B0CF]">
            <IconMicrophone className="text-[#B9B0CF] w-full h-full" />
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-start gap-4 mb-4">
          {/* Upload and Generate */}
          <div>
            <div className="bg-[#b9b0cf63] p-4 rounded-xl text-center relative">
              <button className="text-foreground my-8 text-sm">
                +<br />
                Upload audio file
              </button>
              <div className="absolute right-0 -top-6 w-12 h-12 flex justify-center items-center border-t-2 border-l-2 border-b-4 border-r-4 rounded-xl border-green-400 bg-[#F0FDFA] transform -rotate-[10deg]">
                <IconWand className="text-green-400 w-6 h-6" />
              </div>
            </div>
            <button className="bg-grayBackground text-fore mt-6 px-5 py-2 rounded-md font-medium text-sm">
              Generate result
            </button>
          </div>

          <div className="relative flex-1 bg-background shadow-xl p-4 rounded-xl overflow-hidden">
            {/* shadow */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-background to-transparent pointer-events-none z-30" />
            {/* icons */}
            <div className="flex flex-wrap gap-2 mb-4 relative z-20">
              {[IconCopy, IconFileDownload, IconDeviceFloppy, IconTrash].map(
                (Icon, i) => (
                  <Icon
                    key={i}
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      i === 3 ? "text-[#FFB2B5]" : "text-para"
                    }`}
                  />
                )
              )}
            </div>
            <div className="text-foreground font-bold text-base mb-2 relative z-20">
              Welcome message
            </div>
            <p className="text-gray-300 text-base relative z-20">
              Welcome to a world of limitless possibilities and boundless
              knowledge! Whether you're seeking information, assistance, or
              inspiration, we're here to help.
            </p>
          </div>
        </div>

        {/* waveform */}
        <div className="bg-background rounded-xl p-4 max-w-fit ml-auto mt-auto flex justify-center shadow-xl">
          <VoiceWaveformIcon />
        </div>
      </div>

      {/* Text to Voice Section */}
      <div className="flex-1 bg-background p-6 md:p-12 border-[8px] border-grayBackground rounded-2xl shadow-lg">
        <div className="mb-8">
          <span className="inline-block px-3 py-2 border border-foreground border-t-2 border-l-2 border-r-4 border-b-4 rounded-xl text-sm font-semibold">
            Text to Voice
          </span>
        </div>

        <h2 className="text-foreground text-2xl font-bold mb-2 leading-10">
          Transforming Spoken <br /> Words into Text
        </h2>

        <p className="text-para mb-8">
          Instantly Transcribe Spoken Words into Text for Enhanced Productivity
          and Accessibility.
        </p>

        <button className="bg-background text-para text-xs mb-6" disabled>
          Coming Soon...
        </button>

        <div className="flex flex-col md:flex-row justify-between gap-8 mt-24">
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

          {/* Voice Feature Area */}
          <div className="relative w-full mx-auto">
            <div className="transform rotate-[-5deg]">
              <div className="text-para p-4 border-t-2 border-l-4 border-b-4 border-r-2 border-para rounded-xl md:mt-0 md:w-[330px] mb-60 mt-0">
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

            <div className="absolute bottom-0 left-1 flex p-2 justify-start items-center bg-webBg h-10 w-80 rounded-full">
              <div className="w-8 h-8 rounded-full p-1 bg-grayBackground flex justify-center items-center">
                <IconPlayerPauseFilled className="text-para w-5 h-5" />
              </div>
              <div className="relative">
                <Waveform />

                <div className="absolute right-10 -top-4 w-12 h-12 rounded-xl flex justify-center items-center bg-[#FFF9F4] border-t-2 border-l-4 border-b-4 border-r-2 border-[#FFC091] transform rotate-[-30deg]">
                  <IconCloudDownload className="text-[#FFC091] w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="absolute right-4 bottom-24 md:right-12 md:bottom-24">
              <div className="relative">
                <div className="absolute top-16 -left-32 border-t-2 border-r-2 border-b-4 border-l-4 border-[#6184EB] bg-[#EFF3FD] w-12 h-12 rounded-xl flex justify-center items-center transform rotate-[-30deg]">
                  <IconPlayerPlay className="text-[#6184EB] w-6 h-6" />
                </div>
                <Avatar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechTextApp;
