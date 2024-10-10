import React from "react";
import { PatientData } from "../services/patient";

interface PatientInfoProps {
  patient: PatientData;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
  return (
    <div className="w-3/4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        {patient.name} {patient.lastname}
      </h2>
      <p className="text-gray-600 mb-2">
        <strong>Email:</strong> {patient.email}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Teléfono:</strong> {patient.phoneNumber}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Fecha de Nacimiento:</strong> {patient.birthdate}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Objetivo:</strong> {patient.goal}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Fecha de Inicio:</strong> {patient.startDate}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Contraseña:</strong> {patient.password}
      </p>
    </div>
  );
};

export default PatientInfo;
