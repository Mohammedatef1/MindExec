import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import LoginSvg from "../components/icons/LoginSvg";
// import GoogleLogo from "../components/icons/GoogleLogo";


const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setIsLoading(true);

    const promise = supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullname,
        },
      },
    });

    toast.promise(
      promise.then(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data;
      }),
      {
        loading: "Creating Account...",
        success: "Account created successfully. Please check your email to verify your account.",
        error: (err) => `Error: ${err.message || "Creating account failed."}`,
      }
    );

    try {
      const { data, error } = await promise;

      if (error) {
        throw error;
      }
      if (data) {
        console.log(data);
        navigate("/login", { replace: true });
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

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumber) {
      return "Password must contain at least one number";
    }
    return true;
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
    <div
      className="flex flex-wrap w-full relative">
      <div
        className="hidden lg:flex w-full lg:w-1/2 min-h-screen bg-primary1 flex-col justify-center px-[7%] bg-gradient-primary relative">
        <h1 className="text-white text-[40px] font-bold ">
          Unleash your Scanning
          <br />
          Capabilities Using <span className="text-primary-light">MindExec</span>
        </h1>
        <p className="text-main mt-4 text-md z-10">Empowering Security Engineers, Penetration Testers, and Bug Bounty Hunters to design their workflows using pre-configured tools in a mind map format and execute it easily.</p>
        <LoginSvg className="absolute bottom-0 left-0 pointer-events-none" />
      </div>
      <div
        className="w-full lg:w-1/2 min-h-screen bg-black flex justify-center items-center px-4 md:px-7 lg:px-10 py-10">
        <div className="w-full max-w-[440px]">
          <h2 className="text-[40px] text-main font-bold mb-10">Create Your Account</h2>
          <form
            className="text-white text-lg flex flex-col justify-between items-center"
            onSubmit={handleSubmit(onSubmit, onError)}>
            {/* TODO: implement google sign in */}
            {/* <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              className="h-[54px] w-full rounded-lg border-gray-200 border-2 text-muted flex gap-[5px] items-center justify-center mb-8 hover:border-primary-light hover:bg-primary-light/5 transition-all duration-300">
              <GoogleLogo />
              <span className="text-xl">Sign up with Google</span>
            </motion.button>
            <div className="flex justify-between items-center gap-4 w-full mb-8">
              <div className="border-b-2 border-gray-200 w-6/12 h-1"></div>
              <span className="text-gray-400">or</span>
              <div className="border-b-2 border-gray-200 w-6/12 h-1"></div>
            </div> */}

            <div className="mb-4 w-full">
              <label
                htmlFor="fullname"
                className="text-left block mb-2 text-gray-300">
                Full Name
              </label>
              <motion.input
                disabled={isLoading}
                {...register("fullname", { required: "Full Name is required" })}
                id="fullname"
                className="w-full px-4 py-[14px] bg-transparent border-2 rounded-lg border-gray-200 focus:border-primary-light focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                type="text"
              />
              <AnimatePresence>
                {errors.fullname && (
                  <motion.label
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={errorVariants}
                    className="text-left text-sm text-red-500 block max-w-full mt-2 overflow-hidden">
                    {errors.fullname.message}
                  </motion.label>
                )}
              </AnimatePresence>
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
                {...register("password", { required: "Password is required", validate: validatePassword })}
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
                isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary-light hover:shadow-lg"
              }`}>
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                "Sign up"
              )}
            </motion.button>

            <p className="text-[16px] text-gray-400">
              Already have an account ?{" "}
              <Link to="/login">
                <span className="text-primary-light hover:underline font-bold transition-colors duration-200">Log in</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
