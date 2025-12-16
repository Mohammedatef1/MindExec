import { useContext } from "react";
import AppContext from "../AppContext";
import ArrowIcon from "../components/icons/ArrowIcon";
import LeftFrame from "../components/layout/LeftFrame";
import MindMap from "../components/layout/MindMap";
import Nav from "../components/layout/Nav";
import RightFrame from "../components/layout/RightFrame";
import { PanelRight, PanelLeft } from "lucide-react";

const Editor = () => {
  const ctx = useContext(AppContext);

  const toggleLeft = () => ctx.setShowLeft(!ctx.showLeft);
  const toggleRight = () => ctx.setShowRight(!ctx.showRight);

  const getGridTemplateColumns = () => {
    if (ctx.showLeft && ctx.showRight) return "1fr 3fr 1fr";
    if (ctx.showLeft && !ctx.showRight) return "1fr 4fr 0fr";
    if (!ctx.showLeft && ctx.showRight) return "0fr 4fr 1fr";
    return "0fr 1fr 0fr";
  };

  return (
    <main className="max-h-screen overflow-hidden">
      <Nav />
      <section
        className="w-full h-[calc(100vh-81px)] grid transition-all duration-500"
        style={{ gridTemplateColumns: getGridTemplateColumns() }}>
        <div className="relative min-w-0">
          <LeftFrame />
          <button
            className="absolute top-1 right-1 z-20 p-2 rounded-lg text-white opacity-60 hover:opacity-100 transition-opacity"
            onClick={toggleLeft}>
            <PanelLeft />
          </button>
        </div>
        <div className="relative">
          <MindMap />
          <button
            className={`absolute top-1/2 z-20 p-2 rounded-lg text-white left-0 transform scale-150 -translate-y-1/2 hover:opacity-100 transition-all duration-300 ${!ctx.showLeft ? "opacity-60 visible" : "opacity-0 invisible"}`}
            onClick={toggleLeft}>
              <ArrowIcon className="transform -rotate-90" />
          </button>
          <button
            className={`absolute top-1/2 z-20 p-2 rounded-lg text-white right-0 transform scale-150 -translate-y-1/2 hover:opacity-100 transition-all duration-300 ${!ctx.showRight ? "opacity-60" : "opacity-0 invisible"}`}
            onClick={toggleRight}>
              <ArrowIcon className="transform rotate-90" />
          </button>
        </div>
        <div className="relative min-w-0">
          <RightFrame />
          <button
            className="absolute top-1 left-1 z-20 p-2 rounded-lg text-white opacity-60 hover:opacity-100 transition-opacity"
            onClick={toggleRight}>
            <PanelRight />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Editor;
