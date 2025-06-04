import { Link } from "react-router-dom";
import Logo from "../components/icons/MindExecLogo";
import HeroSection from "../components/Home/HeroSection";
import HomeCard from "../components/Home/HomeCard";
import HomeFeatureWrapper from "../components/Home/HomeFeatureWrapper";

const Home = () => {

  return (
    <div className="pb-10 max-w-screen text-white scrollbar">
      <nav className="px-4 md:px-[7%] pt-8 md:pt-11 flex justify-between items-center font-[Inter] z-10">
        <div>
          <Logo />
        </div>
        <div className="flex justify-between gap-3 md:gap-6 lg:gap-12 items-center">
          <Link to="/">About</Link>
          <Link to="/">Features</Link>
          <Link to="/">FAQ</Link>
        </div>
        <div className="flex justify-between gap-2 md:gap-4 lg:gap-8 items-center z-20 text-main">
          <Link to="/login">Log In</Link>
          <Link
            to="/register"
            className="px-4 py-2 md:px-6 md:py-3 rounded-lg border-gradient-primary">
            Sign Up
          </Link>
        </div>
      </nav>
      <HeroSection />
      <HomeCard />
      <HomeFeatureWrapper />
    </div>
  );
};

export default Home;
