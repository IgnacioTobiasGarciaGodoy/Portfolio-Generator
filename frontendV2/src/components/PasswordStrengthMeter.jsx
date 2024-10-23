import { Check, X } from "lucide-react"; // Importar iconos para indicar cumplimiento de criterios

// Componente para mostrar criterios de contraseña
const PasswordCriteria = ({ password }) => {
  //* Regular expressions para validar el criterio de la contraseña
  const criteria = [
    { label: "Al menos 6 caracteres", met: password.length >= 6 },
    { label: "Contiene una letra mayúscula", met: /[A-Z]/.test(password) },
    { label: "Contiene una letra minúscula", met: /[a-z]/.test(password) },
    { label: "Contiene un número", met: /\d/.test(password) },
    { label: "Contiene un carácter especial", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {/* Iterar sobre los criterios y mostrar si se cumplen */}
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" /> // Mostrar icono de 'Check' si se cumple
          ) : (
            <X className="size-4 text-gray-500 mr-2" /> // Mostrar icono de 'X' si no se cumple
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// Componente para medir la fuerza de la contraseña
const PasswordStrengthMeter = ({ password }) => {
  // Función para calcular la fuerza de la contraseña
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++; // Sumar fuerza si tiene al menos 6 caracteres
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++; // Sumar fuerza si tiene letras mayúsculas y minúsculas
    if (pass.match(/\d/)) strength++; // Sumar fuerza si contiene números
    if (pass.match(/[^a-zA-Z\d]/)) strength++; // Sumar fuerza si tiene caracteres especiales
    return strength;
  };

  const strength = getStrength(password); // Obtener la fuerza de la contraseña

  // Función para determinar el color según la fuerza
  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500"; // Muy débil
    if (strength === 1) return "bg-red-400"; // Débil
    if (strength === 2) return "bg-yellow-500"; // Buena
    if (strength === 3) return "bg-yellow-400"; // Muy buena
    return "bg-green-500"; // Excelente
  };

  // Función para mostrar texto descriptivo de la fuerza de la contraseña
  const getStrengthText = (strength) => {
    if (strength === 0) return "Muy débil";
    if (strength === 1) return "Débil";
    if (strength === 2) return "Buena";
    if (strength === 3) return "Muy buena";
    return "Excelente";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        {/* Texto que indica la seguridad de la contraseña */}
        <span className="text-xs text-gray-400">Seguridad de la contraseña</span>
        <span className="text-xs text-gray-400">{getStrengthText(strength)}</span>
      </div>
      {/* Barra visual que representa el nivel de seguridad */}
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 
              ${index < strength ? getColor(strength) : "bg-gray-600"}
            `}
          />
        ))}
      </div>
      {/* Mostrar criterios de la contraseña con el componente PasswordCriteria */}
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter; // Exportar el componente principal