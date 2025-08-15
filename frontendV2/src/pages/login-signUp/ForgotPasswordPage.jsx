import { motion } from "framer-motion"
import { useState } from "react"
import { useAuthStore } from "../../store/authStore";
import { Loader, Mail } from "lucide-react";
import Input from "../../components/input";
import Button from "../../components/Button";
import Container from "../../components/Container";

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
		<Container>
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
		</Container>
	)
}

export default ForgotPasswordPage