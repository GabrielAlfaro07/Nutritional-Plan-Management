import React, { useEffect, useState } from "react";
import EditPatientForm from "../forms/EditPatientForm";
import {
  PatientData,
  getPatientDetails,
  editPatient,
} from "../../services/patient";
import { useNavigate, useParams } from "react-router-dom";

const EditPatientFormContainer: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
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
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch patient details when component loads
  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        try {
          const data = await getPatientDetails(patientId);
          setFormData(data as PatientData);
        } catch (error) {
          console.error("Error fetching patient data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPatient();
  }, [patientId]);

  const savePatientData = async (data: PatientData) => {
    try {
      if (patientId) {
        await editPatient(
          patientId,
          data.name,
          data.lastname,
          data.birthdate,
          data.startDate,
          data.goal,
          data.email,
          data.phoneNumber,
          data.nextAppointment
        );
        alert("Patient successfully updated!");
        navigate(`/patientDetails/${patientId}`);
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!formData) {
    return <div>No patient data found.</div>;
  }

  return (
    <EditPatientForm
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

export default EditPatientFormContainer;
