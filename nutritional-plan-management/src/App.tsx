import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Import this
import { auth } from "../firebaseConfig"; // Import auth
import AddPatient from "./administrator/addPatient";
import PatientProfile from "./administrator/PatientProfile";
import PatientsListScreen from "./administrator/PatientsListScreen";
import UpdatePatient from "./administrator/UpdatePatient";
import Header from "./components/headers/Header";
import Dashboard from "./administrator/Dashboard";
import AddPatientScreen from "./administrator/AddPatientScreen";

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
            <Route path="/AddPatient" element={<AddPatientScreen />} />
            <Route
              path="/PatientProfile/:patientId"
              element={<PatientProfile />}
            />
            <Route path="/PatientsList" element={<PatientsListScreen />} />
            <Route
              path="/UpdatePatient/:patientId"
              element={<UpdatePatient />}
            />
            <Route
              path="/FoodExchanges"
              element={<div>Food Exchanges Content</div>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
