import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import MindExecLogo from "../icons/MindExecLogo";

function Nav() {
  const ctx = useContext(AppContext);

  return (
    <header className="w-full border-b border-primary-light bg-black">
      <nav className="mx-auto flex h-16 items-stretch px-4 text-white-400 bg-primary1">
        {/* Left: product + workflow identity */}
        <div className="flex flex-1 items-center gap-4">
          <Link to="/">
            <MindExecLogo />
          </Link>

          <div className="h-8 w-px bg-zinc-800" />

          <div className="flex items-center gap-3 rounded-md border border-zinc-800 bg-black/40 px-3 py-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 40 40"
              fill="none"
              className="shrink-0">
              <path
                d="M22.1413 3.54422L36.4759 17.9211C37.6433 19.092 37.6433 20.9866 36.4759 22.1575L22.2085 36.4669C21.0403 37.6386 19.144 37.6432 17.9701 36.4773L3.55112 22.1568C2.3731 20.9868 2.36937 19.0825 3.5428 17.9079L17.8945 3.54214C19.0671 2.36836 20.9698 2.36929 22.1413 3.54422Z"
                fill="#050505"
                stroke="#FEA82F"
                strokeWidth="2"
              />
              <path
                d="M30.1279 18.6092L21.4237 9.87928C20.6427 9.096 19.3742 9.09538 18.5925 9.87789L9.87666 18.6023C9.09437 19.3853 9.09686 20.6549 9.8822 21.4348L18.6377 30.1305C19.4203 30.9078 20.6845 30.9047 21.4633 30.1236L30.1279 21.4335C30.9062 20.6529 30.9062 19.3898 30.1279 18.6092Z"
                fill="#FEA82F"
              />
              <path
                d="M23.2855 18.5313H21.4658V16.7117L20.3943 15.6401V19.6028H24.357L23.2855 18.5313Z"
                fill="#0E0E0E"
              />
              <path
                d="M23.2855 21.4658H21.4658V23.2854L20.3943 24.3569V20.3942H24.357L23.2855 21.4658Z"
                fill="#0E0E0E"
              />
              <path
                d="M16.7109 21.4658H18.5305V23.2854L19.6021 24.3569V20.3942H15.6393L16.7109 21.4658Z"
                fill="#0E0E0E"
              />
              <path
                d="M16.7109 18.5313H18.5305V16.7117L19.6021 15.6401V19.6028H15.6393L16.7109 18.5313Z"
                fill="#0E0E0E"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Current workflow
              </span>
              <p className="max-w-xs truncate text-sm font-medium text-zinc-100">
                {ctx.workflowMetadata?.name || "Untitled workflow"}
              </p>
            </div>
          </div>
        </div>

        {/* Center: primary navigation tabs */}
        <div className="flex items-center justify-center px-4">
          <div className="min-w-64 inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-black/40 px-1 py-1">
            <button
              onClick={() => {
                ctx.setBuilder(true);
                ctx.setShowLeft(true);
              }}
              className={`w-1/2 relative px-6 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase rounded-md transition-colors duration-150
                ${ctx.builder ? "bg-black text-zinc-50 border border-zinc-700" : "text-zinc-400 border border-transparent hover:text-zinc-100"}
              `}>
              <span>Builder</span>
            </button>
            <button
              onClick={() => {
                ctx.setBuilder(false);
                ctx.setShowLeft(false);
              }}
              className={`w-1/2 relative px-6 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase rounded-md transition-colors duration-150
                ${!ctx.builder ? "bg-black text-zinc-50 border border-zinc-700" : "text-zinc-400 border border-transparent hover:text-zinc-100"}
              `}>
              <span>Runs</span>
            </button>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-black/40 px-2 py-1.5">
            <button className="relative p-1.5 rounded-md hover:bg-primary-light/10 focus:outline-none focus:ring-1 focus:ring-primary-light/60 transition-colors group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-300 group-hover:text-white transition-colors">
                <path
                  d="M8.645 20.5C8.86103 21.2219 9.30417 21.8549 9.90858 22.3049C10.513 22.755 11.2464 22.998 12 22.998C12.7536 22.998 13.487 22.755 14.0914 22.3049C14.6958 21.8549 15.139 21.2219 15.355 20.5H8.645ZM3 19.5H21V16.5L19 13.5V8.5C19 7.58075 18.8189 6.6705 18.4672 5.82122C18.1154 4.97194 17.5998 4.20026 16.9497 3.55025C16.2997 2.90024 15.5281 2.38463 14.6788 2.03284C13.8295 1.68106 12.9193 1.5 12 1.5C11.0807 1.5 10.1705 1.68106 9.32122 2.03284C8.47194 2.38463 7.70026 2.90024 7.05025 3.55025C6.40024 4.20026 5.88463 4.97194 5.53284 5.82122C5.18106 6.6705 5 7.58075 5 8.5V13.5L3 16.5V19.5Z"
                  fill="currentColor"
                />
              </svg>
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[#7246A7] border border-black" />
            </button>
            <Link to="/dashboard">
              <button className="flex items-center gap-2 rounded-md border border-red-600/40 bg-red-600/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-600/20 hover:text-red-200 focus:outline-none focus:ring-1 focus:ring-red-600/60 transition-colors">
                <FontAwesomeIcon icon={faX} className="text-xs" />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
