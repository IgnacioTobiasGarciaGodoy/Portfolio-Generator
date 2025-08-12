# 📂 Portafolio Generator

**Portafolio Generator** es una aplicación web completa que permite a los usuarios crear, personalizar y administrar su propio portafolio en línea.  
Este proyecto es un **rediseño** de una versión previa, con mejoras en la experiencia de usuario, interfaz y arquitectura del sistema.

## 🚀 Características principales

 **Autenticación de usuarios**
  - Registro e inicio de sesión.
  - Seguridad de credenciales y manejo de sesiones.

- **Creación y personalización del portafolio**
  - Secciones editables:
    - 📌 Acerca de mí
    - 💼 Experiencia
    - 🎓 Educación
    - 📂 Proyectos
    - 📜 Certificados
    - 🛠 Habilidades
    - 📬 Formulario de contacto

- **Gestión de contenido**
  - Agregar, editar y eliminar información en cada sección.

## 🛠 Tecnologías utilizadas

**Backend**
- [Next.js](https://nextjs.org/) — Renderizado y API Routes
- [Express.js](https://expressjs.com/) — Manejo de rutas y lógica de servidor

**Frontend**
- [React](https://react.dev/) — Interfaz interactiva y dinámica

**Base de datos**
- [MongoDB](https://www.mongodb.com/) — Almacenamiento de datos de usuarios y portafolios

## 🎨 Diseño en Figma

Puedes visualizar el prototipo y diseño del rediseño aquí:  
[🔗 Ver en Figma](https://www.figma.com/design/J1PzwsmQZqv5VZWMi6nHy0/Portfolio-Generator-Rework?node-id=0-1&t=odhsoBCFKI87klbq-1)

## 📦 Instalación y uso

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/usuario/portafolio-generator.git
   cd portafolio-generator
   ```

2. **Configurar el Backend**
   ```bash
   cd backend
   npm install
   ```

Crear un archivo .env en backend/ con:
   ```bash 
   MONGODB_URI=tu_uri_de_mongodb
   JWT_SECRET=tu_clave_secreta
   PORT=4000
   NODE_ENV = production
   CLIENT_URL = http://localhost:5173
   ```

3. **Configurar el Frontend**
   ```bash 
   cd ../frontend
   npm install
   ```

4. **Iniciar el proyecto**
- Backend
   ```bash 
   npm start
   ```
- Frontend
   ```bash 
   npm run dev
   ```

## 💬 Contribuciones
¡Sugerencias y mejoras son bienvenidas!
Por favor, abre un issue si quieres proponer cambios o reportar errores.

##

Desarrollado por: 
- Eugenio Yepes
- Paula Alvarez
- Sofia Laveihle
- Ignacio Garcia Godoy

Rediseñado por:
- Ignacio Garcia Godoy
