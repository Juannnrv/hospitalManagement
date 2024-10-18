import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import StaffTable from "./StaffTable";
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

const StaffListHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const { data: initialStaffList, loading, error } = useFetch("/staff/current");
  const { data: availableDoctors } = useFetch("/staff");
  const { data: hospitals, loading: loadingHospitals, error: errorHospitals } = useFetch("/hospitals");

  const [formData, setFormData] = useState({
    hospital_id: "",
    doctor_id: "",
  });
  const [submitError, setSubmitError] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (initialStaffList && Array.isArray(initialStaffList)) {
      setStaffList(initialStaffList);
    } else {
      console.error("Initial staff list is not an array:", initialStaffList);
    }
  }, [initialStaffList]);

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
      const result = await postData("http://localhost:5000/staff", dataToSubmit);
      console.log("Form data submitted:", result);

      setStaffList((prevStaffList) => [...prevStaffList, result.data]);

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

  const handleDeleteStaff = async (doctor_id) => {
    try {
      await fetch(`http://localhost:5000/staff/${doctor_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStaffList((prevStaffList) =>
        prevStaffList.filter((staff) => staff.doctor_id !== doctor_id)
      );
    } catch (error) {
      console.error("Error deleting staff:", error.message);
    }
  };

  const handleUpdateStaff = async (doctor_id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/staff/${doctor_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();

      setStaffList((prevStaffList) =>
        prevStaffList.map((staff) =>
          staff.doctor_id === doctor_id ? { ...staff, ...result.data } : staff
        )
      );
    } catch (error) {
      console.error("Error updating staff data:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (loadingHospitals) return <p>Loading hospitals...</p>;
  if (errorHospitals) return <p>Error loading hospitals: {errorHospitals.message}</p>;

  return (
    <div className="bg-color-7 p-16 h-[80vh]">
      <div className="bg-color-4 rounded-xl p-7">
        <div className="relative">
          <header className="flex justify-between items-center font-poppins font-medium mb-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg">Current Staff</h2>
              <p className="text-[12px] text-black opacity-40">
                {staffList.length} Staff Members
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-color-2 text-white p-2 flex gap-2 py-3 px-5 font-semibold rounded-md"
            >
              <img src={doctor} alt="Doctor" />
              Add new Staff
            </button>
          </header>

          <StaffTable
            staff={staffList}
            hospitals={hospitals}
            doctors={availableDoctors}
            onDelete={handleDeleteStaff}
            onUpdate={handleUpdateStaff}
          />

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

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        {availableDoctors.map((doctor) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffListHeader;