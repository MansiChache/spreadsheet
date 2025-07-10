import { PlusCircle } from "lucide-react";

interface Props {
  active: number;
  onChange: (i: number) => void;
}
export default function SheetTabs({ active, onChange }: Props) {
  const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];
  return (
    <div className="border-t px-4 py-2 flex items-center gap-6 bg-white text-sm">
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => onChange(i)}
          className={`px-2 py-1 rounded ${active === i ? "bg-gray-200 font-medium" : "text-gray-600"}`}
        >
          {t}
        </button>
      ))}
      <button className="ml-auto" onClick={() => onChange(tabs.length)}>
        <PlusCircle className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}