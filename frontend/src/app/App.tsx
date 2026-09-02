import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sun, Moon, Menu, X, Download, ArrowRight, ExternalLink,
  Github, Linkedin, Mail, MapPin, Code2, Server, Database,
  Cloud, Cpu, Layers, GraduationCap, Award, Star,
  CheckCircle, Globe, ChevronRight, Send, Zap, Terminal,
  GitBranch, Shield, BarChart3,
} from "lucide-react";
import { fetchPortfolioContent, submitContactMessage, type PortfolioView, type ApiProfile } from "./portfolio/api";
import AdminDashboard from "./admin/AdminDashboard";

// ─── global scroll helper ─────────────────────────────────────────────────────
const go = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ─── icon map ─────────────────────────────────────────────────────────────────
const CAT_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Tools: Cloud,
  DevOps: Cloud,
  "AI & Automation": Cpu,
  "UI/UX": Layers,
};

// ─── helpers ──────────────────────────────────────────────────────────────────
const FF_DISPLAY = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const FF_BODY = { fontFamily: "'Inter', sans-serif" };
const FF_MONO = { fontFamily: "'JetBrains Mono', monospace" };

function Eyebrow({ text }: { text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm backdrop-blur-sm"
      style={FF_MONO}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
      {text}
    </div>
  );
}

function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-panel rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

const LIGHT_SECTION = "bg-gradient-to-b from-[#f7f9ff] via-[#eef2ff] to-[#f7f9ff]";
const LIGHT_SECTION_ALT = "bg-gradient-to-b from-[#f1f5ff] via-[#e9efff] to-[#f7f9ff]";
const DARK_SECTION = "bg-gradient-to-b from-background via-[#050819] to-background";
const DARK_SECTION_ALT = "bg-gradient-to-b from-background via-[#050819] to-background";

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav({ dark, setDark, profile }: { dark: boolean; setDark: (v: boolean) => void; profile?: ApiProfile | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navGo = (id: string) => { go(id); setOpen(false); };

  const links = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Case Studies", id: "casestudy" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#03050c]/88 backdrop-blur-2xl border-b border-white/[0.06] shadow-xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1260px] mx-auto px-6 h-[62px] flex items-center justify-between gap-8">
        {/* Logo */}
        <button onClick={() => navGo("home")} className="shrink-0 text-[15px] font-bold" style={FF_DISPLAY}>
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            {profile?.fullName || "Ye Myat Min"}
          </span>
        </button>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {links.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => navGo(id)}
              className="px-3 py-1.5 text-[13.5px] text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/[0.05] transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            onClick={() => setDark(!dark)}
            className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-muted-foreground border border-white/[0.1] rounded-xl hover:bg-white/[0.05] hover:text-foreground transition-all"
          >
            <Download size={13} />
            Resume
          </a>
          <button
            onClick={() => navGo("contact")}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25"
          >
            Hire Me
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-muted-foreground">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#03050c]/97 backdrop-blur-2xl border-b border-white/[0.07] px-6 py-5">
          <div className="flex flex-col gap-2">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => navGo(id)}
                className="text-left py-2 text-[14px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.07] mt-1">
              <button onClick={() => setDark(!dark)} className="p-2 text-muted-foreground">
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={() => navGo("contact")}
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl"
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero (asymmetric split) ──────────────────────────────────────────────────
function Hero({ profile }: { profile?: ApiProfile | null }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background textures */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Blobs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-indigo-600/[0.09] rounded-full blur-[130px] -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-violet-600/[0.09] rounded-full blur-[120px] translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-cyan-600/[0.05] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-[1260px] mx-auto px-6 pt-24 pb-16">
        <div className="grid gap-16 items-center">

          {/* ─ Left column ─ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-full text-emerald-400 text-[13px] font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {profile?.availability || "Open to new opportunities"}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <p className="text-muted-foreground text-base mb-2 font-medium" style={FF_DISPLAY}>
                Hi, I&apos;m
              </p>
              <h1
                className="font-extrabold leading-[1.05] mb-5 tracking-tight"
                style={{ ...FF_DISPLAY, fontSize: "clamp(3rem, 7vw, 5.25rem)" }}
              >
                <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  {profile?.fullName || "Ye Myat Min"}
                </span>
              </h1>
              <p
                className="text-xl md:text-2xl font-semibold text-foreground/75 mb-6"
                style={FF_DISPLAY}
              >
                {profile?.headline || "Full-Stack Software Engineer"}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-[15px] text-muted-foreground leading-[1.75] max-w-lg mb-9 whitespace-pre-line"
              style={FF_BODY}
            >
              {profile?.intro || "I’m a developer with a Computer Science and software development background, focused on building practical full-stack web applications and learning through hands-on implementation."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() => go("projects")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white rounded-2xl font-semibold hover:opacity-90 transition-all shadow-2xl shadow-indigo-500/30 text-[15px]"
                style={FF_DISPLAY}
              >
                View Projects
                <ArrowRight size={17} />
              </button>
              <button
                onClick={() => go("contact")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.05] border border-white/[0.12] text-foreground/85 rounded-2xl font-semibold hover:bg-white/[0.09] transition-all text-[15px]"
                style={FF_DISPLAY}
              >
                Contact Me
                <ChevronRight size={17} />
              </button>
            </motion.div>

            {/* Stats chips */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38 }}
              className="flex flex-wrap gap-2"
            >
              {[
                { icon: <Zap size={13} />, v: "Full-Stack", l: "Focus" },
                { icon: <BarChart3 size={13} />, v: "Practical builds", l: "Approach" },
                { icon: <Globe size={13} />, v: "React / Node", l: "Stack" },
                { icon: <Shield size={13} />, v: "Open to roles", l: "Goal" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/[0.04] border border-white/[0.07] rounded-xl text-[13px] text-muted-foreground"
                  style={FF_BODY}
                >
                  <span className="text-indigo-400">{s.icon}</span>
                  <span className="text-foreground font-semibold">{s.v}</span>
                  <span>{s.l}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40">
        <span className="text-[10px] tracking-[0.2em] uppercase" style={FF_MONO}>scroll</span>
        <motion.div
          className="w-px h-7 bg-gradient-to-b from-muted-foreground/40 to-transparent"
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About({ profile }: { profile?: ApiProfile | null }) {
  const stats = [
    { value: "Early-career", label: "Developer stage", icon: <Zap size={16} /> },
    { value: "Full-stack", label: "Focus area", icon: <GitBranch size={16} /> },
    { value: "Practical", label: "Build style", icon: <Terminal size={16} /> },
    { value: "Learning", label: "Mindset", icon: <Star size={16} /> },
  ];

  return (
    <section id="about" className="py-28 md:py-36 bg-background relative">
      <div className="max-w-[1260px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1fr_1.35fr] gap-16 items-center mb-20"
        >
          {/* Card / Image stand-in */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950/60 via-violet-950/40 to-background border border-indigo-500/20 p-8 shadow-2xl shadow-indigo-500/10">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-white/[0.08] flex items-center justify-center p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-indigo-500/30"
                    style={FF_DISPLAY}
                  >
                    {profile?.fullName ? profile.fullName.split(" ").map((n) => n[0]).join("") : "YM"}
                  </div>
                  <span className="text-white/40 text-xs" style={FF_MONO}>{profile?.email || "yemyatmin192@gmail.com"}</span>
                </div>
              </div>
              {/* Accent corners */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <Code2 size={20} className="text-cyan-400" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-14 h-14 bg-violet-500/10 border border-violet-500/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
                <Cpu size={18} className="text-violet-400" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <Eyebrow text="About Me" />
            <h2
              className="text-4xl md:text-[3.2rem] font-extrabold text-foreground mb-6 leading-[1.1] tracking-tight"
              style={FF_DISPLAY}
            >
              Building practical software with a strong foundation in
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                full-stack development
              </span>
            </h2>
            <p className="text-[15px] text-muted-foreground leading-[1.8] mb-4 whitespace-pre-line" style={FF_BODY}>
              {profile?.about || "I’m a developer with a Computer Science and software development background, focused on building full-stack web applications and learning through hands-on implementation."}
            </p>
            

            <div className="flex flex-wrap gap-2 mb-8">
              {["Full-Stack Development", "React & Node.js", "TypeScript", "PostgreSQL & Prisma", "REST APIs & Authentication"].map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 text-[13px] font-medium text-indigo-300 bg-indigo-500/[0.07] border border-indigo-500/20 rounded-lg"
                  style={FF_BODY}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => go("contact")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all text-sm shadow-lg shadow-indigo-500/25"
                style={FF_DISPLAY}
              >
                Get in Touch
                <Send size={14} />
              </button>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.1] text-muted-foreground rounded-xl font-semibold hover:bg-white/[0.05] hover:text-foreground transition-all text-sm"
                style={FF_DISPLAY}
              >
                <Download size={14} />
                Resume
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s) => (
            <Glass key={s.label} className="p-6 group hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-2 mb-2 text-indigo-400/70 group-hover:text-indigo-400 transition-colors">
                {s.icon}
              </div>
              <div
                className="text-4xl font-extrabold mb-1 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
                style={FF_DISPLAY}
              >
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground" style={FF_BODY}>{s.label}</div>
            </Glass>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Skills (interactive tabs) ────────────────────────────────────────────────
function Skills({ dark, skills }: { dark: boolean; skills: PortfolioView["skills"] }) {
  const cats = Object.keys(skills);
  const [active, setActive] = useState(cats[0]);
  const sectionClass = dark ? DARK_SECTION_ALT : LIGHT_SECTION_ALT;

  useEffect(() => {
    if (cats.length > 0 && !cats.includes(active)) setActive(cats[0]);
  }, [active, cats]);

  return (
    <section id="skills" className={`py-28 md:py-36 ${sectionClass}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-10">
            <Eyebrow text="Technical Skills" />
            <h2
              className="text-4xl md:text-[3.2rem] font-extrabold text-foreground mb-4 tracking-tight"
              style={FF_DISPLAY}
            >
              What I Work With
            </h2>
            <p className="text-[15px] text-muted-foreground max-w-xl mx-auto" style={FF_BODY}>
              A curated set of tools chosen for performance, reliability, and developer ergonomics.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {cats.map((cat) => {
              const Icon = CAT_ICONS[cat];
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-white/[0.04] border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.08]"
                  }`}
                  style={FF_DISPLAY}
                >
                  {Icon && <Icon size={14} />}
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Chips grid — re-animates on tab change */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {(skills[active]?.chips ?? []).map((chip, i) => (
            <motion.div
              key={chip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              className={`flex items-center gap-3 px-4 py-3.5 bg-white/[0.03] border ${skills[active].border} rounded-xl hover:bg-white/[0.06] transition-all cursor-default`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${skills[active].dot}`} />
              <span className="text-sm text-foreground/80" style={FF_MONO}>{chip}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects({ dark, projects }: { dark: boolean; projects: PortfolioView["projects"] }) {
  const sectionClass = dark ? DARK_SECTION : "bg-[#f7f9ff]";

  return (
    <section id="projects" className={`py-28 md:py-36 ${sectionClass}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Eyebrow text="Featured Work" />
          <h2
            className="text-4xl md:text-[3.2rem] font-extrabold text-foreground mb-4 tracking-tight"
            style={FF_DISPLAY}
          >
            Projects That Ship
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-xl mx-auto" style={FF_BODY}>
            Four production systems spanning SaaS, data infrastructure, AI, and open-source DevOps.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <Glass className="overflow-hidden group hover:border-white/[0.12] transition-all duration-300">
                <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  {/* Image */}
                  <div className="lg:w-[52%] relative bg-[#080b1c]">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-64 lg:h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.accentFrom}/15 ${p.accentTo}/10`} />
                    {/* Metric badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold rounded-xl border ${p.badge}`} style={FF_MONO}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {p.metric}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-[48%] p-8 md:p-10 flex flex-col justify-center">
                    <div className="mb-1">
                      <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-widest" style={FF_BODY}>
                        {p.subtitle}
                      </span>
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 tracking-tight"
                      style={FF_DISPLAY}
                    >
                      {p.title}
                    </h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.75] mb-3 whitespace-pre-line" style={FF_BODY}>
                      {p.summary || p.desc}
                    </p>
                    {p.description && p.description !== p.summary && (
                      <p className="text-[13.5px] text-muted-foreground/80 leading-[1.65] mb-5 whitespace-pre-line" style={FF_BODY}>
                        {p.description}
                      </p>
                    )}

                    {p.features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-muted-foreground" style={FF_BODY}>
                            <CheckCircle size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[12px] text-muted-foreground bg-white/[0.04] border border-white/[0.07] rounded-lg"
                          style={FF_MONO}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {p.liveUrl ? (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl hover:opacity-90 transition-all shadow-md shadow-indigo-500/20"
                          style={FF_DISPLAY}
                        >
                          <Globe size={13} /> Live Demo
                        </a>
                      ) : null}

                      {p.repoUrl ? (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] text-muted-foreground border border-white/[0.1] rounded-xl hover:bg-white/[0.05] hover:text-foreground transition-all"
                          style={FF_DISPLAY}
                        >
                          <Github size={13} /> GitHub
                        </a>
                      ) : null}

                      <button onClick={() => go("casestudy")} className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] text-muted-foreground border border-white/[0.1] rounded-xl hover:bg-white/[0.05] hover:text-foreground transition-all" style={FF_DISPLAY}>
                        <ExternalLink size={13} /> Case Study
                      </button>
                    </div>
                  </div>
                </div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Case Study ───────────────────────────────────────────────────────────────
function CaseStudy({ dark, caseStudy }: { dark: boolean; caseStudy: PortfolioView["caseStudy"] }) {
  const sectionClass = dark ? DARK_SECTION_ALT : LIGHT_SECTION_ALT;

  return (
    <section id="casestudy" className={`py-28 md:py-36 ${sectionClass}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Eyebrow text="Case Study" />
          <h2
            className="text-4xl md:text-[3.2rem] font-extrabold text-foreground mb-4 tracking-tight"
            style={FF_DISPLAY}
          >
            [YOUR CASE STUDY TITLE]
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              [YOUR CASE STUDY HIGHLIGHT]
            </span>
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto" style={FF_BODY}>
            Replace this case study copy with your real project story, results, and approach.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {caseStudy.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Glass className="p-6 h-full hover:bg-white/[0.05] transition-all">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-[11px] text-muted-foreground/40" style={FF_MONO}>{step.phase}</span>
                  <span className="px-2.5 py-0.5 text-[11px] font-bold text-indigo-300 bg-indigo-500/[0.08] border border-indigo-500/20 rounded-full uppercase tracking-wide">
                    {step.tag}
                  </span>
                </div>
                <h4 className="text-[15px] font-bold text-foreground mb-2" style={FF_DISPLAY}>{step.title}</h4>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed" style={FF_BODY}>{step.body}</p>
              </Glass>
            </motion.div>
          ))}
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <Glass className="p-8">
            <div className="flex items-center gap-2 mb-7">
              <Terminal size={14} className="text-muted-foreground/50" />
              <span className="text-[11px] font-mono text-muted-foreground/40 uppercase tracking-widest">System Architecture</span>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <div className="px-7 py-3 bg-cyan-500/[0.08] border border-cyan-500/20 rounded-xl text-[13px] text-cyan-400" style={FF_MONO}>
                Client Browser · CDN Edge (Cloudflare)
              </div>
              <div className="w-px h-4 bg-gradient-to-b from-cyan-500/40 to-indigo-500/40" />
              <div className="px-7 py-3 bg-indigo-500/[0.08] border border-indigo-500/20 rounded-xl text-[13px] text-indigo-400" style={FF_MONO}>
                API Gateway · AWS ALB · Rate Limiter
              </div>
              <div className="flex gap-8">
                {[0, 1, 2, 3].map((n) => (
                  <div key={n} className="w-px h-5 bg-gradient-to-b from-indigo-500/30 to-violet-500/30" />
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-2xl">
                {["Auth Service", "User Service", "Workflow Engine", "Notification Svc"].map((s) => (
                  <div key={s} className="px-3 py-2.5 bg-violet-500/[0.08] border border-violet-500/20 rounded-xl text-[12px] text-violet-400 text-center" style={FF_MONO}>{s}</div>
                ))}
              </div>
              <div className="flex gap-8">
                {[0, 1, 2, 3].map((n) => (
                  <div key={n} className="w-px h-5 bg-gradient-to-b from-violet-500/30 to-emerald-500/30" />
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-2xl">
                {["PostgreSQL", "Redis Cache", "Kafka Events", "S3 Storage"].map((s) => (
                  <div key={s} className="px-3 py-2.5 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl text-[12px] text-emerald-400 text-center" style={FF_MONO}>{s}</div>
                ))}
              </div>
            </div>
          </Glass>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience({ dark, experience }: { dark: boolean; experience: PortfolioView["experience"] }) {
  const sectionClass = dark ? DARK_SECTION : "bg-[#f7f9ff]";

  return (
    <section id="experience" className={`py-28 md:py-36 ${sectionClass}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Eyebrow text="Experience" />
          <h2
            className="text-4xl md:text-[3.2rem] font-extrabold text-foreground tracking-tight"
            style={FF_DISPLAY}
          >
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-indigo-500/35 via-violet-500/25 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="flex gap-7"
              >
                {/* Logo dot */}
                <div className="hidden md:flex flex-col items-center shrink-0 pt-1">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black shadow-lg ${exp.logoClass}`}
                    style={FF_DISPLAY}
                  >
                    {exp.logo}
                  </div>
                </div>

                {/* Card */}
                <Glass className="flex-1 p-7 hover:bg-white/[0.05] transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3
                        className="text-[19px] font-extrabold text-foreground mb-1"
                        style={FF_DISPLAY}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-3 text-[13.5px] text-muted-foreground" style={FF_BODY}>
                        <span className={`font-semibold ${exp.accentColor}`}>{exp.company}</span>
                        <span className="text-white/20">·</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={11} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <span
                      className="inline-flex items-center px-3 py-1.5 text-[12px] text-muted-foreground border border-white/[0.08] rounded-xl bg-white/[0.03] shrink-0"
                      style={FF_MONO}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-[14px] text-muted-foreground leading-[1.75] mb-5 whitespace-pre-line" style={FF_BODY}>{exp.desc}</p>

                  <ul className="space-y-2.5 mb-5">
                    {exp.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-muted-foreground" style={FF_BODY}>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 mt-[7px] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[12px] text-muted-foreground bg-white/[0.04] border border-white/[0.07] rounded-lg"
                        style={FF_MONO}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
function Education({ dark, education, certs }: { dark: boolean; education: PortfolioView["education"]; certs: PortfolioView["certs"] }) {
  const sectionClass = dark ? DARK_SECTION_ALT : LIGHT_SECTION_ALT;
  const primaryEducation = education[0];

  return (
    <section id="education" className={`py-28 md:py-36 ${sectionClass}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Eyebrow text="Credentials" />
          <h2
            className="text-4xl md:text-[3.2rem] font-extrabold text-foreground tracking-tight"
            style={FF_DISPLAY}
          >
            Education &amp; Certifications
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <Glass className="p-8 h-full hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <GraduationCap size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest" style={FF_BODY}>Education</p>
                  <p className="text-[14px] font-semibold text-foreground" style={FF_DISPLAY}>Academic Background</p>
                </div>
              </div>

              {primaryEducation ? (
                <>
                  <h3 className="text-[22px] font-extrabold text-foreground mb-1" style={FF_DISPLAY}>{primaryEducation.degree}</h3>
                  <p className="text-indigo-400 font-semibold text-[14px] mb-1" style={FF_DISPLAY}>{primaryEducation.university}</p>
                  <p className="text-[12px] text-muted-foreground mb-5" style={FF_MONO}>{primaryEducation.period}</p>

                  <p className="text-[14px] text-muted-foreground leading-[1.75] mb-5" style={FF_BODY}>
                    {primaryEducation.description}
                  </p>

                  {primaryEducation.focus.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {primaryEducation.focus.map((s) => (
                        <span key={s} className="px-2.5 py-1 text-[12px] text-blue-300 bg-blue-500/[0.07] border border-blue-500/20 rounded-lg" style={FF_MONO}>{s}</span>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-[22px] font-extrabold text-foreground mb-1" style={FF_DISPLAY}>[YOUR DEGREE]</h3>
                  <p className="text-indigo-400 font-semibold text-[14px] mb-1" style={FF_DISPLAY}>[YOUR UNIVERSITY]</p>
                  <p className="text-[12px] text-muted-foreground mb-5" style={FF_MONO}>[YOUR DATES]</p>

                  <p className="text-[14px] text-muted-foreground leading-[1.75] mb-5" style={FF_BODY}>
                    Replace this section with your actual academic background, focus areas, and achievements.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {["[YOUR FOCUS 1]", "[YOUR FOCUS 2]", "[YOUR FOCUS 3]"].map((s) => (
                      <span key={s} className="px-2.5 py-1 text-[12px] text-blue-300 bg-blue-500/[0.07] border border-blue-500/20 rounded-lg" style={FF_MONO}>{s}</span>
                    ))}
                  </div>
                </>
              )}
            </Glass>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <Glass className="p-8 h-full hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Award size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest" style={FF_BODY}>Certifications</p>
                  <p className="text-[14px] font-semibold text-foreground" style={FF_DISPLAY}>Professional Credentials</p>
                </div>
              </div>

              <div className="space-y-3">
                {certs.map((cert) => (
                  <div
                    key={cert.title}
                    className="flex items-center justify-between gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/[0.1] hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${cert.color}`}>
                        <Award size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-semibold text-foreground truncate" style={FF_DISPLAY}>{cert.title}</p>
                        <p className="text-[12px] text-muted-foreground" style={FF_BODY}>{cert.issuer}</p>
                      </div>
                    </div>
                    <span className="text-[12px] text-muted-foreground shrink-0" style={FF_MONO}>{cert.year}</span>
                  </div>
                ))}
              </div>
            </Glass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
function TechStack({ dark, techGrid }: { dark: boolean; techGrid: PortfolioView["techGrid"] }) {
  const sectionClass = dark ? DARK_SECTION : "bg-[#f7f9ff]";

  return (
    <section id="techstack" className={`py-28 md:py-36 ${sectionClass}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Eyebrow text="Tech Stack" />
          <h2
            className="text-4xl md:text-[3.2rem] font-extrabold text-foreground mb-4 tracking-tight"
            style={FF_DISPLAY}
          >
            Tools of the Trade
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-lg mx-auto" style={FF_BODY}>
            Every tool chosen for a specific reason — performance, reliability, and developer experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(techGrid).map(([cat, { color, dot, items }], i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Glass className="p-5 hover:bg-white/[0.05] transition-all h-full">
                <p className={`text-[11px] font-bold uppercase tracking-[0.15em] mb-4 ${color}`} style={FF_BODY}>
                  {cat}
                </p>
                <div className="space-y-2.5">
                  {items.map((t) => (
                    <div key={t} className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors cursor-default">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                      <span className="text-[13px]" style={FF_MONO}>{t}</span>
                    </div>
                  ))}
                </div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ dark, profile }: { dark: boolean; profile?: ApiProfile | null }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const upd = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContactMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full px-4 py-3 text-[14px] bg-white/[0.04] border border-white/[0.09] rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/15 transition-all";

  const emailVal = profile?.email || "yemyatmin192@gmail.com";
  const linkedinVal = profile?.linkedinUrl || "https://www.linkedin.com/in/ye-myat-min-5904b91ba";
  const githubVal = profile?.githubUrl || "https://github.com/Zeke-lab";
  const locationVal = profile?.location || "Chiang Rai, Thailand";

  const contactItems = [
    { icon: <Mail size={17} />, label: "Email", value: emailVal, href: `mailto:${emailVal}` },
    { icon: <Linkedin size={17} />, label: "LinkedIn", value: linkedinVal, href: linkedinVal },
    { icon: <Github size={17} />, label: "GitHub", value: githubVal, href: githubVal },
    { icon: <MapPin size={17} />, label: "Location", value: locationVal, href: null },
  ];

  return (
    <section id="contact" className={`py-28 md:py-36 ${dark ? DARK_SECTION : "bg-[#f7f9ff]"}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Eyebrow text="Contact" />
          <h2
            className="text-4xl md:text-[3.2rem] font-extrabold text-foreground mb-4 tracking-tight"
            style={FF_DISPLAY}
          >
            Let&apos;s Work Together
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-lg mx-auto" style={FF_BODY}>
            Open to full-time roles, contract engagements, and technically interesting challenges.
            I typically respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[2fr_3fr] gap-7">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <Glass className="p-8 h-full flex flex-col">
              <h3 className="text-[20px] font-extrabold text-foreground mb-2" style={FF_DISPLAY}>
                Contact Information
              </h3>
              <p className="text-[14px] text-muted-foreground mb-8 leading-[1.75]" style={FF_BODY}>
                Prefer email for initial outreach. Happy to jump on a call to discuss your project
                or opportunity.
              </p>

              <div className="space-y-4 mb-8 flex-1">
                {contactItems.map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground mb-0.5 uppercase tracking-wider" style={FF_BODY}>{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-[13.5px] text-foreground hover:text-indigo-400 transition-colors font-medium" style={FF_BODY}>
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-[13.5px] text-foreground font-medium" style={FF_BODY}>{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability card */}
              <div className="p-4 bg-emerald-500/[0.06] border border-emerald-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[13px] font-semibold text-emerald-400" style={FF_DISPLAY}>
                    Available for Work
                  </span>
                </div>
                <p className="text-[12.5px] text-muted-foreground" style={FF_BODY}>
                  Open to opportunities and interesting projects.
                </p>
              </div>
            </Glass>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <Glass className="p-8">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle size={28} className="text-emerald-400" />
                  </div>
                  <h3 className="text-[20px] font-extrabold text-foreground mb-2" style={FF_DISPLAY}>Message Sent!</h3>
                  <p className="text-[14px] text-muted-foreground" style={FF_BODY}>
                    Thanks for reaching out. I&apos;ll respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-5 py-2.5 text-[13px] text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-500/[0.07] transition-all"
                    style={FF_DISPLAY}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  {status === "error" && (
                    <p role="alert" className="text-sm text-red-400">Unable to send your message. Please try again.</p>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide" style={FF_BODY}>
                        Full Name
                      </label>
                      <input
                        id="name" type="text" required placeholder="[YOUR NAME]"
                        value={form.name} onChange={upd("name")}
                        className={inputCls} style={FF_BODY}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide" style={FF_BODY}>
                        Email
                      </label>
                      <input
                        id="email" type="email" required placeholder="yemyatmin192@gmail.com"
                        value={form.email} onChange={upd("email")}
                        className={inputCls} style={FF_BODY}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide" style={FF_BODY}>
                      Topic
                    </label>
                    <select
                      id="subject" value={form.subject} onChange={upd("subject")} required
                      className={`${inputCls} cursor-pointer`} style={FF_BODY}
                    >
                      <option value="">Select a topic…</option>
                      <option value="fulltime">Full-time opportunity</option>
                      <option value="contract">Contract / freelance project</option>
                      <option value="consulting">Technical consulting</option>
                      <option value="collab">Open-source collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide" style={FF_BODY}>
                      Message
                    </label>
                    <textarea
                      id="message" required rows={5}
                      placeholder="Tell me about your project, role, or what you have in mind…"
                      value={form.message} onChange={upd("message")}
                      className={`${inputCls} resize-none`} style={FF_BODY}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-60 transition-all shadow-xl shadow-indigo-500/25 text-[15px]"
                    style={FF_DISPLAY}
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </Glass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const links = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];
  const socials = [
    { icon: <Github size={17} />, href: "#", label: "GitHub" },
    { icon: <Linkedin size={17} />, href: "#", label: "LinkedIn" },
    { icon: <Mail size={17} />, href: "mailto:yemyatmin192@gmail.com", label: "Email" },
    { icon: <Globe size={17} />, href: "#", label: "Website" },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            onClick={() => go("home")}
            className="text-[15px] font-bold"
            style={FF_DISPLAY}
          >
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">[YOUR NAME]</span>
          </button>

          <nav className="flex flex-wrap justify-center gap-0.5">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/[0.04] transition-all"
                style={FF_BODY}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="p-2.5 text-muted-foreground hover:text-foreground rounded-xl hover:bg-white/[0.05] transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-muted-foreground/45">
          <p style={FF_BODY}>© 2026 [YOUR NAME]. All rights reserved.</p>
          <p style={FF_MONO}>React · TypeScript · Tailwind CSS · Vite</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [portfolio, setPortfolio] = useState<PortfolioView | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.scrollBehavior = "smooth";
  }, [dark]);

  useEffect(() => {
    fetchPortfolioContent().then(setPortfolio).catch((error: unknown) => {
      setLoadError(error instanceof Error ? error.message : "Unable to load portfolio content.");
    });
  }, []);

  const currentPath = window.location.pathname;
  const isAdminRoute = currentPath === "/admin" || currentPath.startsWith("/admin/") || new URLSearchParams(window.location.search).get("admin") === "1";

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  if (loadError) return <main className="min-h-screen grid place-items-center bg-background text-foreground px-6"><p>{loadError} Start the backend and try again.</p></main>;
  // if (!portfolio) return <main className="min-h-screen grid place-items-center bg-background text-foreground"><p>Loading portfolio…</p></main>;

  if (!portfolio) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute left-[-12%] top-[-8%] h-[26rem] w-[26rem] rounded-full bg-indigo-500/20 blur-[120px]" />
          <div className="absolute right-[-8%] top-[18%] h-[20rem] w-[20rem] rounded-full bg-violet-500/20 blur-[110px]" />
          <div className="absolute bottom-[-12%] left-[22%] h-[22rem] w-[22rem] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-xl bg-gradient-to-br from-indigo-500/60 to-violet-500/60 shadow-lg shadow-indigo-500/20" />
              <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
            </div>
            <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
          </div>

          <div className="mb-10 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">Loading</span>
          </div>

          <div className="mb-10 space-y-5">
            <div className="h-4 w-36 animate-pulse rounded-full bg-emerald-500/20" />
            <div className="h-16 w-3/4 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-7 w-1/2 animate-pulse rounded-xl bg-white/10" />
            <div className="h-6 w-2/5 animate-pulse rounded-full bg-white/10" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
              <div className="h-52 w-full animate-pulse rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              <div className="h-5 w-2/3 animate-pulse rounded-full bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
              <div className="h-4 w-4/5 animate-pulse rounded-full bg-white/10" />
              <div className="flex gap-2 pt-2">
                <div className="h-8 w-20 animate-pulse rounded-full bg-indigo-500/20" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-violet-500/20" />
              </div>
            </div>

            <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 animate-pulse rounded-full bg-white/10" />
                <div className="space-y-2">
                  <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
                  <div className="h-3 w-20 animate-pulse rounded-full bg-white/10" />
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-4/6 animate-pulse rounded-full bg-white/10" />
              </div>
              <div className="grid gap-2 pt-2 sm:grid-cols-2">
                <div className="h-14 animate-pulse rounded-2xl bg-white/10" />
                <div className="h-14 animate-pulse rounded-2xl bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased" style={FF_BODY}>
      <Nav dark={dark} setDark={setDark} profile={portfolio.profile} />
      <Hero profile={portfolio.profile} />
      <About profile={portfolio.profile} />
      <Skills dark={dark} skills={portfolio.skills} />
      <Projects dark={dark} projects={portfolio.projects} />
      <CaseStudy dark={dark} caseStudy={portfolio.caseStudy} />
      <Experience dark={dark} experience={portfolio.experience} />
      <Education dark={dark} education={portfolio.education} certs={portfolio.certs} />
      <TechStack dark={dark} techGrid={portfolio.techGrid} />
      <Contact dark={dark} profile={portfolio.profile} />
      <Footer />
    </div>
  );
}
