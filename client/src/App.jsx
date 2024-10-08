import React from "react";
import Navbar from "./components/NavBar";
import SubNavbar from "./components/SubNavbar";
import DoctorListHeader from "./components/DoctorListHeaders";
import DoctorTable from "./components/DoctorTable";

const App = () => {
  const doctors = [
    {
      id: 87364523,
      name: "Brooklyn Simmons",
      email: "brooklyns@mail.com",
      phone: "(603) 555-0123",
      dateAdded: "21/12/2022",
      status: "Declined",
      specialty: "Cardiologist",
      time: "10:00 AM",
    },
    {
      id: 123456789,
      name: "Gengar",
      email: "gengar@example.com",
      phone: "(603) 458-0123",
      dateAdded: "24/07/2021",
      status: "Approved",
      specialty: "Dentist",
      time: "11:00 AM",
    }
  ];

  return (
    <div>
      <Navbar />
      <SubNavbar />
      <div className="bg-color-7 p-16 h-[80vh]">
        <div className="bg-color-4 rounded-xl p-7">
          <DoctorListHeader />
          <DoctorTable doctors={doctors} />
        </div>
      </div>
    </div>
  );
};

export default App;
