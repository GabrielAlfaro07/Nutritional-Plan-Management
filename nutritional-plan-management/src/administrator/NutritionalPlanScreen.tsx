import React from "react";
import NutritionalPlanContainer from "../components/containers/NutritionalPlanContainer";

const NutritionalPlanScreen: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-start lg:px-0">
      <div className="w-full max-w-5xl mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-5xl font-semibold text-darkBlue"
            style={{
              fontFamily: "Designer, Comfortaa",
              textTransform: "uppercase",
            }}
          >
            Add Nutritional Plan
          </h1>
        </div>

        {/* Table Section */}
        <NutritionalPlanContainer />
      </div>
    </div>
  );
};

export default NutritionalPlanScreen;
