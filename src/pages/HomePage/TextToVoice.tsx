import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";

const emotions = [
  { label: "Excited", emoji: "😄" },
  { label: "Calm", emoji: "😌" },
  { label: "Angry", emoji: "😠" },
  { label: "Mysterious", emoji: "🕵️" },
  { label: "Sassy", emoji: "💅" },
];

const TextToVoice: React.FC = () => {
  const [voiceDesc, setVoiceDesc] = useState("");
  const [script, setScript] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  return (
    <section className="w-full bg-grayBackground py-20 px-4 sm:px-8 text-foreground">
      <div className="max-w-4xl mx-auto text-center bg-background p-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Text to Voice</h2>
        <p className="text-para mb-10">
          Create lifelike voiceovers from your scripts using AI voice tones and
          personalities.
        </p>

        {/* Voice Description */}
        <div className="text-left mb-6">
          <label className="block text-sm font-semibold mb-2 text-para">
            Voice
          </label>
          <textarea
            rows={3}
            value={voiceDesc}
            onChange={(e) => setVoiceDesc(e.target.value)}
            placeholder="Describe the desired voice personality, accent, tone, etc."
            className="w-full bg-background border border-grayBackground rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        {/* Script Input */}
        <div className="text-left mb-6">
          <label className="block text-sm font-semibold mb-2 text-para">
            Script
          </label>
          <textarea
            rows={3}
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Enter what the AI voice should say..."
            className="w-full bg-background border border-grayBackground rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        {/* Emotion Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {emotions.map((e) => (
            <button
              key={e.label}
              onClick={() => setSelectedEmotion(e.label)}
              className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 transition ${
                selectedEmotion === e.label
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 hover:bg-gray-200"
              }`}
            >
              <span>{e.emoji}</span>
              {e.label}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              // Add random logic
              setVoiceDesc(
                "Random voice: British wizard mentor with deep warmth."
              );
              setScript(
                "Let the magic guide your journey. Wisdom comes from within."
              );
              setSelectedEmotion("Mysterious");
            }}
            className="flex items-center gap-2 px-5 py-3 bg-grayBackground hover:shadow-xl text-sm rounded-full transition"
          >
            <BsStars className="text-lg" />
            Randomize
          </button>

          <button
            onClick={() => alert("🎙️ Generating AI voice...")}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-full transition"
          >
            <HiOutlineArrowRightCircle className="text-xl" />
            Generate
          </button>
        </div>
      </div>
    </section>
  );
};

export default TextToVoice;
