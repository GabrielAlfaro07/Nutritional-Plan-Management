import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex flex-row space-x-4 md:flex-row md:space-x-4">
        <div className="flex-1 flex flex-row space-x-4 md:flex-row md:space-x-4">
          {" "}
          {/* Asegura que ocupa el espacio y se alineen correctamente */}
          <li>
            <Link to="/" className="text-white text-lg">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-white text-lg">
              Perfil
            </Link>
          </li>
        </div>

        <li className="ml-auto">
          {" "}
          {/* Margen a la izquierda para empujar el botón a la derecha */}
          <LogoutButton /> {/* Botón de cerrar sesión */}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
