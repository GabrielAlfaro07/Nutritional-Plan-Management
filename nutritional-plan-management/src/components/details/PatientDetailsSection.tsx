import DetailsItem from "./DetailsItem";
import { PatientData } from "../../services/patientService";

interface PatientDetailsSectionProps {
  patientData: PatientData;
}

const PatientDetailsSection = ({ patientData }: PatientDetailsSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* First Row: Name and Lastname */}
      <DetailsItem label="Name" value={patientData.name} />
      <DetailsItem label="Lastname" value={patientData.lastname} />

      {/* Second Row: Birthdate and Start Date */}
      <DetailsItem label="Birthdate" value={patientData.birthdate} />
      <DetailsItem label="Plan Starting Date" value={patientData.startDate} />

      {/* Third Row: Phone Number and Email */}
      <DetailsItem label="Phone Number" value={patientData.phoneNumber} />
      <DetailsItem label="Email" value={patientData.email} />

      {/* Fourth Row: Password and Next Appointment */}
      <DetailsItem label="Password" value={patientData.password} />
      <DetailsItem
        label="Next Appointment"
        value={patientData.nextAppointment}
      />

      {/* Fifth Row: Goal spanning full width */}
      <div className="col-span-2">
        <DetailsItem label="Goal" value={patientData.goal} />
      </div>
    </div>
  );
};

export default PatientDetailsSection;
