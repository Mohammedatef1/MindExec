import { NavLink } from 'react-router-dom'

const NavLinks = ({ mode }) => {
  return (
    <div className={`${mode === "desktop" ? "hidden md:flex" : mode === "mobile" ? "flex md:hidden" : "flex"} justify-center flex-wrap gap-3 md:gap-6 lg:gap-12 items-center`}>
      <NavLink className="nav-link" to="/">Home</NavLink>
      <NavLink className="nav-link" to="/about">About</NavLink>
      <NavLink className="nav-link" to="/features">Features</NavLink>
      <NavLink className="nav-link" to="/faq">FAQ</NavLink>
    </div>
  )
}

export default NavLinks