import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
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
  } = useForm({
    defaultValues: {
      email: "demo@mindexec.com",
      password: "Mindexec123"
    }
  });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-wrap w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      <motion.div
        variants={itemVariants}
        className="hidden lg:flex w-full lg:w-1/2 min-h-screen bg-primary1 flex-col justify-center px-[7%] bg-gradient-primary relative">
        <h1 className="text-white text-[40px] font-bold ">
          Unleash your Scanning
          <br />
          Capabilities Using <span className="text-primary-light">MindExec</span>
        </h1>
        <p className="text-main mt-4 text-md">Empowering Security Engineers, Penetration Testers, and Bug Bounty Hunters to design their workflows using pre-configured tools in a mind map format and execute it easily.</p>
        <LoginSvg className="absolute bottom-0 left-0 pointer-events-none" />
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 min-h-screen bg-black flex justify-center items-center px-4 md:px-7 lg:px-10 py-10">
        <div className="w-full max-w-[440px]">
          <h2 className="text-[40px] text-main font-bold mb-10">Login to Your Account</h2>
          <form
            className="text-white text-lg flex flex-col justify-between items-center"
            onSubmit={handleSubmit(onSubmit, onError)}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              className="h-[54px] w-full rounded-lg border-gray-200 border-2 text-muted flex gap-[5px] items-center justify-center mb-8 hover:border-primary-light hover:bg-primary-light/5 transition-all duration-300">
              <GoogleLogo />
              <span className="text-xl">Log in with Google</span>
            </motion.button>
            <div className="flex justify-between items-center gap-4 w-full mb-8">
              <div className="border-b-2 border-gray-200 w-6/12 h-1"></div>
              <span className="text-gray-400">or</span>
              <div className="border-b-2 border-gray-200 w-6/12 h-1"></div>
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="email"
                className="text-left block mb-2 text-gray-300">
                Email
              </label>
              <motion.input
                disabled={isLoading}
                {...register("email", { required: "Email is required", validate: validateEmail })}
                id="email"
                className="w-full px-4 py-[14px] bg-transparent border-2 rounded-lg border-gray-200 focus:border-primary-light focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                type="email"
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.label
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={errorVariants}
                    className="text-left text-sm text-red-500 block max-w-full mt-2 overflow-hidden">
                    {errors.email.message}
                  </motion.label>
                )}
              </AnimatePresence>
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="password"
                className="text-left block mb-2 text-gray-300">
                Password
              </label>
              <motion.input
                disabled={isLoading}
                {...register("password", { required: "Password is required" })}
                id="password"
                className="w-full px-4 py-[14px] bg-transparent border-2 rounded-lg border-gray-200 focus:border-primary-light focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                type="password"
              />
              <AnimatePresence>
                {errors.password && (
                  <motion.label
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={errorVariants}
                    className="text-left text-sm text-red-500 block max-w-full mt-2 overflow-hidden">
                    {errors.password.message}
                  </motion.label>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className={`h-[54px] w-full rounded-lg flex items-center justify-center gap-2 bg-primary text-main transition-all duration-300 mb-8 ${
                isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary-light hover:shadow-lg hover:shadow-primary-light/30"
              }`}>
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Log in"
              )}
            </motion.button>

            <p className="text-[16px] text-gray-400">
              Don{`'`}t have an account? {" "}
              <Link to="/register">
                <span className="text-primary-light hover:underline font-bold transition-colors duration-200">Create one!</span>
              </Link>
            </p>
            {/* <div className="mt-8 py-4 rounded-lg w-[440px]">
              <p className="text-gray-100 font-medium mb-2">Demo Credentials:</p>
              <div className="text-sm text-gray-100">
                <p className="flex items-center gap-2">
                  Email: demo@mindexec.com
                  <Copy
                    className="w-4 h-4 cursor-pointer hover:text-gray-300"
                    onClick={() => {
                      navigator.clipboard.writeText("demo@mindexec.com");
                      toast("Email copied");
                    }}
                  />
                </p>
                <p className="flex items-center gap-2">
                  Password: Mindexec123
                  <Copy
                    className="w-4 h-4 cursor-pointer hover:text-gray-300"
                    onClick={() => {
                      navigator.clipboard.writeText("Mindexec123");
                      toast("Password copied");
                    }}
                  />
                </p>
              </div>
            </div> */}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;

export const LoginSvg = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="597"
      height="501"
      className={className}
      viewBox="0 0 597 501"
      fill="none">
      <g filter="url(#filter0_f_900_224)">
        <path
          d="M474.368 431.98L165.973 122.676C162.849 119.543 157.775 119.541 154.648 122.671L-154.329 431.952C-157.458 435.085 -157.449 440.163 -154.307 443.283L155.902 751.374C159.033 754.483 164.089 754.47 167.205 751.346L474.368 443.277C477.481 440.155 477.481 435.102 474.368 431.98Z"
          fill="url(#paint0_linear_900_224)"
          fillOpacity="0.64"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_900_224"
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
            result="effect1_foregroundBlur_900_224"
          />
        </filter>
        <linearGradient
          id="paint0_linear_900_224"
          x1="160"
          y1="117"
          x2="160"
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
