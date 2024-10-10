import React from "react";
import TextInput from "./TextInput";
import { PatientData } from "../../services/patientService";

const ContactInputGroup: React.FC<{
  formData: PatientData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditable: (field: string) => boolean;
}> = ({ formData, handleChange, isEditable }) => (
  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
    <div className="flex-1">
      <TextInput
        label="Phone Number"
        name="phoneNumber"
        value={formData?.phoneNumber || ""}
        onChange={handleChange}
        readOnly={!isEditable("phoneNumber")}
      />
    </div>
    <div className="flex-1">
      <TextInput
        label="Email"
        name="email"
        type="email"
        value={formData?.email || ""}
        onChange={handleChange}
        readOnly={!isEditable("email")}
      />
    </div>
  </div>
);

export default ContactInputGroup;
