import { useState } from "react";
import { Loader, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { useAuthStore } from "../../store/authStore";
import DividerWithText from "../../components/DividerWithText";
import Button from "../../components/Button";
import { getWelcomeParts } from "../../utils/utils";
import Container from "../../components/Container";

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
    <Container>
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
    </Container>
  );
}

export default LoginPage;