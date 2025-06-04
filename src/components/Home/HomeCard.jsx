const HomeCard = () => {
  return (
    <section>
      <div className="container mx-auto card-section z-0 rounded-md p-2 md:p-6 lg:p-8 relative overflow-hidden">
        <div className="flex items-center gap-y-4 flex-wrap">
          <div className="w-full md:w-1/2 relative z-10">
            <div className="py-4 md:py-4 lg:py-12 ps-2 md:ps:10 lg:ps-16">
              <p className="text-primary-light text-xl font-bold">Workflow Automation</p>
              <h2 className="text-heading text-main font-bold mt-[18px]">
                Build, Edit, and Run Workflows
              </h2>
              <p className="max-w-[630px] text-muted text-md mb-7 mt-[18px]">Evolve from the terminal to a specialized IDE for offensive security. Use BugSpy’s library of tool nodes, import your own scripts, or drop in your favorite open-source tools – all in one place.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-full object-contain max-h-80"
              src="work flow home.png"
              alt=""
            />
          </div>
        </div>
        <YellowShape />
      </div>
    </section>
  );
};

export default HomeCard;

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
