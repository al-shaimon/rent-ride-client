import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const userTheme = localStorage.getItem('theme') || 'light';
    setTheme(userTheme);
    document.documentElement.setAttribute('data-theme', userTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/booking">Booking</NavLink>
            </li>
            <li>
              <NavLink to="/contact-us">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/about-us">About</NavLink>
            </li>
            <li>
              <NavLink className="btn btn-sm btn-outline" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">
          <img
            className="w-44"
            src={theme === 'light' ? '/logo.webp' : '/logo-dark.webp'}
            alt="logo"
          />
        </a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
          {theme === 'light' ? (
            <img className="h-5 w-5 fill-current" src="moon.svg" alt="light" />
          ) : (
            <img className="h-5 w-5 fill-current" src="sun.svg" alt="dark" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
