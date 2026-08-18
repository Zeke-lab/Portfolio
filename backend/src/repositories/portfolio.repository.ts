import { db } from "../db/client.js";

const published = { status: "published" as const };

export function getPortfolioRepository() {
  return {
    async getContent() {
      const [
        profile,
        projects,
        skills,
        experience,
        education,
        certifications,
      ] = await Promise.all([
        db.profile.findFirst({
          where: published,
          orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
          include: {
            socialLinks: { orderBy: { order: "asc" } },
            resumes: {
              where: published,
              orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
            },
          },
        }),
        this.getProjects(),
        this.getSkills(),
        this.getExperience(),
        db.education.findMany({
          where: published,
          orderBy: [{ featured: "desc" }, { endDate: "desc" }],
        }),
        db.certification.findMany({
          where: published,
          orderBy: [{ featured: "desc" }, { issuedAt: "desc" }],
        }),
      ]);

      return {
        profile,
        projects,
        skills,
        experience,
        education,
        certifications,
      };
    },

    async getProjects() {
      return db.project.findMany({
        where: published,
        orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
        include: {
          technologies: { orderBy: { order: "asc" } },
          caseStudy: { where: published },
        },
      });
    },

    async getSkills() {
      return db.skill.findMany({
        where: published,
        orderBy: [{ category: "asc" }, { featured: "desc" }, { createdAt: "asc" }],
      });
    },

    async getExperience() {
      return db.experience.findMany({
        where: published,
        orderBy: [{ featured: "desc" }, { startDate: "desc" }],
        include: {
          bullets: { orderBy: { order: "asc" } },
        },
      });
    },
  };
}
