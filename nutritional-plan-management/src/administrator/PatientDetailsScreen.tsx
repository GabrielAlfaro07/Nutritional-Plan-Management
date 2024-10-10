import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatientDetails, PatientData } from "../services/patient";
import PatientDetailsSection from "../components/details/PatientDetailsSection";
import EditCurrentPatientButton from "../components/buttons/EditCurrentPatientButton";
import DeleteCurrentPatientButton from "../components/buttons/DeleteCurrentPatientButton";
import CancelButton from "../components/buttons/CancelButton";

const PatientDetailsScreen = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (patientId) {
          const data = await getPatientDetails(patientId);
          setPatientData(data as PatientData);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  if (loading) {
    return <p>Loading patient data...</p>;
  }

  if (!patientData) {
    return <p>No patient data found.</p>;
  }

  return (
    <div className="relative flex flex-col items-center justify-start px-4 lg:px-0">
      {/* Content Container */}
      <div className="w-full max-w-4xl mt-20">
        {/* Title */}
        <h1
          className="text-5xl font-semibold text-gray-800 mb-6"
          style={{
            fontFamily: "Designer, Comfortaa",
            textTransform: "uppercase",
          }}
        >
          {patientData.name} {patientData.lastname}
        </h1>

        {/* Patient Info Section */}
        <PatientDetailsSection patientData={patientData} />

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <CancelButton />
          <EditCurrentPatientButton />
          <DeleteCurrentPatientButton />
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsScreen;
