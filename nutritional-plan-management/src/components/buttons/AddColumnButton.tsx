import React from "react";

interface AddColumnButtonProps {
  onClick: () => void;
}

const AddColumnButton: React.FC<AddColumnButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-mediumBlue hover:bg-lightBlue text-white px-4 py-2 rounded-full transition duration-200"
      style={{ fontFamily: "Comfortaa" }}
    >
      Add column
    </button>
  );
};

export default AddColumnButton;
