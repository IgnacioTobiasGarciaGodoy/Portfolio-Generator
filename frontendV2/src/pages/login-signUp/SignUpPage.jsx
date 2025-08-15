import Input from "../../components/input";
import { User, Mail, Lock, Loader, SquareUser } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";
import Button from "../../components/Button";
import DividerWithText from "../../components/DividerWithText";
import { getWelcomeParts } from "../../utils/utils";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [welcome] = useState(() => getWelcomeParts("signup"));

  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async e => {
    e.preventDefault();
    try {
      await signup(email, password, userName, name);
      navigate("/verify-email");
    } catch (error) {
      console.log("Error al registrarse", error);
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

        <form onSubmit={handleSignUp} className="mt-6 w-full max-w-lg mx-auto flex flex-col gap-6">
          <Input
            icon={SquareUser}
            type="text"
            placeholder="Nombre Completo"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            icon={User}
            type="text"
            placeholder="Nombre de Usuario"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {/* Error Msg */}
          {error && (
            <p className="text-red-500 font-poppins font-semibold mb-2">{error}</p>
          )}

          {/* Medidor de la calidad de la contraseña */}
          <PasswordStrengthMeter password={password} />

          {/* Boton de "Registrarme" */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Registrarme"
            )}
          </Button>

          {/* Divider */}
          <DividerWithText text="¿Ya tienes una cuenta?" />

          {/* Register Button */}
          <Button to="/login">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;