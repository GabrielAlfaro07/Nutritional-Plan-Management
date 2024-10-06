import { useParams, useNavigate } from 'react-router-dom';
import { deletePatient } from '../service/patient';
import { useState } from 'react';

const DeletePatientButton = () => {
    const { patientId } = useParams<{ patientId: string }>(); // Obtiene el ID del paciente de los parámetros de la URL
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false); // Estado para indicar si se está eliminando
  
    const handleDelete = async () => {
      if (!patientId) {
        console.error('No se ha proporcionado el ID del paciente.');
        return;
      }
  
      try {
        setIsDeleting(true); // Iniciar la carga
        await deletePatient(patientId);
        navigate('/PatientsList'); // Navegar a la lista de pacientes
      } catch (error) {
        console.error('Error al eliminar el paciente:', error);
      } finally {
        setIsDeleting(false); // Finalizar la carga
      }
    };
  
    return (
      <button
        onClick={handleDelete}
        className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors duration-300 whitespace-nowrap text-base ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isDeleting} // Deshabilitar el botón mientras se está eliminando
      >
        {isDeleting ? 'Eliminando...' : 'Eliminar'}
      </button>
    );
  };
  
  export default DeletePatientButton;