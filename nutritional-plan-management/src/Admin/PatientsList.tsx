import { useState, useEffect } from 'react';

import { Patients } from '../components/List';
import { getPatients } from '../service/patient';
import { useNavigate } from 'react-router-dom';
import List from '../components/List';


    
const PatientList = () => {
    const [patients, setPatients] = useState<Patients[]>([]); // Almacenar la lista de pacientes
    
  
    // Función para obtener los pacientes y almacenarlos en el estado
    const fetchPatients = async () => {
      try {
        const patientsList = await getPatients();
        console.log("Fetched Patients: ", patientsList);  // Llama a la función getPatient correctamente
        setPatients(patientsList as Patients[]); // Establece los pacientes obtenidos en el estado
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
  
    // Llamar a fetchPatients cuando el componente se monte
    useEffect(() => {
      fetchPatients();
    }, []);
  
    return (
      <div>
        <h1>Pacientes</h1>
        <List patients={patients} /> {/* Pasa la lista de pacientes al componente List */}
      </div>
    );
}  
  export default PatientList;