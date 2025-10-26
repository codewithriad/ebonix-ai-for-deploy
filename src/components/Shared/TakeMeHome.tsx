import { HomeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function TakeMeHomeButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-violet-600 text-white font-medium rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex space-x-4 items-center"
    >
      <HomeIcon className="w-8 h-auto" />
      Take Me Home
    </button>
  );
}
