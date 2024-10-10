// src/components/forms/PatientForm.tsx
import React from "react";
import NameInputGroup from "../inputs/NameInputGroup";
import DateInputGroup from "../inputs/DateInputGroup";
import ContactInputGroup from "../inputs/ContactInputGroup";
import GoalInputGroup from "../inputs/GoalInputGroup";
import { PatientData } from "../../services/patientService";

interface PatientFormProps {
  formData: PatientData;
  setFormData: React.Dispatch<React.SetStateAction<PatientData>>;
  editableFields: string[];
}

const PatientForm: React.FC<PatientFormProps> = ({
  formData,
  setFormData,
  editableFields,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEditable = (fieldName: string) => editableFields.includes(fieldName);

  return (
    <div>
      <NameInputGroup
        formData={formData}
        handleChange={handleChange}
        isEditable={isEditable}
      />
      <DateInputGroup
        formData={formData}
        setFormData={setFormData}
        isEditable={isEditable}
      />
      <ContactInputGroup
        formData={formData}
        handleChange={handleChange}
        isEditable={isEditable}
      />
      <GoalInputGroup
        formData={formData}
        handleChange={handleChange}
        isEditable={isEditable}
      />
    </div>
  );
};

export default PatientForm;
