import "./Navbar.css"
import { NavLink } from 'react-router-dom';


const Navbar = ({ appName }) => {

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-background mb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h3>{appName}</h3>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className={({ isActive }) => {
                return isActive ? 'nav-link active' : 'nav-link'
              }} to="/banks" >Banks</NavLink>
              <NavLink className={({ isActive }) => {
                return isActive ? 'nav-link active' : 'nav-link'
              }} to="/accounts" >Accounts</NavLink>
            </div>
          </div>
        </div>
      </nav >
    </>
  );
}

export default Navbar;
