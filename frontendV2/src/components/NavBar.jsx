import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from 'lucide-react';

const NavBar = () => {
  const { logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-600 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <img
            src="/assets/images/logo/logo.png"
            className="h-10 object-contain"
            alt="Logo"
          />
        </a>

        {/* Menú de usuario */}
        <div className="relative flex items-center ml-auto">
          
          {/* Botón del menú */}
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex items-center text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <span className="sr-only">Abrir menú de usuario</span>
            <User className="text-white"></User>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-28 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 transform translate-x-1/2">
              <ul className="divide-y divide-gray-700">
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
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
