import React from "react";
import TextInput from "./TextInput";
import { PatientData } from "../../services/patientService";

const DateInputGroup: React.FC<{
  formData: PatientData;
  setFormData: React.Dispatch<React.SetStateAction<PatientData>>;
  isEditable: (field: string) => boolean;
}> = ({ formData, setFormData, isEditable }) => (
  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
    <div className="flex-1">
      <TextInput
        label="Birth Date"
        name="birthdate"
        type="date"
        value={formData?.birthdate || ""}
        onChange={(e) =>
          formData && setFormData({ ...formData, birthdate: e.target.value })
        }
        readOnly={!isEditable("birthdate")}
      />
    </div>
    <div className="flex-1">
      <TextInput
        label="Start Date"
        name="startDate"
        type="date"
        value={formData?.startDate || ""}
        onChange={(e) =>
          formData && setFormData({ ...formData, startDate: e.target.value })
        }
        readOnly={!isEditable("startDate")}
      />
    </div>
  </div>
);

export default DateInputGroup;
