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

export function getSkillIcon(key?: string | null) {
  return (key && SKILL_ICONS[key]) || Code2;
}