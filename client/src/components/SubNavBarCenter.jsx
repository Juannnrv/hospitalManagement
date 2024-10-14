import React, { useState } from "react";
import HospitalListHeaders from "./HospitalListHeaders";
import StaffListHeaders from "./StafflListHeaders";

const SubNavBarCenter = () => {
    const [activeSubNav, setActiveSubNav] = useState(0);
  const subNavItems = ["Hospital", "Staff", "News"];

  const handleClick = (index) => {
    setActiveSubNav(index);
  };

  return (
    <div>
      <div className="bg-color-4 p-4 font-poppins font-semibold px-24 pt-7 pb-5 flex gap-7 items-center w-full text-sm">
        {subNavItems.map((item, index) => {
          const isActive = activeSubNav === index;
          const customDesign = isActive
            ? "bg-color-3 text-color-2 px-8 py-3 rounded-md cursor-pointer"
            : "text-color-6 cursor-pointer bg-color-4 px-8 py-3 rounded-md cursor-pointer";

          return (
            <p
              key={item}
              className={customDesign}
              onClick={() => handleClick(index)}
            >
              {item}
            </p>
          );
        })}
      </div>
      <div className="content">
        {activeSubNav === 0 && <HospitalListHeaders />}{" "}
        {activeSubNav === 1 && <StaffListHeaders />}{" "}
      </div>
    </div>
  );
}

export default SubNavBarCenter;