import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();


  const handleAddClient = () => {
    console.log('Agregar Cliente');
    navigate('/AddPatient');

    // Aquí puedes agregar la lógica para agregar un cliente
  };

  const handleViewDatabase = () => {
    console.log('Ver Base de Datos');
    // Aquí puedes agregar la lógica para ver la base de datos
  };

  const handleOtherButton = () => {
    console.log('Otro Botón');
    navigate('/PatientsList');
    // Aquí puedes agregar la lógica para el otro botón
  };

    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 via-white to-gray-300"
        style={{
          backgroundImage: 'url(https://hospitalcruzrojacordoba.es/wp-content/uploads/2019/05/Alimentacion-saludable-contra-la-obesidad.jpg.avif)', // Ruta de la imagen de fondo
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center p-10 bg-white bg-opacity-80 rounded-lg shadow-lg">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">
      Bienvenido al Panel de Administrador
    </h1>
    <p className="text-gray-600 mb-6">
      Desde aquí puedes gestionar los clientes y la base de datos de la empresa.
    </p>
    <div className="flex justify-center space-x-4"> {/* Cambiado a justify-center */}
      <button className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-500 transition duration-300"
       onClick={handleAddClient}>
        Agregar Paciente
      </button>
      <button className="border border-orange-600 text-orange-600 py-2 px-6 rounded hover:bg-orange-500 hover:text-white transition duration-300"
       onClick={handleViewDatabase}>
        Base de Intercambios
      </button>
      <button className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-500 transition duration-300"
        onClick={handleOtherButton}>
        Lista de Pacientes
      </button>
    </div>
  </div>
</div>
    );
  };
  

export default Home;