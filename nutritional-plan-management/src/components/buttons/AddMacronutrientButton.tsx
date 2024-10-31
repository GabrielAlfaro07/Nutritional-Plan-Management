import React from "react";

interface AddMacronutrientButtonProps {
  onClick: () => void;
}

const AddMacronutrientButton: React.FC<AddMacronutrientButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      className="bg-darkOrange hover:bg-lightOrange text-base text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
      onClick={onClick}
    >
      Add food exchange
    </button>
  );
};

export default AddMacronutrientButton;
