import React from "react";
import doctor from "../assets/img/doctor.svg";

const DoctorListHeader = () => {
  return (
    <header className="flex justify-between items-center font-poppins font-medium mb-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg">List of Doctors</h2>
        <p className="text-[12px] text-black opacity-40">
          345 available doctors
        </p>
      </div>
      <button className="bg-color-2 text-white p-2 flex gap-2 py-3 px-5 font-semibold rounded-md">
        <img src={doctor} alt="Doctor" />
        Add new doctor
      </button>
    </header>
  );
};

export default DoctorListHeader;
