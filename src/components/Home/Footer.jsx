import Logo from "../icons/MindExecLogo";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import NavLinks from "./NavLinks";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="overflow-hidden relative">
      <MaxWidthWrapper>
        <div className=" mb-8 md:mb-16">
          <Logo />
        </div>
        <div className="flex items-center justify-between mb-12 md:mb-24">
          <NavLinks />
          <SocialIcons />
        </div>
        <div className="copyright flex justify-center">
          <p className="text-muted text-sm">All Rights reserved© 2025 BUGSPY</p>
        </div>
      </MaxWidthWrapper>
      <FooterIcon className="absolute bottom-0 right-0 w-10/12 md:w-2/3 h-auto -z-1" />
    </footer>
  );
};

export default Footer;

const FooterIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="921"
      height="400"
      viewBox="0 0 921 400"
      className={className}
      fill="none">
      <g filter="url(#filter0_f_1043_1585)">
        <path
          d="M1031.37 384.98L722.973 75.6763C719.849 72.5432 714.775 72.5407 711.648 75.6708L402.671 384.952C399.542 388.085 399.551 393.163 402.693 396.283L712.902 704.374C716.033 707.483 721.089 707.47 724.205 704.346L1031.37 396.277C1034.48 393.155 1034.48 388.102 1031.37 384.98Z"
          fill="url(#paint0_linear_1043_1585)"
          fillOpacity="0.64"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1043_1585"
          x="0.330322"
          y="-326.675"
          width="1433.37"
          height="1433.37"
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
            stdDeviation="200"
            result="effect1_foregroundBlur_1043_1585"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1043_1585"
          x1="717"
          y1="70"
          x2="717"
          y2="710"
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
