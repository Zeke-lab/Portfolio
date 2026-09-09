import type { SkillContent, SkillDraft } from "../types";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Eye, EyeOff, Search, X } from "lucide-react";
import { getSkillIcon, getSkillIconIdentifier } from "../../skillIcons";
import { FEATURED_ICONS, searchIcons, type IconSearchResult } from "../api/iconApi";

type Props = {
  draftSkill: SkillDraft;
  editingSkillId: string | null;
  skills: SkillContent[];
  submitting: boolean;
  setDraftSkill: Dispatch<SetStateAction<SkillDraft>>;
  onSave: () => Promise<boolean>;
  onEdit: (skill: SkillContent) => void;
  onDelete: (skillId: string) => void;
  onToggleVisibility: (skill: SkillContent) => void;
  onCancelEdit: () => void;
  error: string | null;
};

function IconPreview({ name, label, size = 32 }: { name?: string | null; label?: string | null; size?: number }) {
  const iconName = getSkillIconIdentifier(name, label);
  const Icon = getSkillIcon(iconName);

  if (!iconName?.includes(":")) {
    return <Icon size={size} className="text-indigo-300" aria-hidden="true" />;
  }

  return <IconifyIcon icon={iconName} width={size} height={size} />;
}

function IconifyIcon({ icon, width, height }: { icon: string; width: number; height: number }) {
  return <Icon icon={icon} width={width} height={height} color="#a5b4fc" aria-hidden="true" />;
}

function IconPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [query, setQuery] = useState("react");
  const [results, setResults] = useState<IconSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        setResults(await searchIcons(query.trim()));
      } catch {
        setError("Icon search is unavailable right now.");
      } finally {
        setLoading(false);
      }
    };

    const timer = window.setTimeout(search, 350);
    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <div className="md:col-span-2">
      <label className="block text-sm text-slate-300">
        Choose an icon
        <div className="relative mt-2">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search React, database, cloud..."
            className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2.5 pl-9 pr-3 text-white"
          />
        </div>
      </label>

      <div className="mt-3 flex flex-wrap gap-2">
        {FEATURED_ICONS.map((icon) => (
          <button
            key={icon.name}
            type="button"
            onClick={() => onChange(icon.name)}
            className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${value === icon.name ? "border-indigo-300 bg-indigo-500/20 text-indigo-100" : "border-white/10 bg-slate-900/60 text-slate-300 hover:border-indigo-300/50 hover:bg-white/[0.06]"}`}
          >
            <IconPreview name={icon.name} size={16} />
            {icon.iconName === "google" ? "Google" : icon.iconName[0].toUpperCase() + icon.iconName.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
        {results.map((icon) => (
          <button
            key={icon.name}
            type="button"
            title={icon.name}
            onClick={() => onChange(icon.name)}
            className={`flex h-14 items-center justify-center rounded-xl border transition-colors ${value === icon.name ? "border-indigo-300 bg-indigo-500/20" : "border-white/10 bg-slate-900/60 hover:border-indigo-300/50 hover:bg-white/[0.06]"}`}
          >
            <IconPreview name={icon.name} />
          </button>
        ))}
      </div>

      <div className="mt-2 min-h-5 text-xs text-slate-500">
        {loading ? "Searching icons..." : error || (!results.length && query ? "No icons found." : "Select an icon above.")}
      </div>

      {value && (
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
          <span>Selected:</span>
          <IconPreview name={value} size={22} />
          <span className="text-slate-400">Icon selected</span>
        </div>
      )}
    </div>
  );
}

export function SkillsSection({ draftSkill, editingSkillId, skills, submitting, setDraftSkill, onSave, onEdit, onDelete, onToggleVisibility, onCancelEdit, error }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [formOpen, setFormOpen] = useState(false);
  const categories = Array.from(new Set([
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Tools",
    "Data and AI Platforms",
    ...skills.map((skill) => skill.category),
  ].filter(Boolean))).sort();

  const handleEdit = (skill: SkillContent) => {
    onEdit(skill);
    setFormOpen(true);
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleCreate = () => {
    onCancelEdit();
    setFormOpen(true);
  };

  const handleClose = () => {
    onCancelEdit();
    setFormOpen(false);
  };

  return (
    <section ref={sectionRef} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Skills</h2>
        <button type="button" onClick={handleCreate} disabled={submitting} className="rounded-xl border border-indigo-300/40 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-200 disabled:opacity-60">
          Create skill
        </button>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <form
            onSubmit={async (event) => { event.preventDefault(); if (await onSave()) setFormOpen(false); }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0b1226] p-6 shadow-2xl shadow-black/40"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Skills</p>
                <h3 className="mt-1 text-xl font-bold">{editingSkillId ? "Edit skill" : "Create skill"}</h3>
              </div>
              <button type="button" onClick={handleClose} disabled={submitting} className="rounded-xl p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white disabled:opacity-60" aria-label="Close skill editor">
                <X size={20} />
              </button>
            </div>

            {error && <p role="alert" className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-200">{error}</p>}

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Category <span className="text-red-300" aria-hidden="true">*</span>
                <select required value={draftSkill.category} onChange={(event) => setDraftSkill((current) => ({ ...current, category: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white">
                  <option value="" disabled>Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm text-slate-300">
                Skill name <span className="text-red-300" aria-hidden="true">*</span>
                <input required value={draftSkill.name} onChange={(event) => setDraftSkill((current) => ({ ...current, name: event.target.value }))} placeholder="React" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
              </label>
              <IconPicker value={draftSkill.icon} onChange={(icon) => setDraftSkill((current) => ({ ...current, icon }))} />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={handleClose} disabled={submitting} className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-200 disabled:opacity-60">Cancel</button>
              <button type="submit" disabled={submitting} className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Saving..." : editingSkillId ? "Update skill" : "Create skill"}</button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-slate-200">Existing skills</p>
        <div className="space-y-2">
          {skills.length === 0 && <p className="text-sm text-slate-400">No skills yet.</p>}
          {skills.map((skill) => (
            <div key={skill.id} className={`flex items-center justify-between rounded-xl border px-3 py-2 ${skill.visible ? "border-white/10 bg-slate-900/70" : "border-white/5 bg-slate-950/60 opacity-60"}`}>
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-indigo-300/20 bg-indigo-400/10" title={`${skill.name} icon`}>
                  <IconPreview name={skill.icon} label={skill.name} size={24} />
                </span>
                <div>
                <p className="text-sm font-medium text-white">{skill.name}</p>
                <p className="text-xs text-slate-400">{skill.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleVisibility(skill)}
                  disabled={submitting}
                  className={`rounded-lg border p-1.5 transition-colors disabled:opacity-60 ${skill.visible ? "border-emerald-300/40 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20" : "border-white/10 bg-slate-900/80 text-slate-400 hover:bg-white/[0.06] hover:text-white"}`}
                  aria-label={skill.visible ? `Hide ${skill.name} from portfolio` : `Show ${skill.name} on portfolio`}
                  title={skill.visible ? "Hide from portfolio" : "Show on portfolio"}
                >
                  {skill.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button type="button" onClick={() => handleEdit(skill)} disabled={submitting} className="rounded-lg border border-indigo-300/40 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-200 disabled:opacity-60">Edit</button>
                <button type="button" onClick={() => onDelete(skill.id)} disabled={submitting} className="rounded-lg border border-red-300/40 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-200 disabled:opacity-60">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
