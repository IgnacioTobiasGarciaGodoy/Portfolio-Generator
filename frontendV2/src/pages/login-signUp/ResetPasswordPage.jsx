import { useState } from "react";
import Button from "../../components/Button";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Las contraseñas no coinciden");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Su contraseña fue cambiada exitosamente, redirigiendolo a iniciar sesion...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error reseteando su contraseña");
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
				<h2 className="text-3xl font-poppins text-center dark:text-white mb-6">
					Cambiar contraseña
				</h2>
				{error && (
					<p className="text-red-600 font-poppins font-semibold mb-2">{error}</p>
				)}
				{message && (
					<p className="text-black dark:text-white font-poppins font-semibold mb-2">{message}</p>
				)}

				<form onSubmit={handleSubmit} className="mt-6 w-full max-w-lg mx-auto flex flex-col gap-6">
					<Input
						icon={Lock}
						type='password'
						placeholder='Nueva contraseña'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Confirme su nueva contraseña'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<Button type="submit" disabled={isLoading}>
            {isLoading ? "Reseteando..." : "Cambiar"}
          </Button>
				</form>
			</div>
		</div>
	);
};
export default ResetPasswordPage;