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
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (project: ProjectContent) => {
    onEdit(project);
    setFormOpen(true);
  };

  const handleCreate = () => {
    onCancelEdit();
    setFormOpen(true);
  };

  const handleClose = () => {
    onCancelEdit();
    setFormOpen(false);
  };

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

  const handleGalleryFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0 || !onUploadFile) return;

    try {
      setUploadingGallery(true);
      const uploadedUrls: string[] = [];
      for (const file of files) {
        uploadedUrls.push(await onUploadFile(file));
      }
      setDraftProject((current) => ({
        ...current,
        gallery: [...current.gallery.split("\n"), ...uploadedUrls].filter(Boolean).join("\n"),
      }));
    } catch {
      // Error handled by parent hook state
    } finally {
      setUploadingGallery(false);
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Projects</h2>
        <button type="button" onClick={handleCreate} disabled={submitting} className="rounded-xl border border-indigo-300/40 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-200 disabled:opacity-60">Create project</button>
      </div>

      {formOpen && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0b1226] p-6 shadow-2xl shadow-black/40">
        <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-bold">{editingProjectId ? "Edit project" : "Create project"}</h3><button type="button" onClick={handleClose} disabled={submitting} className="text-slate-400 hover:text-white">Close</button></div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Project title <span className="text-red-400">*</span>
          <input value={draftProject.title} onChange={(event) => setDraftProject((current) => ({ ...current, title: event.target.value }))} placeholder="CloudFlow" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          Project type <span className="text-red-400">*</span>
          <input value={draftProject.subtitle} onChange={(event) => setDraftProject((current) => ({ ...current, subtitle: event.target.value }))} placeholder="SaaS platform" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300 md:col-span-2">
          Summary <span className="text-red-400">*</span>
          <textarea value={draftProject.summary} onChange={(event) => setDraftProject((current) => ({ ...current, summary: event.target.value }))} rows={3} placeholder="Short project summary shown on the project card..." className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
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
                {draftProject.imageUrl && <button type="button" onClick={() => setDraftProject((current) => ({ ...current, imageUrl: "" }))} className="ml-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/20">Remove image</button>}
              </div>
            </div>
          </div>
        </div>
        <div className="block text-sm text-slate-300 md:col-span-2">
          <span>Case Study Gallery</span>
          <p className="mt-1 text-xs text-slate-400">Add one screenshot URL per line, or upload multiple images.</p>
          <textarea
            value={draftProject.gallery}
            onChange={(event) => setDraftProject((current) => ({ ...current, gallery: event.target.value }))}
            rows={4}
            placeholder="https://example.com/screenshot-1.png\nhttps://example.com/screenshot-2.png"
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white"
          />
          {draftProject.gallery.split("\n").map((url) => url.trim()).filter(Boolean).length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {draftProject.gallery.split("\n").map((url) => url.trim()).filter(Boolean).map((url, index) => (
                <div key={`${url}-${index}`} className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/70">
                  <img src={url} alt={`Gallery preview ${index + 1}`} className="h-28 w-full object-cover" onError={(event) => { event.currentTarget.style.opacity = "0.25"; }} />
                  <button
                    type="button"
                    onClick={() => setDraftProject((current) => ({
                      ...current,
                      gallery: current.gallery.split("\n").filter((item) => item.trim() !== url).join("\n"),
                    }))}
                    aria-label={`Remove gallery image ${index + 1}`}
                    className="absolute right-2 top-2 rounded-lg border border-red-300/40 bg-slate-950/85 px-2 py-1 text-sm font-bold text-red-200 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-2">
            <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryFileChange} className="hidden" id="project-gallery-upload" />
            <label htmlFor="project-gallery-upload" className="cursor-pointer rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20">
              {uploadingGallery ? "Uploading gallery..." : "Upload gallery images"}
            </label>
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
          Context
          <textarea value={draftProject.description} onChange={(event) => setDraftProject((current) => ({ ...current, description: event.target.value }))} rows={4} placeholder="What was the project context or problem?" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <div className="md:col-span-2 rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.05] p-4">
          <h4 className="mb-4 text-sm font-semibold text-indigo-200">Case study content</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Approach
              <textarea value={draftProject.caseStudyApproach} onChange={(event) => setDraftProject((current) => ({ ...current, caseStudyApproach: event.target.value }))} rows={3} placeholder="What was your approach?" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
            </label>
            <label className="block text-sm text-slate-300">
              Solution
              <textarea value={draftProject.caseStudySolution} onChange={(event) => setDraftProject((current) => ({ ...current, caseStudySolution: event.target.value }))} rows={3} placeholder="What solution did you build?" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
            </label>
            <label className="block text-sm text-slate-300">
              Implementation
              <textarea value={draftProject.caseStudyImplementation} onChange={(event) => setDraftProject((current) => ({ ...current, caseStudyImplementation: event.target.value }))} rows={3} placeholder="How was it implemented?" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
            </label>
            <label className="block text-sm text-slate-300">
              Execution
              <textarea value={draftProject.caseStudyExecution} onChange={(event) => setDraftProject((current) => ({ ...current, caseStudyExecution: event.target.value }))} rows={3} placeholder="What was your execution process?" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
            </label>
            <label className="block text-sm text-slate-300 md:col-span-2">
              Results / Outcome
              <textarea value={draftProject.caseStudyResults} onChange={(event) => setDraftProject((current) => ({ ...current, caseStudyResults: event.target.value }))} rows={3} placeholder="What was the result or impact?" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
            </label>
            <div className="md:col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-slate-300">Core features</label>
                <button
                  type="button"
                  onClick={() => setDraftProject((current) => ({ ...current, coreFeatures: [...current.coreFeatures, ""] }))}
                  className="rounded-lg border border-emerald-300/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/20"
                >
                  + Add feature
                </button>
              </div>
              <div className="space-y-2">
                {draftProject.coreFeatures.map((feature, index) => (
                  <div key={`feature-${index}`} className="flex items-center gap-2">
                    <input
                      value={feature}
                      onChange={(event) => setDraftProject((current) => ({
                        ...current,
                        coreFeatures: current.coreFeatures.map((item, itemIndex) => itemIndex === index ? event.target.value : item),
                      }))}
                      placeholder={`Core feature ${index + 1}`}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setDraftProject((current) => ({
                        ...current,
                        coreFeatures: current.coreFeatures.filter((_item, itemIndex) => itemIndex !== index),
                      }))}
                      aria-label={`Remove core feature ${index + 1}`}
                      className="rounded-lg border border-red-300/30 px-2.5 py-2 text-sm text-red-200 hover:bg-red-500/10"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={handleClose} disabled={submitting} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200">Cancel</button><button type="button" onClick={async () => { await onSave(); setFormOpen(false); }} disabled={submitting} className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Saving..." : editingProjectId ? "Update project" : "Create project"}</button></div>
      </div>
      </div>}

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
                  <button type="button" onClick={() => handleEdit(project)} disabled={submitting} className="rounded-lg border border-indigo-300/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-200 disabled:opacity-60">
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
