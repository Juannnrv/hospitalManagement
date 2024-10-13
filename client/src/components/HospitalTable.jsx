import React from "react";
import HospitalTableRow from "./HospitalTableRow";

const HospitalTable = ({ hospitals, onDelete }) => {
  if (!hospitals) return <p>Loading...</p>;

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
        {hospitals.map((hospital, index) => (
          <HospitalTableRow
            key={hospital.id || index}
            hospital={hospital}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default HospitalTable;