import { faBell, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import MindExecLogo from "../icons/MindExecLogo";

function Nav() {
  const ctx = useContext(AppContext);

  return (
    <header className="border-b-2 border-red-900 w-full">
      <nav className="flex items-center text-white-400 bg-primary1">
        <div className="w-1/5 p-4 flex items-center justify-around">
          <Link to="/">
            <MindExecLogo />
          </Link>
          <div className="flex items-center justify-center ps-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none">
              <path
                d="M22.1413 3.54422L36.4759 17.9211C37.6433 19.092 37.6433 20.9866 36.4759 22.1575L22.2085 36.4669C21.0403 37.6386 19.144 37.6432 17.9701 36.4773L3.55112 22.1568C2.3731 20.9868 2.36937 19.0825 3.5428 17.9079L17.8945 3.54214C19.0671 2.36836 20.9698 2.36929 22.1413 3.54422Z"
                fill="#0E0E0E"
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
            <p className="text-white font-bold text-md ms-2 me-4">Fuzz web app</p>{" "}
          </div>
        </div>
        <div className="w-3/5 flex justify-center mt-auto">
          <button
            onClick={() => {
              ctx.setBuilder(true);
              ctx.setShowLeft(true);
            }}
            className={`uppercase border-2 rounded-tl-[4px] active  border-black px-12 py-2  ${ctx.builder ? "text-white bg-black" : "text-gray-200 "}`}>
            Builder
          </button>
          <button
            onClick={() => {
              ctx.setBuilder(false);
              ctx.setShowLeft(false);
            }}
            className={`uppercase border-2 rounded-tl-[4px]  active border-black px-12 py-2  ${!ctx.builder ? "text-white bg-black" : "text-gray-200 flex "} flex items-center gap-2 justify-between relative`}>
            <label>runs</label>
            {ctx.runStart && (
              <div className="loading-container transition-curtain absolute right-3 inline">
                <div
                  style={{ width: "25px", height: "25px" }}
                  className="loading-circle"></div>
              </div>
            )}
          </button>
        </div>
        <div className="w-1/5 p-4 flex items-center justify-end gap-6">
          <FontAwesomeIcon
            className=""
            icon={faBell}
          />
          <FontAwesomeIcon
            className="me-6 bg-black rounded-sm p-[4px] w-4 h-4"
            icon={faX}
          />
        </div>
      </nav>
    </header>
  );
}

export default Nav;
