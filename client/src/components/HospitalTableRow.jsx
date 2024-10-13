import React, { useState } from "react";
import row from "../assets/img/row.svg";

const HospitalTableRow = ({ hospital, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: hospital.name,
    address: hospital.address,
    phone: hospital.phone,
    email: hospital.email,
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
    if (!formData.name) errors.name = "Name is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!formData.email) errors.email = "Email is required";
    return errors;
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
      if (!response.ok) {
        throw new Error("Failed to update hospital");
      }
      return await response.json();
    } catch (error) {
      setSubmitError([{ msg: error.message }]);
    }
  };

  const deleteHospital = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/hospitals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete hospital");
      }
      return await response.json();
    } catch (error) {
      setSubmitError([{ msg: error.message }]);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteHospital(hospital.id);
      onDelete(hospital.id);
    } catch (error) {
      setSubmitError([{ msg: error.message }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
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

    await updateHospital(hospital.id, dataToSubmit);
    handleCloseModal();
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
          <p className="mt-1 ml-2 cursor-pointer" onClick={handleDelete}>
            🗑️
          </p>
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
                    Hospital Details
                  </p>
                </div>
                <div className="h-1 w-52 bg-color-1"></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-10">
                  <div className="flex gap-5">
                    <div>
                      <label className="block font-poppins text-sm font-regular text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pr-60 mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        required
                      />
                      {validationErrors.name && (
                        <p className="text-red-500 text-sm">
                          {validationErrors.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div>
                      <label className="block font-poppins text-sm font-regular text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="pr-60 mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        required
                      />
                      {validationErrors.address && (
                        <p className="text-red-500 text-sm">
                          {validationErrors.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-10">
                  <div className="flex gap-5">
                    <div>
                      <label className="block font-poppins text-sm font-regular text-gray-700">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pr-60 mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        required
                      />
                      {validationErrors.phone && (
                        <p className="text-red-500 text-sm">
                          {validationErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div>
                      <label className="block font-poppins text-sm font-regular text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pr-60 mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
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

export default HospitalTableRow;