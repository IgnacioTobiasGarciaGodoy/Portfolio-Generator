import { useState } from "react";
import { Loader, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { useAuthStore } from "../../store/authStore";
import DividerWithText from "../../components/DividerWithText";
import Button from "../../components/Button";
import { getWelcomeParts } from "../../utils/utils";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const [welcome] = useState(() => getWelcomeParts("login"));

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const userName = await login(email, password);
      navigate(`/portfolio/${userName}`);
    } catch (error) {
      console.error("Error iniciando sesión", error);
    }
  };

  return (
    <div className="min-h-[calc(100svh-4rem)] bg-white dark:bg-[#24272C] flex items-center justify-center p-6">
      <div
        className="
                    w-[min(92vw,1100px)] border-transparent  p-8 sm:p-12 flex flex-col items-center text-center rounded-[58px]
                    bg-slate-50 
                    dark:bg-[#24272C]
                    shadow-[-5px_-5px_15px_#b8b8b8,5px_5px_15px_#ffffff]
                    dark:shadow-[-18px_-18px_36px_rgba(255,255,255,0.25),18px_18px_36px_rgba(0,0,0,0.25)]
                  "
      >
        <div className="space-y-1">
          <h2 className="text-3xl font-poppins text-center dark:text-white">
            {welcome.greeting}
          </h2>
          <p className="text-lg font-poppins text-gray-600 dark:text-gray-300">
            {welcome.phrase}
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 w-full max-w-lg mx-auto flex flex-col gap-6">
          {/* Mail Input */}
          <Input
            icon={Mail}
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <div className="w-full">
            <Input
              icon={Lock}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-sm font-poppins text-gray-500 hover:text-gray-700 underline dark:text-gray-400 dark:hover:text-gray-200"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {/* Error Msg */}
          {error && (
            <p className="text-red-500 font-poppins font-semibold mb-2">{error}</p>
          )}

          {/* Log in button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          {/* Divider */}
          <DividerWithText text="¿No tienes una cuenta?" />

          {/* Register Button */}
          <Button to="/signup">
            Registrarse
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;