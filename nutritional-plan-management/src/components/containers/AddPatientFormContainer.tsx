import React, { useState } from "react";
import AddPatientForm from "../forms/AddPatientForm";
import { PatientData } from "../../services/patient";
import { addPatient } from "../../services/patient";
import { useNavigate } from "react-router-dom";

const AddPatientFormContainer: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PatientData>({
    name: "",
    lastname: "",
    birthdate: "",
    startDate: "",
    goal: "",
    email: "",
    phoneNumber: "",
    password: "",
    nextAppointment: "",
  });

  const savePatientData = async (data: PatientData) => {
    try {
      const patientId = await addPatient(
        data.name,
        data.lastname,
        data.birthdate,
        data.startDate,
        data.goal,
        data.email,
        data.phoneNumber,
        data.nextAppointment
      );
      alert("Patient successfully created!");
      navigate(`/patientDetails/${patientId}`);
    } catch (error) {
      console.error("Error creating patient:", error);
      alert("Failed to create patient.");
    }
  };

  return (
    <AddPatientForm
      formData={formData}
      setFormData={setFormData}
      savePatientData={savePatientData}
      editableFields={[
        "name",
        "lastname",
        "email",
        "birthdate",
        "startDate",
        "phoneNumber",
        "goal",
        "nextAppointment",
      ]}
    />
  );
};

export default AddPatientFormContainer;
