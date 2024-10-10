import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Import this
import { auth } from "../firebaseConfig"; // Import auth
import PatientProfile from "./administrator/PatientProfile";
import PatientsListScreen from "./administrator/PatientsListScreen";
import UpdatePatient from "./administrator/UpdatePatient";
import Header from "./components/headers/Header";
import Dashboard from "./administrator/Dashboard";
import AddPatientScreen from "./administrator/AddPatientScreen";
import EditPatientScreen from "./administrator/EditPatientScreen";
import PatientDetailsScreen from "./administrator/PatientDetailsScreen";

const App: React.FC = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
      } else {
        console.log("No user logged in.");
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <div className="mt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addPatient" element={<AddPatientScreen />} />
            <Route
              path="/patientDetails/:patientId"
              element={<PatientDetailsScreen />}
            />
            <Route path="/patientsList" element={<PatientsListScreen />} />
            <Route
              path="/editPatient/:patientId"
              element={<EditPatientScreen />}
            />
            <Route
              path="/foodExchanges"
              element={<div>Food Exchanges Content</div>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
