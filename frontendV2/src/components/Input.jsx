import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(function Input(
  { as = "input", icon: Icon, type = "text", rows = 4, className = "", ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = as === "input" && type === "password";
  const hasIcon = !!Icon;

  const baseCommon =
    "font-poppins w-full rounded-xl transition-shadow duration-300 " +
    "bg-white text-black placeholder-gray-500 " +
    "shadow-[inset_6px_6px_12px_#bebebe,_inset_-6px_-6px_12px_#ffffff] " +
    "focus:outline-none " +
    "focus:shadow-[inset_2px_2px_4px_#bebebe,_inset_-2px_-2px_4px_#ffffff] " +
    "dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-gray-400 " +
    "dark:shadow-[inset_6px_6px_12px_#0b0b0b,_inset_-6px_-6px_12px_#1f1f1f] " +
    "dark:focus:shadow-[inset_2px_2px_6px_#050505,_inset_-2px_-2px_6px_#2a2a2a] " +
    "dark:focus:bg-[#1e1e1e]";

  const paddings = hasIcon ? "pl-10 pr-10" : "px-3";

  const inputCls = `${baseCommon} ${paddings} py-2 ${className}`;
  const textareaCls = `${baseCommon} ${paddings} py-2 ${className}`;

  const Comp = as === "textarea" ? "textarea" : "input";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      {/* Icono izquierdo */}
      {hasIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="size-5 text-gray-500 dark:text-gray-400" />
        </div>
      )}

      {/* Campo */}
      <Comp
        ref={ref}
        {...props}
        {...(as === "textarea" ? { rows } : { type: inputType })}
        className={as === "textarea" ? textareaCls : inputCls}
      />

      {/* Toggle de password (solo si type=password y as=input) */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
});

export default Input;