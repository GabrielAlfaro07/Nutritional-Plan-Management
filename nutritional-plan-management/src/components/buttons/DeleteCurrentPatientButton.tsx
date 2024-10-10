import { useParams, useNavigate } from "react-router-dom";
import { deletePatient } from "../../services/patient";
import { useState } from "react";

const DeleteCurrentPatientButton = () => {
  const { patientId } = useParams<{ patientId: string }>(); // Get patient ID from URL parameters
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false); // State to indicate if deleting

  const handleDelete = async () => {
    if (!patientId) {
      console.error("No patient ID provided.");
      return;
    }

    try {
      setIsDeleting(true); // Start loading
      await deletePatient(patientId);
      navigate("/patientsList"); // Navigate to the patient list
    } catch (error) {
      console.error("Error deleting patient:", error);
    } finally {
      setIsDeleting(false); // End loading
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`bg-gray-800 text-base text-white py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out whitespace-nowrap ${
        isDeleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isDeleting} // Disable the button while deleting
      style={{ fontFamily: "Comfortaa" }}
    >
      {isDeleting ? "Deleting..." : "Delete Patient"}
    </button>
  );
};

export default DeleteCurrentPatientButton;
