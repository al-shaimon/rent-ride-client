import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleTheme } from '../../redux/features/themeSlice';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="navbar bg-base-100">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Menu">
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
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
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

      {/* Navbar Center */}
      <div className="navbar-center">
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          <img
            className="w-44"
            src={currentTheme === 'light' ? '/logo.webp' : '/logo-dark.webp'}
            alt="logo"
          />
        </NavLink>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <button
          className="btn btn-ghost btn-circle"
          onClick={handleToggleTheme}
          aria-label="Toggle Theme"
        >
          {currentTheme === 'light' ? (
            <img className="h-5 w-5" src="moon.svg" alt="dark" />
          ) : (
            <img className="h-5 w-5" src="sun.svg" alt="light" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
