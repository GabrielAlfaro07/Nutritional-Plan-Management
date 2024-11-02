// components/DeleteNutritionalPlanButton.tsx

import React from "react";
import { deleteNutritionalPlan } from "../services/nutritionalPlanService";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";

interface DeleteNutritionalPlanButtonProps {
  refreshPlanStatus: () => Promise<void>;
}

const DeleteNutritionalPlanButton: React.FC<
  DeleteNutritionalPlanButtonProps
> = ({ refreshPlanStatus }) => {
  const { patientId } = useParams<{ patientId: string }>();

  const handleDelete = async () => {
    const auth = getAuth();
    const adminId = auth.currentUser?.uid;

    if (adminId && patientId) {
      try {
        await deleteNutritionalPlan(adminId, patientId);
        await refreshPlanStatus(); // Refresh the plan existence status after deletion
      } catch (error) {
        console.error("Failed to delete nutritional plan", error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-mediumBlue hover:bg-lightBlue text-white px-4 py-2 rounded-full transition duration-200"
      style={{ fontFamily: "Comfortaa" }}
    >
      Delete Nutritional Plan
    </button>
  );
};

export default DeleteNutritionalPlanButton;
