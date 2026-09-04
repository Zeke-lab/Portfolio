const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
type ApiProject = {
  title: string;
  subtitle: string;
  summary: string | null;
  description: string | null;
  imageUrl: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  technologies: { name: string }[];
  caseStudy: { problem: string | null; solution: string | null; results: string | null } | null;
};

export type ApiProfile = {
  id?: string;
  fullName?: string;
  headline?: string;
  intro?: string | null;
  about?: string | null;
  email?: string;
  location?: string | null;
  avatarUrl?: string | null;
  availability?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
  resumes?: { fileUrl: string; label: string }[];
};

type ApiSkill = { category: string; name: string; icon?: string | null };
type ApiExperience = { company: string; role: string; location: string | null; startDate: string; endDate: string | null; description: string; bullets: { text: string }[] };
type ApiEducation = { institution: string; degree?: string | null; field?: string | null; location?: string | null; startDate?: string | null; endDate?: string | null; description?: string | null };
type ApiCertification = { title: string; issuer: string; year: string | null };
type ApiContent = { profile?: ApiProfile | null; projects: ApiProject[]; skills: ApiSkill[]; experience: ApiExperience[]; education: ApiEducation[]; certifications: ApiCertification[] };

const COLORS = [
  { dot: "bg-blue-400", border: "border-blue-500/20 hover:border-blue-500/40", color: "text-blue-400" },
  { dot: "bg-violet-400", border: "border-violet-500/20 hover:border-violet-500/40", color: "text-violet-400" },
  { dot: "bg-emerald-400", border: "border-emerald-500/20 hover:border-emerald-500/40", color: "text-emerald-400" },
  { dot: "bg-orange-400", border: "border-orange-500/20 hover:border-orange-500/40", color: "text-orange-400" },
];
const IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=560&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=560&fit=crop&auto=format",
];

export type PortfolioView = {
  profile?: ApiProfile | null;
  skills: Record<string, { dot: string; border: string; chips: string[] }>;
  projects: Array<{
    title: string;
    subtitle: string;
    summary: string;
    description: string;
    desc: string;
    liveUrl: string | null;
    repoUrl: string | null;
    tech: string[];
    features: string[];
    img: string;
    accentFrom: string;
    accentTo: string;
    badge: string;
    metric: string;
  }>;
  experience: Array<{ company: string; logo: string; logoClass: string; role: string; period: string; location: string; desc: string; bullets: string[]; tech: string[]; accentColor: string; lineColor: string }>;
  education: Array<{ degree: string; university: string; period: string; focus: string[]; description: string }>;
  caseStudy: Array<{ phase: string; tag: string; title: string; body: string }>;
  techGrid: Record<string, { color: string; dot: string; items: Array<{ name: string; icon: string | null }> }>;
  certs: Array<{ title: string; issuer: string; year: string; color: string }>;
};

export type ContactMessageInput = { name: string; email: string; subject: string; message: string };

export async function submitContactMessage(message: ContactMessageInput) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error("Unable to send your message. Please try again.");
  }
}

function formatPeriod(startDate: string, endDate: string | null) {
  const format = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });
  return `${format.format(new Date(startDate))} — ${endDate ? format.format(new Date(endDate)) : "Present"}`;
}

function formatMonthYear(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

export async function fetchPortfolioContent(): Promise<PortfolioView> {
  const response = await fetch(`${API_URL}/api/portfolio/content`);
  if (!response.ok) throw new Error("Unable to load portfolio content.");
  const content = await response.json() as ApiContent;
  const categoryNames = [...new Set(content.skills.map((skill) => skill.category))];
  const skills = Object.fromEntries(categoryNames.map((category, index) => [
    category,
    { ...COLORS[index % COLORS.length], chips: content.skills.filter((skill) => skill.category === category).map((skill) => skill.name) },
  ]));
  const primaryCaseStudy = content.projects.find((project) => project.caseStudy)?.caseStudy;

  return {
    profile: content.profile,
    skills,
    projects: content.projects.map((project, index) => ({
      title: project.title,
      subtitle: project.subtitle,
      summary: project.summary ?? "",
      description: project.description ?? "",
      desc: project.summary ?? project.description ?? "",
      liveUrl: project.liveUrl,
      repoUrl: project.repoUrl,
      tech: project.technologies.map((technology) => technology.name),
      features: [project.caseStudy?.problem, project.caseStudy?.solution].filter((value): value is string => Boolean(value)),
      img: project.imageUrl ?? IMAGES[index % IMAGES.length],
      accentFrom: "from-indigo-500",
      accentTo: "to-cyan-500",
      badge: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      metric: project.caseStudy?.results ?? "Featured Project",
    })),
    experience: content.experience.map((item, index) => ({
      company: item.company, logo: item.company.charAt(0), logoClass: index % 2 ? "bg-indigo-600 text-white" : "bg-white text-black",
      role: item.role, period: formatPeriod(item.startDate, item.endDate), location: item.location ?? "Remote", desc: item.description,
      bullets: item.bullets.map((bullet) => bullet.text), tech: [], accentColor: "text-indigo-400", lineColor: "bg-indigo-400/30",
    })),
    education: content.education.map((item) => ({
      degree: item.degree ?? "Academic background",
      university: item.institution,
      period: [formatMonthYear(item.startDate), formatMonthYear(item.endDate)].filter(Boolean).join(" — ") || "Dates unavailable",
      focus: item.field ? [item.field] : [],
      description: item.description ?? "Academic background and key learning focus.",
    })),
    caseStudy: primaryCaseStudy ? [
      { phase: "01", tag: "Problem", title: "Challenge", body: primaryCaseStudy.problem ?? "" },
      { phase: "02", tag: "Solution", title: "Approach", body: primaryCaseStudy.solution ?? "" },
      { phase: "03", tag: "Results", title: "Outcome", body: primaryCaseStudy.results ?? "" },
    ].filter((step) => step.body) : [],
    techGrid: Object.fromEntries(categoryNames.map((category, index) => [category, {
      color: COLORS[index % COLORS.length].color,
      dot: COLORS[index % COLORS.length].dot,
      items: content.skills
        .filter((skill) => skill.category === category)
        .map((skill) => ({ name: skill.name, icon: skill.icon ?? null })),
    }])),
    certs: content.certifications.map((certification, index) => ({ ...certification, year: certification.year ?? "", color: `${COLORS[index % COLORS.length].color} bg-white/[0.04] border-white/[0.1]` })),
  };
}
