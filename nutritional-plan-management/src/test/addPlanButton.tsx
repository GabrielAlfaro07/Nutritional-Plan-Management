import { useParams, useNavigate } from "react-router-dom";

const CreatePlanButton = () => {
  const { patientId } = useParams<{ patientId: string }>(); // Obtiene el ID del paciente de los parámetros de la URL
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/addPlanNutritional/${patientId}`);
  };

  return (
    <button
      onClick={handleUpdate}
      className="bg-darkOrange hover:bg-lightOrange text-white px-4 py-2 rounded-full transition duration-200"
      style={{ fontFamily: "Comfortaa" }}
    >
      Add plan
    </button>
  );
};

export default CreatePlanButton;
