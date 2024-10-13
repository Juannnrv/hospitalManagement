import React from "react";
import HospitalTableRow from "./HospitalTableRow";

const HospitalTable = ({ hospitals, onDelete, onUpdate }) => {
    return (
      <table className="w-full">
        <thead>
          <tr className="text-left bg-color-7 px-5 py-3 text-black opacity-45 text-[12px] font-poppins font-semibold">
            <th className="pb-4 pr-16">NIT</th>
            <th className="pb-4 pr-20">Name</th>
            <th className="pb-4">Address</th>
            <th className="pb-4 pr-16">Phone</th>
            <th className="pb-4">Email</th>
            <th className="pb-4"></th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <HospitalTableRow
              key={hospital.id}
              hospital={hospital}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </tbody>
      </table>
    );
  };

export default HospitalTable;