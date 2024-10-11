import React from "react";
import { useNavigate } from "react-router-dom";

const CancelPatientDetailsButton: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    // Navigate back to the previous page
    navigate("/patientsList");
  };

  return (
    <button
      onClick={handleCancel}
      className="bg-darkOrange hover:bg-lightOrange text-white px-4 py-2 rounded-full transition duration-200"
      style={{ fontFamily: "Comfortaa" }}
    >
      Cancel
    </button>
  );
};

export default CancelPatientDetailsButton;
