import React from 'react';
import Navbar from './components/NavBar';
import SubNavbar from './components/SubNavbar';
import DoctorListHeader from './components/DoctorListHeaders';
import DoctorTable from './components/DoctorTable';

const App = () => {
  const doctors = [
    // Aquí puedes agregar datos de prueba
    { id: 1, name: 'Brooklyn Simmons', email: 'brooklyns@mail.com', phone: '(603) 555-0123', dateAdded: '21/12/2022', status: 'Approved' },
    // Más doctores...
  ];

  return (
    <div>
      <Navbar />
      <SubNavbar />
      <DoctorListHeader />
      <DoctorTable doctors={doctors} />
    </div>
  );
};

export default App;
