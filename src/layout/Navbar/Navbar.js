import "./Navbar.css"
import { NavLink } from 'react-router-dom';


const Navbar = () => {

  const roleName = localStorage.getItem("rolename")
  const isAuthenticated = localStorage.getItem("isAuthenticated")

  const adminNavbar = (
    <>
      <div className="navbar-nav">
        <NavLink className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }} to="/banks" >Banks</NavLink>
        <NavLink className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }} to="/customers" >Customer</NavLink>
      </div>
    </>
  )

  const customerNavbar = (
    <>
      <div className="navbar-nav">
        <NavLink className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }} to="/banks" >Banks</NavLink>
        <NavLink className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }} to="/accounts" >Accounts</NavLink>
      </div>
    </>
  )

  return (
    <>
      {isAuthenticated &&
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-background mb-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <h3>Yess Bank</h3>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              {roleName.toLowerCase() == "admin" ? adminNavbar : customerNavbar}
            </div>
          </div>
        </nav >
      }
    </>
  );
}

export default Navbar;
