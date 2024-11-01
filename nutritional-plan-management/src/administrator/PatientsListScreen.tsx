// screens/PatientsListScreen.tsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getPatients } from "../services/patientService";
import List from "../components/lists/List";
import SearchBar from "../components/searchbars/SearchBar";
import AddNewPatientButton from "../components/buttons/AddNewPatientButton";
import { getAuth } from "firebase/auth";
import { Patients } from "../components/lists/List";

const PatientsListScreen: React.FC = () => {
  const [patients, setPatients] = useState<Patients[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patients[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Function to fetch patients and store them in the state
  const fetchPatients = async () => {
    try {
      const patientsList = await getPatients();
      setPatients(patientsList as Patients[]);
      setFilteredPatients(patientsList as Patients[]); // Initialize with all patients
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("Error fetching patients.");
    }
  };

  // Authentication and loading logic
  useEffect(() => {
    const loadPatients = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      await fetchPatients();
      setIsLoading(false);
    };

    loadPatients();
  }, []);

  // Filter patients based on the search term
  useEffect(() => {
    const filtered = patients.filter((patient) =>
      patient.data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  return (
    <div className="relative flex flex-col items-center justify-start lg:px-0">
      <div className="w-full max-w-5xl mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-5xl font-semibold text-darkBlue"
            style={{
              fontFamily: "Designer, Comfortaa",
              textTransform: "uppercase",
            }}
          >
            Your Patients
          </h1>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {isLoading ? (
          <p
            className="text-gray-500 text-center"
            style={{
              fontFamily: "Comfortaa",
            }}
          >
            Loading...
          </p>
        ) : !isAuthenticated ? (
          <p
            className="text-gray-500 text-center"
            style={{
              fontFamily: "Comfortaa",
            }}
          >
            Please log in to view your patients.
          </p>
        ) : filteredPatients.length === 0 ? (
          <p
            className="text-gray-500 text-center"
            style={{
              fontFamily: "Comfortaa",
            }}
          >
            No patients found
          </p>
        ) : (
          <List patients={filteredPatients} />
        )}

        <div className="flex justify-end mt-4">
          <AddNewPatientButton />
        </div>
      </div>
    </div>
  );
};

export default PatientsListScreen;
