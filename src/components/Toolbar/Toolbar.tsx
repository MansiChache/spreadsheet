// src/components/Toolbar.tsx
import { Plus } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 text-sm bg-white">
      {/* Left section */}
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 5h14v2H3V5zm0 4h10v2H3V9zm0 4h14v2H3v-2z" />
          </svg>
          Tool bar
        </span>
        <div className="flex items-center gap-4 text-gray-600 font-normal">
          <button className="hover:text-black transition">Hide fields</button>
          <button className="hover:text-black transition">Sort</button>
          <button className="hover:text-black transition">Filter</button>
          <button className="hover:text-black transition">Cell view</button>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <button className="px-2 py-1 border text-gray-600 rounded hover:bg-gray-100">Import</button>
        <button className="px-2 py-1 border text-gray-600 rounded hover:bg-gray-100">Export</button>
        <button className="px-2 py-1 border text-gray-600 rounded hover:bg-gray-100">Share</button>
        <button className="flex items-center gap-1 px-3 py-1 text-white bg-green-600 hover:bg-green-700 rounded font-semibold">
          <Plus size={14} />
          New Action
        </button>
      </div>
    </div>
  );
}
