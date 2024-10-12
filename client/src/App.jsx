import React from "react";
import Navbar from "./components/NavBar";
import SubNavbar from "./components/SubNavbar";
import DoctorListHeader from "./components/DoctorListHeaders";
import DoctorTable from "./components/DoctorTable";

const App = () => {

  return (
    <div>
      <Navbar />
      <SubNavbar />
      <div className="bg-color-7 p-16 h-[80vh]">
        <div className="bg-color-4 rounded-xl p-7">
          <DoctorListHeader />
          <DoctorTable />
        </div>
      </div>
    </div>
  );
};

export default App;
