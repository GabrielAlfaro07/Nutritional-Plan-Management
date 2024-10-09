import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar"; // Importa la barra de navegación
import Home from "./administrator/HomeScreen"; // Importa tu página de inicio
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
        <NavBar /> {/* Llama al componente de la barra de navegación */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addPatient" element={<AddPatient />} />
          <Route
            path="/PatientProfile/:patientId"
            element={<PatientProfile />}
          />
          <Route path="/PatientsList" element={<PatientsList />} />
          <Route path="/UpdatePatient/:patientId" element={<UpdatePatient />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
