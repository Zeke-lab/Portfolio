import type { ComponentType } from "react";
import {
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  Server,
  Shield,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";

export type SkillIconComponent = ComponentType<{ size?: number; className?: string }>;

export const SKILL_ICON_OPTIONS: Array<{ key: string; label: string; icon: SkillIconComponent }> = [
  { key: "code", label: "Code", icon: Code2 },
  { key: "server", label: "Server", icon: Server },
  { key: "database", label: "Database", icon: Database },
  { key: "cloud", label: "Cloud", icon: Cloud },
  { key: "cpu", label: "CPU / AI", icon: Cpu },
  { key: "layers", label: "Layers / UI", icon: Layers },
  { key: "terminal", label: "Terminal", icon: Terminal },
  { key: "git-branch", label: "Git branch", icon: GitBranch },
  { key: "shield", label: "Security", icon: Shield },
  { key: "globe", label: "Web / Globe", icon: Globe },
  { key: "wrench", label: "Tools", icon: Wrench },
  { key: "zap", label: "Automation", icon: Zap },
];

export const SKILL_ICONS: Record<string, SkillIconComponent> = Object.fromEntries(
  SKILL_ICON_OPTIONS.map(({ key, icon }) => [key, icon]),
);

const TECHNOLOGY_ICONS: Record<string, string> = {
  "aws": "logos:aws",
  "docker": "logos:docker-icon",
  "github actions": "logos:github-actions",
  "google": "logos:google-icon",
  "javascript": "logos:javascript",
  "kubernetes": "logos:kubernetes",
  "mongodb": "logos:mongodb-icon",
  "next.js": "logos:nextjs-icon",
  "node.js": "logos:nodejs-icon",
  "openai": "simple-icons:openai",
  "postgresql": "logos:postgresql",
  "prisma": "simple-icons:prisma",
  "react": "logos:react",
  "redis": "logos:redis",
  "rest api": "carbon:api-1",
  "rest apis": "carbon:api-1",
  "supabase": "logos:supabase-icon",
  "tailwind css": "logos:tailwindcss-icon",
  "typescript": "logos:typescript-icon",
  "zustand": "simple-icons:zustand",
};

export function getSkillIconIdentifier(icon?: string | null, name?: string | null) {
  if (icon?.includes(":")) return icon;
  return name ? TECHNOLOGY_ICONS[name.trim().toLowerCase()] ?? icon : icon;
}

export function getSkillIcon(key?: string | null) {
  return (key && SKILL_ICONS[key]) || Code2;
}