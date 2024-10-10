import React from "react";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faAt,
  faCalendarAlt,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import ListHeader from "../headers/ListHeader";
import ListItem from "./ListItem";
import { PatientData } from "../../services/patient";

export interface Patients {
  id: string;
  data: PatientData;
}

const List: React.FC<{ patients: Patients[] }> = ({ patients }) => {
  const navigate = useNavigate();

  const handlePatientClick = (id: string) => {
    // Navigate to the patient's profile using the id
    navigate(`/PatientProfile/${id}`);
  };

  // Define the headers and their respective icons
  const headers = [
    { title: "Name", icon: faUser },
    { title: "Email", icon: faAt },
    { title: "Start Date", icon: faCalendarAlt },
    { title: "Objective", icon: faBullseye },
  ];

  return (
    <div>
      {/* Render the header */}
      <ListHeader headers={headers} />

      {/* Scrollable patient list with a max height */}
      <ul className="max-h-96 overflow-y-auto">
        {patients.map((patient) => (
          <ListItem
            key={patient.id}
            patient={patient}
            onClick={handlePatientClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default List;
