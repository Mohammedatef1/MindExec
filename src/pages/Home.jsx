import HeroSection from "../components/Home/HeroSection";
import HomeCard from "../components/Home/HomeCard";
import HomeFeatureWrapper from "../components/Home/HomeFeatureWrapper";
import FAQ from "../components/Home/FAQ";
import Steps from "../components/Home/Steps";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";

const Home = () => {
  return (
    <div className="max-w-screen text-white scrollbar">
      <Header />
      <HeroSection />
      <HomeCard />
      <HomeFeatureWrapper />
      <Steps />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
