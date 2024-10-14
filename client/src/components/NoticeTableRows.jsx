import React, { useState } from "react";
import person from "../assets/img/person.svg";
import row from "../assets/img/row.svg";

const NoticeTableRow = ({ notice, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: notice.name,
    description: notice.description,
    date: notice.date ? notice.date.split('T')[0] : '',
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
    if (!formData.name) errors.name = "Name is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.date) errors.date = "Date is required";
    return errors;
  };

  const updateNotice = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:5000/notices/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update notice");
      }
      return await response.json();
    } catch (error) {
      setSubmitError([{ msg: error.message }]);
    }
  };

  const deleteNotice = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/notices/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error in deleteNotice: ${error.message}`);
      setSubmitError([{ msg: error.message }]);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNotice(notice.id);
      console.log(`Calling onDelete for notice ID: ${notice.id}`);
      onDelete(notice.id);
    } catch (error) {
      console.error(`Error in handleDelete: ${error.message}`);
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
      description: formData.description,
      date: formData.date,
    };

    const updatedNotice = await updateNotice(notice.id, dataToSubmit);
    onUpdate(notice.id, updatedNotice.data);
    handleCloseModal();
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
        <td className="font-poppins font-semibold text-sm text-color-5">
          {notice.id}
        </td>
        <td className="font-poppins font-semibold text-sm text-color-5">
          {notice.hospital_name}
        </td>
        <td className="py-4 pr-4">
          <div className="font-poppins font-semibold text-sm text-color-5">
            {formatDate(notice.date)}
          </div>
        </td>
        <td className="py-4 pr-4">
          <div className="font-poppins font-semibold text-sm text-color-5">
            {notice.name}
          </div>
        </td>
        <td className="py-4 pr-4">
          <div className="font-poppins font-semibold text-sm text-color-5">
            {notice.description}
          </div>
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
                    Edit Notice
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
                    Edit Notice
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
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
                          placeholder="Enter notice name"
                          required
                        />
                        {validationErrors.name && (
                          <p className="text-red-500 text-sm">{validationErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-poppins text-sm font-regular text-gray-700">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                          placeholder="Enter description"
                          required
                        />
                        {validationErrors.description && (
                          <p className="text-red-500 text-sm">{validationErrors.description}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-poppins text-sm font-regular text-gray-700">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                          required
                        />
                        {validationErrors.date && (
                          <p className="text-red-500 text-sm">{validationErrors.date}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-md"
                    >
                      Update Notice
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeTableRow;
