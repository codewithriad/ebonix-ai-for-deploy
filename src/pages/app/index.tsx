import {
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  PencilSquareIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { IconHome } from "@tabler/icons-react";
import { FC } from "react";

const EbonixApp: FC = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-950 flex flex-col justify-between">
        <div>
          {/* Logo / Company */}
          <div className="">
            <img
              src="/dark-nav-logo.png"
              alt="main logo"
              className="w-auto h-10 mt-4 ml-2"
            />
          </div>

          {/* Nav */}
          {/* <nav className="mt-4">
            <ul className="space-y-1">
              <li className="px-4 py-2 bg-gray-800 rounded-md">Home</li>
              <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
                Library
              </li>
              <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
                Models
              </li>
            </ul>
          </nav> */}

          {/* Apps */}
          <div className="mt-6 px-4 text-gray-400 text-xs uppercase">Apps</div>
          <ul className="mt-2 space-y-1">
            {[
              {
                name: "Home",
                icon: IconHome,
              },
              { name: "Chat", icon: ChatBubbleLeftRightIcon },
              { name: "Writer", icon: PencilSquareIcon },
              { name: "Coder", icon: CodeBracketIcon },
              { name: "Image Generator", icon: PhotoIcon },
              { name: "Video Generator", icon: VideoCameraIcon },
              // { name: "Voice Generator", icon: MusicalNoteIcon },
            ].map((app) => (
              <li
                key={app.name}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer"
              >
                <app.icon className="h-5 w-5 text-gray-300" />
                <span>{app.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default EbonixApp;
