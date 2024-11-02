import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getPatientDetails, PatientData } from "../services/patientService";
import { checkIfPlanExists } from "../services/nutritionalPlanService";
import PatientDetailsSection from "../components/details/PatientDetailsSection";
import EditCurrentPatientButton from "../components/buttons/EditCurrentPatientButton";
import DeleteCurrentPatientButton from "../components/buttons/DeleteCurrentPatientButton";
import CancelPatientDetailsButton from "../components/buttons/CancelPatientDetailsButton";
import AddNutritionalPlanButton from "../components/buttons/AddNutritionalPlanButton";
import EditNutritionalPlanButton from "../components/buttons/EditNutritionalPlanButton";
import DeleteNutritionalPlanButton from "../components/buttons/DeleteNutritionalPlanButton";

const PatientDetailsScreen = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [planExists, setPlanExists] = useState(false);

  // Fetch patient data
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

  // Function to check if a nutritional plan exists
  const refreshPlanStatus = async () => {
    const auth = getAuth();
    const adminId = auth.currentUser?.uid;
    if (adminId && patientId) {
      const exists = await checkIfPlanExists(adminId, patientId);
      setPlanExists(exists);
    }
  };

  // Initial check for plan existence
  useEffect(() => {
    refreshPlanStatus();
  }, [patientId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-40">
        <p
          className="text-2xl text-gray-700"
          style={{ fontFamily: "Designer, Comfortaa" }}
        >
          Loading patient data...
        </p>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="flex items-center justify-center mt-40">
        <p
          className="text-2xl text-gray-700"
          style={{ fontFamily: "Designer, Comfortaa" }}
        >
          No patient data found.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-start lg:px-0">
      <div className="w-full max-w-5xl mt-20">
        <h1
          className="text-5xl font-semibold text-darkBlue mb-6"
          style={{
            fontFamily: "Designer, Comfortaa",
            textTransform: "uppercase",
          }}
        >
          {patientData.name} {patientData.lastname}
        </h1>

        <PatientDetailsSection patientData={patientData} />

        <div className="flex justify-between mt-6 space-x-4">
          {planExists ? (
            <div className="flex space-x-2">
              <EditNutritionalPlanButton />
              <DeleteNutritionalPlanButton
                refreshPlanStatus={refreshPlanStatus}
              />
            </div>
          ) : (
            <AddNutritionalPlanButton />
          )}
          <div className="flex space-x-2">
            <CancelPatientDetailsButton />
            <EditCurrentPatientButton />
            <DeleteCurrentPatientButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsScreen;
