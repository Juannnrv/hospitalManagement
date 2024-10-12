import React, { useState } from "react";
import person from "../assets/img/person.svg";
import row from "../assets/img/row.svg";

const specialtiesMap = {
  Cardiology: 1,
  Neurology: 2,
  Pediatrics: 3,
  Oncology: 4,
  Dermatology: 5,
};

const DoctorTableRow = ({ doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: doctor.name.replace("Dr. ", ""),
    gender: doctor.gender,
    dateOfJoining: doctor.date_of_birth.split('T')[0],
    license: doctor.license.replace("LIC", ""),
    specialty: doctor.specialty,
    phone: doctor.phone,
    email: doctor.email,
    status: doctor.status,
  });
  const [submitError, setSubmitError] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

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
    if (!formData.dateOfJoining) errors.dateOfJoining = "Date of Joining is required";
    if (!formData.license) errors.license = "License is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.specialty) errors.specialty = "Specialty is required";
    if (!formData.status) errors.status = "Status is required";
    return errors;
  };

  const updateDoctor = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:5000/doctors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update doctor");
      }
      return await response.json();
    } catch (error) {
      setSubmitError([{ msg: error.message }]);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/doctors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete doctor");
      }
      return await response.json();
    } catch (error) {
      setSubmitError([{ msg: error.message }]);
    }
  };

  const handleDelete = async () => {
    await deleteDoctor(doctor.id);
    window.location.reload();
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
      status: formData.status,
    };

    await updateDoctor(doctor.id, dataToSubmit);
    handleCloseModal();
    window.location.reload();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <tr>
        <td className="py-4">
          <div className="flex items-center gap-3">
            <img src={person} alt={doctor.name} className="w-50 h-50 rounded-md" />
            <div>
              <div className="font-poppins font-semibold text-sm text-color-5">
                {doctor.name}
              </div>
              <div className="text-[13px] text-black opacity-40 font-poppins font-medium">
                {doctor.specialty}
              </div>
            </div>
          </div>
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {doctor.id}
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {doctor.gender}
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {doctor.email}
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {doctor.phone}
        </td>
        <td className="py-4 pr-4">
          <div className="font-poppins font-semibold text-sm text-color-5">
            {formatDate(doctor.date_of_birth)}
          </div>
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {doctor.license}
        </td>
        <td className="py-4 pr-4">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium font-poppins ${
              doctor.status === "Approved"
                ? "bg-color-3 text-color-2"
                : "bg-[#FFE2E5] text-[#F64E60]"
            }`}
          >
            {doctor.status}
          </span>
        </td>
        <td className="flex py-4 pr-4">
          <img src={row} className="w-15 h-15 cursor-pointer" alt="row icon" onClick={handleOpenModal} />
          <p className="mt-1 ml-2 cursor-pointer" onClick={handleDelete}>🗑️</p>
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
                type="submit"
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
                            <p className="text-red-500 text-sm">{validationErrors.fullName}</p>
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
                            <p className="text-red-500 text-sm">{validationErrors.dateOfJoining}</p>
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
                            <p className="text-red-500 text-sm">{validationErrors.license}</p>
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

                        <div>
                          <label className="block font-poppins text-sm font-regular text-gray-700">
                            Status
                          </label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            required
                          >
                            <option value="Approved">Approved</option>
                            <option value="Declined">Declined</option>
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
                            <p className="text-red-500 text-sm">{validationErrors.phone}</p>
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
                            <p className="text-red-500 text-sm">{validationErrors.email}</p>
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

export default DoctorTableRow;