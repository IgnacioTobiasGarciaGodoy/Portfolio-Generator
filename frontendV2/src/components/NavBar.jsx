import ThemeToggleButton from "./ThemeToggleButton";
import { useAuthStore } from "../store/authStore";
import UserButton from "./UserButton"
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-20">
      <div className="h-full flex items-center px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        {(!isAuthenticated && !location.pathname.includes('/portfolio')) && (
          <a href="/" className="font-logo text-black dark:text-white text-[40px] font-medium leading-none">
            Portfolio Generator
          </a>
        )}

        {/* Acciones derechas */}
        <div className="ml-auto flex items-center gap-3">
          {isAuthenticated && <UserButton />}
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  )
};

export default NavBar;