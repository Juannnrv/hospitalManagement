import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import doctor from "../assets/img/doctor.svg";
import DoctorTable from "./DoctorTable";

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

const specialtiesMap = {
  Cardiology: 1,
  Neurology: 2,
  Pediatrics: 3,
  Oncology: 4,
  Dermatology: 5,
};

const DoctorListHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { data: doctors, loading, error } = useFetch("/doctors");
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "male",
    dateOfJoining: "",
    license: "",
    specialty: "Cardiology",
    phone: "",
    email: "",
  });
  const [submitError, setSubmitError] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    if (doctors) {
      setDoctorList(doctors);
    }
  }, [doctors]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setSubmitError([]);
    setValidationErrors({});
  };

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full Name is required";
    if (!formData.dateOfJoining)
      errors.dateOfJoining = "Date of Joining is required";
    if (!formData.license) errors.license = "License is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.email) errors.email = "Email is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const dataToSubmit = {
      name: `Dr. ${formData.fullName}`,
      gender: formData.gender,
      date_of_birth: formData.dateOfJoining,
      license: `LIC${formData.license}`,
      specialty_id: specialtiesMap[formData.specialty],
      phone: formData.phone,
      email: formData.email,
      status: "Approved",
    };

    try {
      const result = await postData(
        "http://localhost:5000/doctors",
        dataToSubmit
      );
      console.log("Form data submitted:", result);

      const newDoctor = {
        id: result.data.id,
        name: result.data.name,
        gender: result.data.gender,
        date_of_birth: result.data.date_of_birth,
        license: result.data.license,
        specialty_id: result.data.specialty_id,
        phone: result.data.phone,
        email: result.data.email,
        status: result.data.status,
      };

      setDoctorList((prevDoctors) => [...prevDoctors, newDoctor]);

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

  const handleDeleteDoctor = async (id) => {
    try {
      await fetch(`http://localhost:5000/doctors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDoctorList((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.id !== id)
      );
    } catch (error) {
      console.error("Error deleting doctor:", error.message);
    }
  };

  const handleUpdateDoctor = async (id, updatedData) => {
    try {
      const result = await updateData(
        `http://localhost:5000/doctors/${id}`,
        updatedData
      );

      console.log("Doctor updated:", result);
      setDoctorList((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.id === id ? { ...doctor, ...result.data } : doctor
        )
      );
    } catch (error) {
      console.error("Error updating doctor:", error.message);
    }
  };

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
              <h2 className="text-lg">List of Doctors</h2>
              <p className="text-[12px] text-black opacity-40">
                {doctorList.length} available doctors
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

          <DoctorTable
            doctors={doctorList}
            onDelete={handleDeleteDoctor}
            onUpdate={handleUpdateDoctor}
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
                        Basic information
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
                                Full Name
                              </label>
                              <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                placeholder="Enter full name"
                                required
                              />
                              {validationErrors.fullName && (
                                <p className="text-red-500 text-sm">
                                  {validationErrors.fullName}
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

                            <div>
                              <label className="block font-poppins text-sm font-regular text-gray-700">
                                Date of Joining
                              </label>
                              <input
                                type="date"
                                name="dateOfJoining"
                                value={formData.dateOfJoining}
                                onChange={handleChange}
                                className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                required
                              />
                              {validationErrors.dateOfJoining && (
                                <p className="text-red-500 text-sm">
                                  {validationErrors.dateOfJoining}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-5">
                            <div>
                              <label className="block font-poppins text-sm font-regular text-gray-700">
                                License
                              </label>
                              <input
                                type="text"
                                name="license"
                                value={formData.license}
                                onChange={handleChange}
                                className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                placeholder="Enter license number"
                                required
                              />
                              {validationErrors.license && (
                                <p className="text-red-500 text-sm">
                                  {validationErrors.license}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block font-poppins text-sm font-regular text-gray-700">
                                Specialty
                              </label>
                              <select
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                                className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                required
                              >
                                <option value="Cardiology">Cardiology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Oncology">Oncology</option>
                                <option value="Dermatology">Dermatology</option>
                              </select>
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
                  {currentStep < 2 && (
                    <button
                      onClick={handleNextStep}
                      className="px-5 py-3 ml-auto bg-color-2 text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
                    >
                      NEXT STEP
                    </button>
                  )}
                  {currentStep === 2 && (
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

export default DoctorListHeader;