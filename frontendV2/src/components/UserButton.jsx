import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react';

const UserButton = () => {

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative inline-flex">
      {/* Botón del menú */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center text-sm"
      >
        <span className="sr-only">Abrir menú de usuario</span>
        <LogOut className="text-red-800 hover:text-red-600"/>
      </button>
    </div>
  )
}

export default UserButton