import { XMarkIcon } from "@heroicons/react/24/outline";

const ComingSoonModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition">
      <div className="bg-grayBackground text-foreground rounded-xl w-[90%] sm:w-[400px] p-6 shadow-2xl animate-fadeIn relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-center">🚀 Coming Soon</h2>
        <p className="text-center text-foreground">
          This feature is{" "}
          <span className="text-green-400 font-semibold">on the way</span>. Stay
          tuned!
        </p>
      </div>
    </div>
  );
};
export default ComingSoonModal;
