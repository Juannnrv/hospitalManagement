import React from "react";
import PatientTableRow from "./PatientTableRow";

const PatientTable = ({ patients, onDelete, onUpdate }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left bg-color-7 px-5 py-3 text-black opacity-45 text-[12px] font-poppins font-semibold">
          <th className="pb-4 pr-20">Name</th>
          <th className="pb-4 pr-10">ID</th>
          <th className="pb-4 pr-10">Date of birth</th>
          <th className="pb-4 pr-10">Age</th>
          <th className="pb-4 pr-10">Gender</th>
          <th className="pb-4 pr-10">Email</th>
          <th className="pb-4 pr-20">Phone</th>
          <th className="pb-4 pr-10">Status</th>
        </tr>
      </thead>
      <tbody>
        {patients &&
          patients.map((patient) => (
            <PatientTableRow
              key={patient.id}
              patient={patient}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
      </tbody>
    </table>
  );
};

export default PatientTable;
