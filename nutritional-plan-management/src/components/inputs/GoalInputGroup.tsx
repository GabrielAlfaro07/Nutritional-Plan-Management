import React from "react";
import TextInput from "./TextInput";
import { PatientData } from "../../services/patientService";

const GoalInputGroup: React.FC<{
  formData: PatientData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditable: (field: string) => boolean;
}> = ({ formData, handleChange, isEditable }) => (
  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
    <div className="flex-1">
      <TextInput
        label="Objective"
        name="goal"
        value={formData?.goal || ""}
        onChange={handleChange}
        readOnly={!isEditable("goal")}
      />
    </div>
    <div className="flex-1">
      <TextInput
        label="Next Appointment"
        name="nextAppointment"
        type="date"
        value={formData?.nextAppointment || ""}
        onChange={handleChange}
        readOnly={!isEditable("nextAppointment")}
      />
    </div>
  </div>
);

export default GoalInputGroup;
