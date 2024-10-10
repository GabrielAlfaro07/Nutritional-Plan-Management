import React from "react";
import PatientFormContainer from "../components/containers/PatientFormContainer";

const AddPatientScreen: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-start px-4 lg:px-0">
      {/* Content Container */}
      <div className="w-full max-w-4xl mt-20">
        {/* Title */}
        <h1
          className="text-5xl font-semibold text-gray-800 mb-6"
          style={{
            fontFamily: "Designer, Comfortaa",
            textTransform: "uppercase",
          }}
        >
          Add a Patient
        </h1>

        {/* Patient Form */}
        <PatientFormContainer />
      </div>
    </div>
  );
};

export default AddPatientScreen;
