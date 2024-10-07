import { useState, useEffect } from "react";
import { Patients } from "../components/List";
import { getPatients } from "../service/patient";
import List from "../components/List";
import SearchBar from "../components/SearchBar";

const PatientList = () => {
  const [patients, setPatients] = useState<Patients[]>([]); // Store the list of patients
  const [filteredPatients, setFilteredPatients] = useState<Patients[]>([]); // Store the filtered list of patients
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term for filtering

  // Function to get patients and store them in the state
  const fetchPatients = async () => {
    try {
      const patientsList = await getPatients();
      console.log("Fetched Patients: ", patientsList);
      setPatients(patientsList as Patients[]);
      setFilteredPatients(patientsList as Patients[]); // Initialize with all patients
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Filter patients based on the search term
  useEffect(() => {
    const filtered = patients.filter((patient) =>
      patient.data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  // Fetch patients when the component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div>
      <h1>Pacientes</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <List patients={filteredPatients} />{" "}
      {/* Pass the filtered list to List */}
    </div>
  );
};

export default PatientList;
