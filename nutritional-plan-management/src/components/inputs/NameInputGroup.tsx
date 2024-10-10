import React from "react";
import TextInput from "./TextInput";
import { PatientData } from "../../services/patientService";

const NameInputGroup: React.FC<{
  formData: PatientData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditable: (field: string) => boolean;
}> = ({ formData, handleChange, isEditable }) => (
  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
    <div className="flex-1">
      <TextInput
        label="Name(s)"
        name="name"
        value={formData?.name || ""}
        onChange={handleChange}
        readOnly={!isEditable("name")}
      />
    </div>
    <div className="flex-1">
      <TextInput
        label="Last Name(s)"
        name="lastname"
        value={formData?.lastname || ""}
        onChange={handleChange}
        readOnly={!isEditable("lastname")}
      />
    </div>
  </div>
);

export default NameInputGroup;
