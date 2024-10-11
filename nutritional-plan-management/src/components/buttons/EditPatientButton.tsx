import React from "react";

const EditPatientButton: React.FC = () => (
  <button
    className="bg-darkOrange hover:bg-lightOrange text-white py-2 px-4 rounded-full transition duration-100 ease-in-out"
    style={{ fontFamily: "Comfortaa" }}
    type="submit"
  >
    Edit Patient
  </button>
);

export default EditPatientButton;
