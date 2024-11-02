// components/buttons/AddExchangeButton.tsx
import React from "react";

interface AddExchangeButtonProps {
  onClick: () => void;
}

const AddExchangeButton: React.FC<AddExchangeButtonProps> = ({ onClick }) => (
  <button
    className="bg-mediumBlue hover:bg-lightBlue text-base text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
    style={{ fontFamily: "Comfortaa" }}
    onClick={onClick}
  >
    Add exchange
  </button>
);

export default AddExchangeButton;
