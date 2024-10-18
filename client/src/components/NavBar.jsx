import React, { useState } from "react";
import Logo from "../assets/img/logo.svg";
import Profile from "../assets/img/profile.svg";
import SubNavbarSepecialist from "./SubNavbarSepecialist";
import SubNavbarCenter from "./SubNavBarCenter";
import SubNavbarBills from "./SubNavBarBills";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const menuItems = ["Specialist", "Center", "Bills"];

  const handleClick = (index) => {
    setActiveMenu(index);
  };

  const renderSubNavbar = () => {
    switch (activeMenu) {
      case 0:
        return <SubNavbarSepecialist />;
      case 1:
        return <SubNavbarCenter />;
      case 2:
        return <SubNavbarBills />;
      default:
        return null;
    }
  };

  return (
    <>
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
      {renderSubNavbar()}
    </>
  );
};

export default Navbar;
