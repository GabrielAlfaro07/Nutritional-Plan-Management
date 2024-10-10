// src/components/forms/PatientForm.tsx
import React from "react";
import NameInputGroup from "../inputs/NameInputGroup";
import DateInputGroup from "../inputs/DateInputGroup";
import ContactInputGroup from "../inputs/ContactInputGroup";
import GoalInputGroup from "../inputs/GoalInputGroup";
import AddPatientButton from "../buttons/AddPatientButton";
import { PatientData } from "../../services/patient";
import CancelButton from "../buttons/CancelButton";

interface PatientFormProps {
  formData: PatientData;
  setFormData: React.Dispatch<React.SetStateAction<PatientData>>;
  savePatientData: (data: PatientData) => Promise<void>;
  editableFields: string[];
}

const PatientForm: React.FC<PatientFormProps> = ({
  formData,
  setFormData,
  savePatientData,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      await savePatientData(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <NameInputGroup
        formData={formData!}
        handleChange={handleChange}
        isEditable={isEditable}
      />
      <DateInputGroup
        formData={formData!}
        setFormData={setFormData}
        isEditable={isEditable}
      />
      <ContactInputGroup
        formData={formData!}
        handleChange={handleChange}
        isEditable={isEditable}
      />
      <GoalInputGroup
        formData={formData!}
        handleChange={handleChange}
        isEditable={isEditable}
      />
      <div className="flex justify-end mt-4">
        <CancelButton />
        <AddPatientButton />
      </div>
    </form>
  );
};

export default PatientForm;
