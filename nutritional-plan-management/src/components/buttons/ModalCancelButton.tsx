import React from "react";

interface ModalCancelButtonProps {
  onClick: () => void;
}

const ModalCancelButton: React.FC<ModalCancelButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-darkOrange hover:bg-lightOrange text-base text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
      onClick={onClick}
    >
      Cancel
    </button>
  );
};

export default ModalCancelButton;
