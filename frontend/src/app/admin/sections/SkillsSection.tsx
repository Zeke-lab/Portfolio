import type { SkillContent, SkillDraft } from "../types";
import type { Dispatch, SetStateAction } from "react";
import { useRef } from "react";

type Props = {
  draftSkill: SkillDraft;
  editingSkillId: string | null;
  skills: SkillContent[];
  submitting: boolean;
  setDraftSkill: Dispatch<SetStateAction<SkillDraft>>;
  onSave: () => void;
  onEdit: (skill: SkillContent) => void;
  onDelete: (skillId: string) => void;
  onCancelEdit: () => void;
};

export function SkillsSection({ draftSkill, editingSkillId, skills, submitting, setDraftSkill, onSave, onEdit, onDelete, onCancelEdit }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const handleEdit = (skill: SkillContent) => {
    onEdit(skill);
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section ref={sectionRef} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Skills</h2>
        <div className="flex items-center gap-2">
          {editingSkillId && (
            <button type="button" onClick={onCancelEdit} disabled={submitting} className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 disabled:opacity-60">
              Cancel edit
            </button>
          )}
          <button type="button" onClick={onSave} disabled={submitting} className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 disabled:opacity-60">
            {submitting ? "Saving..." : editingSkillId ? "Update skill" : "Create skill"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Category
          <select value={draftSkill.category} onChange={(event) => setDraftSkill((current) => ({ ...current, category: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white">
            <option value="" disabled>Select a category</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Tools">Tools</option>
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Skill name
          <input value={draftSkill.name} onChange={(event) => setDraftSkill((current) => ({ ...current, name: event.target.value }))} placeholder="React" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300 md:col-span-2">
          Icon key
          <input value={draftSkill.icon} onChange={(event) => setDraftSkill((current) => ({ ...current, icon: event.target.value }))} placeholder="code" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-slate-200">Existing skills</p>
        <div className="space-y-2">
          {skills.length === 0 && <p className="text-sm text-slate-400">No skills yet.</p>}
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{skill.name}</p>
                <p className="text-xs text-slate-400">{skill.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-slate-500">{skill.icon || "no icon"}</p>
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
