import React from "react";
import AppointmentTableRow from "./AppointmentTableRow";

const AppointmentTable = ({ appointments, patients, doctors, onDelete, onUpdate }) => {
  return (
    <table className="w-full ">
      <thead>
        <tr className="text-left bg-color-7 px-5 py-3 text-black opacity-45 text-[12px] font-poppins font-semibold">
          <th className="pb-4">Doctor</th>
          <th className="pb-4 pr-20">ID</th>
          <th className="pb-4 pr-20">Patient</th>
          <th className="pb-4 pr-20">Status</th>
          <th className="pb-4"></th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <AppointmentTableRow
            key={appointment.id}
            appointment={appointment}
            patients={patients}
            doctors={doctors}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;
