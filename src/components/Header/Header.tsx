import { UserCircle2 } from "lucide-react";
export default function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
      <h1 className="text-lg font-medium">Spreadsheet style</h1>
      <UserCircle2 className="w-6 h-6 text-gray-600" />
    </div>
  );
}