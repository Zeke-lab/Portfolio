import { PrismaClient } from "@prisma/client";

const SKILLS: Record<string, { dot: string; border: string; chips: string[] }> = {
  Frontend: {
    dot: "bg-blue-400",
    border: "border-blue-500/20 hover:border-blue-500/40",
    chips: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"],
  },
  Backend: {
    dot: "bg-violet-400",
    border: "border-violet-500/20 hover:border-violet-500/40",
    chips: ["Node.js", "Express", "REST APIs", "Zod", "Prisma", "PostgreSQL"],
  },
  Database: {
    dot: "bg-emerald-400",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    chips: ["PostgreSQL", "Redis", "Prisma", "MongoDB", "Supabase"],
  },
  DevOps: {
    dot: "bg-orange-400",
    border: "border-orange-500/20 hover:border-orange-500/40",
    chips: ["Docker", "GitHub Actions", "AWS", "Kubernetes", "Vercel"],
  },
};

const PROJECTS = [
  {
    title: "CloudFlow",
    subtitle: "SaaS Workflow Automation Platform",
    desc: "A multi-tenant workflow platform with analytics, billing, and live team collaboration.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
    imageUrl: null,
    metric: "Production Ready",
  },
  {
    title: "DataVault",
    subtitle: "Portfolio Content Platform",
    desc: "A content management backend for projects, skills, experience, and case studies.",
    tech: ["Express", "Prisma", "PostgreSQL", "Zod", "REST API"],
    imageUrl: null,
    metric: "API Ready",
  },
];

const EXPERIENCE = [
  {
    company: "Vercel",
    role: "Senior Full-Stack Engineer",
    location: "San Francisco, CA",
    desc: "Leading development of high-scale web infrastructure and developer tooling.",
    bullets: [
      "Built production-grade full-stack features",
      "Improved performance and reliability",
      "Collaborated across product and engineering",
    ],
  },
];

const CASE_STUDY = [
  { phase: "01", tag: "Problem", title: "Content Sprawl", body: "The portfolio needed a clean split between frontend, API, and database concerns." },
  { phase: "02", tag: "Solution", title: "Layered Monolith", body: "The backend is organized into api, services, repositories, and db folders." },
];

const CERTS = [
  { title: "PostgreSQL Fundamentals", issuer: "Open Source", year: "2026" },
];

const prisma = new PrismaClient();

const profileId = "seed-profile-portfolio";

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@portfolio.local" },
    update: {
      name: "Portfolio Admin",
      password: "admin123",
      role: "admin",
    },
    create: {
      email: "admin@portfolio.local",
      name: "Portfolio Admin",
      password: "admin123",
      role: "admin",
    },
  });

  await prisma.profile.upsert({
    where: { id: profileId },
    update: {
      fullName: "Ye Myat Min",
      headline: "Full-Stack Software Engineer",
      intro: "I build thoughtful, reliable web applications and developer tools.",
      about: "Mock profile content for local development. Replace this with your approved portfolio information before production.",
      location: "Remote",
      email: "yemyatmin192@gmail.com",
      availability: "Available for opportunities",
      featured: true,
      status: "published",
    },
    create: {
      id: profileId,
      fullName: "Ye Myat Min",
      headline: "Full-Stack Software Engineer",
      intro: "I build thoughtful, reliable web applications and developer tools.",
      about: "Mock profile content for local development. Replace this with your approved portfolio information before production.",
      location: "Remote",
      email: "yemyatmin192@gmail.com",
      availability: "Available for opportunities",
      featured: true,
      status: "published",
    },
  });

  const socialLinks = [
    { id: "seed-social-github", label: "GitHub", url: "https://github.com/example", icon: "github", order: 0 },
    { id: "seed-social-linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/example", icon: "linkedin", order: 1 },
  ];

  for (const socialLink of socialLinks) {
    await prisma.socialLink.upsert({
      where: { id: socialLink.id },
      update: { ...socialLink, profileId },
      create: { ...socialLink, profileId },
    });
  }

  for (const [projectIndex, project] of PROJECTS.entries()) {
    const projectId = `seed-project-${projectIndex + 1}`;
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    await prisma.project.upsert({
      where: { id: projectId },
      update: {
        slug,
        title: project.title,
        subtitle: project.subtitle,
        summary: project.desc,
        description: project.desc,
        imageUrl: project.imageUrl,
        featured: projectIndex === 0,
        status: "published",
      },
      create: {
        id: projectId,
        slug,
        title: project.title,
        subtitle: project.subtitle,
        summary: project.desc,
        description: project.desc,
        imageUrl: project.imageUrl,
        featured: projectIndex === 0,
        status: "published",
      },
    });

    for (const [technologyIndex, name] of project.tech.entries()) {
      const technologyId = `seed-project-${projectIndex + 1}-technology-${technologyIndex + 1}`;
      await prisma.projectTechnology.upsert({
        where: { id: technologyId },
        update: { projectId, name, order: technologyIndex },
        create: { id: technologyId, projectId, name, order: technologyIndex },
      });
    }

    if (projectIndex === 0) {
      await prisma.caseStudy.upsert({
        where: { projectId },
        update: {
          problem: CASE_STUDY[0]?.body,
          approach: CASE_STUDY[0]?.title,
          solution: CASE_STUDY[1]?.body,
          implementation: "Mock implementation details. Replace with the technical architecture and delivery decisions.",
          execution: "Mock execution details. Replace with the delivery process and collaboration approach.",
          results: project.metric,
          status: "published",
        },
        create: {
          id: "seed-case-study-1",
          projectId,
          problem: CASE_STUDY[0]?.body,
          approach: CASE_STUDY[0]?.title,
          solution: CASE_STUDY[1]?.body,
          implementation: "Mock implementation details. Replace with the technical architecture and delivery decisions.",
          execution: "Mock execution details. Replace with the delivery process and collaboration approach.",
          results: project.metric,
          status: "published",
        },
      });
    }
  }

  for (const [category, skillGroup] of Object.entries(SKILLS)) {
    for (const [skillIndex, name] of skillGroup.chips.entries()) {
      const id = `seed-skill-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${skillIndex + 1}`;
      await prisma.skill.upsert({
        where: { id },
        update: { category, name, featured: skillIndex < 3, status: "published" },
        create: { id, category, name, featured: skillIndex < 3, status: "published" },
      });
    }
  }

  for (const [experienceIndex, experience] of EXPERIENCE.entries()) {
    const experienceId = `seed-experience-${experienceIndex + 1}`;
    await prisma.experience.upsert({
      where: { id: experienceId },
      update: {
        company: experience.company,
        role: experience.role,
        location: experience.location,
        startDate: new Date("2022-01-01"),
        description: experience.desc,
        featured: experienceIndex === 0,
        status: "published",
      },
      create: {
        id: experienceId,
        company: experience.company,
        role: experience.role,
        location: experience.location,
        startDate: new Date("2022-01-01"),
        description: experience.desc,
        featured: experienceIndex === 0,
        status: "published",
      },
    });

    for (const [bulletIndex, text] of experience.bullets.entries()) {
      const id = `seed-experience-${experienceIndex + 1}-bullet-${bulletIndex + 1}`;
      await prisma.experienceBullet.upsert({
        where: { id },
        update: { experienceId, text, order: bulletIndex },
        create: { id, experienceId, text, order: bulletIndex },
      });
    }
  }

  for (const [certificationIndex, certification] of CERTS.entries()) {
    const id = `seed-certification-${certificationIndex + 1}`;
    await prisma.certification.upsert({
      where: { id },
      update: {
        title: certification.title,
        issuer: certification.issuer,
        year: certification.year,
        featured: certificationIndex === 0,
        status: "published",
      },
      create: {
        id,
        title: certification.title,
        issuer: certification.issuer,
        year: certification.year,
        featured: certificationIndex === 0,
        status: "published",
      },
    });
  }

  await prisma.education.upsert({
    where: { id: "seed-education-1" },
    update: {
      institution: "Example University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Remote",
      startDate: new Date("2018-09-01"),
      endDate: new Date("2022-06-01"),
      description: "Mock education content for local development.",
      featured: true,
      status: "published",
    },
    create: {
      id: "seed-education-1",
      institution: "Example University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Remote",
      startDate: new Date("2018-09-01"),
      endDate: new Date("2022-06-01"),
      description: "Mock education content for local development.",
      featured: true,
      status: "published",
    },
  });

  await prisma.resume.upsert({
    where: { id: "seed-resume-1" },
    update: {
      profileId,
      label: "Resume",
      url: "https://example.com/resume.pdf",
      fileName: "alex-morgan-resume.pdf",
      mimeType: "application/pdf",
      featured: true,
      status: "published",
    },
    create: {
      id: "seed-resume-1",
      profileId,
      label: "Resume",
      url: "https://example.com/resume.pdf",
      fileName: "alex-morgan-resume.pdf",
      mimeType: "application/pdf",
      featured: true,
      status: "published",
    },
  });

  console.log("Mock portfolio data seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
