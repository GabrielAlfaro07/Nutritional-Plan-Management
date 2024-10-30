import React from "react";

interface AddNewMacronutrientButtonProps {
  onClick: () => void;
}

const AddNewMacronutrientButton: React.FC<AddNewMacronutrientButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      className="bg-darkOrange hover:bg-lightOrange text-base text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
      onClick={onClick}
    >
      Add Exchange
    </button>
  );
};

export default AddNewMacronutrientButton;
