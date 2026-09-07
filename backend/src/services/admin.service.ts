import { db } from "../db/client.js";
import type {
  CertificationInput,
  EducationInput,
  ExperienceInput,
  ProfileInput,
  ProjectInput,
  SkillInput,
} from "../validators/admin.schemas.js";

const DEFAULT_ADMIN_EMAIL = "admin@portfolio.local";
const DEFAULT_ADMIN_PASSWORD = "admin123";

function slugifyProjectTitle(title: string) {
  const sanitized = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return sanitized || `project-${Date.now()}`;
}

function parseOptionalDate(value?: string | null) {
  if (!value || value.trim() === "") return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function hasCaseStudyContent(caseStudy?: ProjectInput["caseStudy"]) {
  return Boolean(caseStudy && Object.entries(caseStudy).some(([key, value]) => {
    if (key === "features") return Array.isArray(value) && value.some((feature) => feature.trim());
    return typeof value === "string" && value.trim().length > 0;
  }));
}

export async function resolveAdminUser(email: string, password: string) {
  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    if (existingUser.password === password) return existingUser;

    if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      return db.user.update({
        where: { email },
        data: {
          name: existingUser.name || "Portfolio Admin",
          password: DEFAULT_ADMIN_PASSWORD,
          role: "admin",
        },
      });
    }

    return null;
  }

  if (email !== DEFAULT_ADMIN_EMAIL || password !== DEFAULT_ADMIN_PASSWORD) {
    return null;
  }

  return db.user.create({
    data: {
      email: DEFAULT_ADMIN_EMAIL,
      name: "Portfolio Admin",
      password: DEFAULT_ADMIN_PASSWORD,
      role: "admin",
    },
  });
}

export async function createProfile(payload: ProfileInput) {
  const socialLinks = [
    payload.github ? { label: "GitHub", url: payload.github, order: 0 } : null,
    payload.linkedin ? { label: "LinkedIn", url: payload.linkedin, order: 1 } : null,
    payload.website ? { label: "Website", url: payload.website, order: 2 } : null,
  ].filter(Boolean) as Array<{ label: string; url: string; order: number }>;

  return db.profile.create({
    data: {
      fullName: payload.fullName,
      headline: payload.headline || null,
      avatarUrl: payload.avatarUrl || null,
      email: payload.email || null,
      location: payload.location || null,
      availability: payload.availability || null,
      intro: payload.intro || null,
      about: payload.about || null,
      status: "published",
      socialLinks: {
        create: socialLinks.map((link) => ({
          label: link.label,
          url: link.url,
          order: link.order,
        })),
      },
    },
    include: { socialLinks: true },
  });
}

export async function updateProfile(id: string, payload: ProfileInput) {
  const existing = await db.profile.findUnique({ where: { id } });
  if (!existing) return null;

  return db.profile.update({
    where: { id },
    data: {
      fullName: payload.fullName,
      headline: payload.headline || null,
      avatarUrl: payload.avatarUrl || null,
      email: payload.email || null,
      location: payload.location || null,
      availability: payload.availability || null,
      intro: payload.intro || null,
      about: payload.about || null,
      socialLinks: {
        deleteMany: {},
        create: [
          payload.github ? { label: "GitHub", url: payload.github, order: 0 } : null,
          payload.linkedin ? { label: "LinkedIn", url: payload.linkedin, order: 1 } : null,
          payload.website ? { label: "Website", url: payload.website, order: 2 } : null,
        ].filter(Boolean) as Array<{ label: string; url: string; order: number }>,
      },
    },
    include: { socialLinks: { orderBy: { order: "asc" } } },
  });
}

export async function deleteProfile(id: string) {
  const existing = await db.profile.findUnique({ where: { id } });
  if (!existing) return false;

  await db.profile.delete({ where: { id } });
  return true;
}

export async function createProject(payload: ProjectInput) {
  return db.project.create({
    data: {
      slug: `${slugifyProjectTitle(payload.title)}-${Date.now()}`,
      title: payload.title,
      subtitle: payload.subtitle || payload.title,
      summary: payload.summary || null,
      description: payload.description || null,
      imageUrl: payload.imageUrl || null,
      liveUrl: payload.liveUrl || null,
      repoUrl: payload.repoUrl || null,
      caseStudyLink: payload.caseStudyLink || null,
      status: "published",
      technologies: {
        create: (payload.technologies ?? []).filter(Boolean).map((name, index) => ({
          name,
          order: index,
        })),
      },
      gallery: {
        create: (payload.gallery ?? []).map((image, index) => ({
          imageUrl: image.imageUrl,
          caption: image.caption || null,
          order: index,
        })),
      },
      ...(hasCaseStudyContent(payload.caseStudy) ? {
        caseStudy: {
          create: {
            problem: payload.caseStudy?.problem || null,
            approach: payload.caseStudy?.approach || null,
            solution: payload.caseStudy?.solution || null,
            implementation: payload.caseStudy?.implementation || null,
            execution: payload.caseStudy?.execution || null,
            results: payload.caseStudy?.results || null,
            status: "published",
            features: {
              create: (payload.caseStudy?.features ?? []).filter(Boolean).map((title, index) => ({ title, order: index })),
            },
          },
        },
      } : {}),
    },
    include: { technologies: true, caseStudy: true, gallery: { orderBy: { order: "asc" } } },
  });
}

export async function updateProject(id: string, payload: ProjectInput) {
  const existing = await db.project.findUnique({ where: { id } });
  if (!existing) return null;

  return db.project.update({
    where: { id },
    data: {
      title: payload.title,
      subtitle: payload.subtitle || payload.title,
      summary: payload.summary || null,
      description: payload.description || null,
      imageUrl: payload.imageUrl || null,
      liveUrl: payload.liveUrl || null,
      repoUrl: payload.repoUrl || null,
      caseStudyLink: payload.caseStudyLink || null,
      technologies: {
        deleteMany: {},
        create: (payload.technologies ?? []).filter(Boolean).map((name, index) => ({
          name,
          order: index,
        })),
      },
      gallery: {
        deleteMany: {},
        create: (payload.gallery ?? []).map((image, index) => ({
          imageUrl: image.imageUrl,
          caption: image.caption || null,
          order: index,
        })),
      },
      caseStudy: hasCaseStudyContent(payload.caseStudy) ? {
        upsert: {
          create: {
            problem: payload.caseStudy?.problem || null,
            approach: payload.caseStudy?.approach || null,
            solution: payload.caseStudy?.solution || null,
            implementation: payload.caseStudy?.implementation || null,
            execution: payload.caseStudy?.execution || null,
            results: payload.caseStudy?.results || null,
            status: "published",
            features: {
              create: (payload.caseStudy?.features ?? []).filter(Boolean).map((title, index) => ({ title, order: index })),
            },
          },
          update: {
            problem: payload.caseStudy?.problem || null,
            approach: payload.caseStudy?.approach || null,
            solution: payload.caseStudy?.solution || null,
            implementation: payload.caseStudy?.implementation || null,
            execution: payload.caseStudy?.execution || null,
            results: payload.caseStudy?.results || null,
            status: "published",
            features: {
              deleteMany: {},
              create: (payload.caseStudy?.features ?? []).filter(Boolean).map((title, index) => ({ title, order: index })),
            },
          },
        },
      } : {
        delete: true,
      },
    },
    include: { technologies: true, caseStudy: true, gallery: { orderBy: { order: "asc" } } },
  });
}

export async function deleteProject(id: string) {
  const existing = await db.project.findUnique({ where: { id } });
  if (!existing) return false;

  await db.project.delete({ where: { id } });
  return true;
}

export async function createSkill(payload: SkillInput) {
  return db.skill.create({
    data: {
      category: payload.category,
      name: payload.name,
      icon: payload.icon || null,
      status: "published",
    },
  });
}

export async function updateSkill(id: string, payload: SkillInput) {
  const existing = await db.skill.findUnique({ where: { id } });
  if (!existing) return null;

  return db.skill.update({
    where: { id },
    data: {
      category: payload.category,
      name: payload.name,
      icon: payload.icon || null,
    },
  });
}

export async function deleteSkill(id: string) {
  const existing = await db.skill.findUnique({ where: { id } });
  if (!existing) return false;

  await db.skill.delete({ where: { id } });
  return true;
}

export async function createExperience(payload: ExperienceInput) {
  return db.experience.create({
    data: {
      company: payload.company,
      role: payload.role,
      location: payload.location || null,
      description: payload.description,
      startDate: parseOptionalDate(payload.startDate) ?? new Date(),
      endDate: parseOptionalDate(payload.endDate),
      status: "published",
      bullets: {
        create: (payload.bullets ?? []).filter(Boolean).map((text, index) => ({
          text,
          order: index,
        })),
      },
    },
    include: { bullets: true },
  });
}

export async function updateExperience(id: string, payload: ExperienceInput) {
  const existing = await db.experience.findUnique({ where: { id } });
  if (!existing) return null;

  return db.experience.update({
    where: { id },
    data: {
      company: payload.company,
      role: payload.role,
      location: payload.location || null,
      description: payload.description,
      startDate: parseOptionalDate(payload.startDate) ?? existing.startDate,
      endDate: parseOptionalDate(payload.endDate),
      bullets: {
        deleteMany: {},
        create: (payload.bullets ?? []).filter(Boolean).map((text, index) => ({
          text,
          order: index,
        })),
      },
    },
    include: { bullets: { orderBy: { order: "asc" } } },
  });
}

export async function deleteExperience(id: string) {
  const existing = await db.experience.findUnique({ where: { id } });
  if (!existing) return false;

  await db.experience.delete({ where: { id } });
  return true;
}

export async function createEducation(payload: EducationInput) {
  return db.education.create({
    data: {
      institution: payload.institution,
      degree: payload.degree || null,
      field: payload.field || null,
      location: payload.location || null,
      description: payload.description || null,
      startDate: parseOptionalDate(payload.startDate),
      endDate: parseOptionalDate(payload.endDate),
      status: "published",
    },
  });
}

export async function updateEducation(id: string, payload: EducationInput) {
  const existing = await db.education.findUnique({ where: { id } });
  if (!existing) return null;

  return db.education.update({
    where: { id },
    data: {
      institution: payload.institution,
      degree: payload.degree || null,
      field: payload.field || null,
      location: payload.location || null,
      description: payload.description || null,
      startDate: parseOptionalDate(payload.startDate),
      endDate: parseOptionalDate(payload.endDate),
    },
  });
}

export async function deleteEducation(id: string) {
  const existing = await db.education.findUnique({ where: { id } });
  if (!existing) return false;

  await db.education.delete({ where: { id } });
  return true;
}

export async function createCertification(payload: CertificationInput) {
  return db.certification.create({
    data: {
      title: payload.title,
      issuer: payload.issuer,
      year: payload.year || null,
      credentialUrl: payload.credentialUrl || null,
      issuedAt: parseOptionalDate(payload.issuedAt),
      status: "published",
    },
  });
}

export async function updateCertification(id: string, payload: CertificationInput) {
  const existing = await db.certification.findUnique({ where: { id } });
  if (!existing) return null;

  return db.certification.update({
    where: { id },
    data: {
      title: payload.title,
      issuer: payload.issuer,
      year: payload.year || null,
      credentialUrl: payload.credentialUrl || null,
      issuedAt: parseOptionalDate(payload.issuedAt),
    },
  });
}

export async function deleteCertification(id: string) {
  const existing = await db.certification.findUnique({ where: { id } });
  if (!existing) return false;

  await db.certification.delete({ where: { id } });
  return true;
}

export async function getCurrentUser(userId: string) {
  return db.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true },
  });
}

export async function getAdminContent() {
  const [profile, projects, skills, experience, education, certifications] = await Promise.all([
    db.profile.findFirst({
      where: { status: "published" },
      include: {
        socialLinks: { orderBy: { order: "asc" } },
        resumes: { orderBy: [{ featured: "desc" }, { createdAt: "asc" }] },
      },
    }),
    db.project.findMany({
      where: { status: "published" },
      orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
      include: {
        technologies: { orderBy: { order: "asc" } },
        caseStudy: { include: { features: { orderBy: { order: "asc" } } } },
        gallery: { orderBy: { order: "asc" } },
      },
    }),
    db.skill.findMany({
      where: { status: "published" },
      orderBy: [{ category: "asc" }, { featured: "desc" }, { createdAt: "asc" }],
    }),
    db.experience.findMany({
      where: { status: "published" },
      orderBy: [{ featured: "desc" }, { startDate: "desc" }],
      include: { bullets: { orderBy: { order: "asc" } } },
    }),
    db.education.findMany({
      where: { status: "published" },
      orderBy: [{ featured: "desc" }, { endDate: "desc" }],
    }),
    db.certification.findMany({
      where: { status: "published" },
      orderBy: [{ featured: "desc" }, { issuedAt: "desc" }],
    }),
  ]);

  return { profile, projects, skills, experience, education, certifications };
}
