import { useParams, useNavigate } from "react-router-dom";
import { deletePatient } from "../../services/patientService";
import { useState } from "react";
import { toast } from "react-toastify"; // Import toast

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
      toast.success("Patient deleted succesfully!");
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast.error("Failed to delete patient.");
    } finally {
      setIsDeleting(false); // End loading
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`bg-darkOrange hover:bg-lightOrange text-base text-white py-2 px-4 rounded-full transition duration-300 ease-in-out whitespace-nowrap ${
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
