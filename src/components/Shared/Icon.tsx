import React from "react";

const Icon = ({
  icon,
  className,
}: {
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`absolute h-12 w-12 transform
     rotate-[-10deg] flex justify-center items-center
      ${className}`}
    >
      <div
        className={`h-full w-full transform
     rotate-[-10deg] animate-bounce-y flex
       justify-center items-center border-t-2 border-l-2
        border-b-4 border-r-4 rounded-xl bg-[#e8f9ee] ${className}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default Icon;
