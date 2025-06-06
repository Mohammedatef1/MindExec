import { Link } from "react-router-dom";
import Logo from "../components/icons/MindExecLogo";
import HeroSection from "../components/Home/HeroSection";
import HomeCard from "../components/Home/HomeCard";
import HomeFeatureWrapper from "../components/Home/HomeFeatureWrapper";
import MaxWidthWrapper from "../components/layout/MaxWidthWrapper";
import FAQ from "../components/Home/FAQ";
import Steps from "../components/Home/Steps";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="pb-10 max-w-screen text-white scrollbar">
      <nav className="font-[Inter]">
        <MaxWidthWrapper className="pt-8 md:pt-11 flex justify-between items-center ">
          <div>
            <Logo />
          </div>
          <div className="flex justify-between gap-3 md:gap-6 lg:gap-12 items-center">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
            <NavLink className="nav-link" to="/features">Features</NavLink>
            <NavLink className="nav-link" to="/faq">FAQ</NavLink>
          </div>
          <div className="flex justify-between gap-2 md:gap-4 lg:gap-8 items-center z-20 text-main">
            <Link className="text-primary-light" to="/login">Log In</Link>
            <Link
              to="/register"
              className="register-btn px-4 py-2 md:px-6 md:py-3 rounded-lg relative bg-background border-gradient-primary">
              <span>Sign Up</span>
            </Link>
          </div>
        </MaxWidthWrapper>
      </nav>
      <HeroSection />
      <HomeCard />
      <HomeFeatureWrapper />
      <Steps />
      <FAQ />
    </div>
  );
};

export default Home;
