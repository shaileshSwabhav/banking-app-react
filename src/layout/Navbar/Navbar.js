import "./Navbar.css"
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const Navbar = () => {

  const roleName = localStorage.getItem("rolename")
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  const navigate = useNavigate()

  const logout = async () => {
    console.log(roleName, isAuthenticated);
    navigate("/login")
  }

  const adminNavbar = (
    <>
      <div className="navbar-nav justify-content-between">
        <div className="d-flex">
          <NavLink className={({ isActive }) => {
            return isActive ? 'nav-link active' : 'nav-link'
          }} to="/banks" >Banks</NavLink>
          <NavLink className={({ isActive }) => {
            return isActive ? 'nav-link active' : 'nav-link'
          }} to="/customers" >Customer</NavLink>
        </div>
        <div className="d-flex">
          <NavLink className={({ isActive }) => {
            return isActive ? 'nav-link active' : 'nav-link'
          }} to="/logout" >Logout</NavLink>
        </div>
      </div>
    </>
  )

  const customerNavbar = (
    <>
      <div className="navbar-nav">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <NavLink className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link'
            }} to="/banks" >Banks</NavLink>
            <NavLink className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link'
            }} to="/accounts" >Accounts</NavLink>
          </div>
          <div className="d-flex">
            <NavLink className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link'
            }} to="/logout" >Logout</NavLink>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {isAuthenticated &&
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-background mb-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <h3>{roleName} bank</h3>
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
