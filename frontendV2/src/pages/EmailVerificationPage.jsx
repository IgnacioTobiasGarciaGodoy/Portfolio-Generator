import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  
  const { error, isLoading, verifyEmail} = useAuthStore()
  
  // Estado para almacenar los 6 dígitos del código de verificación
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  
  // Referencias a los campos de entrada para manejar el enfoque de manera programática, por ejemplo, para cambiar el enfoque de un campo a otro
  // Esto permite, por ejemplo, que al escribir en un campo o al borrar,
  // el código pueda Mover el enfoque a otro input o
  // Retroceder el enfoque al campo anterior si el usuario presiona borrar en un campo vacío
  const inputRefs = useRef([]);
  
  // Hook para redirigir a otras rutas
  const navigate = useNavigate();

  // La función handleChange se encarga de manejar los cambios en los campos de entrada (inputs) de un código de verificación.
  // Se llama cada vez que se escribe o pega un valor en uno de los campos de entrada (input)
  // La función recibe dos parámetros -> La posición del campo de entrada que está cambiando y el valor que el usuario ha ingresado en ese campo.
  const handleChange = (index, value) => {
    const newCode = [...code];

    //* Manejo de Pegar Varios Dígitos (por ejemplo, al pegar todo el código de una vez)
    
    // Verifica si el usuario ha pegado varios caracteres a la vez
    if (value.length > 1) {
      // Toma los primeros 6 caracteres del valor pegado y los convierte en un array (pastedCode)
      const pastedCode = value.slice(0, 6).split("");
      // Itera a través de los 6 espacios de newCode y asigna los caracteres de pastedCode uno a uno.
      // Si pastedCode no tiene un carácter en una posición (undefined), coloca una cadena vacía ("").
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      // Actualiza el estado code con los valores del array newCode. 
      // Esto asegura que todos los campos se llenen de una sola vez si el usuario pega un código completo.
      setCode(newCode);

      //* Enfocar el último input no vacío o el primero vacío -> Es decir que se mueva automaticamente al siguiente espacio
      // Encuentra la última posición en el array newCode que tiene un valor distinto de una cadena vacía. 
      // Esto indica el último dígito que el usuario ha ingresado o pegado
      const lastFilledIndex = newCode.findLastIndex(
        digit => digit !== ""
      );
      // Determina cuál debe ser el próximo campo de entrada a enfocar
      const focusIndex =
        // Si el último campo lleno está antes del final (index < 5), enfoca el siguiente
        // Si todos los campos están llenos, enfoca el último campo (índice 5).
        lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        // Usa las referencias (refs) de los campos de entrada para mover el enfoque al campo adecuado
        inputRefs.current[focusIndex].focus();
        //* Manejo de Entrada de un Solo Carácter (por ejemplo, al escribir un dígito a la vez)
        // Este bloque se ejecuta cuando el usuario ingresa un solo carácter
    } else {
      // Actualiza el array newCode en la posición index con el valor ingresado.
      newCode[index] = value;
      // Actualiza el estado code con los valores del array newCode.
      setCode(newCode);

      // Si se ingresó un valor válido (value) y no estamos en el último campo (index < 5), mueve el enfoque al siguiente campo.
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Manejar la tecla de retroceso para mover el enfoque al input anterior
  // Dos parametros -> La posición actual del campo de entrada que está siendo editado y el evento que se dispara cuando el usuario presiona una tecla
  const handleKeyDown = (index, e) => {
    // e.key === "Backspace": Verifica si la tecla presionada es "Backspace"
    
    // !code[index]: Verifica si el campo de entrada actual está vacío. 
    //Esto significa que el usuario ya borró el carácter en este campo, y si sigue presionando "Backspace", 
    // el siguiente paso es moverse al campo anterior.

    // index > 0: Asegura que la función no intente mover el enfoque a un campo anterior cuando ya está en el primer campo (índice 0)
    if (e.key === "Backspace" && !code[index] && index > 0) {
      
      // inputRefs: Es un array de referencias (refs) que apuntan a los campos de entrada (inputs) del código de verificación.

      // current[index - 1]: Se refiere al campo de entrada que está justo antes del campo actual 
      //(por ejemplo, si el usuario está en el índice 3 y presiona "Backspace", index - 1 será 2).

      // .focus();: Mueve el enfoque del cursor al campo de entrada anterior. 
      // Esto permite al usuario borrar el contenido del campo anterior si presiona "Backspace" en un campo vacío.
      
      inputRefs.current[index - 1].focus();
    }
  };

  // La función handleSubmit se encarga de gestionar el envío del formulario de verificación de email.
  // Cuando el usuario completa el código de verificación y presiona el botón "Verify Email", 
  // esta función se ejecuta para enviar el código al backend y verificarlo.
  const handleSubmit = async (e) => {
    // Previene el comportamiento por defecto del formulario HTML, que es recargar la página cuando se envía
    e.preventDefault();
    
    // Une todos los valores del array code en una sola cadena. El array code contiene los dígitos ingresados en los 6 campos de entrada.
    // join(""): Combina los elementos del array sin ningún separador entre ellos.
    const verificationCode = code.join("");
    
    try {
      await verifyEmail(verificationCode);
      navigate("/portfolio");
      toast.success("Email verificado exitosamente!")
    } catch (error) {
      console.log(error)
    }
  };

  // Auto enviar cuando todos los campos de código estén completos
  useEffect(() => {
    if (code.every(digit => digit !== "")) {
      handleSubmit(new Event("submit")); // Enviar el formulario
    }
  }, [code]);

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Estado inicial para la animación
        animate={{ opacity: 1, y: 0 }} // Estado final para la animación
        transition={{ duration: 0.5 }} // Duración de la animación
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verificar tu email
        </h2>
        <p className="text-center text-gray-300 mb-6">
        Ingresa el código de 6 dígitos enviado a tu dirección de correo electrónico.
        </p>

        {/* Formulario para ingresar el código */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {/* Generar inputs para cada dígito del código */}
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => (inputRefs.current[index] = el)} // Referencias a cada input
                type="text"
                maxLength="6"
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>

          {/* Mostrar los posibles errores */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Botón para verificar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some(digit => !digit)} // Deshabilitar si está cargando o si hay campos vacíos
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {/* Cambiar texto según el estado de carga */}
            {isLoading ? "Verificando..." : "Verificar Correo"}{" "}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
