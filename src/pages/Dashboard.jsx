import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import MindExecLogo from "../components/icons/MindExecLogo";
import useActiveUser from '../hooks/useActiveUser';

const Dashboard = () => {
  const [activeSec, setActiveSec] = useState("home");
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const getInitials = (name) => {
    if (!name) return ""; // Handle empty input
  
    const words = name.trim().split(/\s+/); // Split the name into words by spaces
    if (words.length >= 2) {
      // If there are 2 or more words, return the first letter of the first and second words
      return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    } else {
      // If there is only one word, return the first 2 letters
      return name.slice(0, 2).toUpperCase();
    }
  }

  const capitalize = (word) => {
    if (!word) return ""; // Handle empty input
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  const { user } = useActiveUser();

  return (
    <div className="bg-primary1">
      <nav className="flex justify-between items-center border-b-[1px] border-red-primary p-[19px]">
        <div>
          <MindExecLogo />
        </div>
        <div className="flex justify-center items-center me-2 text-[#DEDEDE] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="me-6"
            fill="none">
            <path
              d="M8.645 20.5C8.86103 21.2219 9.30417 21.8549 9.90858 22.3049C10.513 22.755 11.2464 22.998 12 22.998C12.7536 22.998 13.487 22.755 14.0914 22.3049C14.6958 21.8549 15.139 21.2219 15.355 20.5H8.645ZM3 19.5H21V16.5L19 13.5V8.5C19 7.58075 18.8189 6.6705 18.4672 5.82122C18.1154 4.97194 17.5998 4.20026 16.9497 3.55025C16.2997 2.90024 15.5281 2.38463 14.6788 2.03284C13.8295 1.68106 12.9193 1.5 12 1.5C11.0807 1.5 10.1705 1.68106 9.32122 2.03284C8.47194 2.38463 7.70026 2.90024 7.05025 3.55025C6.40024 4.20026 5.88463 4.97194 5.53284 5.82122C5.18106 6.6705 5 7.58075 5 8.5V13.5L3 16.5V19.5Z"
              fill="black"
            />
            <circle
              cx="17"
              cy="4"
              r="3"
              fill="#770000"
            />
          </svg>
          <button onClick={signOut}>Log out</button>
          <p className="p-[6px] me-2 leading-[110%] bg-[#060606] rounded-sm text-[20px]">{getInitials(user?.user.user_metadata.full_name)}</p>
          <p className="text-[18px]">{capitalize(user?.user.user_metadata.full_name)}</p>
        </div>
      </nav>
      <div className="flex">
        <div className="h-[calc(100vh-73px)] w-[96px] border-r-[1px]  border-red-primary">
          <div className="flex flex-col justify-between items-center h-full">
            <ul className="w-full">
              <li
                onClick={() => {
                  setActiveSec("home");
                }}
                className={`flex flex-col transition-primary cursor-pointer justify-between items-center  py-[20px] ${activeSec == "home" ? "bg-[#77000033]" : ""} `}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none">
                  <path
                    d="M13.895 2.77699C14.4826 2.27746 15.2287 2.00317 16 2.00317C16.7713 2.00317 17.5174 2.27746 18.105 2.77699L27.855 11.064C28.2139 11.3691 28.5021 11.7485 28.6999 12.176C28.8976 12.6036 29 13.069 29 13.54V26.5C29 27.163 28.7366 27.7989 28.2678 28.2678C27.7989 28.7366 27.163 29 26.5 29H22.5C21.837 29 21.2011 28.7366 20.7322 28.2678C20.2634 27.7989 20 27.163 20 26.5V20C20 19.4711 19.7905 18.9638 19.4174 18.589C19.0443 18.2141 18.5379 18.0024 18.009 18H13.99C13.4613 18.0026 12.9552 18.2145 12.5822 18.5893C12.2093 18.9641 12 19.4713 12 20V26.5C12 26.8283 11.9353 27.1534 11.8097 27.4567C11.6841 27.76 11.4999 28.0356 11.2678 28.2678C11.0356 28.4999 10.76 28.6841 10.4567 28.8097C10.1534 28.9353 9.8283 29 9.5 29H5.5C4.83696 29 4.20107 28.7366 3.73223 28.2678C3.26339 27.7989 3 27.163 3 26.5V13.54C3.00003 13.069 3.10244 12.6036 3.30014 12.176C3.49785 11.7485 3.78612 11.3691 4.145 11.064L13.895 2.77699Z"
                    fill="#DEDEDE"
                  />
                </svg>
                <p className="text-[#DEDEDE] mt-1 text-[12px]">Home</p>
              </li>
              <li
                onClick={() => {
                  setActiveSec("workflow");
                }}
                className={`flex flex-col transition-primary justify-between items-center py-[20px] cursor-pointer ${activeSec == "workflow" ? "bg-[#77000033]" : ""} `}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="22"
                  viewBox="0 0 30 22"
                  fill="none">
                  <path
                    d="M29.3009 10.3172L19.7701 0.714422C19.3792 0.320616 18.7425 0.320304 18.3513 0.713727L8.80457 10.3137C8.41559 10.7049 8.41683 11.3371 8.80734 11.7268L18.3942 21.2918C18.7859 21.6826 19.4205 21.6811 19.8102 21.2884L29.3009 11.7261C29.6879 11.3361 29.6879 10.7071 29.3009 10.3172Z"
                    fill="#DEDEDE"
                  />
                  <path
                    d="M10.9308 5.56137C10.9308 5.8272 10.8257 6.08214 10.6386 6.2701L6.61693 10.3102C6.22731 10.7016 6.22731 11.3363 6.61693 11.7277L10.6385 15.7677C10.8256 15.9557 10.9308 16.2106 10.9308 16.4765L10.9308 19.5801C10.9308 20.4731 9.85611 20.9203 9.22759 20.2889L0.705514 11.7276C0.315886 11.3362 0.315885 10.7016 0.705514 10.3102L9.2276 1.74897C9.85612 1.11757 10.9308 1.56475 10.9308 2.4577L10.9308 5.56137Z"
                    fill="#DEDEDE"
                  />
                </svg>
                <p className="text-[#DEDEDE] mt-2 text-[12px]">Workflows</p>
              </li>
              <li
                onClick={() => {
                  setActiveSec("allRuns");
                }}
                className={`flex transition-primary flex-col justify-between items-center  py-[20px] cursor-pointer ${activeSec == "allRuns" ? "bg-[#77000033]" : ""} `}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none">
                  <path
                    d="M18.8607 10.5222L3.04265 0.858782C1.70994 0.0446149 0 1.00377 0 2.5655V19.8215C0 21.2942 1.53779 22.2619 2.86546 21.6246L18.6835 14.0319C20.1129 13.3458 20.2137 11.3487 18.8607 10.5222Z"
                    fill="#D9D9D9"
                  />
                </svg>
                <p className="text-[#DEDEDE] mt-2 text-[12px]">All Runs</p>
              </li>
            </ul>
            <ul className="w-full mb-10">
              <li className="flex flex-col justify-between items-center py-[20px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0627 10.056H20.9373C25.436 10.056 27.6867 10.056 28.9507 11.372C30.2133 12.688 29.916 14.72 29.3213 18.7854L28.7587 22.6414C28.292 25.8294 28.0587 27.424 26.8627 28.3787C25.6667 29.3334 23.9027 29.3334 20.3733 29.3334H12.6267C9.09867 29.3334 7.33333 29.3334 6.13734 28.3787C4.94133 27.424 4.708 25.8294 4.24133 22.6414L3.67867 18.7854C3.08267 14.72 2.78533 12.688 4.04933 11.372C5.31333 10.056 7.564 10.056 12.0627 10.056ZM11.1667 24C11.1667 23.448 11.664 23 12.2773 23H20.7227C21.336 23 21.8333 23.448 21.8333 24C21.8333 24.552 21.336 25 20.7227 25H12.2773C11.664 25 11.1667 24.552 11.1667 24Z"
                    fill="#DEDEDE"
                  />
                  <path
                    opacity="0.4"
                    d="M11.8467 2.66663H21.1533C21.464 2.66663 21.7 2.66663 21.9093 2.68663C23.3867 2.83196 24.5947 3.71996 25.108 4.91596H7.892C8.40533 3.71996 9.61466 2.83196 11.092 2.68663C11.2987 2.66663 11.5373 2.66663 11.8467 2.66663Z"
                    fill="#DEDEDE"
                  />
                  <path
                    opacity="0.7"
                    d="M8.91334 6.29736C7.06 6.29736 5.54 7.41736 5.03334 8.90136C5.02223 8.93232 5.01156 8.96344 5.00134 8.9947C5.53876 8.83759 6.08815 8.72477 6.644 8.65736C8.084 8.47336 9.90534 8.47336 12.02 8.47336H21.2093C23.324 8.47336 25.1453 8.47336 26.5853 8.65736C27.1453 8.72936 27.6973 8.8347 28.228 8.9947C28.2182 8.96345 28.208 8.93234 28.1973 8.90136C27.6907 7.41603 26.1707 6.29736 24.316 6.29736H8.91334Z"
                    fill="#DEDEDE"
                  />
                </svg>
                <p className="text-[#DEDEDE] mt-1 text-[12px]">Library</p>
              </li>
              <li className="flex flex-col justify-between items-center  py-[20px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none">
                  <path
                    d="M16.5 19C18.1569 19 19.5 17.6569 19.5 16C19.5 14.3431 18.1569 13 16.5 13C14.8431 13 13.5 14.3431 13.5 16C13.5 17.6569 14.8431 19 16.5 19Z"
                    fill="#DEDEDE"
                  />
                  <path
                    d="M29.8994 18.75L29.87 18.7262L27.8975 17.1794C27.7726 17.0806 27.6729 16.9535 27.6066 16.8087C27.5403 16.6639 27.5094 16.5054 27.5163 16.3463V15.6237C27.51 15.4656 27.5413 15.3083 27.6077 15.1647C27.6741 15.021 27.7736 14.8952 27.8981 14.7975L29.87 13.25L29.8994 13.2262C30.2035 12.9729 30.4076 12.6197 30.4751 12.2297C30.5427 11.8397 30.4693 11.4384 30.2681 11.0975L27.5987 6.47875C27.5957 6.47439 27.593 6.46979 27.5906 6.465C27.3884 6.12885 27.0748 5.87416 26.7043 5.74514C26.3338 5.61613 25.9298 5.62094 25.5625 5.75875L25.5406 5.76687L23.2219 6.7C23.0755 6.75917 22.9172 6.78272 22.76 6.7687C22.6027 6.75469 22.4511 6.7035 22.3175 6.61938C22.1125 6.49021 21.9042 6.36812 21.6925 6.25313C21.5553 6.17871 21.4374 6.07307 21.3485 5.94475C21.2596 5.81643 21.2021 5.66901 21.1806 5.51438L20.8312 3.04L20.8237 2.995C20.7477 2.61175 20.542 2.26636 20.2413 2.01687C19.9406 1.76738 19.5632 1.62901 19.1725 1.625H13.8275C13.4313 1.62627 13.0482 1.76732 12.7458 2.02331C12.4434 2.27931 12.241 2.63381 12.1744 3.02437L12.1687 3.05938L11.8206 5.53875C11.7993 5.69294 11.7422 5.84001 11.654 5.96827C11.5658 6.09652 11.4488 6.20241 11.3125 6.2775C11.1002 6.39184 10.8918 6.51315 10.6875 6.64125C10.5542 6.72487 10.4029 6.77566 10.2461 6.78946C10.0893 6.80325 9.93152 6.77966 9.78563 6.72062L7.465 5.78312L7.44312 5.77437C7.07529 5.63642 6.67073 5.63179 6.29983 5.76128C5.92893 5.89078 5.61516 6.1462 5.41313 6.48313L5.405 6.49687L2.73187 11.1187C2.53039 11.46 2.45686 11.8617 2.52441 12.2522C2.59197 12.6426 2.79622 12.9963 3.10062 13.25L3.13 13.2738L5.1025 14.8206C5.22741 14.9194 5.3271 15.0465 5.39338 15.1913C5.45965 15.3361 5.49063 15.4946 5.48375 15.6538V16.3762C5.49001 16.5344 5.45866 16.6917 5.39227 16.8353C5.32588 16.979 5.22636 17.1048 5.10187 17.2025L3.13 18.75L3.10062 18.7738C2.79652 19.0271 2.59244 19.3803 2.52488 19.7703C2.45732 20.1603 2.5307 20.5616 2.73187 20.9025L5.40125 25.5212C5.40432 25.5256 5.40704 25.5302 5.40938 25.535C5.61164 25.8711 5.92524 26.1258 6.29573 26.2549C6.66622 26.3839 7.07019 26.3791 7.4375 26.2412L7.45937 26.2331L9.77625 25.3C9.9226 25.2408 10.0809 25.2173 10.2382 25.2313C10.3954 25.2453 10.547 25.2965 10.6806 25.3806C10.8856 25.5102 11.094 25.6323 11.3056 25.7469C11.4429 25.8213 11.5607 25.9269 11.6496 26.0552C11.7385 26.1836 11.796 26.331 11.8175 26.4856L12.165 28.96L12.1725 29.005C12.2487 29.3889 12.4549 29.7347 12.7564 29.9843C13.0578 30.2339 13.4361 30.3718 13.8275 30.375H19.1725C19.5687 30.3737 19.9518 30.2327 20.2542 29.9767C20.5566 29.7207 20.759 29.3662 20.8256 28.9756L20.8312 28.9406L21.1794 26.4613C21.2011 26.3068 21.2586 26.1595 21.3474 26.0312C21.4361 25.903 21.5537 25.7972 21.6906 25.7225C21.9044 25.6075 22.1131 25.4856 22.3156 25.3587C22.449 25.2751 22.6002 25.2243 22.757 25.2105C22.9138 25.1967 23.0716 25.2203 23.2175 25.2794L25.5381 26.2138L25.56 26.2225C25.9278 26.3607 26.3325 26.3655 26.7034 26.236C27.0744 26.1064 27.3881 25.8509 27.59 25.5138C27.5925 25.509 27.5952 25.5044 27.5981 25.5L30.2675 20.8819C30.4693 20.5407 30.5432 20.1388 30.4757 19.7482C30.4083 19.3576 30.2039 19.0037 29.8994 18.75ZM21.4944 16.235C21.4489 17.2029 21.1231 18.1366 20.5567 18.9228C19.9904 19.709 19.2078 20.3136 18.3041 20.6633C17.4005 21.0129 16.4147 21.0924 15.4667 20.8922C14.5187 20.692 13.6492 20.2206 12.9641 19.5355C12.2791 18.8503 11.8078 17.9808 11.6077 17.0328C11.4076 16.0847 11.4872 15.099 11.837 14.1954C12.1867 13.2917 12.7915 12.5092 13.5777 11.9429C14.3639 11.3767 15.2978 11.051 16.2656 11.0056C16.9605 10.975 17.6541 11.0894 18.3024 11.3413C18.9506 11.5933 19.5394 11.9775 20.0312 12.4693C20.5229 12.9611 20.907 13.5499 21.1589 14.1982C21.4108 14.8465 21.5251 15.5402 21.4944 16.235Z"
                    fill="#DEDEDE"
                  />
                </svg>
                <p className="text-[#DEDEDE] mt-1 text-[12px]">Setting</p>
              </li>
            </ul>
          </div>
        </div>
        {activeSec == "home" && (
          <div className="w-full p-6 bg-[#060606] flex gap-6">
            <div className="w-3/5 border-2 rounded-lg border-red-primary shadow-red-primary flex flex-col  items-center ">
              <div className="mt-11 relative w-full">
                <p className="text-gray-200 text-center">Latest Runs</p>
                <p className="text-gray-200 absolute -top-1 right-6 underline underline-offset-2">view all</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="189"
                height="188"
                viewBox="0 0 189 188"
                className="my-6"
                fill="none">
                <g filter="url(#filter0_d_351_141)">
                  <path
                    d="M99.5298 20.3824L168.16 89.2147C170.884 91.9467 170.884 96.3676 168.16 99.0996L99.8211 167.64C97.0952 170.374 92.6706 170.385 89.9313 167.664L20.8976 99.1016C18.1488 96.3717 18.1401 91.9284 20.8781 89.1877L89.6206 20.3775C92.3568 17.6387 96.7964 17.6409 99.5298 20.3824Z"
                    fill="#0E0E0E"
                    stroke="#770000"
                    strokeWidth="2"
                  />
                  <path
                    d="M154.351 91.2989L97.3912 34.1715C95.8292 32.605 93.2923 32.6037 91.7288 34.1687L34.6687 91.285C33.1041 92.8511 33.1091 95.3902 34.6798 96.9502L91.9743 153.853C93.5396 155.408 96.068 155.402 97.6256 153.84L154.351 96.9474C155.907 95.3863 155.907 92.86 154.351 91.2989Z"
                    fill="#770000"
                  />
                  <g filter="url(#filter1_d_351_141)">
                    <path
                      d="M110.027 94.0022L86.876 79.8588C85.5433 79.0446 83.8333 80.0038 83.8333 81.5655V106.822C83.8333 108.294 85.3711 109.262 86.6988 108.625L109.85 97.5119C111.28 96.8258 111.38 94.8287 110.027 94.0022Z"
                      fill="#DEDEDE"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_351_141"
                    x="0.830322"
                    y="0.324829"
                    width="187.373"
                    height="187.373"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                    <feFlood
                      floodOpacity="0"
                      result="BackgroundImageFix"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feMorphology
                      radius="1"
                      operator="dilate"
                      in="SourceAlpha"
                      result="effect1_dropShadow_351_141"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="8" />
                    <feComposite
                      in2="hardAlpha"
                      operator="out"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.466667 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_351_141"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_351_141"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_d_351_141"
                    x="67.8333"
                    y="63.5624"
                    width="59.1514"
                    height="61.2616"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                    <feFlood
                      floodOpacity="0"
                      result="BackgroundImageFix"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="8" />
                    <feComposite
                      in2="hardAlpha"
                      operator="out"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.870833 0 0 0 0 0.870833 0 0 0 0 0.870833 0 0 0 0.5 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_351_141"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_351_141"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <h2 className="text-white text-xl mb-4">Start your Automation Journey </h2>
              <p className="text-[#A0A0A0] mb-8 text-center w-4/5 text-sm leading-[17px]">Start your journey by executing your first run. Our Workflow Library offers a variety of ready-to-launch workflows. It&apos;s designed to help you start quickly without the need to build from scratch. Need help? Check out our guides on executing a workflow and using workflows from the library</p>
              <button className="px-6 py-3  rounded-lg text-xl text-[#DEDEDE] bg-[#700]">Explore Workflows</button>
            </div>
            <div className="w-2/5 border-2 rounded-lg border-red-primary shadow-red-primary flex flex-col  items-center">
              <div className="mt-11 mb-12 relative w-full">
                <p className="text-gray-200 text-center">Recent Workflow</p>
                <p className="text-gray-200 absolute -top-1 right-6 underline underline-offset-2">view all</p>
              </div>

              <table className="w-[90%] text-red-600 border-separate border-spacing-y-6">
                <thead className="text-white decoration-none">
                  <tr>
                    <th className="py-2 text-transparent">logo</th>
                    <th className="py-2 ">Workflow Name</th>
                    <th className="py-2 ">Edited</th>
                    <th className="py-2 ">Runs</th>
                  </tr>
                </thead>
                <tbody className="p-2 text-center">
                  <tr className="bg-[#77000033] custom-rounded-table rounded-lg border-2 border-red-primary">
                    <td className="py-2 mb-2">1</td>
                    <td className="py-2 mb-2 text-white">
                      <Link to="/editor">Fuzz web app for vulnerabilities</Link>
                    </td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">2 days ago</td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">0</td>
                  </tr>
                  <tr className="bg-[#77000033] custom-rounded-table rounded-lg border-2 border-red-primary">
                    <td className="py-2 mb-2">1</td>
                    <td className="py-2 mb-2 text-white">
                      <Link to="/editor">Simple Content Discovery</Link>
                    </td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">7 days ago</td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeSec == "workflow" && (
          <div className="w-full p-6 bg-[#060606] flex gap-6">
            <div className="w-full border-2 rounded-lg border-red-primary shadow-red-primary flex flex-col  items-center">
              <div className="mt-11 mb-12 relative w-full">
                <p className="text-gray-200 text-center">Recent Workflow</p>
                <p className="text-gray-200 absolute -top-1 right-6 underline underline-offset-2">view all</p>
              </div>

              <table className="w-[90%] text-red-600 border-separate border-spacing-y-6">
                <thead className="text-white decoration-none">
                  <tr>
                    <th className="py-2 text-transparent">logo</th>
                    <th className="py-2 ">Workflow Name</th>
                    <th className="py-2 ">Edited</th>
                    <th className="py-2 ">Runs</th>
                    <th className="py-2 ">Created by</th>
                    <th className="py-2 ">Actions</th>
                  </tr>
                </thead>
                <tbody className="p-2 text-center">
                  <tr className="bg-[#77000033] custom-rounded-table rounded-lg border-2 border-red-primary">
                    <td className="py-2 mb-2">1</td>
                    <td className="py-2 mb-2 text-white">
                      <Link to="/editor">Fuzz web app for vulnerabilities</Link>
                    </td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">2 days ago</td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">0</td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">{capitalize(user?.user.user_metadata.full_name)}</td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">
                      <Link
                        to="/editor"
                        target="_blank">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Link>
                    </td>
                  </tr>
                  <tr className="bg-[#77000033] custom-rounded-table rounded-lg border-2 border-red-primary">
                    <td className="py-2 mb-2">2</td>
                    <td className="py-2 mb-2 text-white">
                      <Link to="/editor">Simple Content Discovery</Link>
                    </td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">7 days ago</td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">2</td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">{capitalize(user?.user.user_metadata.full_name)}</td>
                    <td className="py-2 mb-2 text-[#A0A0A0]">
                      <Link
                        to="/editor"
                        target="_blank">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
