import React from "react";

interface RemoveCurrentMacronutrientButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

const RemoveCurrentMacronutrientButton: React.FC<
  RemoveCurrentMacronutrientButtonProps
> = ({ onClick }) => {
  return (
    <button
      className="bg-darkOrange hover:bg-lightOrange text-base text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      Remove Macronutrient
    </button>
  );
};

export default RemoveCurrentMacronutrientButton;
