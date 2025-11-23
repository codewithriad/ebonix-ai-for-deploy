import { ChevronDown, MoreVertical, Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Template {
  id: string;
  name: string;
  category: string;
  type?: string;
  status: "Active" | "Inactive";
  icon: string;
  iconBg: string;
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Call to Action",
      category: "Website",
      status: "Active",
      icon: "🎯",
      iconBg: "bg-purple-600",
    },
    {
      id: "2",
      name: "Landing Page Headline Writer",
      category: "Website",
      status: "Active",
      icon: "H",
      iconBg: "bg-orange-500",
    },
    {
      id: "3",
      name: "Website Sub-headline",
      category: "Website",
      status: "Active",
      icon: "H₂",
      iconBg: "bg-blue-500",
    },
    {
      id: "4",
      name: "Product Page - Title and Meta Descriptions",
      category: "Website",
      status: "Active",
      icon: "SEO",
      iconBg: "bg-red-500",
    },
    {
      id: "5",
      name: "Blog Post - Title and Meta Descriptions",
      category: "Website",
      status: "Active",
      icon: "SEO",
      iconBg: "bg-blue-600",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Toggle Status
  const toggleStatus = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" }
          : t
      )
    );
  };

  // Add new template
  const addTemplate = (template: Template) => {
    setTemplates((prev) => [...prev, template]);
  };

  // Filtering Logic
  const filteredTemplates = templates
    .filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((t) =>
      filterCategory === "all" ? true : t.category === filterCategory
    )
    .filter((t) => (filterType === "all" ? true : t.type === filterType))
    .filter((t) => (filterStatus === "all" ? true : t.status === filterStatus));

  // Sorting Logic
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Templates</h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-lg font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Template
          </button>
        </div>

        {/* SEARCH + FILTERS */}
        <div
          className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6"
          ref={dropdownRef}
        >
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 py-2.5 text-white"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <FilterButton
              label="Category"
              options={["Website", "SEO", "Blog", "Marketing"]}
              active={filterCategory}
              onSelect={setFilterCategory}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              target="category"
            />

            {/* Type Filter */}
            <FilterButton
              label="Type"
              options={["Headline", "Landing", "Content", "Meta"]}
              active={filterType}
              onSelect={setFilterType}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              target="type"
            />

            {/* Status Filter */}
            <FilterButton
              label="Status"
              options={["Active", "Inactive"]}
              active={filterStatus}
              onSelect={setFilterStatus}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              target="status"
            />

            {/* Sort */}
            <select
              className="bg-gray-700 px-3 py-2 rounded-lg text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-gray-400 mb-4">
          Total {sortedTemplates.length} templates
        </p>

        {/* TABLE */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="hidden lg:block">
            <table className="w-full">
              <thead className="bg-gray-850">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase">
                    Template
                  </th>
                  <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase">
                    Status
                  </th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {sortedTemplates.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full ${t.iconBg} flex items-center justify-center font-bold`}
                      >
                        {t.icon}
                      </div>
                      {t.name}
                    </td>
                    <td className="px-6 py-4">{t.category}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(t.id)}
                        className="flex items-center gap-2"
                      >
                        <div
                          className={`h-6 w-11 rounded-full flex items-center transition-colors ${
                            t.status === "Active"
                              ? "bg-green-600"
                              : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`h-4 w-4 bg-white rounded-full transform transition-transform ${
                              t.status === "Active"
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </div>
                        <span>{t.status}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden divide-y divide-gray-700">
            {sortedTemplates.map((t) => (
              <div key={t.id} className="p-4 hover:bg-gray-750">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-full ${t.iconBg} flex items-center justify-center`}
                  >
                    {t.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{t.name}</h3>
                    <p className="text-gray-400">{t.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <CreateTemplateModal
            close={() => setIsModalOpen(false)}
            addTemplate={addTemplate}
          />
        )}
      </div>
    </div>
  );
}

/* -------------------------
   FILTER DROPDOWN COMPONENT
------------------------- */

function FilterButton({
  label,
  options,
  active,
  onSelect,
  openDropdown,
  setOpenDropdown,
  target,
}: any) {
  return (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === target ? null : target)}
        className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 text-sm"
      >
        <span className="text-gray-400">⊝</span>
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {openDropdown === target && (
        <div className="absolute top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-40 z-20">
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
            onClick={() => {
              onSelect("all");
              setOpenDropdown(null);
            }}
          >
            All
          </button>

          {options.map((op: string) => (
            <button
              key={op}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
              onClick={() => {
                onSelect(op);
                setOpenDropdown(null);
              }}
            >
              {op}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------
   MODAL FOR CREATE TEMPLATE
------------------------- */

function CreateTemplateModal({ close, addTemplate }: any) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Website");
  const [icon, setIcon] = useState("📄");

  const handleSubmit = () => {
    addTemplate({
      id: Date.now().toString(),
      name,
      category,
      icon,
      iconBg: "bg-blue-500",
      status: "Active",
    });
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Create Template</h2>

        <input
          placeholder="Template Name"
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-lg mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-lg mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Website</option>
          <option>SEO</option>
          <option>Blog</option>
          <option>Marketing</option>
        </select>

        <input
          placeholder="Icon (Emoji)"
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-lg mb-3"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={close} className="px-4 py-2 bg-gray-700 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-lime-400 text-black rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
