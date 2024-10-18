import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import AppointmentTable from "./AppointmentTable";
import doctor from "../assets/img/doctor.svg";

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

const AppointmentListHeaders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [populations, setPopulations] = useState([]);
  const {
    data: initialPopulations,
    loading,
    error,
  } = useFetch("/populations/current");
  const { data: availablePatients } = useFetch("/populations");
  const { data: doctors } = useFetch("/doctors");
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
  });
  const [submitError, setSubmitError] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (initialPopulations) {
      setPopulations(initialPopulations);
    }
  }, [initialPopulations]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitError([]);
    setValidationErrors({});
    setCurrentStep(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.patient_id) errors.patient_id = "Patient ID is required";
      if (!formData.doctor_id) errors.doctor_id = "Doctor ID is required";
    }
    return errors;
  };

  const handleNextStep = () => {
    const errors = validateForm(currentStep);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(currentStep);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const dataToSubmit = {
      patient_id: formData.patient_id,
      doctor_id: formData.doctor_id,
    };

    try {
      const result = await postData(
        "http://localhost:5000/populations",
        dataToSubmit
      );
      console.log("Form data submitted:", result);

      setPopulations((prevPopulations) => [...prevPopulations, result.data]);

      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      try {
        const parsedError = JSON.parse(error.message);
        setSubmitError(
          Array.isArray(parsedError.errors) ? parsedError.errors : [parsedError]
        );
      } catch {
        setSubmitError([{ msg: "An unexpected error occurred." }]);
      }
    }
  };

  const handleDeletePopulation = async (id) => {
    try {
      await fetch(`http://localhost:5000/populations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPopulations((prevPopulations) =>
        prevPopulations.filter((population) => population.id !== id)
      );
    } catch (error) {
      console.error("Error deleting population:", error.message);
    }
  };

  const handleUpdatePopulation = (id, updatedData) => {
    console.log('Appointment ID:', id);
    setPopulations((prevPopulations) => {
      const updatedPopulations = prevPopulations.map((population) => {
        console.log('Population Object:', population); // Imprimir el objeto population
        if (population.id === id) {
          return {
            ...population,
            ...updatedData,
            id: population.id, // Asegúrate de mantener el id original
            doctor: doctors.find(doc => doc.id === updatedData.doctor_id)?.name || population.doctor,
            doctor_specialty: doctors.find(doc => doc.id === updatedData.doctor_id)?.specialty || population.doctor_specialty,
            patient: availablePatients.find(pat => pat.id === updatedData.patient_id)?.name || population.patient,
          };
        }
        return population;
      });
      console.log('Updated Populations:', updatedPopulations); // Verificar las poblaciones actualizadas
      return updatedPopulations;
    });
  };

  useEffect(() => {
    console.log('Populations updated:', populations);
  }, [populations]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-color-7 p-16 h-[80vh]">
      <div className="bg-color-4 rounded-xl p-7">
        <div className="relative">
          <header className="flex justify-between items-center font-poppins font-medium mb-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg">Current Appointments</h2>
              <p className="text-[12px] text-black opacity-40">
                {populations.length} Appointments
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-color-2 text-white p-2 flex gap-2 py-3 px-5 font-semibold rounded-md"
            >
              <img src={doctor} alt="Doctor" />
              Add new Appointment
            </button>
          </header>

          <AppointmentTable
            appointments={populations}
            patients={availablePatients}
            doctors={doctors}
            onDelete={handleDeletePopulation}
            onUpdate={handleUpdatePopulation}
          />

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="bg-color-4 p-6 rounded-lg shadow-lg z-10 px-20 py-14">
                <div className="flex justify-between items-center mb-10 gap-32">
                  <div className="flex-1">
                    <div className="flex gap-1">
                      <h1
                        className={`font-poppins font-semibold text-2xl ${
                          currentStep === 1 ? "text-color-1" : "text-color-6"
                        }`}
                      >
                        1
                      </h1>
                      <p
                        className={`mt-3 font-poppins font-semibold text-[13px] ${
                          currentStep === 1 ? "text-color-1" : "text-color-6"
                        }`}
                      >
                        Assignments
                      </p>
                    </div>
                    <div
                      className={`h-1 w-52 ${
                        currentStep === 1 ? "bg-color-1" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="px-5 py-3 ml-auto bg-[#F64E60] text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
                  >
                    CLOSE
                  </button>
                </div>

                <div>
                  {currentStep === 1 && (
                    <div>
                      <h2 className="font-poppins text-xl font-medium mb-4">
                        Assignments
                      </h2>
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block font-poppins text-sm font-regular text-gray-700">
                              Patient
                            </label>
                            <select
                              name="patient_id"
                              value={formData.patient_id}
                              onChange={handleChange}
                              className="pr-60 mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                              required
                            >
                              <option value="">Select patient</option>
                              {availablePatients.map((patient) => (
                                <option key={patient.id} value={patient.id}>
                                  {patient.name}
                                </option>
                              ))}
                            </select>
                            {validationErrors.patient_id && (
                              <p className="text-red-500 text-sm">
                                {validationErrors.patient_id}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block font-poppins text-sm font-regular text-gray-700">
                              Doctor
                            </label>
                            <select
                              name="doctor_id"
                              value={formData.doctor_id}
                              onChange={handleChange}
                              className="pr-60 mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                              required
                            >
                              <option value="">Select doctor</option>
                              {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                  {doctor.name}
                                </option>
                              ))}
                            </select>
                            {validationErrors.doctor_id && (
                              <p className="text-red-500 text-sm">
                                {validationErrors.doctor_id}
                              </p>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-6">
                  {currentStep > 1 && (
                    <button
                      onClick={handlePreviousStep}
                      className="px-5 py-3 mr-auto bg-color-5 text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
                    >
                      Previous Step
                    </button>
                  )}
                  {currentStep < 1 && (
                    <button
                      onClick={handleNextStep}
                      className="px-5 py-3 ml-auto bg-color-2 text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
                    >
                      NEXT STEP
                    </button>
                  )}
                  {currentStep === 1 && (
                    <button
                      onClick={handleSubmit}
                      className="px-5 py-3 ml-auto bg-color-2 text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentListHeaders;
