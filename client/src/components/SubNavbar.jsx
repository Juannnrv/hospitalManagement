import React from 'react';

const SubNavbar = () => {
  return (
    <div className="bg-color-4 p-4 font-poppins font-semibold px-24 pt-7 pb-5 flex gap-7 items-center w-full text-sm">
      <div className='bg-color-3 text-color-2 px-8 py-3 rounded-md'>
        <p>Doctor</p>
      </div>
      <div className='text-color-6'>
        <p>Administration</p>
      </div>
      <div className='text-color-6'>
        <p>Accounts</p>
      </div>
    </div>
  );
};

export default SubNavbar;
