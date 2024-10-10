import { useEffect, useState } from "react";
import PatientInfo from "../components/PatientInfo";
import { useParams } from "react-router-dom";
import { GetPatientDetails } from "../services/patient";
import { PatientData } from "../services/patient";
import UpdatePatientButton from "../components/UpdatePatientButton";
import DeletePatientButton from "../components/DeletePatientButton";

const PatientProfile = () => {
  const { patientId } = useParams<{ patientId: string }>(); // Obtiene el ID del paciente de los parámetros de la URL
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (patientId) {
          const data = await GetPatientDetails(patientId); // Llamada a la función para obtener los detalles
          setPatientData(data as PatientData); // Actualiza el estado con los datos del paciente
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false); // Deja de mostrar el estado de carga
      }
    };

    fetchPatient();
  }, [patientId]);

  if (loading) {
    return <p>Loading patient data...</p>; // Estado de carga mientras se obtienen los datos
  }

  if (!patientData) {
    return <p>No patient data found.</p>; // Si no se encuentran los datos
  }

  return (
    <div className="flex justify-between p-10">
      {/* Información del paciente */}
      <PatientInfo patient={patientData} />

      {/* Botones de acción */}
      <div className="w-1/4 flex flex-col items-center space-y-4">
        <UpdatePatientButton />
        <DeletePatientButton />
      </div>
      {/* //<ProfileActions /> */}
    </div>
  );
};

export default PatientProfile;
