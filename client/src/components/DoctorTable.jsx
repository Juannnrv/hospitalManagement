import React from "react";
import DoctorTableRow from "./DoctorTableRow";
import useFetch from "../hooks/useFetch";

const DoctorTable = () => {
  const { data: doctors, loading, error } = useFetch("/doctors");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left bg-color-7 px-5 py-3 text-black opacity-45 text-[12px] font-poppins font-semibold">
          <th className="pb-4">Name</th>
          <th className="pb-4">ID</th>
          <th className="pb-4">Email</th>
          <th className="pb-4">Phone number</th>
          <th className="pb-4">Date added</th>
          <th className="pb-4">STATUS</th>
          <th className="pb-4"></th>
        </tr>
      </thead>
      <tbody>
        {doctors && doctors.map((doctor) => (
          <DoctorTableRow key={doctor.id} doctor={doctor} />
        ))}
      </tbody>
    </table>
  );
};

export default DoctorTable;