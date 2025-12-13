import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";

const HeroSection = () => {
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
    <section className="pt-[150px] mb-16 md:mb-20 lg:mb-32 text-main relative">
      <MaxWidthWrapper className="relative z-10">
        <h2 className="text-4xl font-bold mb-[10px] text-main">
          MindExec. is an ideal solution
          <br /> for individuals working as
        </h2>
        {developerName === "Security Engineer" && <h2 className={`text-4xl font-bold custom-text glitch-color`}>{developerName}</h2>}
        {developerName === "Penetration Tester" && <h2 className={`text-4xl font-bold custom-text glitch-color`}>{developerName}</h2>}
        {developerName === "Bug Bounty Hunter" && <h2 className={`text-4xl font-bold custom-text glitch-color`}>{developerName}</h2>}
        {developerName === "DevSecOps Engineer" && <h2 className={`text-4xl font-bold custom-text glitch-color`}>{developerName}</h2>}
        <p className="mt-4 mb-8 text-[16px] max-w-[75%] text-muted">Empowering Security Engineers, Penetration Testers, and Bug Bounty Hunters to design their workflows using pre-configured tools in a mind map format and execute it easily.</p>
        <Link to="/login">
          <button className="px-6 py-3 font=[Inter] rounded-lg bg-primary">Get Started</button>
        </Link>
      </MaxWidthWrapper>
      <RedShape />
    </section>
  );
};

export default HeroSection;

const RedShape = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="669"
      height="874"
      viewBox="0 0 669 874"
      fill="none"
      className=" absolute -top-20 right-0 -z-1 pointer-events-none">
      <g filter="url(#filter0_f_474_987)">
        <path
          d="M751.368 431.98L442.973 122.676C439.849 119.543 434.775 119.541 431.648 122.671L122.671 431.952C119.542 435.085 119.551 440.163 122.693 443.283L432.902 751.374C436.033 754.483 441.089 754.47 444.205 751.346L751.368 443.277C754.481 440.155 754.481 435.102 751.368 431.98Z"
          fill="url(#paint0_linear_474_987)"
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
        <linearGradient
          id="paint0_linear_474_987"
          x1="437"
          y1="117"
          x2="437"
          y2="757"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#7246A7" />
          <stop
            offset="1"
            stopColor="#060606"
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
