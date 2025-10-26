import { IconClick, IconListDetails, IconLoader3 } from "@tabler/icons-react";

const WhatItWork = () => {
  const works = [
    {
      id: 1,
      icon: <IconClick className="h-8 w-8 text-foreground" />,
      title: "Choose Template",
      text: "Choose a our built in templates or create your own.",
    },
    {
      id: 2,
      icon: <IconListDetails className="h-8 w-8 text-foreground" />,
      title: "Describe",
      text: "Enter a few sentences to describe your topic. Add keywords to specify for your brand.",
    },
    {
      id: 3,
      icon: <IconLoader3 className="h-8 w-8 text-foreground" />,
      title: "Generate",
      text: 'Get a variety of high-converting copy every time you hit "Generate."',
    },
  ];

  return (
    <>
      <section className="bg-background mt-16 mx-auto">
        <div className="container-custom relative z-10">
          <div className="w-full mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              How does Ebonix work?
            </h2>
          </div>

          {/* cards of section */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {works.map((work) => (
              <div
                key={work.id}
                className="bg-background border-[8px] border-grayBackground rounded-3xl p-8 transition-all  hover:shadow-lg hover:shadow-foreground/20 text-pretty max-w-[22rem] mx-auto max-h-[18rem]"
              >
                <div className="w-12 h-12 border-foreground border-t border-l border-b-[3px] border-r-[3px] rounded-xl flex justify-center items-center mb-4">
                  <span>{work.icon}</span>
                </div>
                <h3 className="text-foreground text-2xl font-bold mb-4">
                  {work.title}
                </h3>
                <p className="text-para">{work.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatItWork;
