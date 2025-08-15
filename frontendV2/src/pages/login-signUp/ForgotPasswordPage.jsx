import { motion } from "framer-motion"
import { useState } from "react"
import { useAuthStore } from "../../store/authStore";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	}

	return (
		<div className="min-h-[calc(100svh-4rem)] bg-white dark:bg-[#24272C] flex items-center justify-center p-6">
			<div
				className="
      w-[min(92vw,1100px)] border-transparent p-8 sm:p-12 
      flex flex-col items-center text-center rounded-[58px]
      bg-slate-50 
      dark:bg-[#24272C]
      shadow-[-5px_-5px_15px_#b8b8b8,5px_5px_15px_#ffffff]
      dark:shadow-[-18px_-18px_36px_rgba(255,255,255,0.25),18px_18px_36px_rgba(0,0,0,0.25)]
    "
			>
				<h2 className="text-3xl font-poppins text-center dark:text-white">
					¿Olvidó su contraseña?
				</h2>

				{/* Contenedor común para que todo tenga el mismo gap */}
				<div className="mt-6 w-full max-w-lg mx-auto flex flex-col gap-6">
					{!isSubmitted ? (
						<>
							<p className="text-slate-700 font-poppins dark:text-gray-300 text-center">
								Ingrese su correo electrónico y le enviaremos un link para cambiar su contraseña
							</p>
							<form onSubmit={handleSubmit} className="flex flex-col gap-6">
								<Input
									icon={Mail}
									type="email"
									placeholder="Correo electrónico"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? (
										<Loader className="w-6 h-6 animate-spin mx-auto" />
									) : (
										"Enviar enlace"
									)}
								</Button>
							</form>
						</>
					) : (
						<>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 500, damping: 30 }}
								className="w-16 h-16 bg-slate-300 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto"
							>
								<Mail className="h-8 w-8 text-black dark:text-white" />
							</motion.div>
							<p className="text-slate-700 font-poppins dark:text-gray-300 text-center">
								Si una cuenta existe para {email}, recibirá un link para cambiar su contraseña en la brevedad.
							</p>
						</>
					)}
				</div>
			</div>
		</div>

	)
}

export default ForgotPasswordPage