import React from "react";
import StaffTableRow from "./StaffTableRow";

const StaffTable = ({ staff, hospitals, doctors, onDelete, onUpdate }) => {
  if (!Array.isArray(staff)) {
    console.error("Staff is not an array:", staff);
    return null;
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left bg-color-7 px-5 py-3 text-black opacity-45 text-[12px] font-poppins font-semibold">
          <th className="pb-4 pr-20">Doctor</th>
          <th className="pb-4 pr-20">ID</th>
          <th className="pb-4 pr-20">Hospital</th>
        </tr>
      </thead>
      <tbody>
        {staff.map((staffMember) => (
          <StaffTableRow
            key={`${staffMember.hospital_id}-${staffMember.doctor}`}
            staff={staffMember}
            doctors={doctors}
            hospitals={hospitals}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StaffTable;