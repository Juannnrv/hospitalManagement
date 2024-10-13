import React, { useState } from "react";
import row from "../assets/img/row.svg";

const HospitalTableRow = ({ hospital, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: hospital.name,
    address: hospital.address,
    phone: hospital.phone,
    email: hospital.email,
  });
  const [submitError, setSubmitError] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const handleOpenModal = () => {
    setFormData({
      id: hospital.id,
      name: hospital.name,
      address: hospital.address,
      phone: hospital.phone,
      email: hospital.email,
    });
    setIsModalOpen(true);
  };

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

  const updateHospital = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:5000/hospitals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update hospital");
      }
      return result.data; 
    } catch (error) {
      setSubmitError([{ msg: error.message }]);
    }
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
  
    const updatedHospital = await updateHospital(hospital.id, dataToSubmit);
    if (updatedHospital) {
      onUpdate(hospital.id, updatedHospital);
      handleCloseModal();
    }
  };

  return (
    <>
      <tr>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {hospital.id}
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {hospital.name}
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {hospital.address.length > 30
            ? `${hospital.address.slice(0, 30)}...`
            : hospital.address}
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {hospital.phone}
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {hospital.email}
        </td>
        <td className="flex py-4 pr-4">
          <img
            src={row}
            className="w-15 h-15 cursor-pointer"
            alt="row icon"
            onClick={handleOpenModal}
          />
          <p className="mt-1 ml-2 cursor-pointer" onClick={() => onDelete(hospital.id)}>
            🗑️
          </p>
        </td>
      </tr>

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
    </>
  );
};

export default HospitalTableRow;