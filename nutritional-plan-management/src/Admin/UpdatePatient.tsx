import React, { useEffect, useState } from "react";
import PatientForm from "../components/PatientForm";
import { PatientData } from "../components/PatientForm";
import { UpdatePatient } from "../service/patient";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetPatientDetails } from "../service/patient";

const UpdatePatientPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para obtener los detalles del paciente
  const fetchPatient = async () => {
    try {
      if (patientId) {
        const data = await GetPatientDetails(patientId); // Llamada a la función para obtener los detalles
        setPatientData(data as PatientData); // Actualiza el estado con los datos del paciente
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  // Función para actualizar los datos del paciente
  const savePatientData = async (data: PatientData) => {
    try {
      if (patientId) {
        await UpdatePatient(
          patientId,
          data.phoneNumber,
          data.age,
          data.mail,
          data.goal
        );

        alert("Patient successfully updated!");
        navigate(`/PatientProfile/${patientId}`); // Redirigir a la página de perfil con el ID
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  };

  // Llamar a `fetchPatient` cuando el componente se monte
  useEffect(() => {
    fetchPatient();
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>; // Mostrar un indicador de carga
  }

  if (!patientData) {
    return <div>No patient data found.</div>; // Mostrar mensaje si no se encuentra el paciente
  }

  return (
    <div>
      <h1>Actualizar Información del Paciente</h1>
      <PatientForm
        formData={patientData}
        setFormData={setPatientData}
        savePatientData={savePatientData}
        editableFields={["age", "mail", "phoneNumber", "goal"]}
      />
    </div>
  );
};

export default UpdatePatientPage;
