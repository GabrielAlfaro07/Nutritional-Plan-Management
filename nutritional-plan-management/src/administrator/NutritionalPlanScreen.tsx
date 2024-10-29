import React from "react";
import TableDiv from "../test/DivTable";
import CancelButton from "../components/buttons/CancelButton";

const NutritionalPlanScreen: React.FC = () => {
  return (
    <div className="nutrition-plan-screen bg-gray-100 min-h-screen p-8 flex flex-col items-center">
      {/* Header Section */}
      <div className="header-section text-center mb-6">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "Comfortaa" }}
        >
          Plan Nutricional
        </h1>
        <p className="text-gray-600">
          Administra las comidas, intercambios y notas para cada paciente
        </p>
      </div>

      {/* Table Section */}
      <div className="table-container w-full max-w-6xl bg-white shadow-md rounded-lg p-4">
        <TableDiv />
      </div>

      {/* Footer Buttons */}
      <div className="footer-buttons flex justify-between w-full max-w-6xl mt-6">
        <CancelButton />
      </div>
    </div>
  );
};

export default NutritionalPlanScreen;
