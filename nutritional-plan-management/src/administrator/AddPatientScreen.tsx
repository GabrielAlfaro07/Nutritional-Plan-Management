import React from "react";
import AddPatientFormContainer from "../components/containers/AddPatientFormContainer";

const AddPatientScreen: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-start px-4 lg:px-0">
      {/* Content Container */}
      <div className="w-full max-w-4xl mt-20">
        {/* Title */}
        <h1
          className="text-5xl font-semibold text-darkBlue mb-6"
          style={{
            fontFamily: "Designer, Comfortaa",
            textTransform: "uppercase",
          }}
        >
          Add a Patient
        </h1>

        {/* Patient Form */}
        <AddPatientFormContainer />
      </div>
    </div>
  );
};

export default AddPatientScreen;
