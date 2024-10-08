import React, { useState } from "react";
import doctor from "../assets/img/doctor.svg";

const DoctorListHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <header className="flex justify-between items-center font-poppins font-medium mb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg">List of Doctors</h2>
          <p className="text-[12px] text-black opacity-40">
            345 available doctors
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-color-2 text-white p-2 flex gap-2 py-3 px-5 font-semibold rounded-md"
        >
          <img src={doctor} alt="Doctor" />
          Add new doctor
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-color-4 p-6 rounded-lg shadow-lg z-10 px-20 py-14">
            <div className="flex justify-between items-center mb-10 gap-32">
              <div className="flex-1">
                <div className="flex gap-1">
                  <h1 className="font-poppins font-semibold text-color-1 text-2xl">
                    1
                  </h1>
                  <p className="mt-3 font-poppins font-semibold text-color-1 text-[13px]">
                    Basic information
                  </p>
                </div>
                <div className="h-1 w-52 bg-color-1"></div>
              </div>
              <div className="flex gap-1">
                <h1 className="font-poppins font-semibold text-color-6 text-2xl">
                  2
                </h1>
                <p className="mt-3 font-poppins font-semibold text-color-6 text-[13px]">
                  Enter Details
                </p>
              </div>
              <div className="flex gap-1">
                <h1 className="font-poppins font-semibold text-color-6 text-2xl">
                  3
                </h1>
                <p className="mt-3 font-poppins font-semibold text-color-6 text-[13px]">
                  Select Services
                </p>
              </div>
              <div className="flex gap-1">
                <h1 className="font-poppins font-semibold text-color-6 text-2xl">
                  4
                </h1>
                <p className="mt-3 font-poppins font-semibold text-color-6 text-[13px]">
                  Review and Submit
                </p>
              </div>
            </div>
            <div className="m-5">
              <h2 className="text-xl font-poppins font-semibold mb-8">
                Basic information
              </h2>

              <form>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  <div>
                    <label
                      htmlFor="userType"
                      className="font-poppins block text-sm font-medium text-color-8 mb-1"
                    >
                      User type
                    </label>
                    <div className="relative">
                      <select
                        id="userType"
                        className="block w-full px-3 py-2 text-color-6 bg-color-4 border border-color-6 rounded-md appearance-none focus:outline-none focus:ring-color-3 focus:border-color-ring-color-3"
                      >
                        <option>Select user type</option>
                      </select>
                      {/* <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /> */}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="font-poppins block text-sm font-medium text-color-8 mb-1"
                    >
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        id="gender"
                        className="block w-full px-3 py-2 text-color-6 bg-color-4 border border-color-6 rounded-md appearance-none focus:outline-none focus:ring-color-3 focus:border-color-ring-color-3"
                      >
                        <option>Select gender</option>
                      </select>
                      {/* <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /> */}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="font-poppins block text-sm font-medium text-color-8 mb-1"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Your first name"
                      className="block w-full px-3 py-2 text-color-6 bg-color-4 border border-color-6 rounded-md appearance-none focus:outline-none focus:ring-color-3 focus:border-color-ring-color-3"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="designation"
                      className="font-poppins block text-sm font-medium text-color-8 mb-1"
                    >
                      Designation
                    </label>
                    <input
                      type="text"
                      id="designation"
                      placeholder="Your designation"
                      className="block w-full px-3 py-2 text-color-6 bg-color-4 border border-color-6 rounded-md appearance-none focus:outline-none focus:ring-color-3 focus:border-color-ring-color-3"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="font-poppins block text-sm font-medium text-color-8 mb-1"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Your last name"
                      className="block w-full px-3 py-2 text-color-6 bg-color-4 border border-color-6 rounded-md appearance-none focus:outline-none focus:ring-color-3 focus:border-color-ring-color-3"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="font-poppins block text-sm font-medium text-color-8 mb-1"
                    >
                      Date of birth
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="dateOfBirth"
                        placeholder="Select your date of birth"
                        className="block w-full px-3 py-2 text-color-6 bg-color-4 border border-color-6 rounded-md appearance-none focus:outline-none focus:ring-color-3 focus:border-color-ring-color-3"
                      />
                      {/* <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /> */}
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <label
                    htmlFor="email"
                    className="font-poppins block text-sm font-medium text-color-8 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="gengar@example.com"
                    className="w-[365px] block px-3 py-2 text-color-6 bg-color-4 border border-color-6 rounded-md appearance-none focus:outline-none focus:ring-color-3 focus:border-color-ring-color-3"
                  />
                </div>
                <div className="mt-12 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-3 bg-color-2 text-color-4 font-semibold font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-3"
                  >
                    NEXT STEP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorListHeader;
