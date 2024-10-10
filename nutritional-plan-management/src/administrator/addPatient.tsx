import { useState } from "react";
import PatientForm from "../components/PatientForm";
import { PatientData } from "../components/PatientForm";
import { addPatient } from "../services/patient";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const navigate = useNavigate();
  const savePatientData = async (data: PatientData) => {
    try {
      // Agregar paciente y obtener el ID
      const patientId = await addPatient(
        data.name,
        data.lastname1,
        data.lastname2,
        data.age,
        data.birthdate,
        data.startDate,
        data.goal,
        data.email,
        data.phoneNumber
      );

      alert("Patient successfully created!");
      navigate(`/PatientProfile/${patientId}`); // Redirigir a la página de perfil con el ID
    } catch (error) {
      console.error("Error creating patient:", error);
      alert("Failed to create patient.");
    }
  };

  const [formData, setFormData] = useState<PatientData | null>({
    name: "",
    lastname1: "",
    lastname2: "",
    age: 0,
    birthdate: "",
    startDate: "",
    goal: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  return (
    <div>
      <h1>Formulario de Paciente</h1>
      <PatientForm
        formData={formData}
        setFormData={setFormData}
        savePatientData={savePatientData}
        editableFields={[
          "name",
          "lastname1",
          "lastname2",
          "age",
          "email",
          "birthdate",
          "startDate",
          "phoneNumber",
          "goal",
        ]}
      />
    </div>
  );
};

export default AddPatient;
