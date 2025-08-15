import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ icon: Icon, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative w-full">
      {/* Left Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-gray-500 dark:text-gray-400" />
      </div>

      {/* Text */}
      <input
        {...props}
        type={isPassword && showPassword ? "text" : type}
        className={`
          font-poppins w-full
          pl-10 pr-10 py-2 rounded-xl
          bg-white text-black placeholder-gray-500
          shadow-[inset_6px_6px_12px_#bebebe,_inset_-6px_-6px_12px_#ffffff]
          focus:outline-none
          focus:shadow-[inset_2px_2px_4px_#bebebe,_inset_-2px_-2px_4px_#ffffff]
          transition-shadow duration-300

					dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-gray-400
					dark:shadow-[inset_6px_6px_12px_#0b0b0b,_inset_-6px_-6px_12px_#1f1f1f]
					dark:focus:shadow-[inset_2px_2px_6px_#050505,_inset_-2px_-2px_6px_#2a2a2a]
					dark:focus:bg-[#1e1e1e]
        `}
      />

      {/* Right Icon */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(s => !s)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};
export default Input;