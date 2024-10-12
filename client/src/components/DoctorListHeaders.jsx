import React, { useState } from "react";
import doctor from "../assets/img/doctor.svg";
import useFetch from "../hooks/useFetch";

const DoctorListHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { data: doctors, loading, error } = useFetch('/doctors');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1); 
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="relative">
      <header className="flex justify-between items-center font-poppins font-medium mb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg">List of Doctors</h2>
          <p className="text-[12px] text-black opacity-40">
           {doctors.length} available doctors
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-color-2 text-white p-2 flex gap-2 py-3 px-5 font-semibold rounded-md"
        >
          <img src={doctor} alt="Doctor" />
          Add new doctor
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-color-4 p-6 rounded-lg shadow-lg z-10 px-20 py-14">
            <div className="flex justify-between items-center mb-10 gap-32">
              <div className="flex-1">
                <div className="flex gap-1">
                  <h1 className={`font-poppins font-semibold text-2xl ${currentStep === 1 ? 'text-color-1' : 'text-color-6'}`}>
                    1
                  </h1>
                  <p className={`mt-3 font-poppins font-semibold text-[13px] ${currentStep === 1 ? 'text-color-1' : 'text-color-6'}`}>
                    Basic information
                  </p>
                </div>
                <div className={`h-1 w-52 ${currentStep === 1 ? 'bg-color-1' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex-1">
                <div className="flex gap-1">
                  <h1 className={`font-poppins font-semibold text-2xl ${currentStep === 2 ? 'text-color-1' : 'text-color-6'}`}>
                    2
                  </h1>
                  <p className={`mt-3 font-poppins font-semibold text-[13px] ${currentStep === 2 ? 'text-color-1' : 'text-color-6'}`}>
                    Enter Contact
                  </p>
                </div>
                <div className={`h-1 w-52 ${currentStep === 2 ? 'bg-color-1' : 'bg-gray-200'}`}></div>
              </div>
            </div>

            <div>
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                  {/* Aquí puedes agregar los campos del formulario para la información básica */}
                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Enter Contact</h2>
                  {/* Aquí puedes agregar los campos del formulario para los detalles de contacto */}
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <button
                  onClick={handlePreviousStep}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Previous Step
                </button>
              )}
              {currentStep < 2 && (
                <button
                  onClick={handleNextStep}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto"
                >
                  Next Step
                </button>
              )}
              {currentStep === 2 && (
                <button
                  onClick={handleCloseModal}
                  className="bg-green-500 text-white px-4 py-2 rounded-md ml-auto"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorListHeader;