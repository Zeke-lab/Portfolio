import { Router } from "express";
import { requireAdmin, signToken } from "../middleware/auth.js";
import {
  createCertification,
  createEducation,
  createExperience,
  createProfile,
  createProject,
  createSkill,
  deleteCertification,
  deleteEducation,
  deleteExperience,
  deleteProfile,
  deleteProject,
  deleteSkill,
  getAdminContent,
  getCurrentUser,
  resolveAdminUser,
  updateCertification,
  updateEducation,
  updateExperience,
  updateProfile,
  updateProject,
  updateSkill,
} from "../services/admin.service.js";
import {
  certificationCreateSchema,
  certificationUpdateSchema,
  educationCreateSchema,
  educationUpdateSchema,
  experienceCreateSchema,
  experienceUpdateSchema,
  idParamSchema,
  loginSchema,
  profileCreateSchema,
  profileUpdateSchema,
  projectCreateSchema,
  projectUpdateSchema,
  skillCreateSchema,
  skillUpdateSchema,
} from "../validators/admin.schemas.js";

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images (JPG, PNG, WEBP, GIF, SVG) and documents (PDF, DOC, DOCX) are allowed."));
    }
  },
});

export const adminRouter = Router();

adminRouter.post("/upload", requireAdmin, upload.single("file"), (request, response) => {
  if (!request.file) {
    response.status(400).json({ error: "No file was uploaded." });
    return;
  }

  const host = request.get("host") || "localhost:4000";
  const protocol = request.protocol || "http";
  const url = `${protocol}://${host}/uploads/${request.file.filename}`;

  response.status(201).json({
    url,
    fileName: request.file.originalname,
    storedName: request.file.filename,
    mimeType: request.file.mimetype,
    size: request.file.size,
  });
});

adminRouter.post("/login", async (request, response, next) => {
  try {
    const { email, password } = loginSchema.parse(request.body);

    const user = await resolveAdminUser(email, password);

    if (!user) {
      response.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    response.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/profile", requireAdmin, async (request, response, next) => {
  try {
    const payload = profileCreateSchema.parse(request.body);
    const profile = await createProfile(payload);
    response.status(201).json({ profile });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/profile/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);
    const payload = profileUpdateSchema.parse(request.body);

    const profile = await updateProfile(id, payload);
    if (!profile) {
      response.status(404).json({ error: "Profile not found" });
      return;
    }

    response.json({ profile });
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/profile/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);

    const deleted = await deleteProfile(id);
    if (!deleted) {
      response.status(404).json({ error: "Profile not found" });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/project", requireAdmin, async (request, response, next) => {
  try {
    const payload = projectCreateSchema.parse(request.body);
    const createdProject = await createProject(payload);
    response.status(201).json({ project: createdProject });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/project/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);
    const payload = projectUpdateSchema.parse(request.body);

    const project = await updateProject(id, payload);
    if (!project) {
      response.status(404).json({ error: "Project not found" });
      return;
    }

    response.json({ project });
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/project/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);

    const deleted = await deleteProject(id);
    if (!deleted) {
      response.status(404).json({ error: "Project not found" });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/skill", requireAdmin, async (request, response, next) => {
  try {
    const payload = skillCreateSchema.parse(request.body);
    const skill = await createSkill(payload);
    response.status(201).json({ skill });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/skill/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);
    const payload = skillUpdateSchema.parse(request.body);

    const skill = await updateSkill(id, payload);
    if (!skill) {
      response.status(404).json({ error: "Skill not found" });
      return;
    }

    response.json({ skill });
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/skill/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);

    const deleted = await deleteSkill(id);
    if (!deleted) {
      response.status(404).json({ error: "Skill not found" });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/experience", requireAdmin, async (request, response, next) => {
  try {
    const payload = experienceCreateSchema.parse(request.body);
    const experience = await createExperience(payload);
    response.status(201).json({ experience });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/experience/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);
    const payload = experienceUpdateSchema.parse(request.body);

    const experience = await updateExperience(id, payload);
    if (!experience) {
      response.status(404).json({ error: "Experience not found" });
      return;
    }

    response.json({ experience });
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/experience/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);

    const deleted = await deleteExperience(id);
    if (!deleted) {
      response.status(404).json({ error: "Experience not found" });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/education", requireAdmin, async (request, response, next) => {
  try {
    const payload = educationCreateSchema.parse(request.body);
    const education = await createEducation(payload);
    response.status(201).json({ education });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/education/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);
    const payload = educationUpdateSchema.parse(request.body);

    const education = await updateEducation(id, payload);
    if (!education) {
      response.status(404).json({ error: "Education not found" });
      return;
    }

    response.json({ education });
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/education/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);

    const deleted = await deleteEducation(id);
    if (!deleted) {
      response.status(404).json({ error: "Education not found" });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/certification", requireAdmin, async (request, response, next) => {
  try {
    const payload = certificationCreateSchema.parse(request.body);
    const certification = await createCertification(payload);
    response.status(201).json({ certification });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/certification/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);
    const payload = certificationUpdateSchema.parse(request.body);

    const certification = await updateCertification(id, payload);
    if (!certification) {
      response.status(404).json({ error: "Certification not found" });
      return;
    }

    response.json({ certification });
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/certification/:id", requireAdmin, async (request, response, next) => {
  try {
    const { id } = idParamSchema.parse(request.params);

    const deleted = await deleteCertification(id);
    if (!deleted) {
      response.status(404).json({ error: "Certification not found" });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/me", requireAdmin, async (request, response) => {
  const userId = request.user?.sub;

  if (!userId) {
    response.status(401).json({ error: "Authentication required" });
    return;
  }

  const user = await getCurrentUser(userId);

  response.json({ user });
});

adminRouter.get("/content", requireAdmin, async (_request, response) => {
  response.json(await getAdminContent());
});
