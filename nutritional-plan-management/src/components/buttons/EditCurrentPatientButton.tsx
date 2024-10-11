import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCurrentPatientButton: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>(); // Obtiene el ID del paciente de los parámetros de la URL

  const navigate = useNavigate();

  const handleEditPatient = () => {
    console.log("Edit a patient");
    navigate(`/editPatient/${patientId}`);
  };

  return (
    <button
      onClick={handleEditPatient}
      className="bg-darkOrange hover:bg-lightOrange text-base text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
    >
      Edit Patient
    </button>
  );
};

export default EditCurrentPatientButton;
