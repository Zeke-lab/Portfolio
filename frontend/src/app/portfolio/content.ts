export const SKILLS: Record<string, { dot: string; border: string; chips: string[] }> = {
  Frontend: {
    dot: "bg-blue-400",
    border: "border-blue-500/20 hover:border-blue-500/40",
    chips: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"],
  },
  Backend: {
    dot: "bg-violet-400",
    border: "border-violet-500/20 hover:border-violet-500/40",
    chips: ["Node.js", "Express.js", "REST APIs", "Python", "Flask"],
  },
  Database: {
    dot: "bg-emerald-400",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    chips: ["PostgreSQL", "Prisma"],
  },
  DevOps: {
    dot: "bg-orange-400",
    border: "border-orange-500/20 hover:border-orange-500/40",
    chips: ["Docker", "Git", "GitHub", "GitHub Actions (Learning)", "Husky (Learning)"],
  },
  "AI & Automation": {
    dot: "bg-pink-400",
    border: "border-pink-500/20 hover:border-pink-500/40",
    chips: ["JWT", "Zod", "Socket.IO", "Robot Framework (Learning/Testing)"],
  },
  "UI/UX": {
    dot: "bg-indigo-400",
    border: "border-indigo-500/20 hover:border-indigo-500/40",
    chips: ["Responsive UI", "Component-Based Development", "Form Handling", "Debugging", "Learning New Tools"],
  },
};

export const PROJECTS = [
  {
    title: "[YOUR PROJECT 1]",
    subtitle: "[YOUR PROJECT TYPE]",
    desc: "Replace this project description with a real overview of what you built, the problem it solved, and the impact it had.",
    tech: ["[YOUR TECH 1]", "[YOUR TECH 2]", "[YOUR TECH 3]"],
    features: [
      "Replace this bullet with your key contribution",
      "Replace this bullet with your key contribution",
      "Replace this bullet with your key contribution",
    ],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=560&fit=crop&auto=format",
    accentFrom: "from-blue-500",
    accentTo: "to-cyan-500",
    badge: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    metric: "[YOUR METRIC]",
  },
  {
    title: "[YOUR PROJECT 2]",
    subtitle: "[YOUR PROJECT TYPE]",
    desc: "Replace this project description with a real overview of what you built, the problem it solved, and the impact it had.",
    tech: ["[YOUR TECH 1]", "[YOUR TECH 2]", "[YOUR TECH 3]"],
    features: [
      "Replace this bullet with your key contribution",
      "Replace this bullet with your key contribution",
      "Replace this bullet with your key contribution",
    ],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=560&fit=crop&auto=format",
    accentFrom: "from-violet-500",
    accentTo: "to-purple-500",
    badge: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    metric: "[YOUR METRIC]",
  },
  {
    title: "[YOUR PROJECT 3]",
    subtitle: "[YOUR PROJECT TYPE]",
    desc: "Replace this project description with a real overview of what you built, the problem it solved, and the impact it had.",
    tech: ["[YOUR TECH 1]", "[YOUR TECH 2]", "[YOUR TECH 3]"],
    features: [
      "Replace this bullet with your key contribution",
      "Replace this bullet with your key contribution",
      "Replace this bullet with your key contribution",
    ],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&h=560&fit=crop&auto=format",
    accentFrom: "from-cyan-500",
    accentTo: "to-teal-500",
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    metric: "[YOUR METRIC]",
  },
  {
    title: "[YOUR PROJECT 4]",
    subtitle: "[YOUR PROJECT TYPE]",
    desc: "Replace this project description with a real overview of what you built, the problem it solved, and the impact it had.",
    tech: ["[YOUR TECH 1]", "[YOUR TECH 2]", "[YOUR TECH 3]"],
    features: [
      "Replace this bullet with your key contribution",
      "Replace this bullet with your key contribution",
      "Replace this bullet with your key contribution",
    ],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=560&fit=crop&auto=format",
    accentFrom: "from-emerald-500",
    accentTo: "to-green-500",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    metric: "[YOUR METRIC]",
  },
];

export const EXPERIENCE = [
  {
    company: "[YOUR COMPANY 1]",
    logo: "1",
    logoClass: "bg-white text-black",
    role: "[YOUR ROLE]",
    period: "[YOUR DATES]",
    location: "[YOUR LOCATION]",
    desc: "Replace this experience entry with your own role summary, responsibilities, and achievements.",
    bullets: [
      "Replace this bullet with a real responsibility or achievement",
      "Replace this bullet with a real responsibility or achievement",
      "Replace this bullet with a real responsibility or achievement",
    ],
    tech: ["[YOUR TECH 1]", "[YOUR TECH 2]", "[YOUR TECH 3]"],
    accentColor: "text-white",
    lineColor: "bg-white/30",
  },
  {
    company: "[YOUR COMPANY 2]",
    logo: "2",
    logoClass: "bg-indigo-600 text-white",
    role: "[YOUR ROLE]",
    period: "[YOUR DATES]",
    location: "[YOUR LOCATION]",
    desc: "Replace this experience entry with your own role summary, responsibilities, and achievements.",
    bullets: [
      "Replace this bullet with a real responsibility or achievement",
      "Replace this bullet with a real responsibility or achievement",
      "Replace this bullet with a real responsibility or achievement",
    ],
    tech: ["[YOUR TECH 1]", "[YOUR TECH 2]", "[YOUR TECH 3]"],
    accentColor: "text-indigo-400",
    lineColor: "bg-indigo-400/30",
  },
  {
    company: "[YOUR COMPANY 3]",
    logo: "3",
    logoClass: "bg-rose-600 text-white",
    role: "[YOUR ROLE]",
    period: "[YOUR DATES]",
    location: "[YOUR LOCATION]",
    desc: "Replace this experience entry with your own role summary, responsibilities, and achievements.",
    bullets: [
      "Replace this bullet with a real responsibility or achievement",
      "Replace this bullet with a real responsibility or achievement",
      "Replace this bullet with a real responsibility or achievement",
    ],
    tech: ["[YOUR TECH 1]", "[YOUR TECH 2]", "[YOUR TECH 3]"],
    accentColor: "text-rose-400",
    lineColor: "bg-rose-400/30",
  },
];

export const CASE_STUDY = [
  { phase: "01", tag: "Problem", title: "[YOUR PROBLEM]", body: "Replace this case study entry with the real challenge you solved and the context behind it." },
  { phase: "02", tag: "Research", title: "[YOUR APPROACH]", body: "Replace this case study entry with how you investigated the problem and what you learned." },
  { phase: "03", tag: "Solution", title: "[YOUR SOLUTION]", body: "Replace this case study entry with the solution you implemented and the reasoning behind it." },
  { phase: "04", tag: "Architecture", title: "[YOUR IMPLEMENTATION]", body: "Replace this case study entry with your architecture, workflow, or system choices." },
  { phase: "05", tag: "Development", title: "[YOUR EXECUTION]", body: "Replace this case study entry with your delivery process, collaboration, and execution details." },
  { phase: "06", tag: "Results", title: "[YOUR OUTCOME]", body: "Replace this case study entry with your measured results, impact, and lessons learned." },
];

export const TECH_GRID: Record<string, { color: string; dot: string; items: string[] }> = {
  Frontend: { color: "text-blue-400", dot: "bg-blue-400", items: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind", "Three.js"] },
  Backend: { color: "text-violet-400", dot: "bg-violet-400", items: ["Node.js", "Python", "Go", "Ruby", "FastAPI", "GraphQL"] },
  Database: { color: "text-emerald-400", dot: "bg-emerald-400", items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch", "Supabase"] },
  Cloud: { color: "text-cyan-400", dot: "bg-cyan-400", items: ["AWS", "Azure", "Cloudflare", "DigitalOcean", "Railway", "VPS"] },
  DevOps: { color: "text-orange-400", dot: "bg-orange-400", items: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Nginx", "Prometheus"] },
  Testing: { color: "text-pink-400", dot: "bg-pink-400", items: ["Jest", "Playwright", "Cypress", "Vitest", "pytest", "k6"] },
  AI: { color: "text-indigo-400", dot: "bg-indigo-400", items: ["OpenAI", "LangChain", "Pinecone", "Hugging Face", "TensorFlow", "Anthropic"] },
};

export const CERTS = [
  { title: "[YOUR CERTIFICATION 1]", issuer: "[YOUR ISSUER]", year: "[YEAR]", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { title: "[YOUR CERTIFICATION 2]", issuer: "[YOUR ISSUER]", year: "[YEAR]", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { title: "[YOUR CERTIFICATION 3]", issuer: "[YOUR ISSUER]", year: "[YEAR]", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
];
