import { IconPhoto } from "@tabler/icons-react";

const AIImageHero = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-20 rounded-[40px] border-8 border-grayBackground p-6 sm:p-10 relative overflow-hidden">
      {/* Text content */}
      <div>
        <div className="mb-8">
          <span className="inline-block px-3 py-2 border border-foreground border-t-2 border-l-2 border-r-4 border-b-4 rounded-xl text-sm font-semibold">
            Ai Image
          </span>
        </div>

        <h2 className="text-foreground text-2xl lg:text-4xl font-bold mb-4 leading-tight">
          Visualize what you dream <br /> of. Create images from text.
        </h2>

        <p className="text-foreground py-4 text-lg">
          Instantly create stunning images using AI <br /> Image Generator –
          your tool for artistic innovation.
        </p>

        <button className="my-6 bg-foreground text-background text-base px-4 py-3 rounded-xl">
          Try for free {"->"}
        </button>
      </div>

      {/* Grid of image placeholders */}
      <div className="flex gap-4 scale-[0.95] sm:scale-100">
        {[0, 1, 2, 3].map((colIdx) => {
          const verticalMargin = colIdx === 0 || colIdx === 2 ? "mb-8" : "mt-8";

          return (
            <div
              key={colIdx}
              className={`flex flex-col gap-4 ${verticalMargin}`}
            >
              {Array.from({ length: 4 }).map((_, rowIdx) => {
                const index = colIdx * 4 + rowIdx;
                const shadow = [1, 5, 13].includes(index)
                  ? "shadow-[inset_0_-40px_40px_-10px_rgba(0,0,0,0.2)]"
                  : "";

                return (
                  <div
                    key={index}
                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center ${shadow}`}
                  >
                    <IconPhoto className="w-6 h-6 opacity-50 text-para" />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AIImageHero;
