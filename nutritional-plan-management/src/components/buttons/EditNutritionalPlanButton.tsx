import { useParams, useNavigate } from "react-router-dom";

const EditNutritionalPlanButton = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/editNutritionalPlan/${patientId}`);
  };

  return (
    <button
      onClick={handleUpdate}
      className="bg-mediumBlue hover:bg-lightBlue text-white px-4 py-2 rounded-full transition duration-200"
      style={{ fontFamily: "Comfortaa" }}
    >
      Edit Nutritional Plan
    </button>
  );
};

export default EditNutritionalPlanButton;
