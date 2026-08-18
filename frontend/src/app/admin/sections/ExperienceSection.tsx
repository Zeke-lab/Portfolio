import type { ExperienceContent, ExperienceDraft } from "../types";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  draftExperience: ExperienceDraft;
  editingExperienceId: string | null;
  experience: ExperienceContent[];
  submitting: boolean;
  setDraftExperience: Dispatch<SetStateAction<ExperienceDraft>>;
  onSave: () => void;
  onEdit: (item: ExperienceContent) => void;
  onDelete: (id: string) => void;
  onCancelEdit: () => void;
  formatDateInput: (value?: string | null) => string;
};

export function ExperienceSection({
  draftExperience,
  editingExperienceId,
  experience,
  submitting,
  setDraftExperience,
  onSave,
  onEdit,
  onDelete,
  onCancelEdit,
  formatDateInput,
}: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Experience</h2>
        <div className="flex items-center gap-2">
          {editingExperienceId && (
            <button type="button" onClick={onCancelEdit} disabled={submitting} className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 disabled:opacity-60">
              Cancel edit
            </button>
          )}
          <button type="button" onClick={onSave} disabled={submitting} className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 disabled:opacity-60">
            {submitting ? "Saving..." : editingExperienceId ? "Update role" : "Create role"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Company
          <input value={draftExperience.company} onChange={(event) => setDraftExperience((current) => ({ ...current, company: event.target.value }))} placeholder="Google" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          Role
          <input value={draftExperience.role} onChange={(event) => setDraftExperience((current) => ({ ...current, role: event.target.value }))} placeholder="Senior Full-Stack Engineer" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          Location
          <input value={draftExperience.location} onChange={(event) => setDraftExperience((current) => ({ ...current, location: event.target.value }))} placeholder="Singapore" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          Start month
          <input type="month" value={draftExperience.startDate} onChange={(event) => setDraftExperience((current) => ({ ...current, startDate: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          End month
          <input type="month" value={draftExperience.endDate} onChange={(event) => setDraftExperience((current) => ({ ...current, endDate: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300 md:col-span-2">
          Summary
          <textarea value={draftExperience.description} onChange={(event) => setDraftExperience((current) => ({ ...current, description: event.target.value }))} rows={4} placeholder="Role overview..." className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300 md:col-span-2">
          Responsibilities (one per line)
          <textarea value={draftExperience.bullets} onChange={(event) => setDraftExperience((current) => ({ ...current, bullets: event.target.value }))} rows={4} placeholder="Led product architecture\nReduced deployment time by 32%" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-slate-200">Existing experience</p>
        <div className="space-y-3">
          {experience.length === 0 && <p className="text-sm text-slate-400">No experience yet.</p>}
          {experience.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.role} at {item.company}</h3>
                  <p className="text-xs text-slate-400">{item.location || "No location"}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.startDate ? formatDateInput(item.startDate) : ""}{item.endDate ? ` - ${formatDateInput(item.endDate)}` : " - Present"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => onEdit(item)} disabled={submitting} className="rounded-lg border border-indigo-300/40 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-200 disabled:opacity-60">Edit</button>
                  <button type="button" onClick={() => onDelete(item.id)} disabled={submitting} className="rounded-lg border border-red-300/40 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-200 disabled:opacity-60">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
