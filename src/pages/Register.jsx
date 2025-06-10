import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, redirect } from "react-router-dom";
import { supabase } from "../client";
import GoogleLogo from "../components/icons/GoogleLogo";
import { LoginSvg } from "./Login";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

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
        redirect("/login");
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

  return (
    <div className="flex flex-wrap w-full relative">
      <div className="w-full lg:w-1/2 h-screen bg-primary1 flex flex-col justify-center px-[7%] bg-gradient-primary relative">
        <h1 className="text-white text-[40px] font-bold ">
          Unleash your Scanning
          <br />
          Capabilities Using <span className="text-primary-light">BUGSPY</span>
        </h1>
        <p className="text-main mt-4 text-md z-10">Empowering Security Engineers, Penetration Testers, and Bug Bounty Hunters to design their workflows using pre-configured tools in a mind map format and execute it easily.</p>
        <LoginSvg className="absolute bottom-0 left-0 pointer-events-none" />
      </div>
      <div className="w-full lg:w-1/2 h-screen bg-black flex justify-center items-center">
        <div>
          <h2 className="text-[40px] text-main font-bold mb-10">Create Your BUGSPY Account</h2>
          <form
            className="text-white text-lg flex flex-col justify-between items-center"
            onSubmit={handleSubmit(onSubmit, onError)}>
            <button className="h-[54px] w-[440px] rounded-lg border-gray-200 border-2 text-muted flex gap-[5px] items-center justify-center mb-8">
              <GoogleLogo />
              <span className="text-xl">Sign up with Google</span>
            </button>
            <div className="flex justify-between items-center gap-4 w-[440px] mb-8">
              <div className="border-b-2 border-gray-200 w-6/12 h-1"></div>
              <span>or</span>
              <div className="border-b-2 border-gray-200 w-6/12 h-1"></div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className=" text-left block mb-2">
                Full Name
              </label>
              <input
                disabled={isLoading}
                {...register("fullname", { required: "Full Name is required" })}
                id="fullname"
                className="w-[440px] px-4 py-[14px] bg-transparent border-2 rounded-lg border-gray-200"
                type="text"
              />
              {errors.fullname && <label className=" text-left text-sm text-red-500 block max-w-[400px] mt-2">{errors.fullname.message}</label>}
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
                {...register("password", { required: "Password is required", validate: validatePassword })}
                id="password"
                className="w-[440px] px-4 py-[14px] bg-transparent border-2 rounded-lg border-gray-200"
                type="password"
              />
              {errors.password && <label className=" text-left text-sm text-red-500 block max-w-[400px] mt-2">{errors.password.message}</label>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`h-[54px] w-[440px] rounded-lg flex items-center justify-center transition-opacity bg-primary text-main ${isLoading ? "opacity-60" : ""} mb-8`}>
              Sign up
            </button>

            <p className="text-[16px]">
              Already have an account ?{" "}
              <Link to="/login">
                <span className="text-primary-light hover:underline font-bold">Log in</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
