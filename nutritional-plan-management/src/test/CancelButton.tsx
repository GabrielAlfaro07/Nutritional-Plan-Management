import React from "react";
import { useNavigate } from "react-router-dom";

const CancelButton: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <button
      onClick={handleCancel}
      className="bg-darkOrange hover:bg-lightOrange text-white py-2 px-4 rounded-full transition duration-100 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
    >
      Cancel
    </button>
  );
};

export default CancelButton;