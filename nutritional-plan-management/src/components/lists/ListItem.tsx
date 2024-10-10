import React from "react";
import { Patients } from "./List";

const ListItem: React.FC<{
  patient: Patients;
  onClick: (id: string) => void;
}> = ({ patient, onClick }) => {
  return (
    <li
      className="cursor-pointer py-3 px-4 hover:bg-gray-100 border-b border-x rounded-full border-gray-200"
      onClick={() => onClick(patient.id)}
    >
      <div
        className="grid grid-cols-4 gap-4"
        style={{ fontFamily: "Comfortaa" }}
      >
        {/* Full name */}
        <div className="col-span-1">
          {`${patient.data.name} ${patient.data.lastname1} ${patient.data.lastname2}`}
        </div>

        {/* Email */}
        <div className="col-span-1">{patient.data.email}</div>

        {/* Start Date */}
        <div className="col-span-1">{patient.data.startDate}</div>

        {/* Goal */}
        <div className="col-span-1">{patient.data.goal}</div>
      </div>
    </li>
  );
};

export default ListItem;
