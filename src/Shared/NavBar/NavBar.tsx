import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleTheme } from "../../redux/features/themeSlice";
import { selectCurrentUser, logout } from "../../redux/features/auth/authSlice";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const currentUser = useAppSelector(selectCurrentUser);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout()); // Call the logout action
    navigate("/"); // Redirect to home after logging out
  };

  return (
    <div className="navbar z-[99999] bg-base-100">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-circle btn-ghost"
            aria-label="Menu"
          >
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
            className="menu dropdown-content menu-sm z-[99999] mt-3 w-52 rounded-box bg-base-100 p-2 shadow-2xl"
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
            {!currentUser && (
              <>
                <li className="my-2">
                  <NavLink className="btn btn-outline btn-sm" to="/login">
                    Sign in
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="btn btn-sm bg-primary text-white"
                    to="/signup"
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
            <li>
              {currentUser ? (
                <>
                  {currentUser.role === "admin" ? (
                    <NavLink
                      to="/admin/dashboard"
                      className="btn btn-sm bg-primary text-white"
                    >
                      Dashboard
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/dashboard"
                      className="btn btn-sm bg-primary text-white"
                    >
                      Dashboard
                    </NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm mt-2 bg-red-500 text-white"
                  >
                    Logout
                  </button>
                </>
              ) : null}
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center">
        <NavLink to="/" className="btn btn-ghost text-xl normal-case">
          <img className="w-44 md:w-56" src="/logo-blue.webp" alt="logo" />
        </NavLink>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <div className="me-2 hidden gap-2 md:flex">
          {!currentUser && (
            <>
              <NavLink to="/login" className="btn btn-ghost">
                Sign in
              </NavLink>
              <NavLink
                to="/signup"
                className="btn rounded-md border-none bg-primary text-white"
              >
                Sign up
              </NavLink>
            </>
          )}
          {currentUser ? (
            <>
              {currentUser.role === "admin" ? (
                <NavLink
                  to="/admin/dashboard"
                  className="btn rounded-md border-none bg-primary text-white"
                >
                  Dashboard
                </NavLink>
              ) : (
                <NavLink
                  to="/dashboard"
                  className="btn rounded-md border-none bg-primary text-white"
                >
                  Dashboard
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="btn rounded-md border-none bg-red-500 text-white"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
        <button
          className="btn btn-circle btn-ghost"
          onClick={handleToggleTheme}
          aria-label="Toggle Theme"
        >
          {currentTheme === "light" ? (
            <img
              className="h-5 w-5 text-[#1572D3]"
              src="/moon.svg"
              alt="dark"
            />
          ) : (
            <img className="h-5 w-5" src="/sun.svg" alt="light" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
