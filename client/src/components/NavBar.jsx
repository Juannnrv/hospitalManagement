import React, { useState } from 'react';
import Logo from '../assets/img/Logo.svg';
import Profile from '../assets/img/profile.svg';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuItems = ['Users', 'Patients', 'Hospitals', 'Notice', 'Help Center'];

  const handleClick = (index) => {
    setActiveMenu(index); 
  };

  return (
    <nav className="bg-color-1 p-4 font-poppins font-semibold px-24 pt-7 pb-5 flex items-center justify-between w-full text-base">
      <div className='flex gap-10'>
        <img src={Logo} className="w-6 h-6" alt="Logo" />
        {menuItems.map((item, index) => {
          const isActive = activeMenu === index;
          const textColor = isActive ? 'text-color-1' : 'text-color-4';

          return (
            <h1
              key={item} 
              className={textColor}
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
