import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Briefcase,
    ChevronDown,
    Globe,
    Mail,
    Megaphone,
    MoreVertical,
    PenTool,
    Search,
    Share2,
    ShoppingCart,
} from "lucide-react";
import { useState } from "react";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Website",
      created: "Apr 28, 2024",
      icon: Globe,
      initials: "W",
    },
    {
      id: 2,
      name: "Social Media",
      created: "Apr 28, 2024",
      icon: Share2,
      initials: "SM",
    },
    {
      id: 3,
      name: "Email",
      created: "Apr 28, 2024",
      icon: Mail,
      initials: "E",
    },
    {
      id: 4,
      name: "E-Commerce",
      created: "Apr 28, 2024",
      icon: ShoppingCart,
      initials: "E",
    },
    {
      id: 5,
      name: "Business and Strategy",
      created: "Apr 28, 2024",
      icon: Briefcase,
      initials: "BA",
    },
    {
      id: 6,
      name: "Ads",
      created: "Apr 28, 2024",
      icon: Megaphone,
      initials: "A",
    },
    {
      id: 7,
      name: "Writing Tools",
      created: "Apr 28, 2024",
      icon: PenTool,
      initials: "WT",
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-[#18181b] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="bg-[#d1fa5c] hover:bg-[#bce64b] text-black font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                Create new category
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
                <DialogDescription>
                  Add a new category to organize your tools.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Category Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    placeholder="Description (Optional)"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                  Create Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-[#27272a] p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Sort by:</span>
              <button className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 transition-colors">
                Default <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Total {filteredCategories.length} categories
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {/* Table Header (Hidden on mobile, visible on desktop for alignment) */}
          <div className="hidden sm:flex justify-between px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            <span>Name</span>
            <span className="mr-12">Created</span>
          </div>

          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="group flex items-center justify-between p-4 bg-white dark:bg-[#27272a] border border-gray-200 dark:border-gray-800 rounded-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                  {category.initials}
                </div>
                <span className="font-medium text-sm sm:text-base">
                  {category.name}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-12">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category.created}
                </span>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No categories found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
