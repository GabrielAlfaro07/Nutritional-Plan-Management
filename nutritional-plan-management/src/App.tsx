import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./administrator/HomeScreen";
import AddPatient from "./administrator/addPatient";
import PatientProfile from "./administrator/PatientProfile";
import PatientsList from "./administrator/PatientsList";
import UpdatePatient from "./administrator/UpdatePatient";
import Header from "./components/headers/Header";
import Dashboard from "./administrator/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="mt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addPatient" element={<AddPatient />} />
            <Route
              path="/PatientProfile/:patientId"
              element={<PatientProfile />}
            />
            <Route path="/PatientsList" element={<PatientsList />} />
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
