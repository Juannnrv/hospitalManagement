import React from "react";
import AppointmentTableRow from "./AppointmentTableRow";

const AppointmentTable = ({ appointments, patients, doctors }) => {
  return (
    <table className="w-full ">
      <thead>
        <tr className="text-left bg-color-7 px-5 py-3 text-black opacity-45 text-[12px] font-poppins font-semibold">
          <th className="pb-4 ">Doctor</th>
          <th className="pb-4">ID</th>
          <th className="pb-4">Patient</th>
          <th className="pb-4">Status</th>
          <th className="pb-4"></th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <AppointmentTableRow
            key={appointment.id || index}
            appointment={appointment}
            patients={patients}
            doctors={doctors}
          />
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;
