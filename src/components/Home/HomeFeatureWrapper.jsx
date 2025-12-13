import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import HomeFeature from "./HomeFeature";
const vulnerabilityDetected = "/vulnerability detected.png";
const Rectangle = "/Rectangle.png";
const subtract = "/Subtract.png";

const features = [
  {
    heading: "Real-Time Vulnerability Detection",
    content: "MindExec scans your web app instantly, identifying threats like SQL injection, XSS, and misconfigurations as they happen. You get fast, actionable insights without waiting.",
    reverseOrder: true,
    sideImage: Rectangle, 
  },
  {
    heading: "Manual & Automated Testing",
    content: "Switch seamlessly between hands-free automated scans and expert-level manual testing. Perfect for quick checks or deep, customized analysis.",
    reverseOrder: false,
    sideImage: subtract,
  },
  {
    heading: "Actionable Security Reports with Fixes.",
    content: "Receive clean, prioritized reports highlighting each issue's severity and clear recommendations for resolution. Designed for both developers and non-experts.",
    reverseOrder: true,
    sideImage: vulnerabilityDetected,
  },
];

const HomeFeatureWrapper = () => {
  return (
    <div className="relative">
      <div className="relative z-10 py-20 md:py-28 lg:py-32">
        <MaxWidthWrapper className="flex flex-col gap-y-4 md:gap-y-8 lg:gap-y-12">
          {features.map((feature, idx) => (
            <HomeFeature
              key={idx}
              {...feature}
            />
          ))}
        </MaxWidthWrapper>
      </div>
      <RightShape className="absolute bottom-0 translate-y-1/4 right-0 max-w-full" />
      <LeftShape className="absolute top-0 -translate-y-[10%] left-0 max-w-full" />
    </div>
  );
};

export default HomeFeatureWrapper;

function LeftShape({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="759"
      height="1434"
      className={className}
      viewBox="0 0 759 1434"
      fill="none">
      <g filter="url(#filter0_f_1025_454)">
        <path
          d="M356.368 711.98L47.9731 402.676C44.8491 399.543 39.7752 399.541 36.6482 402.671L-272.329 711.952C-275.458 715.085 -275.449 720.163 -272.307 723.283L37.9019 1031.37C41.0325 1034.48 46.0893 1034.47 49.2046 1031.35L356.368 723.277C359.481 720.155 359.481 715.102 356.368 711.98Z"
          fill="url(#paint0_linear_1025_454)"
          fillOpacity="0.64"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1025_454"
          x="-674.67"
          y="0.324829"
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
            result="effect1_foregroundBlur_1025_454"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1025_454"
          x1="42"
          y1="397"
          x2="42"
          y2="1037"
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
}

function RightShape({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="347"
      height="610"
      className={className}
      viewBox="0 0 347 610"
      fill="none">
      <g filter="url(#filter0_f_1031_1258)">
        <path
          d="M487.368 299.721L310.844 122.676C307.72 119.543 302.646 119.541 299.519 122.671L122.671 299.693C119.542 302.825 119.551 307.903 122.693 311.023L300.256 487.374C303.386 490.483 308.443 490.47 311.558 487.346L487.368 311.018C490.481 307.896 490.481 302.843 487.368 299.721Z"
          fill="#072586"
          fillOpacity="0.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1031_1258"
          x="0.330322"
          y="0.324829"
          width="609.373"
          height="609.372"
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
            result="effect1_foregroundBlur_1031_1258"
          />
        </filter>
      </defs>
    </svg>
  );
}
