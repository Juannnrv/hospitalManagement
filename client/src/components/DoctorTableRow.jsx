import React from "react";
import person from "../assets/img/person.svg";
import row from "../assets/img/row.svg";

const DoctorTableRow = ({ doctor }) => {
  return (
    <tr key={doctor.id}>
      <td className="py-4">
        <div className="flex items-center gap-3">
          <img
            src={person}
            alt={doctor.name}
            className="w-50 h-50 rounded-md"
          />
          <div>
            <div className="font-poppins font-semibold text-sm text-color-5">
              {doctor.name}
            </div>
            <div className="text-[13px] text-black opacity-40 font-poppins font-medium">
              {doctor.specialty}
            </div>
          </div>
        </div>
      </td>
      <td className="font-poppins font-semibold text-sm text-color-5">
        {doctor.id}
      </td>
      <td className="font-poppins font-semibold text-sm text-color-5">
        {doctor.email}
      </td>
      <td className="font-poppins font-semibold text-sm text-color-5">
        {doctor.phone}
      </td>
      <td className="py-4 pr-4">
        <div className="font-poppins font-semibold text-sm text-color-5">
          {doctor.dateAdded}
        </div>
        <div className="text-[13px] text-black opacity-40 font-poppins font-medium">
          {doctor.time}
        </div>
      </td>
      <td className="py-4 pr-4">
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium font-poppins ${
            doctor.status === "Approved"
              ? "bg-color-3 text-color-2"
              : "bg-[#FFE2E5] text-[#F64E60]"
          }`}
        >
          {doctor.status}
        </span>
      </td>
      <td className="py-4 pr-4">
        <img src={row} className="w-15 h-15"></img>
      </td>
    </tr>
  );
};

export default DoctorTableRow;
