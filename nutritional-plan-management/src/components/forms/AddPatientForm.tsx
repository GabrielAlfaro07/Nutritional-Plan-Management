// src/components/forms/AddPatientForm.tsx
import React from "react";
import PatientForm from "./PatientForm";
import AddPatientButton from "../buttons/AddPatientButton";
import CancelButton from "../buttons/CancelButton";
import { PatientData } from "../../services/patientService";

interface AddPatientFormProps {
  formData: PatientData;
  setFormData: React.Dispatch<React.SetStateAction<PatientData>>;
  savePatientData: (data: PatientData) => Promise<void>;
  editableFields: string[];
}

const AddPatientForm: React.FC<AddPatientFormProps> = ({
  formData,
  setFormData,
  savePatientData,
  editableFields,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      await savePatientData(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PatientForm
        formData={formData}
        setFormData={setFormData}
        editableFields={editableFields}
      />
      <div className="flex justify-end mt-6 space-x-4">
        <CancelButton />
        <AddPatientButton />
      </div>
    </form>
  );
};

export default AddPatientForm;
