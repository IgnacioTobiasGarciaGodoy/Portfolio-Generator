import Portfolio from "../models/portfolio.model.js";
import User from "../models/user.model.js";
import fs from "fs";
import path from "path";

class PortfolioError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/** =================== HELPERS =================== **/
const findPortfolioByUserName = async (userName) => {
  // 1) Buscá el User por userName
  const user = await User.findOne({ userName }).select("_id");
  if (!user) throw new PortfolioError(404, "Usuario no encontrado");

  // 2) Buscá el Portfolio por user: ObjectId
  const userPortfolio = await Portfolio.findOne({ user: user._id });
  if (!userPortfolio) throw new PortfolioError(404, "Portafolio no encontrado");

  return userPortfolio;
};

const toPublicUrl = (relPath) => {
  const base = process.env.PUBLIC_URL || "http://localhost:4000";
  return `${base}/${relPath.replace(/\\/g, "/")}`;
};

const renameFile = (oldRelPath, userName, itemId, done) => {
  const ext = path.extname(oldRelPath);
  const dir = path.dirname(oldRelPath);
  const newRelPath = `${dir}/${userName}-${itemId}${ext}`;

  fs.rename(oldRelPath, newRelPath, (err) => {
    if (err) return done({ success: false, error: err });
    const newPublicUrl = toPublicUrl(newRelPath);
    done({ success: true, newRelPath, newPublicUrl });   // 👈 devolvés URL pública
  });
};

const fromPublicUrlToRelPath = (url) => {
  try {
    const base = process.env.PUBLIC_URL || "http://localhost:4000";
    // Si ya es URL absoluta, tomá el pathname; si no, devolvés tal cual
    if (/^https?:\/\//i.test(url)) {
      const u = new URL(url);
      return u.pathname.replace(/^\/+/, ""); // "storage/..." sin barra inicial
    }
    return url;
  } catch {
    return url;
  }
};

const deleteImageIfNecessary = async (imageUrlOrPath) => {
  if (!imageUrlOrPath || imageUrlOrPath.includes("default-")) return;
  const relPath = fromPublicUrlToRelPath(imageUrlOrPath);
  try {
    await fs.promises.unlink(relPath);
  } catch {
    throw new PortfolioError(500, "Error deleting the associated image");
  }
};

/** =================== GET GENÉRICO =================== **/
export const getSection = async (req, res, section) => {
  const { userName } = req.params;
  try {
    const userPortfolio = await findPortfolioByUserName(userName);
    res.status(200).json({ [section]: userPortfolio[section] });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

/** =================== DELETE ITEM SUBCOLECCIÓN =================== **/
export const deleteSectionItem = async (req, res, section, subSection) => {
  const { id, userName } = req.params;
  try {
    const userPortfolio = await findPortfolioByUserName(userName);

    // Guardá el item que vas a borrar para eliminar imagen si corresponde
    const prevItems = userPortfolio?.[section]?.[subSection] || [];
    const toDelete = prevItems.find((it) => String(it._id) === String(id));

    const updated = await Portfolio.findOneAndUpdate(
      { _id: userPortfolio._id },
      { $pull: { [`${section}.${subSection}`]: { _id: id } } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Portafolio no encontrado" });

    // Si es proyecto y tenía imageUrl, eliminá archivo
    if (section === "projectSection" && toDelete?.imageUrl) {
      await deleteImageIfNecessary(toDelete.imageUrl);
    }

    res.status(200).json({
      message: `${subSection} eliminado`,
      [section]: updated[section],
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

/** =================== PRESENTATION =================== **/
export const editPresentationSection = async (req, res) => {
  const { userName } = req.params;

  try {
    const userPortfolio = await findPortfolioByUserName(userName);

    // Soportar request como string JSON o JSON plano
    const payload = typeof req.body.presentationSection === "string"
      ? JSON.parse(req.body.presentationSection)
      : req.body.presentationSection;

    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ message: "presentationSection inválido" });
    }

    const { fullName, role, githubUrl, linkedinUrl } = payload;

    if (fullName !== undefined)   userPortfolio.presentationSection.fullName   = fullName;
    if (role !== undefined)       userPortfolio.presentationSection.role       = role;
    if (githubUrl !== undefined)  userPortfolio.presentationSection.githubUrl  = githubUrl;
    if (linkedinUrl !== undefined)userPortfolio.presentationSection.linkedinUrl= linkedinUrl;

    // si Multer subió archivo, usá la URL pública ya preparada por el middleware
    if (req.imagePublicUrl) {
      userPortfolio.presentationSection.photoUrl = req.imagePublicUrl;
    }

    await userPortfolio.save();

    res.status(200).json({ message: "Sección 'Presentation' actualizada exitosamente" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

/** =================== ABOUT ME =================== **/
export const editAboutMe = async (req, res) => {
  const { userName } = req.params;
  try {
    const userPortfolio = await findPortfolioByUserName(userName);

    const payload = typeof req.body.aboutMeSection === "string"
      ? JSON.parse(req.body.aboutMeSection)
      : req.body.aboutMeSection;

    if (payload?.text === undefined || payload?.text === null) {
      return res.status(400).json({ message: "El campo 'text' es obligatorio" });
    }

    userPortfolio.aboutMeSection.text = payload.text;
    await userPortfolio.save();

    res.status(200).json({ message: "Sección 'About Me' actualizada exitosamente" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

/** =================== CAREER =================== **/
export const addCareerItem = async (req, res) => {
  const { userName } = req.params;
  try {
    const p = await findPortfolioByUserName(userName);

    const payload = typeof req.body.careerSection === "string"
      ? JSON.parse(req.body.careerSection)
      : req.body.careerSection;

    const it = payload?.item;
    if (!it || !["experience", "education"].includes(it.kind)) {
      return res.status(400).json({ message: "item.kind debe ser 'experience' o 'education'" });
    }
    if (!it.organization || !it.title || !it.startYear || !it.endYear) {
      return res.status(400).json({ message: "organization, title, startYear y endYear son obligatorios" });
    }

    p.careerSection.items.push({
      kind: it.kind,
      organization: it.organization,
      title: it.title,
      startYear: it.startYear,
      endYear: it.endYear,
      description: it.description,
    });

    await p.save();
    res.status(201).json({ message: "Item agregado a Career" });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

export const editCareerItem = async (req, res) => {
  const { userName, id } = req.params;
  try {
    const p = await findPortfolioByUserName(userName);

    const item = p.careerSection.items.id(id);
    if (!item) return res.status(404).json({ message: "Item no encontrado" });

    const payload = typeof req.body.careerSection === "string"
      ? JSON.parse(req.body.careerSection)
      : req.body.careerSection;

    const it = payload?.item || {};
    if (it.kind && !["experience", "education"].includes(it.kind)) {
      return res.status(400).json({ message: "kind inválido" });
    }

    if (it.kind !== undefined) item.kind = it.kind;
    if (it.organization !== undefined) item.organization = it.organization;
    if (it.title !== undefined) item.title = it.title;
    if (it.startYear !== undefined) item.startYear = it.startYear;
    if (it.endYear !== undefined) item.endYear = it.endYear;
    if (it.description !== undefined) item.description = it.description;

    await p.save();
    res.status(200).json({ message: "Item de Career actualizado" });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

/** =================== PROJECTS =================== **/
export const addProject = async (req, res) => {
  const { userName } = req.params;
  try {
    const userPortfolio = await findPortfolioByUserName(userName);

    const payload = typeof req.body.projectSection === "string"
      ? JSON.parse(req.body.projectSection)
      : req.body.projectSection;

    const p = payload?.project;
    if (!p?.name || !p?.description) {
      return res.status(400).json({ message: "name y description son obligatorios" });
    }

    userPortfolio.projectSection.projects.push({
      name: p.name,
      description: p.description,
      demoUrl: p.demoUrl,
      githubUrl: p.githubUrl,
      technologies: Array.isArray(p.technologies) ? p.technologies : [],
      imageUrl: undefined,
    });
    await userPortfolio.save();

    const project = userPortfolio.projectSection.projects[userPortfolio.projectSection.projects.length - 1];
    const projectId = project._id;

    // si no vino imagen -> listo
    if (!req.fileRelPath) {
      return res.status(201).json({ message: "Proyecto agregado exitosamente" });
    }

    // renombrar archivo y guardar URL pública
    renameFile(req.fileRelPath, userName, projectId, async (result) => {
      if (!result.success) {
        return res.status(500).json({ message: "Error renaming image", error: result.error });
      }
      project.imageUrl = result.newPublicUrl;   // 👈 URL pública http(s)://...
      try {
        await userPortfolio.save();
        res.status(201).json({ message: "Proyecto agregado exitosamente" });
      } catch (err) {
        res.status(500).json({ message: "Error agregando proyecto", error: err });
      }
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const editProject = async (req, res) => {
  const { id, userName } = req.params;
  try {
    const userPortfolio = await findPortfolioByUserName(userName);

    const project = userPortfolio.projectSection.projects.id(id);
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });

    const payload = typeof req.body.projectSection === "string"
      ? JSON.parse(req.body.projectSection)
      : req.body.projectSection;

    const p = payload?.project || {};
    if (p.name !== undefined) project.name = p.name;
    if (p.description !== undefined) project.description = p.description;
    if (p.demoUrl !== undefined) project.demoUrl = p.demoUrl;
    if (p.githubUrl !== undefined) project.githubUrl = p.githubUrl;
    if (Array.isArray(p.technologies)) project.technologies = p.technologies;

    // 👇 guardá URL pública si llegó imagen nueva
    if (req.imagePublicUrl) {
      project.imageUrl = req.imagePublicUrl;
    }

    await userPortfolio.save();
    res.status(200).json({ message: "Proyecto actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** =================== SKILLS =================== **/
export const addSkill = async (req, res) => {
  const { userName } = req.params;
  try {
    const p = await findPortfolioByUserName(userName);

    // 1) Leer desde varias formas válidas
    const parseMaybeJson = (x) => {
      if (typeof x === "string") {
        try { return JSON.parse(x); } catch { return undefined; }
      }
      return x;
    };

    const body = req.body || {};
    const ss = parseMaybeJson(body.skillsSection);

    let incoming =
      Array.isArray(body.skills) ? body.skills :
      Array.isArray(ss?.skills) ? ss.skills :
      body.skill ? [body.skill] :
      ss?.skill ? [ss.skill] : [];

    // 2) Normalizar: strings, trim, no vacíos, máx 60 chars
    incoming = incoming
      .filter(s => typeof s === "string")
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length <= 60);

    if (incoming.length === 0) {
      return res.status(400).json({ message: "Debes enviar 'skill' o 'skills' (array de strings)" });
    }

    // 3) Dedupe (case-insensitive) y evitar duplicados con lo existente
    const existingLower = new Set(p.skillsSection.skills.map(s => s.toLowerCase()));
    const uniqueIncoming = Array.from(
      new Map(incoming.map(s => [s.toLowerCase(), s])).values()
    );

    const toAdd = uniqueIncoming.filter(s => !existingLower.has(s.toLowerCase()));

    if (toAdd.length > 0) {
      p.skillsSection.skills.push(...toAdd);
      await p.save();
    }

    return res.status(201).json({
      message: toAdd.length
        ? `Se agregaron ${toAdd.length} skill(s)`
        : "Sin cambios (todas ya existían)",
      added: toAdd,
      skipped: uniqueIncoming.filter(s => !toAdd.includes(s)),
      skillsSection: p.skillsSection,
    });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

export const deleteSkill = async (req, res) => {
  const { userName } = req.params;
  try {
    const p = await findPortfolioByUserName(userName);

    const incoming =
      (typeof req.query.skill === "string" && req.query.skill) ||
      (typeof req.body?.skill === "string" && req.body.skill) ||
      (typeof req.body?.skillsSection === "string"
        ? JSON.parse(req.body.skillsSection)?.skill
        : req.body?.skillsSection?.skill);

    const value = typeof incoming === "string" ? incoming.trim() : "";
    if (!value) return res.status(400).json({ message: "skill es requerido" });

    const before = p.skillsSection.skills.length;
    p.skillsSection.skills = p.skillsSection.skills.filter(
      s => s.toLowerCase() !== value.toLowerCase()
    );

    if (p.skillsSection.skills.length === before) {
      return res.status(404).json({ message: "Skill no encontrada", skillsSection: p.skillsSection });
    }

    await p.save();
    res.status(200).json({ message: "Skill eliminada", skillsSection: p.skillsSection });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};