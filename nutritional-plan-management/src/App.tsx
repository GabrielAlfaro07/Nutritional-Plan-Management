import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar"; // Importa la barra de navegación
import Home from "./Admin/Home"; // Importa tu página de inicio
import AddPatient from "./Admin/addPatient";
import PatientProfile from "./Admin/PatientProfile";
import PatientsList from "./Admin/PatientsList";
import UpdatePatient from "./Admin/UpdatePatient";
import Header from "./components/headers/Header";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavBar /> {/* Llama al componente de la barra de navegación */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
