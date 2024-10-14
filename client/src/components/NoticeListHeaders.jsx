import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import NoticeTable from "./NoticeTable";
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

const NoticeListHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { data: notices, loading, error } = useFetch("/notices");
  const { data: hospitals } = useFetch("/hospitals");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hospital_id: "",
  });
  const [submitError, setSubmitError] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    if (notices) {
      setNoticeList(notices);
    }
  }, [notices]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setSubmitError([]);
    setValidationErrors({});
    setFormData({
      name: "",
      description: "",
      hospital_id: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.hospital_id) errors.hospital_id = "Hospital is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    const dataToSubmit = {
      name: formData.name,
      description: formData.description,
      date: currentDate, 
      hospital_id: formData.hospital_id,
    };

    try {
      const result = await postData(
        "http://localhost:5000/notices",
        dataToSubmit
      );
      console.log("Form data submitted:", result);

      const newNotice = {
        id: result.data.id,
        name: result.data.name,
        description: result.data.description,
        date: result.data.date,
        hospital_name: result.data.hospital_name, 
      };

      setNoticeList((prevNotices) => [...prevNotices, newNotice]);

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

  const handleDeleteNotice = async (id) => {
    try {
      await fetch(`http://localhost:5000/notices/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNoticeList((prevNotices) =>
        prevNotices.filter((notice) => notice.id !== id)
      );
    } catch (error) {
      console.error("Error deleting notice:", error.message);
    }
  };

  const handleUpdateNotice = async (id, updatedData) => {
    try {
      const result = await updateData(
        `http://localhost:5000/notices/${id}`,
        updatedData
      );
      console.log("Notice updated:", result);

      setNoticeList((prevNotices) =>
        prevNotices.map((notice) =>
          notice.id === id ? { ...notice, ...result.data } : notice
        )
      );
    } catch (error) {
      console.error("Error updating notice:", error.message);
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
              <h2 className="text-lg">List of Notices</h2>
              <p className="text-[12px] text-black opacity-40">
                {noticeList.length} available notices
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-color-2 text-white p-2 flex gap-2 py-3 px-5 font-semibold rounded-md"
            >
              <img src={doctor} alt="Notice" />
              Add new notice
            </button>
          </header>

          <NoticeTable
            notices={noticeList}
            hospitals={hospitals}
            onDelete={handleDeleteNotice}
            onUpdate={handleUpdateNotice}
          />

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="bg-color-4 p-6 rounded-lg shadow-lg z-10 px-20 py-14">
                <div className="flex justify-between items-center mb-10">
                  <div className="mb-10">
                    <div className="flex gap-1">
                      <h1 className="font-poppins font-semibold text-2xl text-color-1">
                        1
                      </h1>
                      <p className="mt-3 font-poppins font-semibold text-[13px] text-color-1">
                        Notices
                      </p>
                    </div>
                    <div className="h-1 w-52 bg-color-1"></div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="px-5 py-3 bg-[#F64E60] text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
                  >
                    CLOSE
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div className="col-span-2">
                      <label className="block font-poppins text-sm font-regular text-gray-700">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        rows="4"
                        required
                      ></textarea>
                      {validationErrors.description && (
                        <p className="text-red-500 text-sm">
                          {validationErrors.description}
                        </p>
                      )}
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
                      className="px-5 py-3 bg-color-2 text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeListHeader;