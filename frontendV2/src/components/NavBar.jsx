import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { useState } from "react";

const NavBar = () => {
  const { user, logout, presentation } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate
  const defaultImage = "/assets/images/defaults/profile-picture-1.png";
  const profileImage = presentation?.image?.image || defaultImage;

  // Función para alternar la visibilidad del menú
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Función de logout con redirección a login
  const handleLogout = async () => {
    await logout(); // Llama a la función logout del store para limpiar los datos
    navigate("/login", { replace: true }); // Redirige a la página de login
};

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <img src="/assets/images/logo/logo.png" className="h-8" alt="Logo" />
        </a>

        <div className="relative flex items-center ml-auto space-x-3">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <span className="sr-only">Abrir menú de usuario</span>
            <img
              className="w-8 h-8 rounded-full"
              src={profileImage}
              alt={`${user?.name || "Usuario"} Avatar`}
            />
          </button>

          {dropdownOpen && (
            <div
              className="absolute top-full mt-2 right-0 transform translate-x-24 z-50 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <ul className="px-6" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to="/profile"
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Mis datos
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout} // Llama a handleLogout para cerrar sesión y redirigir
                    className="w-full text-left px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
