import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerification from "./pages/EmailVerificationPage.jsx"
import Portfolio from "./pages/PortfolioPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";

import { useAuthStore } from "./store/authStore";
import FloatingShape from "./components/FloatingShape"
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

// Protejer las rutas que necesitan que el usuario este autenticado
// children = a la pagina a la que queres acceder
//TODO Resolver error al registrarse
const ProtectedRoute = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();
  console.log("User", user);

  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  if(!user.isVerified){
    return <Navigate to="/verify-email" replace/>
  }

  return children;
}

// Funcion para redirigir a los usuarios que ya esten con sesion iniciada cuando intentan acceder a "/signup" o "/login"
// children = a la pagina a la que queres acceder
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  
  if(isAuthenticated && user.isVerified){
    return <Navigate to="/portfolio" replace/>
  }

  return children;
}

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if(isCheckingAuth) return <LoadingSpinner/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      
      {/* Fondo con las 3 esferas verdes */}
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5}/>
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="10%" delay={2}/>

      {/* Ruteo */}
      <Routes>
        <Route 
          path='/portfolio' 
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />
        
        <Route 
          path='/signup' 
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage/>
            </RedirectAuthenticatedUser>
          }
        />
        
        <Route 
          path='/login' 
          element={
            <RedirectAuthenticatedUser>
              <LoginPage/>
            </RedirectAuthenticatedUser>
          }
        />
        
        <Route path='/verify-email' element={<EmailVerification/>}/>
        
        <Route 
          path='/forgot-password' 
          element={
           <RedirectAuthenticatedUser>
            <ForgotPasswordPage/>
           </RedirectAuthenticatedUser>
          }
        />

        <Route
          path='/reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage/>
            </RedirectAuthenticatedUser>
          }
        />
      
      {/* Redirigir a /signup si la ruta es desconocida */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
      
      </Routes>


      {/* Para poder usar el Toaster */}
      <Toaster/>
    </div>
  );
}

export default App;