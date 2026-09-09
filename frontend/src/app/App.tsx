import React, { useState, useEffect } from "react";
import { Icon as IconifyIcon } from "@iconify/react";
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
import { getSkillIcon, getSkillIconIdentifier } from "./skillIcons";
import { downloadResumePdf } from "./resumePdf";

// ─── global scroll helper ─────────────────────────────────────────────────────
const go = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;

  const headerOffset = 78;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
};

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
function Nav({ dark, setDark, profile, onNavigateHome, onDownloadResume }: { dark: boolean; setDark: (v: boolean) => void; profile?: ApiProfile | null; onNavigateHome?: (id: string) => void; onDownloadResume?: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navGo = (id: string) => {
    if (window.location.pathname.startsWith("/case-study/") && onNavigateHome) {
      onNavigateHome(id);
    } else {
      go(id);
    }
    setOpen(false);
  };

  const links = [
    { label: "About", id: "about" },
    { label: "Skills", id: "techstack" },
    { label: "Projects", id: "projects" },
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
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 h-[62px] flex items-center justify-between gap-4 sm:gap-8">
        {/* Logo */}
        <button onClick={() => navGo("home")} className="min-w-0 max-w-[calc(100vw-76px)] shrink truncate text-left text-[15px] font-bold" style={FF_DISPLAY}>
          <span className="block truncate bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
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
          <button
            onClick={onDownloadResume}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-muted-foreground border border-white/[0.1] rounded-xl hover:bg-white/[0.05] hover:text-foreground transition-all"
          >
            <Download size={13} />
            Resume
          </button>
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
        <div className="lg:hidden bg-[#03050c]/97 backdrop-blur-2xl border-b border-white/[0.07] px-4 sm:px-6 py-5">
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
              <button onClick={onDownloadResume} className="px-4 py-2 text-sm font-semibold text-muted-foreground border border-white/[0.1] rounded-xl">
                Resume
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

      <div className="relative z-10 w-full max-w-[1260px] mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="grid gap-10 md:gap-16 items-center">

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
                style={{ ...FF_DISPLAY, fontSize: "clamp(2.8rem, 7vw, 5.25rem)" }}
              >
                <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  {profile?.fullName || "Ye Myat Min"}
                </span>
              </h1>
              <p
                className="mb-6 text-lg font-semibold leading-snug text-foreground/75 sm:text-xl md:text-2xl"
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
function About({ profile, onDownloadResume }: { profile?: ApiProfile | null; onDownloadResume?: () => void }) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const stats = [
    { value: "Early-career", label: "Developer stage", icon: <Zap size={16} /> },
    { value: "Full-stack", label: "Focus area", icon: <GitBranch size={16} /> },
    { value: "Practical", label: "Build style", icon: <Terminal size={16} /> },
    { value: "Learning", label: "Mindset", icon: <Star size={16} /> },
  ];

  return (
    <section id="about" className="py-28 md:py-36 bg-background relative">
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-16 items-center mb-16 md:mb-20"
        >
          {/* Profile portrait */}
          <div className="relative">
            <div className="absolute -inset-3 border border-cyan-400/20 -rotate-2" aria-hidden="true" />
            <div className="relative aspect-[4/5] min-h-[360px] overflow-hidden bg-slate-900 border border-white/10">
              {profile?.avatarUrl && !avatarFailed ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName ? `${profile.fullName} portrait` : "Profile portrait"}
                  className="h-full w-full object-cover"
                  onError={() => setAvatarFailed(true)}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-slate-900 text-8xl font-extrabold text-cyan-300" style={FF_DISPLAY}>
                  {profile?.fullName ? profile.fullName.split(" ").map((name) => name[0]).join("") : "YM"}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-24">
                <div className="flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-sm font-semibold" style={FF_DISPLAY}>{profile?.fullName || "Ye Myat Min"}</p>
                    <p className="mt-1 text-xs text-white/65" style={FF_MONO}>{profile?.location || "Chiang Rai, Thailand"}</p>
                  </div>
                  <MapPin size={17} className="text-cyan-300 shrink-0" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <Eyebrow text="About Me" />
            <h2
              className="mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[3.2rem]"
              style={FF_DISPLAY}
            >
              Building practical software with a strong foundation in
              <br className="hidden sm:block" />
              {" "}
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

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => go("contact")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all text-sm shadow-lg shadow-indigo-500/25"
                style={FF_DISPLAY}
              >
                Get in Touch
                <Send size={14} />
              </button>
              <button
                onClick={onDownloadResume}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.1] text-muted-foreground rounded-xl font-semibold hover:bg-white/[0.05] hover:text-foreground transition-all text-sm"
                style={FF_DISPLAY}
              >
                <Download size={14} />
                Resume
              </button>
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
            <Glass key={s.label} className="p-3 sm:p-6 group hover:bg-white/[0.05] transition-all min-w-0">
              <div className="flex items-center gap-2 mb-2 text-indigo-400/70 group-hover:text-indigo-400 transition-colors">
                {s.icon}
              </div>
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent break-words leading-tight"
                style={FF_DISPLAY}
              >
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground break-words" style={FF_BODY}>{s.label}</div>
            </Glass>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects({
  dark,
  projects,
  onViewCaseStudy,
}: {
  dark: boolean;
  projects: PortfolioView["projects"];
  onViewCaseStudy: (index: number) => void;
}) {
  const sectionClass = dark ? DARK_SECTION : "bg-[#f7f9ff]";

  return (
    <section id="projects" className={`py-28 md:py-36 ${sectionClass}`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Eyebrow text="Featured Work" />
          <h2
            className="text-3xl sm:text-4xl md:text-[3.2rem] font-extrabold text-foreground mb-4 tracking-tight"
            style={FF_DISPLAY}
          >
            Shipped Code
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-xl mx-auto" style={FF_BODY}>
            A simple, clean project list with a clear story behind each build.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.04, scale: { type: "spring", stiffness: 260, damping: 24 } }}
              className="h-full"
            >
              <Glass className="group relative overflow-hidden h-full transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/[0.16] hover:bg-white/[0.035] hover:shadow-2xl hover:shadow-indigo-950/30">
                <div className="relative overflow-hidden">
                  <img src={p.img} alt={p.title} className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=560&fit=crop&auto=format"; }} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.accentFrom}/10 ${p.accentTo}/15`} />
                </div>

                <div className="p-5">
                  <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground" style={FF_BODY}>
                    {p.subtitle}
                  </div>

                  <h3 className="text-[22px] font-extrabold text-foreground mb-3" style={FF_DISPLAY}>
                    {p.title}
                  </h3>

                  <p className="text-[14px] leading-[1.75] text-muted-foreground mb-4" style={FF_BODY}>
                    {p.summary || p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[11px] text-muted-foreground bg-white/[0.04] border border-white/[0.07] rounded-lg"
                        style={FF_MONO}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onViewCaseStudy(i)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20"
                    style={FF_DISPLAY}
                  >
                    <ExternalLink size={13} />
                    View Case Study
                  </button>
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
function CaseStudy({
  dark,
  project,
  onBack,
}: {
  dark: boolean;
  project: PortfolioView["projects"][number] | null;
  onBack?: () => void;
}) {
  const sectionClass = dark ? DARK_SECTION_ALT : LIGHT_SECTION_ALT;

  if (!project) {
    return null;
  }

  const gallery = project.gallery.length > 0 ? project.gallery : [{ imageUrl: project.img, caption: null }];
  const detailCards = project.caseStudy.filter((step) => step.tag !== "Problem");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = gallery[selectedImageIndex] ?? gallery[0];
  const context = project.caseStudy.find((step) => step.tag === "Problem")?.body || project.description || "This project was built to solve a real product need, improve workflow, and deliver a cleaner experience for end users.";

  return (
    <section className={`min-h-screen py-28 md:py-36 ${sectionClass}`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {onBack ? (
          <button onClick={onBack} className="mb-10 inline-flex items-center gap-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors" style={FF_DISPLAY}>
            <ArrowRight size={14} className="rotate-180" />
            Back to Projects
          </button>
        ) : null}

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Eyebrow text="Case Study" />
                <h2 className="mb-5 break-words text-3xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-[4.2rem] md:leading-[1.02]" style={FF_DISPLAY}>
                  {project.title}
                </h2>
                <p className="mb-8 max-w-xl text-[15px] font-semibold leading-[1.7] text-foreground" style={FF_BODY}>
                  {project.summary || project.desc}
                </p>

                <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-indigo-300" style={FF_BODY}>The Context</p>
                <p className="max-w-xl text-[15px] leading-[1.85] text-muted-foreground" style={FF_BODY}>
                  {context}
                </p>
                <div className="mt-8 border-l-2 border-indigo-500 pl-5 text-[13px] italic leading-[1.8] text-muted-foreground" style={FF_BODY}>
                  “{project.metric || "A focused build designed around a clear user need."}”
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex min-h-[180px] items-center justify-center sm:min-h-[260px]">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.caption || `${project.title} featured screenshot`}
                    className="block h-auto max-h-[560px] max-w-full rounded-[12px] object-contain"
                    onError={(event) => { event.currentTarget.src = project.img; }}
                  />
                </div>
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {gallery.map((image, index) => (
                    <button
                      key={`${image.imageUrl}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 bg-white/[0.04] p-1 transition-all ${index === selectedImageIndex ? "border-indigo-400 opacity-100" : "border-white/[0.08] opacity-65 hover:opacity-100"}`}
                      aria-label={`Show ${project.title} screenshot ${index + 1}`}
                    >
                      <img src={image.imageUrl} alt="" className="max-h-full max-w-full object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                    </button>
                  ))}
                </div>
                <div className="mt-7">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-indigo-300" style={FF_BODY}>Technology Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => <span key={t} className="tech-stack-tag rounded-lg px-2.5 py-1 text-[11px]" style={FF_MONO}>{t}</span>)}
                  </div>
                </div>
              </motion.div>
            </div>

        <div className="mt-16">
          <div className="mb-5 flex items-center gap-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-indigo-300" style={FF_BODY}>Project Story</p>
            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {detailCards.map((step, i) => (
            <motion.div
              key={`${step.tag}-${i}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Glass className="p-6 h-full hover:bg-white/[0.04] transition-all">
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

        {project.features.length > 0 && <div className="mb-10">
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-indigo-300" style={FF_BODY}>Core Features</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {project.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-[14px] text-muted-foreground" style={FF_BODY}>
                <CheckCircle size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>}

        </div>

        <div className="flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-[13px] font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl hover:opacity-90 transition-all"
              style={FF_DISPLAY}
            >
              <Globe size={14} /> Explore Live
            </a>
          ) : null}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-[13px] text-muted-foreground border border-white/[0.1] rounded-xl hover:bg-white/[0.05] hover:text-foreground transition-all"
              style={FF_DISPLAY}
            >
              <Github size={14} /> GitHub
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience({ dark, experience }: { dark: boolean; experience: PortfolioView["experience"] }) {
  const sectionClass = dark ? DARK_SECTION : "bg-[#f7f9ff]";

  return (
    <section id="experience" className={`py-28 md:py-36 ${sectionClass}`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
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
            Trajectory
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
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
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
            Foundation & Credentials
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
            <Glass className="p-5 sm:p-8 h-full hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest" style={FF_BODY}>Education</p>
                  <p className="text-[14px] font-semibold text-foreground" style={FF_DISPLAY}>Academic Background</p>
                </div>
              </div>

              {primaryEducation ? (
                <>
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-foreground mb-1 break-words" style={FF_DISPLAY}>{primaryEducation.degree}</h3>
                  <p className="text-indigo-400 font-semibold text-[14px] mb-1 break-words" style={FF_DISPLAY}>{primaryEducation.university}</p>
                  <p className="text-[12px] text-muted-foreground mb-5 break-words" style={FF_MONO}>{primaryEducation.period}</p>

                  <p className="text-[14px] text-muted-foreground leading-[1.75] mb-5 break-words" style={FF_BODY}>
                    {primaryEducation.description}
                  </p>

                  {primaryEducation.focus.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {primaryEducation.focus.map((s) => (
                        <span key={s} className="px-2.5 py-1 text-[12px] text-blue-300 bg-blue-500/[0.07] border border-blue-500/20 rounded-lg break-words" style={FF_MONO}>{s}</span>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-foreground mb-1 break-words" style={FF_DISPLAY}>[YOUR DEGREE]</h3>
                  <p className="text-indigo-400 font-semibold text-[14px] mb-1 break-words" style={FF_DISPLAY}>[YOUR UNIVERSITY]</p>
                  <p className="text-[12px] text-muted-foreground mb-5 break-words" style={FF_MONO}>[YOUR DATES]</p>

                  <p className="text-[14px] text-muted-foreground leading-[1.75] mb-5 break-words" style={FF_BODY}>
                    Replace this section with your actual academic background, focus areas, and achievements.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {["[YOUR FOCUS 1]", "[YOUR FOCUS 2]", "[YOUR FOCUS 3]"].map((s) => (
                      <span key={s} className="px-2.5 py-1 text-[12px] text-blue-300 bg-blue-500/[0.07] border border-blue-500/20 rounded-lg break-words" style={FF_MONO}>{s}</span>
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
            <Glass className="p-5 sm:p-8 h-full hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Award size={20} className="text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest" style={FF_BODY}>Certifications</p>
                  <p className="text-[14px] font-semibold text-foreground" style={FF_DISPLAY}>Professional Credentials</p>
                </div>
              </div>

              <div className="space-y-3">
                {certs.length > 0 ? certs.map((cert) => (
                  <div
                    key={cert.title}
                    className="flex flex-col gap-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/[0.1] hover:bg-white/[0.04] transition-all sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${cert.color}`}>
                        <Award size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-semibold text-foreground break-words" style={FF_DISPLAY}>{cert.title}</p>
                        <p className="text-[12px] text-muted-foreground break-words" style={FF_BODY}>{cert.issuer}</p>
                      </div>
                    </div>
                    <span className="text-[12px] text-muted-foreground shrink-0" style={FF_MONO}>{cert.year}</span>
                  </div>
                )) : (
                  <div className="p-4 border border-dashed border-white/10 rounded-xl text-sm text-muted-foreground" style={FF_BODY}>
                    No certifications added yet.
                  </div>
                )}
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
  const sectionClass = dark ? DARK_SECTION : "bg-[#020817]";
  const entries = Object.entries(techGrid);

  return (
    <section id="techstack" className={`py-28 md:py-36 ${sectionClass}`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className=" text-center mb-10"
        >
          <Eyebrow text="Technical Skills" />
          <h2
            className="text-3xl sm:text-4xl md:text-[3.2rem] font-extrabold text-foreground mb-4 tracking-tight"
            style={FF_DISPLAY}
          >
            Skillset
          </h2>
        </motion.div>

        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {entries.map(([cat, { color, dot, items }]) => (
            <div key={cat} className="min-w-0">
              <p className={`mb-4 text-[12px] font-bold uppercase tracking-[0.18em] ${color}`} style={FF_BODY}>
                {cat}
              </p>

              <ul className="space-y-3.5">
                {items.map((item) => {
                  const iconName = getSkillIconIdentifier(item.icon, item.name);
                  const Icon = getSkillIcon(iconName);
                  return (
                  <li
                    key={item.name}
                    className={`group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-[17px] ${dark ? "text-white/90" : "text-slate-900"} transition-all duration-200 hover:border-indigo-400/30 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] hover:backdrop-blur-sm md:text-[19px]`}
                    style={FF_DISPLAY}
                  >
                    {iconName?.includes(":") ? <IconifyIcon icon={iconName} width={28} height={28} color="#a5b4fc" aria-hidden="true" className="shrink-0" /> : <Icon size={28} className="shrink-0 text-white/60" />}
                    <span className="min-w-0 flex-1">{item.name}</span>
                  </li>
                  );
                })}
              </ul>
            </div>
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
    "w-full px-4 py-3 text-[14px] bg-white/[0.04] border border-white/20 rounded-xl text-foreground placeholder:text-muted-foreground/50 shadow-sm shadow-black/10 focus:outline-none focus:border-indigo-400/70 focus:ring-2 focus:ring-indigo-500/20 transition-all";

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
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
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
            <Glass className="p-5 sm:p-8">
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
                    <div >
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
function Footer({ profile }: { profile?: ApiProfile | null }) {
  const links = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "techstack" },
    { label: "Contact", id: "contact" },
  ];
  const socials = [
    { icon: <Github size={17} />, href: profile?.githubUrl ?? "#", label: "GitHub" },
    { icon: <Linkedin size={17} />, href: profile?.linkedinUrl ?? "#", label: "LinkedIn" },
    { icon: <Mail size={17} />, href: profile?.email ? `mailto:${profile.email}` : "#", label: "Email" },
    { icon: <Globe size={17} />, href: profile?.websiteUrl ?? "#", label: "Website" },
  ].filter((social) => social.href && social.href !== "#");

  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            onClick={() => go("home")}
            className="text-[15px] font-bold"
            style={FF_DISPLAY}
          >
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {profile?.fullName ? `[${profile.fullName.toUpperCase()}]` : "[YOUR NAME]"}
            </span>
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
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2.5 text-muted-foreground hover:text-foreground rounded-xl hover:bg-white/[0.05] transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-muted-foreground/45">
          <p style={FF_BODY}>© 2026 {profile?.fullName ?? "[YOUR NAME]"}. All rights reserved.</p>
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
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.scrollBehavior = "smooth";
  }, [dark]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    fetchPortfolioContent().then((content) => {
      setPortfolio(content);
      if (content.projects.length > 0) {
        setSelectedProjectIndex(0);
      }
    }).catch((error: unknown) => {
      setLoadError(error instanceof Error ? error.message : "Unable to load portfolio content.");
    });
  }, []);

  const caseStudyMatch = currentPath.match(/^\/case-study\/(\d+)\/?$/);
  const routeProjectIndex = caseStudyMatch ? Number(caseStudyMatch[1]) : selectedProjectIndex;
  const activeProject = portfolio?.projects[routeProjectIndex] ?? null;
  const isAdminRoute = currentPath === "/admin" || currentPath.startsWith("/admin/") || new URLSearchParams(window.location.search).get("admin") === "1";

  const navigateHome = (id = "home") => {
    window.history.pushState({}, "", "/");
    setCurrentPath("/");
    window.requestAnimationFrame(() => go(id));
  };

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  if (loadError) return <main className="min-h-screen grid place-items-center bg-background text-foreground px-6"><p>{loadError} Start the backend and try again.</p></main>;
  // if (!portfolio) return <main className="min-h-screen grid place-items-center bg-background text-foreground"><p>Loading portfolio…</p></main>;

  if (!portfolio) {
    return (
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-black px-6 text-slate-400">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,42,92,0.16),transparent_42%)]" />
        <div className="relative flex -translate-y-2 flex-col items-center">
          <motion.div
            className="relative h-48 w-48 sm:h-56 sm:w-56"
            animate={{ rotate: [0, 360], scale: [1, 1.04, 0.98, 1] }}
            transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <motion.div
              className="absolute inset-5 bg-[radial-gradient(circle_at_35%_25%,rgba(43,197,255,0.95),rgba(36,78,177,0.72)_42%,rgba(91,28,177,0.82)_75%,rgba(12,8,36,0.95))] shadow-[0_0_22px_rgba(33,145,255,0.7),0_0_70px_rgba(79,35,218,0.48)]"
              animate={{ borderRadius: ["44% 56% 62% 38% / 42% 38% 62% 58%", "62% 38% 44% 56% / 55% 62% 38% 45%", "38% 62% 55% 45% / 62% 45% 55% 38%", "44% 56% 62% 38% / 42% 38% 62% 58%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-11 rounded-full bg-black/35 blur-xl" />
          </motion.div>
          <motion.p
            className="mt-2 font-sans text-2xl font-semibold tracking-tight text-slate-500"
            animate={{ opacity: [0.45, 0.9, 0.45] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading<span className="inline-block w-8 text-left">...</span>
          </motion.p>
        </div>
      </main>
    );
  }

  if (caseStudyMatch) {
    return (
      <div className="min-h-screen overflow-x-clip bg-background text-foreground antialiased" style={FF_BODY}>
        <Nav dark={dark} setDark={setDark} profile={portfolio.profile} onNavigateHome={navigateHome} onDownloadResume={() => downloadResumePdf(portfolio)} />
        <CaseStudy dark={dark} project={activeProject} onBack={() => navigateHome("projects")} />
        <Footer profile={portfolio.profile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground antialiased" style={FF_BODY}>
      <Nav dark={dark} setDark={setDark} profile={portfolio.profile} onNavigateHome={navigateHome} onDownloadResume={() => downloadResumePdf(portfolio)} />
      <Hero profile={portfolio.profile} />
      <About profile={portfolio.profile} onDownloadResume={() => downloadResumePdf(portfolio)} />
      <TechStack dark={dark} techGrid={portfolio.techGrid} />
      <Projects
        dark={dark}
        projects={portfolio.projects}
        onViewCaseStudy={(index) => {
          setSelectedProjectIndex(index);
          window.history.pushState({}, "", `/case-study/${index}`);
          setCurrentPath(`/case-study/${index}`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      <Experience dark={dark} experience={portfolio.experience} />
      <Education dark={dark} education={portfolio.education} certs={portfolio.certs} />
      <Contact dark={dark} profile={portfolio.profile} />
      <Footer profile={portfolio.profile} />
    </div>
  );
}
