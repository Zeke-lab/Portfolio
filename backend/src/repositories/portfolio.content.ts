export const SKILLS: Record<string, { dot: string; border: string; chips: string[] }> = {
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

export const PROJECTS = [
  {
    title: "CloudFlow",
    subtitle: "SaaS Workflow Automation Platform",
    desc: "A multi-tenant workflow platform with analytics, billing, and live team collaboration.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Role-based access control and team collaboration",
      "Workflow builder with webhook integrations",
      "Activity logs, notifications, and usage tracking",
    ],
    imageUrl: null,
    accentFrom: "from-blue-500",
    accentTo: "to-cyan-500",
    badge: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    metric: "Production Ready",
  },
  {
    title: "DataVault",
    subtitle: "Portfolio Content Platform",
    desc: "A content management backend for projects, skills, experience, and case studies.",
    tech: ["Express", "Prisma", "PostgreSQL", "Zod", "REST API"],
    features: [
      "CRUD API for portfolio sections",
      "Published/draft content workflow",
      "Schema-backed database layer",
    ],
    imageUrl: null,
    accentFrom: "from-violet-500",
    accentTo: "to-purple-500",
    badge: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    metric: "API Ready",
  },
];

export const EXPERIENCE = [
  {
    company: "Vercel",
    logo: "V",
    logoClass: "bg-white text-black",
    role: "Senior Full-Stack Engineer",
    period: "Jan 2022 — Present",
    location: "San Francisco, CA",
    desc: "Leading development of high-scale web infrastructure and developer tooling.",
    bullets: [
      "Built production-grade full-stack features",
      "Improved performance and reliability",
      "Collaborated across product and engineering",
    ],
    tech: ["Next.js", "TypeScript", "Go", "PostgreSQL"],
    accentColor: "text-white",
    lineColor: "bg-white/30",
  },
];

export const CASE_STUDY = [
  { phase: "01", tag: "Problem", title: "Content Sprawl", body: "The portfolio needed a clean split between frontend, API, and database concerns." },
  { phase: "02", tag: "Solution", title: "Layered Monolith", body: "The backend is organized into api, services, repositories, and db folders." },
];

export const TECH_GRID: Record<string, { color: string; dot: string; items: string[] }> = {
  Frontend: { color: "text-blue-400", dot: "bg-blue-400", items: ["React", "Next.js", "TypeScript"] },
  Backend: { color: "text-violet-400", dot: "bg-violet-400", items: ["Node.js", "Express", "Zod"] },
  Database: { color: "text-emerald-400", dot: "bg-emerald-400", items: ["PostgreSQL", "Prisma", "Redis"] },
};

export const TESTIMONIALS = [
  {
    name: "Hiring Manager",
    role: "CTO",
    company: "Portfolio Review",
    quote: "The new backend structure makes the app much easier to extend and maintain.",
    initials: "HM",
    gradient: "from-violet-500 to-purple-600",
  },
];

export const CERTS = [
  { title: "PostgreSQL Fundamentals", issuer: "Open Source", year: "2026", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
];
