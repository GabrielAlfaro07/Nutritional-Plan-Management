import React from "react";
import { useNavigate } from "react-router-dom";

const AddNewPatientButton: React.FC = () => {
  const navigate = useNavigate();

  const handleAddPatient = () => {
    console.log("Add a patient");
    navigate("/addPatient"); // Navigate to AddPatient screen
  };

  return (
    <button
      onClick={handleAddPatient}
      className="bg-darkOrange hover:bg-lightOrange text-base text-white py-2 px-4 rounded-full  transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
    >
      Add Patient
    </button>
  );
};

export default AddNewPatientButton;
