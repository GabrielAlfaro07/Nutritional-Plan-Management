import React from "react";
import { useNavigate } from "react-router-dom";

const AddPatientButton: React.FC = () => {
  const navigate = useNavigate();

  const handleAddPatient = () => {
    console.log("Add a patient");
    navigate("/AddPatient"); // Navigate to AddPatient screen
  };

  return (
    <button
      onClick={handleAddPatient}
      className="bg-gray-800 text-base text-white py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
    >
      Add Patient
    </button>
  );
};

export default AddPatientButton;
