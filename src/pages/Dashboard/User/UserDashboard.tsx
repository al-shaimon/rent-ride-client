import { NavLink, Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="drawer z-[9] lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="mt-10 lg:mt-0">
          <Outlet />
        </div>
        <label
          htmlFor="my-drawer-2"
          className="md: btn drawer-button btn-sm absolute left-28 top-0 bg-primary text-white md:left-0 lg:hidden"
        >
          Sidebar
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full bg-base-200 p-4 text-base-content lg:w-80">
          {/* Sidebar content here */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "" : "")}
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/bookings"
              className={({ isActive }) => (isActive ? "sidebarActive" : "")}
            >
              Booking Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/payments"
              className={({ isActive }) => (isActive ? "sidebarActive" : "")}
            >
              Payment Management
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
