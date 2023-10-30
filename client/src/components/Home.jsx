import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { context } from "../context/context";

const Home = () => {
  const { location, setUserId } = useContext(context);
  const navigate = useNavigate();
  const logout = () => {
    setUserId("");
    navigate(location.pathname === "/home" ? "/" : "/adminlogin", {
      replace: true,
    });
    sessionStorage.clear();
  };
  const adminroute = () => {
    navigate("/adminlogin", { replace: true });
    window.location.reload();
  };
  return (
    <>
      <header className="flex  justify-between bg-white shadow-sm h-14 top-0 sticky z-10 items-center px-6">
        <NavLink
          // to="/home"
          className="flex items-center content-center   cursor-pointer xs:text-base sm:text-xl  font-semibold text-secondary-dark"  
        >
          Vote
        </NavLink>
        {location.pathname === "/" && (
          <div className="flex gap-x-4">
            <div
              onClick={adminroute}
              className="text-secondary-dark text-xs font-semibold hover:underline mr-2"
            >
              Admin
            </div>
          </div>
        )}
        {location.pathname === "/admin" && (
          <div
            onClick={logout}
            className="text-right text-xs text-secondary-dark font-semibold hover:underline mr-2"
          >
            Logout
          </div>
        )}
        {location.pathname === "/home" && (
          <div
            onClick={logout}
            className="text-right text-xs text-secondary-dark font-semibold hover:underline mr-2"
          >
            Logout
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default Home;
