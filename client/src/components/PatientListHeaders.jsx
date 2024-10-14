import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import PatientTable from "./PatientTable";
import doctor from "../assets/img/doctor.svg";

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

const updateData = async (url, data) => {
  const response = await fetch(url, {
    method: "PUT",
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

const PatientListHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { data: patients, loading, error } = useFetch("/patients");
  const [formData, setFormData] = useState({
    name: "",
    gender: "female",
    date_of_birth: "",
    age: "",
    email: "",
    phone: "",
    medical_history: "",
  });
  const [submitError, setSubmitError] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    if (patients) {
      setPatientList(patients);
    }
  }, [patients]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setSubmitError([]);
    setValidationErrors({});
  };

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.date_of_birth) errors.date_of_birth = "Date of Birth is required";
    if (!formData.age) errors.age = "Age is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.medical_history_file) errors.medical_history = "Medical History is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const dataToSubmit = new FormData();
    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("gender", formData.gender);
    dataToSubmit.append("date_of_birth", formData.date_of_birth);
    dataToSubmit.append("age", formData.age);
    dataToSubmit.append("status", "Approved");
    dataToSubmit.append("email", formData.email);
    dataToSubmit.append("phone", formData.phone);
    dataToSubmit.append("medical_history", formData.medical_history_file);

    try {
      const result = await postData("http://localhost:5000/patients", dataToSubmit);
      console.log("Form data submitted:", result);

      const newPatient = {
        id: result.data.id,
        ...result.data,
      };

      setPatientList((prevPatients) => [...prevPatients, newPatient]);

      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      try {
        const parsedError = JSON.parse(error.message);
        console.error("Parsed error:", parsedError);
        setSubmitError(
          Array.isArray(parsedError.errors) ? parsedError.errors : [parsedError]
        );
      } catch (parseError) {
        console.error("Error parsing error message:", parseError);
        setSubmitError([{ msg: "An unexpected error occurred." }]);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "medical_history" && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        medical_history_file: file, 
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await fetch(`http://localhost:5000/patients/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPatientList((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== id)
      );
    } catch (error) {
      console.error("Error deleting patient:", error.message);
    }
  };

  const handleUpdatePatient = async (id, updatedData) => {
    try {
      const result = await updateData(
        `http://localhost:5000/patients/${id}`,
        updatedData
      );

      console.log("Patient updated:", result);
      setPatientList((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === id ? { ...patient, ...result.data } : patient
        )
      );
    } catch (error) {
      console.error("Error updating patient:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-color-7 p-16 h-[80vh]">
      <div className="bg-color-4 rounded-xl p-7">
        <div className="relative">
          <header className="flex justify-between items-center font-poppins font-medium mb-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg">List of Patients</h2>
              <p className="text-[12px] text-black opacity-40">
                {patientList.length} available patients
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-color-2 text-white p-2 flex gap-2 py-3 px-5 font-semibold rounded-md"
            >
              <img src={doctor} alt="Patient" />
              Add new patient
            </button>
          </header>

          <PatientTable
            patients={patientList}
            onDelete={handleDeletePatient}
            onUpdate={handleUpdatePatient}
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
                        Basic Information
                      </p>
                    </div>
                    <div
                      className={`h-1 w-52 ${
                        currentStep === 1 ? "bg-color-1" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-1">
                      <h1
                        className={`font-poppins font-semibold text-2xl ${
                          currentStep === 2 ? "text-color-1" : "text-color-6"
                        }`}
                      >
                        2
                      </h1>
                      <p
                        className={`mt-3 font-poppins font-semibold text-[13px] ${
                          currentStep === 2 ? "text-color-1" : "text-color-6"
                        }`}
                      >
                        Enter Contact
                      </p>
                    </div>
                    <div
                      className={`h-1 w-52 ${
                        currentStep === 2 ? "bg-color-1" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-1">
                      <h1
                        className={`font-poppins font-semibold text-2xl ${
                          currentStep === 3 ? "text-color-1" : "text-color-6"
                        }`}
                      >
                        3
                      </h1>
                      <p
                        className={`mt-3 font-poppins font-semibold text-[13px] ${
                          currentStep === 3 ? "text-color-1" : "text-color-6"
                        }`}
                      >
                        Medical History
                      </p>
                    </div>
                    <div
                      className={`h-1 w-52 ${
                        currentStep === 3 ? "bg-color-1" : "bg-gray-200"
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
                        Basic Information
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-5">
                            <div>
                              <label className="block font-poppins text-sm font-regular text-gray-700">
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                placeholder="Enter name"
                                required
                              />
                              {validationErrors.name && (
                                <p className="text-red-500 text-sm">
                                  {validationErrors.name}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block font-poppins text-sm font-regular text-gray-700">
                                Gender
                              </label>
                              <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                required
                              >
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="other">other</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex flex-col gap-5">
                            <div>
                              <label className="block font-poppins text-sm font-regular text-gray-700">
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                required
                              />
                              {validationErrors.date_of_birth && (
                                <p className="text-red-500 text-sm">
                                  {validationErrors.date_of_birth}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block font-poppins text-sm font-regular text-gray-700">
                                Age
                              </label>
                              <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                placeholder="Enter age"
                                required
                              />
                              {validationErrors.age && (
                                <p className="text-red-500 text-sm">
                                  {validationErrors.age}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="font-poppins text-xl font-medium mb-4">
                        Enter Contact
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-6 mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-5">
                            <div>
                              <label className="block font-poppins text-sm font-regular text-gray-700">
                                Phone
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="p-1.5 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter phone number"
                                required
                              />
                              {validationErrors.phone && (
                                <p className="text-red-500 text-sm">
                                  {validationErrors.phone}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-5">
                            <div>
                              <label className="block font-poppins text-sm font-regular text-gray-700">
                                Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-1.5 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter email address"
                                required
                              />
                              {validationErrors.email && (
                                <p className="text-red-500 text-sm">
                                  {validationErrors.email}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {submitError.length > 0 && (
                          <div className="text-red-500 mt-7">
                            {submitError.map((err, index) => (
                              <p key={index}>{err.msg}</p>
                            ))}
                          </div>
                        )}
                      </form>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="font-poppins text-xl font-medium mb-4">
                        Medical History
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-6 mb-20">
                        <div className="grid grid-cols-1 gap-6">
                          <div className="flex flex-col gap-5">
                            <div>
                              <label className="block font-poppins text-sm font-regular text-gray-700">
                                Medical History
                              </label>
                              <input
                                type="file"
                                name="medical_history"
                                accept=".txt"
                                onChange={handleChange}
                                className="p-1.5 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                              />
                              {validationErrors.medical_history && (
                                <p className="text-red-500 text-sm">
                                  {validationErrors.medical_history}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {submitError.length > 0 && (
                          <div className="text-red-500 mt-7">
                            {submitError.map((err, index) => (
                              <p key={index}>{err.msg}</p>
                            ))}
                          </div>
                        )}
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
                  {currentStep < 3 && (
                    <button
                      onClick={handleNextStep}
                      className="px-5 py-3 ml-auto bg-color-2 text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
                    >
                      NEXT STEP
                    </button>
                  )}
                  {currentStep === 3 && (
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

export default PatientListHeader;