// src/components/AddPatientButton.tsx
import React from "react";

const AddPatientButton: React.FC = () => (
  <button
    className="bg-gray-800 text-white py-2 px-4 rounded-full transition duration-100 ease-in-out hover:bg-gray-600"
    style={{ fontFamily: "Comfortaa" }}
    type="submit"
  >
    Add Patient
  </button>
);

export default AddPatientButton;
