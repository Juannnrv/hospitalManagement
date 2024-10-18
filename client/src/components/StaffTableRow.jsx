import React, { useState } from "react";
import boy from '../assets/img/boy.svg'
import girl from '../assets/img/girl.svg'
import row from "../assets/img/row.svg";

const StaffTableRow = ({ staff, hospitals, doctors, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    hospital_id: staff.hospital_id,
    doctor_id: staff.doctor_id,
  });
  const [submitError, setSubmitError] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitError([]);
    setValidationErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.hospital_id) errors.hospital_id = "Hospital ID is required";
    if (!formData.doctor_id) errors.doctor_id = "Doctor ID is required";
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
      hospital_id: formData.hospital_id,
      doctor_id: formData.doctor_id,
    };

    try {
      await onUpdate(staff.hospital_id, dataToSubmit);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating staff data:", error.message);
      setSubmitError([{ msg: "An unexpected error occurred." }]);
    }
  };

  return (
    <>
      <tr>
        <td className="py-4">
          <div className="flex items-center gap-3">
          <img src={ staff.gender === 'male' ? boy : girl} alt={staff.name} className="w-50 h-50 rounded-md" />

            <div>
              <div className="font-poppins font-semibold text-sm text-color-5">
                {staff.doctor}
              </div>
              <div className="text-[13px] text-black opacity-40 font-poppins font-medium">
                {staff.specialty}
              </div>
            </div>
          </div>
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {staff.hospital_id}
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {staff.hospital}
        </td>
        <td className="flex py-4 pr-4">
          <img src={row} className="w-15 h-15 cursor-pointer" alt="row icon" onClick={handleOpenModal} />
          <p className="mt-1 ml-2 cursor-pointer" onClick={() => onDelete(staff.doctor_id)}>🗑️</p>
        </td>
      </tr>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-color-4 p-6 rounded-lg shadow-lg z-10 px-20 py-14">
            <div className="flex justify-between items-center mb-10 gap-32">
              <button
                onClick={handleCloseModal}
                type="button"
                className="px-5 py-3 ml-auto bg-[#F64E60] text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
              >
                CLOSE
              </button>
            </div>

            <div>
              <div className="mb-10">
                <div className="flex gap-1">
                  <h1 className="font-poppins font-semibold text-2xl text-color-1">
                    1
                  </h1>
                  <p className="mt-3 font-poppins font-semibold text-[13px] text-color-1">
                    Staffs
                  </p>
                </div>
                <div className="h-1 w-52 bg-color-1"></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-10">
                  <div className="flex gap-5">
                    <div>
                      <label className="block font-poppins text-sm font-regular text-gray-700">
                        Hospital
                      </label>
                      <select
                        name="hospital_id"
                        value={formData.hospital_id}
                        onChange={handleChange}
                        className="pr-60 mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        required
                      >
                        <option value="">Select hospital</option>
                        {hospitals.map((hospital) => (
                          <option key={hospital.id} value={hospital.id}>
                            {hospital.name}
                          </option>
                        ))}
                      </select>
                      {validationErrors.hospital_id && (
                        <p className="text-red-500 text-sm">
                          {validationErrors.hospital_id}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-5">
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
                            {doctor.doctor}
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
                </div>

                {submitError.length > 0 && (
                  <div className="text-red-500 mt-7">
                    {submitError.map((err, index) => (
                      <p key={index}>{err.msg}</p>
                    ))}
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-5 py-3 ml-auto bg-color-2 text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffTableRow;