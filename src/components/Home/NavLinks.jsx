import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const NavLinks = ({ mode }) => {
  
  const scrollTo = (target, offset = 0) => {
    const element = document.getElementById(target);
    if (!element) return

    if (typeof offset !== "number" ) offset = 0

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }

  return (
    <div className={`${mode === "desktop" ? "hidden md:flex" : mode === "mobile" ? "flex md:hidden" : "flex"} justify-center flex-wrap gap-3 md:gap-6 lg:gap-12 items-center`}>
      <NavLink className="nav-link" to="/">Home</NavLink>
      <span className="nav-link" onClick={() => {scrollTo("about", 150)}} >About</span>
      <span className="nav-link" onClick={() => {scrollTo("features")}} >Features</span>
      <span className="nav-link" onClick={() => {scrollTo("faq")}} >FAQ</span>
    </div>
  )
}

export default NavLinks