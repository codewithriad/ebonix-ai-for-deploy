import React from "react";

const VoiceWaveformIcon: React.FC = () => {
  const centerY = 30; // Half of SVG height
  const barCount = 100;
  const barWidth = 1;
  const gap = 1.5;
  const barData = Array.from({ length: barCount }, (_, i) => {
    // Create a smooth wave pattern using sine + random mix
    const sinWave = Math.abs(Math.sin((i / barCount) * Math.PI * 3)); // 3 full waves
    const randomFactor = 0.3 + Math.random() * 0.7;
    return Math.round(sinWave * 30 * randomFactor + 5); // height range: 5–35
  });

  return (
    <svg
      width={barCount * (barWidth + gap)}
      height="60"
      viewBox={`0 0 ${barCount * (barWidth + gap)} 60`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="waveGradient"
          x1="0"
          y1="0"
          x2={barCount * (barWidth + gap)}
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00C6FF" />
          <stop offset="1" stopColor="#7F00FF" />
        </linearGradient>
      </defs>

      {barData.map((height, i) => {
        const x = i * (barWidth + gap);
        const y = centerY - height / 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={height}
            rx={1}
            fill="url(#waveGradient)"
          />
        );
      })}
    </svg>
  );
};

export default VoiceWaveformIcon;
