import React from "react";

interface CreatePlanButtonProps {
  onClick: () => void;
}

const CreatePlanButton: React.FC<CreatePlanButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-darkOrange hover:bg-lightOrange text-white px-4 py-2 rounded-full transition duration-200"
      style={{ fontFamily: "Comfortaa" }}
    >
      Add plan
    </button>
  );
};

export default CreatePlanButton;
