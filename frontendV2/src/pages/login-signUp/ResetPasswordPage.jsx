import { useState } from "react";
import Button from "../../components/Button";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import Container from "../../components/Container";

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
		<Container>
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
		</Container>
	);
};
export default ResetPasswordPage;