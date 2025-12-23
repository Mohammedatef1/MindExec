import { PanelLeft, PanelRight } from "lucide-react";
import { useContext } from "react";
import AppContext from "../AppContext";
import ArrowIcon from "../components/icons/ArrowIcon";
import LeftFrame from "../components/layout/LeftFrame";
import MindMap from "../components/layout/MindMap";
import Nav from "../components/layout/Nav";
import RightFrame from "../components/layout/RightFrame";
import useCollapsingPanel from "../hooks/useCollapsingPanel";

const Editor = () => {
  const ctx = useContext(AppContext);

  const leftPanel = useCollapsingPanel(ctx.showLeft)
  const rightPanel = useCollapsingPanel(ctx.showRight)

  const toggleLeft = () => {
    leftPanel.onToggle()
    ctx.setShowLeft(!ctx.showLeft)
  };

  const toggleRight = () => {
    rightPanel.onToggle()
    ctx.setShowRight(!ctx.showRight)
  };

  const getGridTemplateColumns = () => {
    if (ctx.showLeft && ctx.showRight) return "1fr 3fr 1fr";
    if (ctx.showLeft && !ctx.showRight) return "1fr 4fr 0fr";
    if (!ctx.showLeft && ctx.showRight) return "0fr 4fr 1fr";
    return "0fr 1fr 0fr";
  };

  return (
    <main className="h-screen max-h-screen flex flex-col overflow-hidden">
      <Nav />
      <section
        className="w-full flex-1 grid transition-all duration-500"
        style={{ gridTemplateColumns: getGridTemplateColumns() }}>
        <div ref={leftPanel.ref} className="relative min-w-0">
          <LeftFrame minWidth={leftPanel.minWidth} />
          <button
            className="absolute top-1 right-1 z-20 p-2 rounded-lg text-white hover:bg-primary-light/10 transition-colors group"
            onClick={toggleLeft}>
            <PanelLeft className="text-gray-300 group-hover:text-white transition-colors"/>
          </button>
        </div>
        <div className="relative">
          <MindMap />
          <button
            className={`absolute top-1/2 z-20 left-0 transform -translate-y-1/2 transition-all duration-200 group ${
              !ctx.showLeft 
                ? "opacity-100 visible translate-x-2" 
                : "opacity-0 invisible translate-x-0"
            }`}
            onClick={toggleLeft}>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-gray-700 hover:border-[#7246A7] hover:bg-black/90 active:bg-black transition-all duration-200">
              <ArrowIcon className="transform -rotate-90 text-gray-300 group-hover:text-[#7246A7] transition-colors duration-200" />
            </div>
          </button>
          <button
            className={`absolute top-1/2 z-20 right-0 transform -translate-y-1/2 transition-all duration-200 group ${
              !ctx.showRight 
                ? "opacity-100 visible -translate-x-2" 
                : "opacity-0 invisible translate-x-0"
            }`}
            onClick={toggleRight}>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-gray-700 hover:border-[#7246A7] hover:bg-black/90 active:bg-black transition-all duration-200">
              <ArrowIcon className="transform rotate-90 text-gray-300 group-hover:text-[#7246A7] transition-colors duration-200" />
            </div>
          </button>
        </div>
        <div ref={rightPanel.ref} className="relative min-w-0">
          <RightFrame minWidth={rightPanel.minWidth} />
          <button
            className="absolute top-1 left-1 z-20 p-2 rounded-lg text-white hover:bg-primary-light/10 transition-colors group"
            onClick={toggleRight}>
            <PanelRight className="text-gray-300 group-hover:text-white transition-colors" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Editor;
