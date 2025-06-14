import { Link } from "react-router-dom"
import Logo from "../icons/MindExecLogo"
import MaxWidthWrapper from "../layout/MaxWidthWrapper"
import NavLinks from "./NavLinks"
import useActiveUser from "../../hooks/useActiveUser"

const Header = () => {
  const { user, loading } = useActiveUser();
  return (
    <nav className="font-[Inter]">
        <MaxWidthWrapper className="pt-8 md:pt-11 flex justify-between items-center ">
          <div>
            <Logo />
          </div>
          <NavLinks />
          <div className="flex justify-between gap-2 md:gap-4 lg:gap-8 items-center z-20 text-main">
            { loading ? null 
            :
              user  ? 
              <Link
                to="/dashboard"
                className="register-btn px-4 py-2 md:px-6 md:py-3 rounded-lg relative bg-background border-gradient-primary">
                <span>Dashboard</span>
              </Link> 
              : 
              <>
                <Link className="text-primary-light" to="/login">Log In</Link>
                <Link
                  to="/register"
                  className="register-btn px-4 py-2 md:px-6 md:py-3 rounded-lg relative bg-background border-gradient-primary">
                  <span>Sign Up</span>
                </Link> 
              </>
              }
          </div>
        </MaxWidthWrapper>
      </nav>
  )
}

export default Header