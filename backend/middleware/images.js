// middleware/images.js (actualizado)
import multer from "multer";
import path from "path";
import User from "../models/user.model.js";

// helper para armar URL pública
const toPublicUrl = (relPath) => {
  const base = process.env.PUBLIC_URL || "http://localhost:4000";
  // normalizar separadores en Windows
  const norm = relPath.replace(/\\/g, "/");
  return `${base}/${norm}`;
};

/** ---------- PRESENTATION PHOTO ---------- **/
export const presentationImage = multer({
  storage: multer.diskStorage({
    destination: (req, _file, cb) => {
      // Asegúrate de que existan las carpetas: storage/presentation
      req.imageBasePath = "storage/presentation";
      cb(null, req.imageBasePath);
    },
    filename: async (req, file, cb) => {
      try {
        const { userName } = req.params;

        // Verificá que el user exista (evita que cualquiera suba con cualquier :userName)
        const user = await User.findOne({ userName }).select("_id userName").lean();
        if (!user) return cb(new Error("Usuario no encontrado"), null);

        const ext = path.extname(file.originalname);
        const filename = `${userName}-avatar${ext}`;

        const relPath = `${req.imageBasePath}/${filename}`;
        req.fileRelPath = relPath;
        req.imagePublicUrl = toPublicUrl(relPath);

        cb(null, filename);
      } catch (err) {
        cb(err, null);
      }
    }
  })
});

/** ---------- PROYECTOS (si los usás con imagen) ---------- **/
export const addProjectImage = multer({
  storage: multer.diskStorage({
    destination: (req, _file, cb) => {
      req.imageBasePath = "storage/projects";
      cb(null, req.imageBasePath);
    },
    filename: async (req, file, cb) => {
      const { userName } = req.params;
      const ext = path.extname(file.originalname);
      const filename = `${userName}-temp${ext}`;

      const relPath = `${req.imageBasePath}/${filename}`;
      req.fileRelPath = relPath;
      req.imagePublicUrl = toPublicUrl(relPath);

      cb(null, filename);
    }
  })
});

export const editProjectImage = multer({
  storage: multer.diskStorage({
    destination: (req, _file, cb) => {
      req.imageBasePath = "storage/projects";
      cb(null, req.imageBasePath);
    },
    filename: async (req, file, cb) => {
      const { id, userName } = req.params;
      const ext = path.extname(file.originalname);
      const filename = `${userName}-${id}${ext}`;

      const relPath = `${req.imageBasePath}/${filename}`;
      req.fileRelPath = relPath;
      req.imagePublicUrl = toPublicUrl(relPath);

      cb(null, filename);
    }
  })
});