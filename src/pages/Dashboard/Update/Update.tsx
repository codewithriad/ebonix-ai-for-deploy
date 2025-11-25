import { ChevronRight, Upload } from "lucide-react";
import { NavLink } from "react-router-dom";

const Update = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-para">
          <NavLink
            to="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </NavLink>
          <ChevronRight className="w-4 h-4" />
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-bold text-foreground">Update</h1>

        {/* About Section */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-6">About</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* License */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                License
              </h3>
              <p className="text-sm text-para font-mono">
                Key hide**********egno
              </p>
            </div>
            {/* Installed Version */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                Installed
              </h3>
              <p className="text-sm text-para">
                Version <span className="text-accent font-semibold">3.6.5</span>
              </p>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left: Icon and Text */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-para" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Choose a file of the updated version
                </p>
                <p className="text-xs text-para mt-1">ZIP archive file only</p>
              </div>
            </div>

            {/* Right: Choose File Button */}
            <label
              htmlFor="file-upload"
              className="px-6 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer whitespace-nowrap"
            >
              Choose file
              <input
                id="file-upload"
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-border">
        <p className="text-xs text-center text-para">
          All rights reserved. © 2025 Ebonix | Version 3.6.5
        </p>
      </footer>
    </div>
  );
};

export default Update;
