import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import AccountTable from "./AccountTable";
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

const AccountListHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { data: accounts, loading, error } = useFetch("/accounts");
  const { data: hospitals } = useFetch("/hospitals");
  const { data: patients } = useFetch("/patients");
  const [formData, setFormData] = useState({
    patient_id: "",
    hospital_id: "",
    date: "",
    price: "",
    description: "",
  });
  const [submitError, setSubmitError] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    if (accounts) {
      setAccountList(accounts);
    }
  }, [accounts]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setSubmitError([]);
    setValidationErrors({});
    setFormData({
      patient_id: "",
      hospital_id: "",
      date: "",
      price: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.patient_id) errors.patient_id = "Patient is required";
    if (!formData.hospital_id) errors.hospital_id = "Hospital is required";
    if (!formData.date) errors.date = "Date is required";
    if (!formData.price) errors.price = "Price is required";
    if (!formData.description) errors.description = "Description is required";
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
      patient_id: formData.patient_id,
      hospital_id: formData.hospital_id,
      date: formData.date,
      price: formData.price,
      description: formData.description,
    };

    try {
      const result = await postData(
        "http://localhost:5000/accounts",
        dataToSubmit
      );
      console.log("Form data submitted:", result);

      const newAccount = {
        id: result.data.id,
        patient_name: result.data.patient_name,
        hospital_name: result.data.hospital_name,
        date: result.data.date,
        price: result.data.price,
        description: result.data.description,
      };

      setAccountList((prevAccounts) => [...prevAccounts, newAccount]);

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

  const handleDeleteAccount = async (id) => {
    try {
      await fetch(`http://localhost:5000/accounts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAccountList((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== id)
      );
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };

  const handleUpdateAccount = async (id, updatedData) => {
    try {
      const { patient_name, hospital_name, ...dataToSubmit } = updatedData;

      const result = await updateData(
        `http://localhost:5000/accounts/${id}`,
        dataToSubmit
      );
      console.log("Account updated:", result);

      setAccountList((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === id ? { ...account, ...result } : account
        )
      );
    } catch (error) {
      console.error("Error updating account:", error.message);
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
              <h2 className="text-lg">List of Accounts</h2>
              <p className="text-[12px] text-black opacity-40">
                {accountList.length} available accounts
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-color-2 text-white p-2 flex gap-2 py-3 px-5 font-semibold rounded-md"
            >
              <img src={doctor} alt="Account" />
              Add new account
            </button>
          </header>

          <AccountTable
            accounts={accountList}
            hospitals={hospitals}
            patients={patients}
            onDelete={handleDeleteAccount}
            onUpdate={handleUpdateAccount}
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
                        Accounts
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
                        Patient
                      </label>
                      <select
                        name="patient_id"
                        value={formData.patient_id}
                        onChange={handleChange}
                        className="pr-60 mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        required
                      >
                        <option value="">Select patient</option>
                        {patients.map((patient) => (
                          <option key={patient.id} value={patient.id}>
                            {patient.name}
                          </option>
                        ))}
                      </select>
                      {validationErrors.patient_id && (
                        <p className="text-red-500 text-sm">
                          {validationErrors.patient_id}
                        </p>
                      )}
                    </div>

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
                        <p className="text-red-500 text-sm">
                          {validationErrors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-poppins text-sm font-regular text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        required
                      />
                      {validationErrors.price && (
                        <p className="text-red-500 text-sm">
                          {validationErrors.price}
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

export default AccountListHeader;