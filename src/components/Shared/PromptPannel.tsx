import React, { useState } from "react";
import {
  BookmarkIcon,
  RectangleStackIcon,
  LanguageIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import ComingSoonModal from "./ComingSoonModal";
import { Link } from "react-router-dom";

const PromptCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filters = ["All", "Text", "Image", "Video", "Music", "Analytics"];

  return (
    <div className="w-full min-h-[60vh] bg-transparent text-foreground flex items-center justify-center p-4">
      <div className="bg-grayBackground p-6 rounded-2xl w-full max-w-xl shadow-lg">
        {/* Greeting */}
        <h2 className="text-xl font-semibold mb-2 text-center leading-10">
          Hi <span className="text-green-400">{"{UserName}"}</span>!<br /> How
          can I help you today?
        </h2>
        <p className="text-sm text-para text-center mb-6">
          This card displays a prompt to collect your name and shows a
          personalized greeting.
        </p>

        {/* Icon Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <button className="bg-grayBackground border-[2px] hover:shadow-md hover:shadow-blue-300 p-4 rounded-lg flex flex-col items-center transition duration-200">
            <BookmarkIcon className="h-6 w-6 mb-2 text-green-400" />
            <span className="text-sm">Saved</span>
          </button>
          <button className="bg-grayBackground border-[2px] hover:shadow-md hover:shadow-blue-300 p-4 rounded-lg flex flex-col items-center transition duration-200">
            <RectangleStackIcon className="h-6 w-6 mb-2 text-blue-400" />
            <span className="text-sm">Media</span>
          </button>
          <button className="bg-grayBackground border-[2px] hover:shadow-md hover:shadow-blue-300 p-4 rounded-lg flex flex-col items-center transition duration-200">
            <LanguageIcon className="h-6 w-6 mb-2 text-purple-400" />
            <span className="text-sm">Language</span>
          </button>
        </div>

        {/* Dynamic Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedFilter(item)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${selectedFilter === item
                  ? "bg-green-600 text-white"
                  : "bg-grayBackground text-para hover:bg-gray-200"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Input field */}
        {/* Input with attachment icon */}
        <div className="flex items-center bg-grayBackground rounded-lg overflow-hidden px-2">
          {/* Attachment */}
          <label
            htmlFor="file-upload"
            className="cursor-pointer p-2 hover:bg-gray-200 rounded transition"
          >
            <PaperClipIcon className="w-5 h-5 text-para" />
            <input id="file-upload" type="file" className="hidden" />
          </label>

          {/* Text input */}
          <input
            type="text"
            placeholder="Ask your question below..."
            className="bg-transparent w-full px-2 py-3 text-sm text-foreground placeholder-gray-400 outline-none"
          />

          {/* Send button */}
          <button
            className="bg-green-500 p-3 hover:bg-green-600 transition duration-200 rounded-r-lg"
            aria-label="Send question"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link to={"/ai-prompt"}>
              <PaperAirplaneIcon className="w-5 h-5 text-white rotate-45" />
            </Link>

          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
