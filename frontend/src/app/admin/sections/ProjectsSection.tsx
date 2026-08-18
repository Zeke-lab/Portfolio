import { useState, useRef } from "react";
import type { ProjectContent, ProjectDraft } from "../types";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  draftProject: ProjectDraft;
  editingProjectId: string | null;
  projects: ProjectContent[];
  submitting: boolean;
  setDraftProject: Dispatch<SetStateAction<ProjectDraft>>;
  onSave: () => void;
  onEdit: (project: ProjectContent) => void;
  onDelete: (projectId: string) => void;
  onCancelEdit: () => void;
  onUploadFile?: (file: File) => Promise<string>;
};

export function ProjectsSection({
  draftProject,
  editingProjectId,
  projects,
  submitting,
  setDraftProject,
  onSave,
  onEdit,
  onDelete,
  onCancelEdit,
  onUploadFile,
}: Props) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onUploadFile) return;

    try {
      setUploadingImage(true);
      const url = await onUploadFile(file);
      setDraftProject((current) => ({ ...current, imageUrl: url }));
    } catch {
      // Error handled by parent hook state
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Projects</h2>
        <div className="flex items-center gap-2">
          {editingProjectId && (
            <button type="button" onClick={onCancelEdit} disabled={submitting} className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 disabled:opacity-60">
              Cancel edit
            </button>
          )}
          <button type="button" onClick={onSave} disabled={submitting} className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 disabled:opacity-60">
            {submitting ? "Saving..." : editingProjectId ? "Update project" : "Create project"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Project title
          <input value={draftProject.title} onChange={(event) => setDraftProject((current) => ({ ...current, title: event.target.value }))} placeholder="CloudFlow" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          Project type
          <input value={draftProject.subtitle} onChange={(event) => setDraftProject((current) => ({ ...current, subtitle: event.target.value }))} placeholder="SaaS platform" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300 md:col-span-2">
          Summary
          <textarea value={draftProject.summary} onChange={(event) => setDraftProject((current) => ({ ...current, summary: event.target.value }))} rows={3} placeholder="Describe the problem, approach, and impact..." className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300 md:col-span-2">
          Technologies
          <input value={draftProject.technologies} onChange={(event) => setDraftProject((current) => ({ ...current, technologies: event.target.value }))} placeholder="React, Node.js, PostgreSQL, AWS" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>

        <div className="block text-sm text-slate-300 md:col-span-2">
          <span>Project Image</span>
          <div className="mt-2 flex items-center gap-4">
            {draftProject.imageUrl ? (
              <img src={draftProject.imageUrl} alt="Project preview" className="h-16 w-24 rounded-xl object-cover border border-white/10" />
            ) : (
              <div className="flex h-16 w-24 items-center justify-center rounded-xl border border-dashed border-white/20 bg-slate-900/50 text-xs text-slate-400">
                No Image
              </div>
            )}
            <div className="flex-1">
              <input value={draftProject.imageUrl} onChange={(event) => setDraftProject((current) => ({ ...current, imageUrl: event.target.value }))} placeholder="Image URL or upload below..." className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-white text-sm" />
              <div className="mt-2">
                <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" id="project-image-upload" />
                <label htmlFor="project-image-upload" className="cursor-pointer rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20">
                  {uploadingImage ? "Uploading image..." : "📷 Upload Project Image"}
                </label>
              </div>
            </div>
          </div>
        </div>
        <label className="block text-sm text-slate-300">
          Live URL
          <input value={draftProject.liveUrl} onChange={(event) => setDraftProject((current) => ({ ...current, liveUrl: event.target.value }))} placeholder="https://example.com" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          Repo URL
          <input value={draftProject.repoUrl} onChange={(event) => setDraftProject((current) => ({ ...current, repoUrl: event.target.value }))} placeholder="https://github.com/user/project" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          Case Study Link
          <input value={draftProject.caseStudyLink} onChange={(event) => setDraftProject((current) => ({ ...current, caseStudyLink: event.target.value }))} placeholder="https://example.com/case-study" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300 md:col-span-2">
          Description
          <textarea value={draftProject.description} onChange={(event) => setDraftProject((current) => ({ ...current, description: event.target.value }))} rows={4} placeholder="Detailed project overview..." className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-slate-200">Existing projects</p>
        <div className="space-y-3">
          {projects.length === 0 && <p className="text-sm text-slate-400">No projects yet.</p>}
          {projects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{project.subtitle || "No subtitle"}</p>
                  {project.summary && <p className="mt-2 text-sm text-slate-400">{project.summary}</p>}
                  <p className="mt-2 text-xs text-slate-400">
                    Tech: {(project.technologies ?? []).map((tech) => tech.name).join(", ") || "None"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => onEdit(project)} disabled={submitting} className="rounded-lg border border-indigo-300/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-200 disabled:opacity-60">
                    Edit
                  </button>
                  <button type="button" onClick={() => onDelete(project.id)} disabled={submitting} className="rounded-lg border border-red-300/40 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-200 disabled:opacity-60">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
