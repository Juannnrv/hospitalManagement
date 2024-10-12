import React, { useState } from "react";
import person from "../assets/img/person.svg";
import row from "../assets/img/row.svg";

const AppointmentTableRow = ({ appointment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    gender: appointment.gender,
    specialty: appointment.doctor_specialty,
    phone: appointment.phone,
    email: appointment.email,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [submitError, setSubmitError] = useState([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de validación y envío de formulario
  };
  const handleDelete = () => {
    // Lógica de eliminación
  };

  const formatDate = (date) => {
    // Lógica de formateo de fecha
    return date;
  };

  return (
    <>
      <tr>
        <td className="py-4">
          <div className="flex items-center gap-3">
            <img src={person} alt={appointment.patient} className="w-50 h-50 rounded-md" />
            <div>
              <div className="font-poppins font-semibold text-sm text-color-5">
                {appointment.doctor}
              </div>
              <div className="text-[13px] text-black opacity-40 font-poppins font-medium">
                {appointment.doctor_specialty}
              </div>
            </div>
          </div>
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {appointment.id}
        </td><td className="font-poppins font-semibold text-sm text-color-5">
          {appointment.patient}
        </td>
        <td className="py-4 pr-4">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium font-poppins ${
              appointment.status === "Approved"
                ? "bg-color-3 text-color-2"
                : "bg-[#FFE2E5] text-[#F64E60]"
            }`}
          >
            {appointment.status}
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
              <button
                onClick={handleCloseModal}
                type="submit"
                className="px-5 py-3 ml-auto bg-[#F64E60] text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
              >
                CLOSE
              </button>
            </div>

            <div>
              <h2 className="font-poppins text-xl font-medium mb-4">
                Basic Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-5">
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

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="px-5 py-3 ml-auto bg-color-2 text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentTableRow;