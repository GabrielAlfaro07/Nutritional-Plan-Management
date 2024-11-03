import React from "react";

interface RemoveCurrentMacronutrientButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

const RemoveCurrentMacronutrientButton: React.FC<
  RemoveCurrentMacronutrientButtonProps
> = ({ onClick }) => {
  return (
    <button
      className="bg-mediumBlue hover:bg-lightBlue text-base text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
      onClick={(e) => {
        onClick(e);
      }}
    >
      Remove Exchange
    </button>
  );
};

export default RemoveCurrentMacronutrientButton;
