import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

type WindowSizeObject = {
    width: number
}

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const navRef = useRef(null);
  const [windowSize, setWindowSize] = useState<WindowSizeObject>({
      width: window.innerWidth
  });

  useEffect(() => {
      const handleResize = () => {
          setWindowSize({
              width: window.innerWidth,
          });
      };

      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  useEffect(() => {
      if (windowSize.width > 990) {
          setToggleMenu(false);
      }
  }, [windowSize]);

  return (
      <nav className="navbar navbar-expand-lg bg-primary" ref={navRef}>
          <div className="container">
              <Link to="/" className="navbar-brand text-light">
                  Navbar {windowSize.width}
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" onClick={() => setToggleMenu(!toggleMenu)}>
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className={toggleMenu ? 'navbar-collapse' : 'collapse navbar-collapse'}>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <NavLink to="/" className="nav-link">Add Candidate</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink to="/create-question" className="nav-link">Create Question</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink to="/exam" className="nav-link">Exam</NavLink>
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