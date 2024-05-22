import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-primary ">
            <div className="container">
                <a className="navbar-brand text-light" href="#">Navbar</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/timer" className="nav-link">Timer</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/candidates" className="nav-link">Candidates</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/counter" className="nav-link">Counter with Redux</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}