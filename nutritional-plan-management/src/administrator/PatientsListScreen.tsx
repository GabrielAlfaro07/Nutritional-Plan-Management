import { useState, useEffect } from "react";
import { Patients } from "../components/lists/List";
import { getPatients } from "../services/patientService";
import List from "../components/lists/List";
import SearchBar from "../components/searchbars/SearchBar";
import AddPatientButton from "../components/buttons/AddNewPatientButton";

const PatientsListScreen = () => {
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
    <div className="relative flex flex-col items-center justify-start px-4 lg:px-0">
      {/* Content Container */}
      <div className="w-full max-w-4xl mt-20">
        {/* Flex container for title and search bar */}
        <div className="flex justify-between items-center mb-6">
          {/* Title */}
          <h1
            className="text-5xl font-semibold text-gray-800"
            style={{
              fontFamily: "Designer, Comfortaa",
              textTransform: "uppercase", // Ensure the text is all caps
            }}
          >
            Your Patients
          </h1>

          {/* Search Bar */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* List of Patients */}
        <List patients={filteredPatients} />

        {/* Button container at the bottom right */}
        <div className="flex justify-end mt-4">
          <AddPatientButton /> {/* Add patient button */}
        </div>
      </div>
    </div>
  );
};

export default PatientsListScreen;
