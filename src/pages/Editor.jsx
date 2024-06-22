import { useContext } from "react";
import AppContext from "../AppContext";
import ArrowIcon from "../components/icons/ArrowIcon";
import LeftFrame from "../components/layout/LeftFrame";
import MindMap from "../components/layout/MindMap";
import Nav from "../components/layout/Nav";
import RightFrame from "../components/layout/RightFrame";

const Editor = () => {
  const ctx = useContext(AppContext);

  const toggleLeft = () => ctx.setShowLeft(!ctx.showLeft);
  const toggleRight = () => ctx.setShowRight(!ctx.showRight);

  const getGridTemplateColumns = () => {
    if (ctx.showLeft && ctx.showRight) return "1fr 3fr 1fr";
    if (ctx.showLeft && !ctx.showRight) return "1fr 4fr";
    if (!ctx.showLeft && ctx.showRight) return "4fr 1fr";
    return "1fr"; // Only the center section is visible
  };

  return (
    <main className="max-h-screen overflow-hidden">
      <Nav />
      <section
        className="w-full h-[calc(100vh-72px)] grid"
        style={{ gridTemplateColumns: getGridTemplateColumns() }}>
        {ctx.showLeft && (
          <div className="relative">
            <LeftFrame />
            <button
              className="absolute top-1/2 z-20 p-2 rounded-lg text-white -right-5 transform scale-150 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
              onClick={toggleLeft}>
              {ctx.showLeft ? <ArrowIcon className=" transform rotate-90" /> : <ArrowIcon className="transform -rotate-90" />}
            </button>
          </div>
        )}
        <div className="relative">
          <MindMap />
          {!ctx.showLeft && (
            <button
              className="absolute top-1/2 z-20 p-2 rounded-lg text-white left-0 transform scale-150 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
              onClick={toggleLeft}>
              {ctx.showLeft ? <ArrowIcon className=" transform rotate-90" /> : <ArrowIcon className="transform -rotate-90" />}
            </button>
          )}
          {!ctx.showRight && (
            <button
              className="absolute top-1/2 z-20 p-2 rounded-lg text-white right-0 transform scale-150 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
              onClick={toggleRight}>
              {ctx.showRight ? <ArrowIcon className=" transform -rotate-90" /> : <ArrowIcon className="transform rotate-90" />}
            </button>
          )}
        </div>
        {ctx.showRight && (
          <div className="relative">
            <RightFrame />
            <button
              className="absolute top-1/2 z-20 p-2 rounded-lg text-white -left-5 transform scale-150 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
              onClick={toggleRight}>
              {ctx.showRight ? <ArrowIcon className=" transform -rotate-90" /> : <ArrowIcon className="transform rotate-90" />}
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Editor;
