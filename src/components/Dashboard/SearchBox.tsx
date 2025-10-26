import { IconRobot } from "@tabler/icons-react";

export default function SearchBox() {
  return (
    <div className="flex items-center w-full max-full bg-background border-[4px] border-border rounded-xl p-4 shadow-inner">
      <IconRobot size={27} className="text-searchText" />

      <input
        type="text"
        placeholder="Type for search something or create prompt..."
        className="flex-1 bg-transparent outline-none px-3 text-base text-para placeholder:text-searchText"
      />
      <kbd className="text-lg text-searchText px-2 py-2 ml-2 hidden sm:block">
        ⌘ K
      </kbd>
    </div>
  );
}
