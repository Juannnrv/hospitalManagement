import React, { useState } from "react";
import Logo from "../assets/img/logo.svg";
import Profile from "../assets/img/profile.svg";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const menuItems = ["Users", "Patients", "Hospitals", "Notice", "Help Center"];

  const handleClick = (index) => {
    setActiveMenu(index);
  };

  return (
    <nav className="bg-color-1 p-4 font-poppins font-semibold px-24 pt-7 pb-5 flex items-center justify-between w-full text-base">
      <div className="flex gap-10">
        <img src={Logo} className="w-6 h-6" alt="Logo" />
        {menuItems.map((item, index) => {
          const isActive = activeMenu === index;
          const customDesign = isActive
            ? "text-color-1 bg-color-3 rounded-xl py-2 px-4 mt-[-5px] cursor-pointer"
            : "text-color-4 cursor-pointer";

          return (
            <h1
              key={item}
              className={customDesign}
              onClick={() => handleClick(index)}
            >
              {item}
            </h1>
          );
        })}
      </div>
      <img src={Profile} className="w-[310px] h-10" alt="Profile" />
    </nav>
  );
};

export default Navbar;
