import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MindExecLogo from "../components/icons/MindExecLogo";

const Landing = () => {
  const [developerName, setDeveloperName] = useState("Security Engineer");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDeveloperName((prevName) => {
        switch (prevName) {
          case "Security Engineer":
            return "Penetration Tester";
          case "Penetration Tester":
            return "Bug Bounty Hunter";
          case "Bug Bounty Hunter":
            return "DevSecOps Engineer";
          case "DevSecOps Engineer":
            return "Security Engineer";
          default:
            return prevName;
        }
      });
    }, 2000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="pb-10 max-w-screen text-white scrollbar bg-[#060606]">
      <nav className="px-4 md:px-[7%] pt-8 md:pt-11 flex justify-between items-center font-[Inter] z-10">
        <div className="flex justify-between items-center">
          <MindExecLogo />
        </div>
        <div className="flex justify-between gap-3 md:gap-6 lg:gap-12 items-center">
          <Link to="/">About</Link>
          <Link to="/">Features</Link>
          <Link to="/">FAQ</Link>
        </div>
        <div className="flex justify-between gap-2 md:gap-4 lg:gap-8 items-center z-20 text-[#dedede]">
          <Link to="/login">Log In</Link>
          <Link
            to="/register"
            className="px-4 py-2 md:px-6 md:py-3 rounded-lg border-gradient-primary">
            Sign Up
          </Link>
        </div>
      </nav>
      <div className="pt-[150px] mb-24 md:mb-48 lg:mb-[352px] text-[#dedede] relative">
        <div className="ps-4 md:ps-[7%] w-4/5 md:w-3/5 relative z-10">
          <h2 className="text-4xl font-[700] mb-[10px]">
            MindExec. is an ideal solution
            <br /> for individuals working as
          </h2>
          {developerName === "Security Engineer" && <h2 className={`text-4xl font-[700] custom-text glitch-color`}>{developerName}</h2>}
          {developerName === "Penetration Tester" && <h2 className={`text-4xl font-[700] custom-text glitch-color`}>{developerName}</h2>}
          {developerName === "Bug Bounty Hunter" && <h2 className={`text-4xl font-[700] custom-text glitch-color`}>{developerName}</h2>}
          {developerName === "DevSecOps Engineer" && <h2 className={`text-4xl font-[700] custom-text glitch-color`}>{developerName}</h2>}
          <p className="mt-4 mb-8 text-[16px] max-w-[75%]">Empowering Security Engineers, Penetration Testers, and Bug Bounty Hunters to design their workflows using pre-configured tools in a mind map format and execute it easily.</p>
          <Link to="/login">
            <button className="px-6 py-3 font=[Inter] rounded-lg bg-red-primary">Get Started</button>
          </Link>
        </div>
        <RedShape />
      </div>
      <section className="mx-6 md:mx-12 lg:mx-24 z-0 rounded-md p-4 md:p-7 lg:p-12 bg-[#ffffff14] relative overflow-hidden">
        <div className="z-10">
          <p className="text-[#700] text-xl font-[700]">Workflow Automation</p>
          <h2 className="text-4xl text-[#dedede] font-[700] mt-[18px]">
            Build, Edit,
            <br /> and Run Workflows
          </h2>
          <p className="max-w-[630px] text-[#dedede] text-md mb-7 mt-[18px]">Evolve from the terminal to a specialised IDE for offensive security. Use Trickest’s library of tool nodes, import your own scripts, or drop in your favourite open-source tools – all in one place.</p>
        </div>
        <YellowShape />
      </section>
    </div>
  );
};

export default Landing;

const RedShape = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="665"
      height="874"
      viewBox="0 0 665 874"
      className=" absolute -top-20 right-0 z-[0]"
      fill="none">
      <g filter="url(#filter0_f_474_987)">
        <path
          d="M751.368 431.98L442.973 122.676C439.849 119.543 434.775 119.541 431.648 122.671L122.671 431.952C119.542 435.085 119.551 440.163 122.693 443.283L432.902 751.374C436.033 754.483 441.089 754.47 444.205 751.346L751.368 443.277C754.481 440.155 754.481 435.102 751.368 431.98Z"
          fill="#770000"
          fillOpacity="0.64"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_474_987"
          x="0.330322"
          y="0.324829"
          width="873.373"
          height="873.373"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood
            floodOpacity="0"
            result="BackgroundImageFix"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="60"
            result="effect1_foregroundBlur_474_987"
          />
        </filter>
      </defs>
    </svg>
  );
};

const YellowShape = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="280"
      height="287"
      viewBox="0 0 280 287"
      className="absolute top-0 left-0 z-[-1]"
      fill="none">
      <g filter="url(#filter0_f_474_1013)">
        <path
          d="M157.368 54.5676L58.7674 -44.3237C55.6434 -47.4568 50.5695 -47.4593 47.4426 -44.3292L-51.3293 54.5398C-54.4585 57.6721 -54.4485 62.7502 -51.3071 65.8701L47.8736 164.374C51.0041 167.483 56.0609 167.47 59.1762 164.346L157.368 65.8646C160.481 62.7424 160.481 57.6899 157.368 54.5676Z"
          fill="#FEA82F"
          fillOpacity="0.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_474_1013"
          x="-173.67"
          y="-166.675"
          width="453.373"
          height="453.373"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood
            floodOpacity="0"
            result="BackgroundImageFix"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="60"
            result="effect1_foregroundBlur_474_1013"
          />
        </filter>
      </defs>
    </svg>
  );
};
