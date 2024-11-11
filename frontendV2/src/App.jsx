import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerification from "./pages/EmailVerificationPage.jsx"
import Portfolio from "./pages/PortfolioPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";

import EditPresentationPage from "./editPages/EditPresentationPage.jsx"
import EditAboutMePage from "./editPages/EditAboutMePage.jsx"
import EditExperiencePage from "./editPages/EditExperiencePage.jsx"
import EditProjectsPage from "./editPages/EditProjectsPage.jsx"
import EditEducationPage from "./editPages/EditEducationPage.jsx"
import EditCertificatesPage from "./editPages/EditCertificatesPage.jsx"
import EditSkillsPage from "./editPages/EditSkillsPage.jsx"
import EditContactPage from "./editPages/EditContactPage.jsx"

import AddExperienceForm from "./addPages/AddExperienceForm.jsx"
import AddProjectForm from "./addPages/AddProjectForm.jsx"
import AddEducationForm from "./addPages/AddEducationForm.jsx"
import AddCertificateForm from "./addPages/AddCertificateForm.jsx"
import AddTechnologyForm from "./addPages/AddTechnologyForm.jsx"

import UpdateExperienceItemForm from "./updateItemsPages/UpdateExperienceItemForm.jsx"
import UpdateProjectItemForm from "./updateItemsPages/UpdateProjectItemForm.jsx"
import UpdateEducationItemForm from "./updateItemsPages/UpdateEducationItemForm.jsx"
import UpdateCertificateItemForm from "./updateItemsPages/UpdateCertificateItemForm.jsx"

import { useAuthStore } from "./store/authStore.js";
import FloatingShape from "./components/FloatingShape"
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx"

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [backgroundClass, setBackgroundClass] = useState("");

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  useEffect(() => {
    // Actualiza la clase del fondo según la URL
    setBackgroundClass(location.pathname.includes('/portfolio') 
      ? "bg-black" 
      : "bg-gradient-to-br from-gray-800 via-blue-900 to-cyan-700"
    );
  }, [location.pathname]);

  if(isCheckingAuth) return <LoadingSpinner/>

  return (
    <div className={`min-h-screen ${backgroundClass} flex items-center justify-center relative overflow-hidden`}>
      
      {!location.pathname.includes('/portfolio') && (
        <>
          <FloatingShape color="bg-white" size="w-40 h-40" top="-5%" left="10%" delay={0} />
          <FloatingShape color="bg-white" size="w-48 h-48" top="70%" left="80%" delay={5} />
          <FloatingShape color="bg-white" size="w-32 h-32" top="40%" left="10%" delay={2} />
        </>
      )}

      <Routes>
        
        {/* Ruteo para el portafolio */}
        <Route path='/portfolio/:userName' element={<Portfolio />} />
        
        {/* Ruteo para la edicion de las secciones */}
        <Route path='/portfolio/:userName/edit-presentation' element={<EditPresentationPage />} />
        <Route path='/portfolio/:userName/edit-aboutme' element={<EditAboutMePage />} />
        <Route path='/portfolio/:userName/edit-experience' element={<EditExperiencePage />} />
        <Route path='/portfolio/:userName/edit-projects' element={<EditProjectsPage />} />
        <Route path='/portfolio/:userName/edit-education' element={<EditEducationPage />} />
        <Route path='/portfolio/:userName/edit-certificates' element={<EditCertificatesPage />} />
        <Route path='/portfolio/:userName/edit-skills' element={<EditSkillsPage />} />
        <Route path='/portfolio/:userName/edit-contact' element={<EditContactPage />} />

        {/* Ruteo para agregar */}
        <Route path="/portfolio/:userName/add-experience" element={<AddExperienceForm />} />
        <Route path="/portfolio/:userName/add-project" element={<AddProjectForm />} />
        <Route path="/portfolio/:userName/add-education" element={<AddEducationForm />} />
        <Route path="/portfolio/:userName/add-certificate" element={<AddCertificateForm />} />
        <Route path="/portfolio/:userName/add-technology" element={<AddTechnologyForm />} />

        {/* Ruteo para editar los items en las secciones */}
        <Route path="/portfolio/:userName/edit-experience/:experienceId" element={<UpdateExperienceItemForm />} />
        <Route path="/portfolio/:userName/edit-project/:projectId" element={<UpdateProjectItemForm />} />
        <Route path="/portfolio/:userName/edit-education/:educationId" element={<UpdateEducationItemForm />} />
        <Route path="/portfolio/:userName/edit-certificate/:certificateId" element={<UpdateCertificateItemForm />} />
        
        {/* Ruteo para el registro/inicio de sesion/verificacion de email/cambio de contraseña/cierre de sesión */}
        <Route path='/signup' element={<ProtectedRoute><SignUpPage /></ProtectedRoute>} />
        <Route path='/login' element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
        <Route path='/verify-email' element={<ProtectedRoute><EmailVerification /></ProtectedRoute>} />
        <Route path='/forgot-password' element={<ProtectedRoute><ForgotPasswordPage /></ProtectedRoute>} />
        <Route path='/reset-password/:token' element={<ProtectedRoute><ResetPasswordPage /></ProtectedRoute>} />

        {/* Redirigir a /signup si la ruta es desconocida */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>

      {/* Para poder usar el Toaster */}
      <Toaster />
    </div>
  );
}

export default App;