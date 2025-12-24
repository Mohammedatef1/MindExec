import { PanelLeft, PanelRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import ArrowIcon from "../components/icons/ArrowIcon";
import LeftFrame from "../components/layout/LeftFrame";
import MindMap from "../components/layout/MindMap";
import Nav from "../components/layout/Nav";
import RightFrame from "../components/layout/RightFrame";

const Editor = () => {
  const ctx = useContext(AppContext);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const toggleLeft = () => {
    ctx.setShowLeft(!ctx.showLeft)
  };

  const toggleRight = () => {
    ctx.setShowRight(!ctx.showRight)
  };

  const getGridTemplateColumns = () => {
    const leftPanelColumnWidth = ctx.showLeft ? 'var(--panel-width)' : '0px';
    const rightPanelColumnWidth = ctx.showRight ? 'var(--panel-width)' : '0px';

    return `${leftPanelColumnWidth} 1fr ${rightPanelColumnWidth}`;
  };

  if (isSmallScreen) {
    return (
      <main className="h-screen max-h-screen flex flex-col overflow-hidden bg-primary1">
        <Nav />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-light">
                <rect
                  x="10"
                  y="15"
                  width="60"
                  height="40"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                  fill="none"
                />
                <line
                  x1="20"
                  y1="25"
                  x2="40"
                  y2="25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
                <line
                  x1="20"
                  y1="32"
                  x2="50"
                  y2="32"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
                <line
                  x1="20"
                  y1="39"
                  x2="45"
                  y2="39"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
                <rect
                  x="35"
                  y="55"
                  width="10"
                  height="4"
                  rx="1"
                  fill="currentColor"
                  fillOpacity="0.3"
                />
                <rect
                  x="30"
                  y="59"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <path
                  d="M45 5 L50 10 L45 15 M50 10 L70 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.5"
                />
                <path
                  d="M35 5 L30 10 L35 15 M30 10 L10 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.5"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-semibold text-white mb-3">
              Editor not available on small screens
            </h1>

            <p className="text-gray-400 text-base leading-relaxed mb-4">
              The workflow editor is designed for larger screens and requires more space to be usable.
              Please open this page on a tablet or desktop device to continue.
            </p>

            <p className="text-gray-500 text-sm mb-6">
              For best experience, use a larger screen.
            </p>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-primary-light hover:text-primary-light/80 transition-colors duration-150 text-sm font-medium">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-180">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Go back to Dashboard
            </Link>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="w-16 h-0.5 bg-primary-light/30 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen max-h-screen flex flex-col overflow-hidden">
      <Nav />
      <section
        className="w-full flex-1 grid transition-all duration-500"
        style={{ gridTemplateColumns: getGridTemplateColumns() }}>
        <div className="relative min-w-0">
          <LeftFrame />
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
        <div className="relative min-w-0">
          <RightFrame />
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
