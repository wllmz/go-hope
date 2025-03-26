import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
const Menu = () => {
  return (
    <nav className="bg-[#0E3043] shadow-md py-4">
      <ul className="flex justify-around items-center">
        <li>
          <img src={logo} alt="Logo" className="w-35 h-auto" />
        </li>
        <li>
          <NavLink
            end
            to="/accueil"
            className={({ isActive }) =>
              isActive ? "text-[#F5943A] font-bold" : "text-white font-medium"
            }
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/forum"
            className={({ isActive }) =>
              isActive ? "text-[#F5943A] font-bold" : "text-white font-medium"
            }
          >
            Forum
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/la-sep"
            className={({ isActive }) =>
              isActive ? "text-[#F5943A] font-bold" : "text-white font-medium"
            }
          >
            La SEP
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/compte"
            className={({ isActive }) =>
              isActive ? "text-[#F5943A] font-bold" : "text-white font-medium"
            }
          >
            Compte
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
