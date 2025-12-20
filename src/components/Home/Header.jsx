import { Link } from "react-router-dom"
import Logo from "../icons/MindExecLogo"
import MaxWidthWrapper from "../layout/MaxWidthWrapper"
import NavLinks from "./NavLinks"
import useActiveUser from "../../hooks/useActiveUser.js"

const Header = () => {
  const { user, loading } = useActiveUser();
  return (
    <nav className="font-[Inter]">
        <MaxWidthWrapper className="pt-8 md:pt-11">
          <div className="flex justify-between items-center mb-8 md:mb-0">
            <div>
              <Logo />
            </div>
            <NavLinks mode="desktop" />
            <div className="flex justify-between gap-4 lg:gap-8 items-center z-20 text-main">
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
          </div>
          <div>
            <NavLinks mode="mobile" />
          </div>
        </MaxWidthWrapper>
      </nav>
  )
}

export default Header