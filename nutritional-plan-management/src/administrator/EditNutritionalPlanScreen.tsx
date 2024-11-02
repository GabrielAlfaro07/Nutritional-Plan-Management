import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditNutritionalPlanContainer from "../components/containers/EditNutritionalPlanContainer";
import { getPatientDetails, PatientData } from "../services/patientService";

const EditNutritionalPlanScreen: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientName, setPatientName] = useState<string>("");

  useEffect(() => {
    const fetchPatientName = async () => {
      console.log(patientId); // Debugging: Log patientId to check if it's defined
      if (patientId) {
        try {
          const patientData: PatientData | undefined = await getPatientDetails(
            patientId
          );
          if (patientData) {
            console.log(`${patientData.name} ${patientData.lastname}`);
            setPatientName(`${patientData.name} ${patientData.lastname}`);
          }
        } catch (error) {
          console.error("Failed to fetch patient details:", error);
        }
      }
    };

    fetchPatientName();
  }, [patientId]);

  return (
    <div className="relative flex flex-col items-center justify-start lg:px-0">
      <div className="w-full max-w-5xl mt-20">
        <div className="flex justify-between items-center mb-2">
          <h1
            className="text-5xl font-semibold text-darkBlue"
            style={{
              fontFamily: "Designer, Comfortaa",
              textTransform: "uppercase",
            }}
          >
            Edit Nutritional Plan
          </h1>
        </div>

        {patientName && (
          <div
            className="text-2xl text-darkBlue mb-6"
            style={{
              fontFamily: "Comfortaa",
            }}
          >
            {patientName}
          </div>
        )}

        {/* Table Section */}
        <EditNutritionalPlanContainer />
      </div>
    </div>
  );
};

export default EditNutritionalPlanScreen;
