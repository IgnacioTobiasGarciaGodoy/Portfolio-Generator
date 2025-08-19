import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, LogOut, FilePenLine } from 'lucide-react';
import { useState } from "react";
import useClickOutside from "../../public/hooks/useClickOutside";

const UserButton = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useClickOutside(() => setDropdownOpen(false))

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative flex items-center ml-auto" ref={dropRef}>
      <button onClick={toggleDropdown} className="flex items-center text-sm">
        <CircleUserRound className="w-5 h-5 text-yellow-600 hover:text-yellow-500" />
      </button>

      {dropdownOpen && (
        <div className="absolute top-full right-[-1.5px] mt-2 z-50">
          {/* Dropdown */}
          <div className="relative -right-3 bg-slate-100 dark:bg-gray-800 border border-gray-600 rounded-lg shadow-lg">

            <ul className="divide-y divide-gray-700">
              <li className="group relative">
                {/* Triangle */}
                <div className="pointer-events-none absolute -top-[6.9px] right-4 w-3 h-3 
                          bg-slate-100 dark:bg-gray-800 border-l border-t border-gray-600 
                          rotate-45 dark:group-hover:bg-gray-700" />

                <button
                  onClick={handleLogout}
                  className="flex flex-row gap-3 font-poppins w-full text-left px-4 py-3 
                       text-slate-700 hover:text-black dark:text-gray-300 
                       dark:group-hover:bg-gray-700 dark:hover:text-white whitespace-nowrap"
                >
                  <FilePenLine className="text-green-500 group-hover:text-green-800 dark:text-green-900 dark:group-hover:text-green-500" />
                  Editar Secciones
                </button>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="group flex flex-row gap-3 font-poppins w-full text-left px-4 py-3 
                       text-slate-700 hover:text-black dark:text-gray-300 
                       dark:hover:bg-gray-700 dark:hover:text-white whitespace-nowrap"
                >
                  <LogOut className="text-red-500 group-hover:text-red-800 dark:text-red-900 dark:group-hover:text-red-500" />
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

    </div>
  )
}

export default UserButton