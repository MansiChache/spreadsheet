import { useState } from "react";
import Header from "./components/Header/Header";
import Toolbar from "./components/Toolbar/Toolbar";
import Spreadsheet from "./components/Spreadsheet/Spreadsheet";
import SheetTabs from "./components/SheetTabs/SheetTabs";

export default function App() {
  const [activeSheet, setActiveSheet] = useState(0);
  return (
    <div className="h-screen flex flex-col bg-white text-sm">
      <Header />
      <Toolbar />
      <Spreadsheet key={activeSheet} />
      <SheetTabs active={activeSheet} onChange={setActiveSheet} />
    </div>
  );
}