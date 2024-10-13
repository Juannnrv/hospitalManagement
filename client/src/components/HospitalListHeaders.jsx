import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import HospitalTable from "./HospitalTable";
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

const HospitalListHeaders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const { data: initialHospitals, loading, error } = useFetch("/hospitals");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [submitError, setSubmitError] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (initialHospitals) {
      setHospitals(initialHospitals);
    }
  }, [initialHospitals]);

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
      if (!formData.name) errors.name = "Name is required";
      if (!formData.address) errors.address = "Address is required";
    } else if (step === 2) {
      if (!formData.phone) errors.phone = "Phone is required";
      if (!formData.email) errors.email = "Email is required";
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
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
    };

    try {
      const result = await postData(
        "http://localhost:5000/hospitals",
        dataToSubmit
      );
      console.log("Form data submitted:", result);

      const newHospital = {
        id: result.data.id,
        name: result.data.name,
        address: result.data.address,
        phone: result.data.phone,
        email: result.data.email,
      };

      setHospitals((prevHospitals) => [...prevHospitals, newHospital]);

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

  const handleDeleteHospital = async (id) => {
    try {
      await fetch(`http://localhost:5000/hospitals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setHospitals((prevHospitals) =>
        prevHospitals.filter((hospital) => hospital.id !== id)
      );
    } catch (error) {
      console.error("Error deleting hospital:", error.message);
    }
  };

  const handleUpdateHospital = (id, updatedData) => {
    setHospitals((prevHospitals) =>
      prevHospitals.map((hospital) =>
        hospital.id === id ? { ...hospital, ...updatedData } : hospital
      )
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-color-7 p-16 h-[80vh]">
      <div className="bg-color-4 rounded-xl p-7">
        <div className="relative">
          <header className="flex justify-between items-center font-poppins font-medium mb-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg">Current Hospitals</h2>
              <p className="text-[12px] text-black opacity-40">
                {hospitals.length} Hospitals
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-color-2 text-white p-2 flex gap-2 py-3 px-5 font-semibold rounded-md"
            >
              <img src={doctor} alt="Doctor" />
              Add new Hospital
            </button>
          </header>

          <HospitalTable
            hospitals={hospitals}
            onDelete={handleDeleteHospital}
            onUpdate={handleUpdateHospital}
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
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                              Address
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                              required
                            />
                            {validationErrors.address && (
                              <p className="text-red-500 text-sm">
                                {validationErrors.address}
                              </p>
                            )}
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
                      <form className="space-y-6 mb-20">
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

export default HospitalListHeaders;
