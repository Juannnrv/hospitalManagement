import React from "react";
import DoctorTableRow from "./DoctorTableRow";

const DoctorTable = ({ doctors, onDelete, onUpdate }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left bg-color-7 px-5 py-3 text-black opacity-45 text-[12px] font-poppins font-semibold">
          <th className="pb-4 pr-40">Name</th>
          <th className="pb-4 pr-10">ID</th>
          <th className="pb-4 pr-10">Gender</th>
          <th className="pb-4">Email</th>
          <th className="pb-4">Phone number</th>
          <th className="pb-4">Date added</th>
          <th className="pb-4">License</th>
          <th className="pb-4">STATUS</th>
          <th className="pb-4"></th>
        </tr>
      </thead>
      <tbody>
        {doctors && doctors.map((doctor) => (
          <DoctorTableRow 
            key={doctor.id} 
            doctor={doctor} 
            onDelete={onDelete} 
            onUpdate={onUpdate} 
          />
        ))}
      </tbody>
    </table>
  );
};

export default DoctorTable;