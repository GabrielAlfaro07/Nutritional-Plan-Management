// App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import default Toastify styles

import PatientsListScreen from "./administrator/PatientsListScreen";
import Header from "./components/headers/Header";
import Dashboard from "./administrator/Dashboard";
import AddPatientScreen from "./administrator/AddPatientScreen";
import EditPatientScreen from "./administrator/EditPatientScreen";
import PatientDetailsScreen from "./administrator/PatientDetailsScreen";
import AddNutritionalPlanScreen from "./administrator/AddNutritionalPlanScreen";
import FoodExchangesScreen from "./administrator/FoodExchangesScreen";
import AddMacronutrientScreen from "./administrator/AddMacronutrientScreen";
import EditMacronutrientScreen from "./administrator/EditMacronutrientScreen";

const App: React.FC = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
      } else {
        console.log("No user logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <div className="mt-16">
          {/* Add ToastContainer here to enable toasts across your app */}
          <ToastContainer position="top-right" autoClose={3000} />
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
            <Route path="/foodExchanges" element={<FoodExchangesScreen />} />
            <Route
              path="/addMacronutrient"
              element={<AddMacronutrientScreen />}
            />
            <Route
              path="/editMacronutrient/:categoryId"
              element={<EditMacronutrientScreen />}
            />

            <Route
              path="/testNutritionalPlan"
              element={<AddNutritionalPlanScreen />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
