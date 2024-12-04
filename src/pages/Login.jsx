import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import GoogleLogo from "../components/icons/GoogleLogo";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setIsLoading(true);

    const promise = supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    toast.promise(
      promise.then(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data;
      }),
      {
        loading: "Logging in...",
        success: "Login successfully.",
        error: (err) => `Error: ${err.message || "Login failed."}`,
      }
    );

    try {
      const { data, error } = await promise;

      if (error) {
        throw error;
      }
      if (data) {
        console.log(data);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (e) => {
    console.log(errors, e);
  };

  const validateEmail = (email) => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Z]{2,4}$/i;

    // Check if the email matches the regular expression
    if (emailRegex.test(email)) {
      return true;
    } else {
      return "Invalid email address.";
    }
  };

  return (
    <div className="flex flex-wrap w-full">
      <div className="w-full lg:w-1/2 h-screen bg-primary1 flex flex-col justify-center px-[7%] bg-gradient-primary relative">
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
      <div className="w-full lg:w-1/2 h-screen bg-black flex justify-center items-center">
        <div>
          <h2 className="text-[40px] text-gray-primary font-bold mb-10">Create Your MindExec. Account</h2>
          <form
            className="text-white text-lg flex flex-col justify-between items-center"
            onSubmit={handleSubmit(onSubmit, onError)}>
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
                htmlFor="email"
                className=" text-left block mb-2">
                Email
              </label>
              <input
                disabled={isLoading}
                {...register("email", { required: "Email is required", validate: validateEmail })}
                id="email"
                className="w-[440px] px-4 py-[14px] bg-transparent border-2 rounded-lg border-gray-200"
                type="email"
              />
              {errors.email && <label className=" text-left text-sm text-red-500 block max-w-[400px] mt-2">{errors.email.message}</label>}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className=" text-left block mb-2">
                Password
              </label>
              <input
                disabled={isLoading}
                {...register("password", { required: "Password is required" })}
                id="password"
                className="w-[440px] px-4 py-[14px] bg-transparent border-2 rounded-lg border-gray-200"
                type="password"
              />
              {errors.password && <label className=" text-left text-sm text-red-500 block max-w-[400px] mt-2">{errors.password.message}</label>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`h-[54px] w-[440px] rounded-lg  flex items-center justify-center transition-all ${isLoading ? "bg-[#77000075] text-[#dedede82] " : "bg-red-primary text-gray-primary"} mb-8`}>
              Log in
            </button>

            <Link to="/register">
              <p className="text-[16px]">
                Dosnot have an account? <span className="text-red-primary">Create one!</span>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
