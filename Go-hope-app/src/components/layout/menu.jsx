import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { FaHome, FaUsers, FaUser, FaFileAlt } from "react-icons/fa";

const Menu = () => {
  return (
    <>
      {/* Menu principal - visible sur desktop */}
      <nav className="bg-[#0E3043] shadow-md py-4 hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex justify-around items-center">
            <li>
              <img src={logo} alt="Logo" className="w-35 h-auto" />
            </li>
            <li>
              <NavLink
                end
                to="/accueil"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#F5943A] font-bold"
                    : "text-white font-medium"
                }
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/forum"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#F5943A] font-bold"
                    : "text-white font-medium"
                }
              >
                Forum
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/la-sep"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#F5943A] font-bold"
                    : "text-white font-medium"
                }
              >
                La SEP
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/compte"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#F5943A] font-bold"
                    : "text-white font-medium"
                }
              >
                Compte
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Menu mobile - visible uniquement sur mobile */}
      <nav className="bg-[#0E3043] shadow-md py-2 fixed bottom-0 left-0 right-0 md:hidden z-50">
        <ul className="flex justify-around items-center px-2">
          <li>
            <NavLink
              end
              to="/accueil"
              className={({ isActive }) =>
                `flex flex-col items-center transition-colors duration-200 ${
                  isActive
                    ? "text-[#F5943A]"
                    : "text-white hover:text-[#F5943A]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <FaHome
                    className="w-6 h-6"
                    style={{ fill: isActive ? "#F5943A" : "white" }}
                  />
                  <span className="text-xs mt-1">Home</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/forum"
              className={({ isActive }) =>
                `flex flex-col items-center transition-colors duration-200 ${
                  isActive
                    ? "text-[#F5943A]"
                    : "text-white hover:text-[#F5943A]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <FaUsers
                    className="w-6 h-6"
                    style={{ fill: isActive ? "#F5943A" : "white" }}
                  />
                  <span className="text-xs mt-1">Forum</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/la-sep"
              className={({ isActive }) =>
                `flex flex-col items-center transition-colors duration-200 ${
                  isActive
                    ? "text-[#F5943A]"
                    : "text-white hover:text-[#F5943A]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <FaFileAlt
                    className="w-6 h-6"
                    style={{ fill: isActive ? "#F5943A" : "white" }}
                  />
                  <span className="text-xs mt-1">La SEP</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/compte"
              className={({ isActive }) =>
                `flex flex-col items-center transition-colors duration-200 ${
                  isActive
                    ? "text-[#F5943A]"
                    : "text-white hover:text-[#F5943A]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <FaUser
                    className="w-6 h-6"
                    style={{ fill: isActive ? "#F5943A" : "white" }}
                  />
                  <span className="text-xs mt-1">Compte</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
