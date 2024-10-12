import React from "react";
import AppointmnetTableRow from "./AppointmentTableRow";

const AppointmentTable = ({ appointments }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left bg-color-7 px-5 py-3 text-black opacity-45 text-[12px] font-poppins font-semibold">
          <th className="pb-4">Doctor</th>
          <th className="pb-4">ID</th>
          <th className="pb-4">Patient</th>
          <th className="pb-4">Status</th>
          <th className="pb-4"></th>
        </tr>
      </thead>
      <tbody>
        {appointments &&
          appointments.map((appointment) => (
            <AppointmnetTableRow
              key={appointment.id}
              appointment={appointment}
            />
          ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;
