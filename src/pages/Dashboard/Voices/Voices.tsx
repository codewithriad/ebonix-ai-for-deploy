import { ChevronDown, MoreVertical, Search } from "lucide-react";
import { useState } from "react";

interface Voice {
  id: string;
  name: string;
  provider: string;
  avatar: string;
  created: string;
  status: "Active" | "Inactive";
}

const Voices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState(false);
  const [sortDropdown, setSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("Default");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Sample voice data based on the image
  const [voices, setVoices] = useState<Voice[]>([
    { id: "1", name: "Themba", provider: "Azure", avatar: "T", created: "March 25", status: "Active" },
    { id: "2", name: "Thando", provider: "Azure", avatar: "T", created: "March 25", status: "Active" },
    { id: "3", name: "HalaoYu", provider: "Azure", avatar: "H", created: "March 25", status: "Active" },
    { id: "4", name: "YunJhe", provider: "Azure", avatar: "Y", created: "March 25", status: "Active" },
    { id: "5", name: "HsiaoChen", provider: "Azure", avatar: "H", created: "March 25", status: "Active" },
    { id: "6", name: "HiuGaai", provider: "Azure", avatar: "H", created: "March 25", status: "Active" },
    { id: "7", name: "WanLung", provider: "Azure", avatar: "W", created: "March 25", status: "Active" },
    { id: "8", name: "HiuMaan", provider: "Azure", avatar: "H", created: "March 25", status: "Active" },
    { id: "9", name: "Yunxi", provider: "Azure", avatar: "Y", created: "March 25", status: "Active" },
    { id: "10", name: "Yunxiang", provider: "Azure", avatar: "Y", created: "March 25", status: "Active" },
    { id: "11", name: "Xiaoxl", provider: "Azure", avatar: "X", created: "March 25", status: "Active" },
    { id: "12", name: "Yunxiao", provider: "Azure", avatar: "Y", created: "March 25", status: "Active" },
    { id: "13", name: "Xiaobei", provider: "Azure", avatar: "X", created: "March 25", status: "Active" },
    { id: "14", name: "Yundeng", provider: "Azure", avatar: "Y", created: "March 25", status: "Active" },
    { id: "15", name: "Yunqi", provider: "Azure", avatar: "Y", created: "March 25", status: "Active" },
    { id: "16", name: "Xiaochen Dragon HD Latest", provider: "Azure", avatar: "XD", created: "March 25", status: "Active" },
    { id: "17", name: "Yunxiao Multilingual", provider: "Azure", avatar: "YM", created: "March 25", status: "Active" },
    { id: "18", name: "Yiuze", provider: "Azure", avatar: "Y", created: "March 25", status: "Active" },
    { id: "19", name: "Yunyi Multilingual", provider: "Azure", avatar: "YM", created: "March 25", status: "Active" },
    { id: "20", name: "Yunye", provider: "Azure", avatar: "Y", created: "March 25", status: "Active" },
    { id: "21", name: "Yunxia", provider: "Azure", avatar: "Y", created: "March 25", status: "Active" },
  ]);

  const toggleStatus = (id: string) => {
    setVoices(voices.map(voice => 
      voice.id === id 
        ? { ...voice, status: voice.status === "Active" ? "Inactive" : "Active" } 
        : voice
    ));
  };

  const filteredVoices = voices.filter(voice =>
    voice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Voices</h1>
        <p className="text-sm text-para">
          Total {voices.length} assistants. Last updated November 24 at 08:23 PM.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-card border border-border rounded-xl p-4 mb-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          {/* Left side - Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
            {/* Search */}
            <div className="relative flex-1 md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {/* Provider Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProviderFilter(!providerFilter);
                    setStatusFilter(false);
                    setSortDropdown(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Provider
                </button>
                {providerFilter && (
                  <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[160px] py-1">
                    <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors">
                      Azure
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors">
                      Google
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors">
                      Amazon
                    </button>
                  </div>
                )}
              </div>

              {/* Status Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setStatusFilter(!statusFilter);
                    setProviderFilter(false);
                    setSortDropdown(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  Status
                </button>
                {statusFilter && (
                  <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[160px] py-1">
                    <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors">
                      Active
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors">
                      Inactive
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Sort */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => {
                setSortDropdown(!sortDropdown);
                setProviderFilter(false);
                setStatusFilter(false);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-all w-full sm:w-auto justify-between"
            >
              <span className="text-muted-foreground">Sort by:</span>
              <span className="font-medium">{sortBy}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {sortDropdown && (
              <div className="absolute top-full mt-2 right-0 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[180px] py-1">
                <button
                  onClick={() => {
                    setSortBy("Default");
                    setSortDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
                >
                  Default
                </button>
                <button
                  onClick={() => {
                    setSortBy("Name");
                    setSortDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
                >
                  Name
                </button>
                <button
                  onClick={() => {
                    setSortBy("Date");
                    setSortDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
                >
                  Date
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Voice List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
          <div className="col-span-5">Assistant</div>
          <div className="col-span-2">Created</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3"></div>
        </div>

        {/* Voice Items */}
        <div className="divide-y divide-border">
          {filteredVoices.map((voice) => (
            <div
              key={voice.id}
              className="flex flex-col md:grid md:grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/30 transition-colors relative"
            >
              {/* Assistant Info */}
              <div className="col-span-5 flex items-center gap-3 w-full">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-semibold text-sm border border-border shrink-0">
                  {voice.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{voice.name}</div>
                  <div className="text-xs text-muted-foreground">{voice.provider}</div>
                </div>
              </div>

              {/* Created Date */}
              <div className="col-span-2 text-sm text-foreground flex md:block justify-between items-center w-full">
                <span className="md:hidden text-muted-foreground">Created:</span>
                <span>{voice.created}</span>
              </div>

              {/* Status Toggle */}
              <div className="col-span-2 flex md:block justify-between items-center w-full">
                <span className="md:hidden text-muted-foreground">Status:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStatus(voice.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      voice.status === "Active" ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        voice.status === "Active" ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-foreground">{voice.status}</span>
                </div>
              </div>

              {/* Actions Menu */}
              <div className="col-span-3 flex justify-end absolute top-4 right-4 md:static">
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === voice.id ? null : voice.id)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-muted-foreground" />
                  </button>
                  {openMenuId === voice.id && (
                    <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[160px] py-1">
                      <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors">
                        Edit
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors">
                        Duplicate
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors">
                        Test Voice
                      </button>
                      <div className="border-t border-border my-1"></div>
                      <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-muted transition-colors">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(providerFilter || statusFilter || sortDropdown || openMenuId) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setProviderFilter(false);
            setStatusFilter(false);
            setSortDropdown(false);
            setOpenMenuId(null);
          }}
        />
      )}
    </div>
  );
};

export default Voices;
