import React from "react";

const ImageGallery: React.FC = () => {
  const images = [
    {
      id: 1,
      url: "hero/hero1.jpg",
    },
    {
      id: 2,
      url: "hero/hero2.jpg",
    },
    {
      id: 3,
      url: "hero/hero3.jpg",
    },
    {
      id: 4,
      url: "hero/hero4.jpg",
    },
    {
      id: 5,
      url: "hero/hero5.png",
    },
    {
      id: 6,
      url: "hero/hero5.png",
    },
    {
      id: 7,
      url: "hero/hero7.png",
    },
  ];

  return (
    <div className="min-h-screen bg-background  p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-4 md:gap-12">
          {/* Left Column - Large Portrait Image */}
          <div className="col-span-12 md:col-span-4 lg:col-span-4 flex flex-col gap-4 md:gap-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[320px] md:h-[420px]">
              <img
                src={images[0].url}
                alt="Gallery 2"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[320px] md:h-[290px]">
              <img
                src={images[2].url}
                alt="Gallery 5"
                className="w-full h-full object-cover object-left-top"
              />
            </div>
          </div>

          {/* Middle Column - 2 Medium Images Stacked */}
          <div className="col-span-12 md:col-span-4 lg:col-span-4 flex flex-col gap-4 md:gap-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[320px] md:h-[355px]">
              <img
                src={images[1].url}
                alt="Gallery 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[320px] md:h-[355px]">
              <img
                src={images[4].url}
                alt="Gallery 5"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - 4 Small Images */}
          <div className="col-span-12 md:col-span-3 lg:col-span-4 grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-4">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[320px]  md:w-[168px] md:h-[168px]">
              <img
                src={images[2].url}
                alt="Gallery 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[320px]  md:w-[168px] md:h-[168px]">
              <img
                src={images[3].url}
                alt="Gallery 4"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[320px]  md:w-[168px] md:h-[168px]">
              <img
                src={images[5].url}
                alt="Gallery 6"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[320px]  md:w-[168px] md:h-[168px]">
              <img
                src={images[6].url}
                alt="Gallery 7"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
