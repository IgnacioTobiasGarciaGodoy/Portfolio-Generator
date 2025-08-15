import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import Container from "../../components/Container";

const EmailVerificationPage = () => {
  const { error, isLoading, verifyEmail } = useAuthStore();
  const navigate = useNavigate();

  // 6 dígitos del código
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  // refs de inputs
  const inputRefs = useRef([]);
  // guard para evitar doble envío cuando se autocompleta
  const isSubmittingRef = useRef(false);

  const setDigit = (index, val) => {
    setCode(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  // escribir / pegar 1 dígito
  const handleChange = (index, value) => {
    const v = value.replace(/\D/g, "");
    if (!v) return setDigit(index, "");

    setDigit(index, v[0]);
    if (index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // pegar varios dígitos
  const handlePaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, 6).split("");
    if (!digits.length) return;
    e.preventDefault();

    const filled = Array(6).fill("");
    digits.forEach((d, i) => (filled[i] = d));
    setCode(filled);

    const last = Math.min(digits.length, 6) - 1;
    inputRefs.current[last >= 0 ? last : 0]?.focus();
  };

  // envío manual (botón)
  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) return;

    try {
      isSubmittingRef.current = true;
      const res = await verifyEmail(verificationCode);
      toast.success("¡Email verificado exitosamente!");
      navigate(`/portfolio/${res.user.userName}`);
    } catch (err) {
      console.error(err);
    } finally {
      isSubmittingRef.current = false;
    }
  };

  // auto‑enviar cuando están completos (evita duplicar con el guard)
  useEffect(() => {
    if (code.every((d) => d !== "") && !isSubmittingRef.current) {
      handleSubmit();
    }
  }, [code]);

  return (
    <Container>
        <div className="space-y-1 mb-6">
          <h2 className="text-3xl font-poppins text-center dark:text-white">
            Verificar tu Correo
          </h2>
          <p className="text-lg font-poppins text-gray-600 dark:text-gray-300">
            Ingresa el código de 6 dígitos enviado a tu correo electrónico.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" onPaste={handlePaste}>
          <div className="flex gap-5">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoComplete="one-time-code"
                className={`
                  w-16 h-16 text-center font-poppins text-xl outline-none rounded-[24px]
                  transition-shadow duration-300
                  
                  bg-slate-50 text-gray-800
                  shadow-[-10px_-10px_20px_rgba(255,255,255,0.25),10px_10px_20px_rgba(0,0,0,0.25)]
                  focus:shadow-[-10px_-10px_20px_rgba(255,255,255,0.25)_inset,10px_10px_20px_rgba(0,0,0,0.25)_inset]

                  dark:bg-[#24272C] dark:text-gray-100
                  dark:shadow-[-10px_-10px_20px_rgba(255,255,255,0.25),10px_10px_20px_rgba(0,0,0,0.25)]
                  dark:focus:shadow-[-10px_-10px_20px_rgba(255,255,255,0.25)_inset,10px_10px_20px_rgba(0,0,0,0.25)_inset]
                `}
              />
            ))}
          </div>

         {error && (
            <p className="text-red-500 font-poppins font-semibold mb-2">{error}</p>
          )}

          <Button type="submit" disabled={isLoading || code.some((d) => !d)}>
            {isLoading ? "Verificando..." : "Verificar Correo"}
          </Button>
        </form>
    </Container>
  );
};

export default EmailVerificationPage;
