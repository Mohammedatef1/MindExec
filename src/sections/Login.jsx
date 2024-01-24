import GoogleLogo from "../components/GoogleLogo";

const Login = () => {
  return (
    <div className="flex w-full">
      <div className="w-1/2 h-screen bg-primary1 flex flex-col justify-center px-[7%] bg-gradient-primary">
        <h1 className="text-white text-[40px] font-bold ">
          Unleash your Scannig
          <br />
          Capabilites Using <span className="text-red-primary">MindExec.</span>
        </h1>
        <p className="text-[#DEDEDE] mt-4 text-md">Empowering Security Engineers, Penetration Testers, and Bug Bounty Hunters to design their workflows using pre-configured tools in a mind map format and execute it easily.</p>
        <svg
          className="absolute bottom-0 left-0"
          xmlns="http://www.w3.org/2000/svg"
          width="597"
          height="501"
          viewBox="0 0 597 501"
          fill="none">
          <g filter="url(#filter0_f_246_330)">
            <path
              d="M474.368 431.98L165.973 122.676C162.849 119.543 157.775 119.541 154.648 122.671L-154.329 431.952C-157.458 435.085 -157.449 440.163 -154.307 443.283L155.902 751.374C159.033 754.483 164.089 754.47 167.205 751.346L474.368 443.277C477.481 440.155 477.481 435.102 474.368 431.98Z"
              fill="#770000"
              fillOpacity="0.64"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_246_330"
              x="-276.67"
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
                result="effect1_foregroundBlur_246_330"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="w-1/2 h-screen bg-black flex justify-center items-center">
        <div>
          <h2 className="text-[40px] text-gray-primary font-bold mb-10">Create Your MindExec. Account</h2>
          <form
            className="text-white text-lg flex flex-col justify-between items-center"
            onSubmit={(e) => {
              e.preventDefault();
            }}>
            <button className="h-[54px] w-[440px] rounded-lg border-gray-200 border-2 text-gray-primary flex gap-[5px] items-center justify-center mb-8">
              <GoogleLogo />
              <span className="text-xl">Log in with Google</span>
            </button>
            <div className="flex justify-between items-center gap-4 w-[440px] mb-8">
              <div className="border-b-2 border-gray-200 w-6/12 h-1"></div>
              <span>or</span>
              <div className="border-b-2 border-gray-200 w-6/12 h-1"></div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className=" text-left block mb-2">
                Username or Email
              </label>
              <input
                id="username"
                className="w-[440px] px-4 py-[14px] bg-transparent border-2 rounded-lg border-gray-200"
                type="text"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className=" text-left block mb-2">
                Password
              </label>
              <input
                id="password"
                className="w-[440px] px-4 py-[14px] bg-transparent border-2 rounded-lg border-gray-200"
                type="password"
              />
            </div>
            <button className="h-[54px] w-[440px] rounded-lg  text-gray-primary flex items-center justify-center bg-red-primary mb-8">Log in</button>
            <p className="text-[16px]">
              Doesn&apos;t have an account ? <span className="text-red-primary">Sign up</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
