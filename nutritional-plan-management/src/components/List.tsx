import React from "react";
import { useNavigate } from "react-router-dom";
import { PatientData } from "./PatientForm";

export interface Patients {
  id: string;
  data: PatientData;
}

const List: React.FC<{ patients: Patients[] }> = ({ patients }) => {
  const navigate = useNavigate();

  const handlePatientClick = (id: string) => {
    // Redirigir al perfil del paciente usando el id
    navigate(`/PatientProfile/${id}`);
  };

  return (
    <div>
      <ul>
        {patients.map((patient) => (
          <li
            key={patient.id}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            <span onClick={() => handlePatientClick(patient.id)}>
              {patient.data.name} {patient.data.lastname1}
              {patient.data.lastname2}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
