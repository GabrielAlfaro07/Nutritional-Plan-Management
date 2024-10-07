import { useParams, useNavigate } from "react-router-dom";
const UpdatePatientButton = () => {
  const { patientId } = useParams<{ patientId: string }>(); // Obtiene el ID del paciente de los parámetros de la URL
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/UpdatePatient/${patientId}`);
  };

  return (
    <button
      onClick={handleUpdate}
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors duration-300 whitespace-nowrap text-base"
    >
      Editar
    </button>
  );
};

export default UpdatePatientButton;
