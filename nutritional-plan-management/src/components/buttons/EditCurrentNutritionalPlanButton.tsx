import React from "react";

interface EditCurrentNutritionalPlanButtonProps {
  onClick: () => void;
}

const EditCurrentNutritionalPlanButton: React.FC<
  EditCurrentNutritionalPlanButtonProps
> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-darkOrange hover:bg-lightOrange text-white px-4 py-2 rounded-full transition duration-200"
      style={{ fontFamily: "Comfortaa" }}
    >
      Edit plan
    </button>
  );
};

export default EditCurrentNutritionalPlanButton;
