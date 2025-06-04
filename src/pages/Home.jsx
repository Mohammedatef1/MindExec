import { Link } from "react-router-dom";
import Logo from "../components/icons/MindExecLogo";
import HeroSection from "../components/Home/HeroSection";
import HomeFeature from "../components/Home/HomeFeature";

const Landing = () => {

  return (
    <div className="pb-10 max-w-screen text-white scrollbar">
      <nav className="px-4 md:px-[7%] pt-8 md:pt-11 flex justify-between items-center font-[Inter] z-10">
        <div>
          <Logo />
        </div>
        <div className="flex justify-between gap-3 md:gap-6 lg:gap-12 items-center">
          <Link to="/">About</Link>
          <Link to="/">Features</Link>
          <Link to="/">FAQ</Link>
        </div>
        <div className="flex justify-between gap-2 md:gap-4 lg:gap-8 items-center z-20 text-main">
          <Link to="/login">Log In</Link>
          <Link
            to="/register"
            className="px-4 py-2 md:px-6 md:py-3 rounded-lg border-gradient-primary">
            Sign Up
          </Link>
        </div>
      </nav>
      <HeroSection />
      <section className="card-section mx-6 md:mx-12 lg:mx-24 z-0 rounded-md p-2 md:p-6 lg:p-8 relative overflow-hidden">
        <div className="flex items-center gap-y-4 flex-wrap">
          <div className="w-full md:w-1/2 relative z-10">
            <div className="py-4 md:py-4 lg:py-12 ps-2 md:ps:10 lg:ps-16">
              <p className="text-primary-light text-xl font-[700]">Workflow Automation</p>
              <h2 className="text-4xl text-main font-[700] mt-[18px]">
                Build, Edit,
                <br /> and Run Workflows
              </h2>
              <p className="max-w-[630px] text-muted text-md mb-7 mt-[18px]">Evolve from the terminal to a specialised IDE for offensive security. Use Trickest’s library of tool nodes, import your own scripts, or drop in your favourite open-source tools – all in one place.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img className="w-full h-full object-contain max-h-80" src="work flow home.png" alt="" />
          </div>
        </div>
        <YellowShape />
      </section>
      <HomeFeature />
    </div>
  );
};

export default Landing;

const YellowShape = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="280"
      height="287"
      viewBox="0 0 280 287"
      fill="none"
      className="absolute top-0 left-0 z-[-1]">
      <g filter="url(#filter0_f_474_1013)">
        <path
          d="M157.368 54.5676L58.7674 -44.3237C55.6434 -47.4568 50.5695 -47.4593 47.4426 -44.3292L-51.3293 54.5398C-54.4585 57.6721 -54.4485 62.7502 -51.3071 65.8701L47.8736 164.374C51.0041 167.483 56.0609 167.47 59.1762 164.346L157.368 65.8646C160.481 62.7424 160.481 57.6899 157.368 54.5676Z"
          fill="#072586"
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
