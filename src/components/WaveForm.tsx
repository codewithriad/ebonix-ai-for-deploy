import React from "react";

const Waveform: React.FC = () => {
  // Function to generate a number of bars
  const generateBars = (count: number, isHighlighted: boolean = false) => {
    const bars = [];
    for (let i = 0; i < count; i++) {
      // Random height for variety, similar to the image
      const height = Math.floor(Math.random() * (25 - 10) + 5); // Between 10px and 20px
      bars.push(
        <div
          key={i}
          className={`
            w-[1px] mx-[1px] rounded-full
            ${isHighlighted ? "bg-yellow-400" : "bg-gray-500"}
          `}
          style={{ height: `${height}px` }}
        ></div>
      );
    }
    return bars;
  };

  return (
    <div className="flex items-center justify-center p-8 rounded-lg">
      <div className="flex items-center">
        {/* Highlighted section */}
        {generateBars(20, true)} {/* Adjust number of bars as needed */}
        {/* Separator (if desired, or just space between sections) */}
        {/* Gray section */}
        {generateBars(60)} {/* Adjust number of bars as needed */}
      </div>
    </div>
  );
};

export default Waveform;
