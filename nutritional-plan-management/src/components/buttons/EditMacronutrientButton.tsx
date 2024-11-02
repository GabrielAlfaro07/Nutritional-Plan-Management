// components/buttons/EditCurrentMacronutrientButton.tsx
import React from "react";

interface EditCurrentMacronutrientButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

const EditCurrentMacronutrientButton: React.FC<
  EditCurrentMacronutrientButtonProps
> = ({ onClick }) => {
  return (
    <button
      className="bg-darkOrange hover:bg-lightOrange text-base text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
      onClick={(e) => {
        onClick(e);
      }}
    >
      Edit Exchange
    </button>
  );
};

export default EditCurrentMacronutrientButton;
