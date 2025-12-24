import { faCheckCircle, faClock, faExclamationCircle, faPenToSquare, faPlus, faRightFromBracket, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import MindExecLogo from "../components/icons/MindExecLogo";
import { createWorkflow, deleteWorkflow, getUserWorkflows } from "../components/Storage";
import DeleteWorkflowModal from "../components/ui/DeleteWorkflowModal";
import WorkflowNameModal from "../components/ui/WorkflowNameModal";
import useActiveUser from "../hooks/useActiveUser.js";
import { formatRelativeTime } from "../lib/utils";

const Dashboard = () => {
  const [activeSec, setActiveSec] = useState("home");
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, workflowId: null, workflowName: "" });
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    try {
      setSigningOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
      setSigningOut(false);
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
  };

  const capitalize = (word) => {
    if (!word) return ""; // Handle empty input
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  const { user } = useActiveUser();

  useEffect(() => {
    const fetchWorkflows = async () => {
      if (user) {
        setLoading(true);
        const data = await getUserWorkflows();
        setWorkflows(data);
        setLoading(false);
      }
    };
    fetchWorkflows();
  }, [user]);

  const handleDeleteClick = (workflowId, workflowName, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteModal({ isOpen: true, workflowId, workflowName });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteWorkflow(deleteModal.workflowId);
      setWorkflows(workflows.filter(w => w.id !== deleteModal.workflowId));
      setDeleteModal({ isOpen: false, workflowId: null, workflowName: "" });
      toast.success("Workflow deleted successfully");
    } catch (error) {
      console.error("Error deleting workflow:", error);
      toast.error("Failed to delete workflow");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, workflowId: null, workflowName: "" });
  };

  const handleCreateWorkflow = async (workflowName) => {
    try {
      const newWorkflow = await createWorkflow(workflowName);
      setIsModalOpen(false);
      // Refresh workflows list
      const data = await getUserWorkflows();
      setWorkflows(data);
      // Navigate to editor with the new workflow ID
      navigate(`/editor?workflow=${newWorkflow.id}`);
    } catch (error) {
      console.error("Error creating workflow:", error);
      alert("Failed to create workflow: " + error.message);
    }
  };

  const totalWorkflows = workflows.length;
  const recentWorkflows = workflows.slice(0, 5);
  const hasRecentActivity = workflows.some(w => {
    const updated = new Date(w.updated_at);
    const daysSinceUpdate = (Date.now() - updated.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceUpdate < 7;
  });
  
  // Filter workflows that have been run
  const workflowsWithRuns = workflows.filter(w => (w.runs_count || 0) > 0);
  const totalRuns = workflows.reduce((sum, w) => sum + (w.runs_count || 0), 0);

  return (
    <div className="bg-primary1 h-screen flex flex-col">
      <nav className="flex justify-between items-center border-b border-primary-light/20 px-5 h-16">
        <div>
          <MindExecLogo />
        </div>
        <div className="flex justify-center items-center gap-3 me-4">
          {/* Notification Icon */}
          <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors duration-150 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-400 group-hover:text-gray-300 transition-colors duration-150">
              <path
                d="M8.645 20.5C8.86103 21.2219 9.30417 21.8549 9.90858 22.3049C10.513 22.755 11.2464 22.998 12 22.998C12.7536 22.998 13.487 22.755 14.0914 22.3049C14.6958 21.8549 15.139 21.2219 15.355 20.5H8.645ZM3 19.5H21V16.5L19 13.5V8.5C19 7.58075 18.8189 6.6705 18.4672 5.82122C18.1154 4.97194 17.5998 4.20026 16.9497 3.55025C16.2997 2.90024 15.5281 2.38463 14.6788 2.03284C13.8295 1.68106 12.9193 1.5 12 1.5C11.0807 1.5 10.1705 1.68106 9.32122 2.03284C8.47194 2.38463 7.70026 2.90024 7.05025 3.55025C6.40024 4.20026 5.88463 4.97194 5.53284 5.82122C5.18106 6.6705 5 7.58075 5 8.5V13.5L3 16.5V19.5Z"
                fill="currentColor"
              />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-light rounded-full border-2 border-primary1"></span>
          </button>

          {/* User Profile Section */}
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors duration-150 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#360077] to-[#7246A7] flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(user?.user?.user_metadata?.full_name)}
            </div>
            <div className="flex flex-col">
              <p className="text-white text-sm font-medium leading-tight">{capitalize(user?.user?.user_metadata?.full_name)}</p>
              <p className="text-gray-500 text-xs leading-tight">User</p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={signOut}
            disabled={signingOut}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors duration-150 border border-red-600/20 hover:border-red-600/30 group ${
              signingOut ? "opacity-60 cursor-not-allowed" : ""
            }`}>
            {signingOut ? (
              <FontAwesomeIcon 
                icon={faSpinner} 
                className="text-sm animate-spin"
              />
            ) : (
              <FontAwesomeIcon 
                icon={faRightFromBracket} 
                className="text-sm"
              />
            )}
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </nav>
      <div className="flex">
        <div className="border-r border-primary-light/15">
          <div className="flex flex-col justify-between items-center h-full">
            <ul className="w-full">
              <li
                onClick={() => {
                  setActiveSec("home");
                }}
                className={`flex flex-col cursor-pointer justify-between items-center px-6 py-5 transition-colors duration-150 ${
                  activeSec == "home" 
                    ? "bg-primary-light/10 border-l-2 border-primary-light" 
                    : "hover:bg-white/5"
                }`}>
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
                <p className="text-main mt-1 text-[12px]">Home</p>
              </li>
              <li
                onClick={() => {
                  setActiveSec("workflow");
                }}
                className={`flex flex-col justify-between items-center py-[20px] cursor-pointer transition-colors duration-150 ${
                  activeSec == "workflow" 
                    ? "bg-primary-light/10 border-l-2 border-primary-light" 
                    : "hover:bg-white/5"
                }`}>
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
                <p className="text-main mt-2 text-[12px]">Workflows</p>
              </li>
              <li
                onClick={() => {
                  setActiveSec("allRuns");
                }}
                className={`flex flex-col justify-between items-center py-[20px] cursor-pointer transition-colors duration-150 ${
                  activeSec == "allRuns" 
                    ? "bg-primary-light/10 border-l-2 border-primary-light" 
                    : "hover:bg-white/5"
                }`}>
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
                <p className="text-main mt-2 text-[12px]">All Runs</p>
              </li>
            </ul>
            {/* TODO: Add Library and Setting sections */}
            {/* <ul className="w-full mb-10">
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
                <p className="text-main mt-1 text-[12px]">Library</p>
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
                <p className="text-main mt-1 text-[12px]">Setting</p>
              </li>
            </ul> */}
          </div>
        </div>
        <div className="flex-1 h-[calc(100vh-4rem)] overflow-auto scrollbar">
          {activeSec == "home" && (
            <div className="p-6 bg-[#060606] flex flex-col md:flex-row  gap-6 overflow-auto min-h-full">
              {/* Recent Workflows Card */}
              <div className="w-full md:w-3/5 rounded-xl bg-[#0a0a0a] border border-primary-light/10 flex flex-col relative overflow-hidden">
                {/* Subtle inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="mt-6 mb-4 relative w-full px-6 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-gray-200 text-base font-semibold">Recent Workflows</h3>
                      {totalWorkflows > 0 && (
                        <p className="text-gray-500 text-xs mt-0.5">{totalWorkflows} {totalWorkflows === 1 ? 'workflow' : 'workflows'}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-3 py-1.5 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors duration-150 flex items-center gap-1.5 text-sm font-medium shadow-sm shadow-primary/20">
                      <FontAwesomeIcon icon={faPlus} className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 px-6 pb-6 overflow-y-auto z-10 scrollbar-light">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-primary-light text-xl" />
                      <p className="text-gray-400 text-sm">Loading workflows...</p>
                    </div>
                  ) : workflows.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary-light/10 flex items-center justify-center mb-4">
                        <FontAwesomeIcon icon={faPlus} className="text-primary-light text-xl" />
                      </div>
                      <p className="text-gray-300 text-sm font-medium mb-1">No workflows yet</p>
                      <p className="text-gray-500 text-xs mb-4">Create your first workflow to get started</p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors duration-150 text-sm font-medium">
                        Create Workflow
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Table Header */}
                      <div className="grid grid-cols-[40px_1fr_100px_60px_80px] gap-4 px-3 py-2 mb-2 border-b border-white/5">
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider"></div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Name</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Last Edited</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center">Runs</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center">Actions</div>
                      </div>
                      
                      {/* Table Rows */}
                      {recentWorkflows.map((workflow, index) => {
                        const daysSinceUpdate = (Date.now() - new Date(workflow.updated_at).getTime()) / (1000 * 60 * 60 * 24);
                        const isRecent = daysSinceUpdate < 7;
                        
                        return (
                          <div
                            key={workflow.id}
                            className="grid grid-cols-[40px_1fr_100px_60px_80px] gap-4 px-3 py-2.5 rounded-lg border border-transparent hover:border-primary-light/20 hover:bg-primary-light/5 transition-all duration-150 group">
                            <div className="flex items-center">
                              <span className="text-gray-500 text-xs font-medium group-hover:text-gray-400 transition-colors duration-150">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex items-center max-w-40">
                              <Link
                                to={`/editor?workflow=${workflow.id}`}
                                className="text-white text-sm font-medium truncate hover:text-primary-light transition-colors duration-150">
                                {workflow.name}
                              </Link>
                              {isRecent && (
                                <span className="ml-2 w-1.5 h-1.5 rounded-full bg-primary-light opacity-60"></span>
                              )}
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors duration-150">
                                {formatRelativeTime(workflow.updated_at)}
                              </span>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className="text-gray-500 text-xs font-medium group-hover:text-gray-400 transition-colors duration-150">
                                {workflow.runs_count || 0}
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                to={`/editor?workflow=${workflow.id}`}
                                className="text-gray-500 hover:text-primary-light transition-colors duration-150 p-1.5 rounded hover:bg-primary-light/10">
                                <FontAwesomeIcon icon={faPenToSquare} className="text-sm" />
                              </Link>
                              <button
                                onClick={(e) => handleDeleteClick(workflow.id, workflow.name, e)}
                                className="text-gray-500 hover:text-red-400 transition-colors duration-150 p-1.5 rounded hover:bg-red-500/10">
                                <FontAwesomeIcon icon={faTrash} className="text-sm" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Latest Runs Card */}
              <div className="w-full md:w-2/5 rounded-xl bg-[#0a0a0a] border border-primary-light/10 flex flex-col items-center relative overflow-hidden">
                {/* Subtle inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="mt-8 relative w-full px-6 z-10">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-200 text-base font-semibold">Latest Runs</h3>
                    <button className="text-gray-400 hover:text-primary-light text-xs transition-colors duration-150 underline underline-offset-2">
                      view all
                    </button>
                  </div>
                  {hasRecentActivity && (
                    <p className="text-gray-500 text-xs mt-1">Recent activity detected</p>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center py-8 px-6 z-10">
                  <RunsShape className="mb-6 opacity-60" />
                  <h2 className="text-white text-lg font-semibold mb-2 text-center">Start your Automation Journey</h2>
                  <p className="text-gray-400 mb-6 text-center w-4/5 text-sm leading-relaxed">
                    Start your journey by executing your first run. Our Workflow Library offers a variety of ready-to-launch workflows.
                  </p>
                  {/* <button className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors duration-150">
                    Explore Workflows
                  </button> */}
                </div>
              </div>

            </div>
          )}
          {activeSec == "workflow" && (
            <div className="w-full min-h-full p-6 bg-[#060606] flex gap-6 overflow-auto">
              <div className="w-full rounded-xl bg-[#0a0a0a] border border-primary-light/10 flex flex-col relative overflow-hidden">
                {/* Subtle inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="mt-6 mb-4 relative w-full px-6 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-gray-200 text-base font-semibold">All Workflows</h3>
                      {totalWorkflows > 0 && (
                        <p className="text-gray-500 text-xs mt-0.5">{totalWorkflows} {totalWorkflows === 1 ? 'workflow' : 'workflows'}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors duration-150 flex items-center gap-2 text-sm font-medium shadow-sm shadow-primary/20">
                      <FontAwesomeIcon icon={faPlus} />
                      <span>New Workflow</span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 px-6 pb-6 overflow-y-auto z-10 scrollbar-light">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-primary-light text-xl" />
                      <p className="text-gray-400 text-sm">Loading workflows...</p>
                    </div>
                  ) : workflows.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary-light/10 flex items-center justify-center mb-4">
                        <FontAwesomeIcon icon={faPlus} className="text-primary-light text-xl" />
                      </div>
                      <p className="text-gray-300 text-sm font-medium mb-1">No workflows yet</p>
                      <p className="text-gray-500 text-xs mb-4">Create your first workflow to get started</p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors duration-150 text-sm font-medium">
                        Create Workflow
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Table Header */}
                      <div className="grid grid-cols-[40px_1fr_120px_80px_120px_100px] gap-4 px-3 py-2 mb-2 border-b border-white/5">
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider"></div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Name</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Last Edited</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center">Runs</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Created by</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center">Actions</div>
                      </div>
                      
                      {/* Table Rows */}
                      {workflows.map((workflow, index) => {
                        const daysSinceUpdate = (Date.now() - new Date(workflow.updated_at).getTime()) / (1000 * 60 * 60 * 24);
                        const isRecent = daysSinceUpdate < 7;
                        
                        return (
                          <div
                            key={workflow.id}
                            className="grid grid-cols-[40px_1fr_120px_80px_120px_100px] gap-4 px-3 py-2.5 rounded-lg border border-transparent hover:border-primary-light/20 hover:bg-primary-light/5 transition-all duration-150 group">
                            <div className="flex items-center">
                              <span className="text-gray-500 text-xs font-medium group-hover:text-gray-400 transition-colors duration-150">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex items-center max-w-40">
                              <Link
                                to={`/editor?workflow=${workflow.id}`}
                                className="text-white text-sm font-medium truncate hover:text-primary-light transition-colors duration-150">
                                {workflow.name}
                              </Link>
                              {isRecent && (
                                <span className="ml-2 w-1.5 h-1.5 rounded-full bg-primary-light opacity-60"></span>
                              )}
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors duration-150">
                                {formatRelativeTime(workflow.updated_at)}
                              </span>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className="text-gray-500 text-xs font-medium group-hover:text-gray-400 transition-colors duration-150">
                                {workflow.runs_count || 0}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors duration-150">
                                {capitalize(user?.user?.user_metadata?.full_name)}
                              </span>
                            </div>
                            <div 
                              className="flex items-center justify-center gap-3"
                              onClick={(e) => e.preventDefault()}>
                              <Link
                                to={`/editor?workflow=${workflow.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-500 hover:text-primary-light transition-colors duration-150 p-1.5 rounded hover:bg-primary-light/10">
                                <FontAwesomeIcon icon={faPenToSquare} className="text-sm" />
                              </Link>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleDeleteClick(workflow.id, workflow.name, e);
                                }}
                                className="text-gray-500 hover:text-red-400 transition-colors duration-150 p-1.5 rounded hover:bg-red-500/10">
                                <FontAwesomeIcon icon={faTrash} className="text-sm" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeSec == "allRuns" && (
            <div className="w-full min-h-full p-6 bg-[#060606] flex gap-6 overflow-auto">
              <div className="w-full rounded-xl bg-[#0a0a0a] border border-primary-light/10 flex flex-col relative overflow-hidden">
                {/* Subtle inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="mt-6 mb-4 relative w-full px-6 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-gray-200 text-base font-semibold">All Runs</h3>
                      {totalRuns > 0 && (
                        <p className="text-gray-500 text-xs mt-0.5">{totalRuns} {totalRuns === 1 ? 'run' : 'runs'} across {workflowsWithRuns.length} {workflowsWithRuns.length === 1 ? 'workflow' : 'workflows'}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-1 px-6 pb-6 overflow-y-auto z-10 scrollbar-light">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-primary-light text-xl" />
                      <p className="text-gray-400 text-sm">Loading runs...</p>
                    </div>
                  ) : workflowsWithRuns.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary-light/10 flex items-center justify-center mb-4">
                        <FontAwesomeIcon icon={faClock} className="text-primary-light text-xl" />
                      </div>
                      <p className="text-gray-300 text-sm font-medium mb-1">No runs yet</p>
                      <p className="text-gray-500 text-xs mb-4">Execute a workflow to see run history here</p>
                      <Link
                        to="/dashboard"
                        onClick={() => setActiveSec("home")}
                        className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors duration-150 text-sm font-medium">
                        Go to Workflows
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Table Header */}
                      <div className="grid grid-cols-[40px_1fr_100px_80px_100px_80px] gap-4 px-3 py-2 mb-2 border-b border-white/5">
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider"></div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Workflow</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Last Run</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center">Total Runs</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Status</div>
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center">Actions</div>
                      </div>
                      
                      {/* Table Rows */}
                      {workflowsWithRuns.map((workflow, index) => {
                        const daysSinceUpdate = (Date.now() - new Date(workflow.updated_at).getTime()) / (1000 * 60 * 60 * 24);
                        const isRecent = daysSinceUpdate < 7;
                        // Mock status - in a real app, this would come from a runs table
                        const status = isRecent ? "completed" : "completed";
                        
                        return (
                          <Link
                            key={workflow.id}
                            to={`/editor?workflow=${workflow.id}`}
                            className="grid grid-cols-[40px_1fr_100px_80px_100px_80px] gap-4 px-3 py-2.5 rounded-lg border border-transparent hover:border-primary-light/20 hover:bg-primary-light/5 transition-all duration-150 group">
                            <div className="flex items-center">
                              <span className="text-gray-500 text-xs font-medium group-hover:text-gray-400 transition-colors duration-150">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex items-center max-w-40">
                              <span className="text-white text-sm font-medium truncate group-hover:text-primary-light transition-colors duration-150">
                                {workflow.name}
                              </span>
                              {isRecent && (
                                <span className="ml-2 w-1.5 h-1.5 rounded-full bg-primary-light opacity-60"></span>
                              )}
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors duration-150">
                                {formatRelativeTime(workflow.updated_at)}
                              </span>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className="text-gray-500 text-xs font-medium group-hover:text-gray-400 transition-colors duration-150">
                                {workflow.runs_count || 0}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className="flex items-center gap-1.5">
                                {status === "completed" && (
                                  <>
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-xs text-green-500" />
                                    <span className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors duration-150">Completed</span>
                                  </>
                                )}
                                {status === "running" && (
                                  <>
                                    <FontAwesomeIcon icon={faSpinner} className="text-xs text-primary-light animate-spin" />
                                    <span className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors duration-150">Running</span>
                                  </>
                                )}
                                {status === "failed" && (
                                  <>
                                    <FontAwesomeIcon icon={faExclamationCircle} className="text-xs text-red-500" />
                                    <span className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors duration-150">Failed</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div 
                              className="flex items-center justify-center gap-3"
                              onClick={(e) => e.preventDefault()}>
                              <Link
                                to={`/editor?workflow=${workflow.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-500 hover:text-primary-light transition-colors duration-150 p-1.5 rounded hover:bg-primary-light/10">
                                <FontAwesomeIcon icon={faPenToSquare} className="text-sm" />
                              </Link>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <WorkflowNameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateWorkflow}
      />
      <DeleteWorkflowModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        workflowName={deleteModal.workflowName}
      />
    </div>
  );
};

export default Dashboard;

const RunsShape = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="188"
      height="188"
      viewBox="0 0 188 188"
      className={className}
      fill="none">
      <g filter="url(#filter0_d_399_79)">
        <path
          d="M89.1211 20.3779C91.7718 17.7247 96.0205 17.6437 98.7686 20.1338L99.0303 20.3828L167.66 89.2148C170.299 91.8615 170.381 96.0933 167.907 98.8389L167.66 99.0996L99.3213 167.64C96.6807 170.288 92.4458 170.381 89.6934 167.911L89.4316 167.664L20.3975 99.1016C17.7346 96.4568 17.6435 92.2041 20.1299 89.4492L20.3779 89.1875L89.1211 20.3779Z"
          fill="#0E0E0E"
          stroke="#7246A7"
          strokeWidth="2"
        />
        <path
          d="M153.851 91.2989L96.8913 34.1715C95.3294 32.605 92.7924 32.6037 91.229 34.1687L34.1688 91.285C32.6043 92.8511 32.6092 95.3902 34.1799 96.9502L91.4745 153.853C93.0398 155.408 95.5682 155.402 97.1258 153.84L153.851 96.9474C155.407 95.3863 155.407 92.86 153.851 91.2989Z"
          fill="#7246A7"
        />
        <g filter="url(#filter1_d_399_79)">
          <path
            d="M109.528 94.0022L86.3761 79.8588C85.0434 79.0446 83.3335 80.0038 83.3335 81.5655V106.822C83.3335 108.294 84.8713 109.262 86.199 108.625L109.35 97.5119C110.78 96.8258 110.881 94.8287 109.528 94.0022Z"
            fill="#DEDEDE"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_399_79"
          x="0.330078"
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
            result="effect1_dropShadow_399_79"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.447059 0 0 0 0 0.27451 0 0 0 0 0.654902 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_399_79"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_399_79"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_399_79"
          x="67.3335"
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
            result="effect1_dropShadow_399_79"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_399_79"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
