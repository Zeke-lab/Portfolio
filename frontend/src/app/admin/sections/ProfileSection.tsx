import { useState, useRef, useEffect } from "react";
import type { ProfileForm } from "../types";

type Props = {
  form: ProfileForm;
  hasProfile: boolean;
  submitting: boolean;
  onChange: (field: keyof ProfileForm, value: string) => void;
  onSave: () => Promise<boolean>;
  onDelete: () => void;
  onUploadFile?: (file: File) => Promise<string>;
};

export function ProfileSection({ form, hasProfile, submitting, onChange, onSave, onDelete, onUploadFile }: Props) {
  const [isEditing, setIsEditing] = useState(!hasProfile);
  const [formOpen, setFormOpen] = useState(!hasProfile);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResumePhoto, setUploadingResumePhoto] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumePhotoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsEditing(!hasProfile);
    setFormOpen(!hasProfile);
  }, [hasProfile]);

  const handleAvatarFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onUploadFile) return;

    try {
      setUploadingAvatar(true);
      const url = await onUploadFile(file);
      onChange("avatarUrl", url);
    } catch {
      // Error handled by parent hook state
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  const handleDocumentFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onUploadFile) return;

    try {
      setUploadingDocument(true);
      const url = await onUploadFile(file);
      onChange("website", url);
    } catch {
      // Error handled by parent hook state
    } finally {
      setUploadingDocument(false);
      if (documentInputRef.current) documentInputRef.current.value = "";
    }
  };

  const handleResumePhotoFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onUploadFile) return;

    try {
      setUploadingResumePhoto(true);
      const url = await onUploadFile(file);
      onChange("resumePhotoUrl", url);
    } finally {
      setUploadingResumePhoto(false);
      if (resumePhotoInputRef.current) resumePhotoInputRef.current.value = "";
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="flex items-center gap-2">
          {hasProfile && (
            isEditing ? (
              <button
                type="button"
                onClick={onDelete}
                disabled={submitting}
                className="rounded-xl border border-red-300/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 disabled:opacity-60"
              >
                Delete profile
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setIsEditing(true); setFormOpen(true); }}
                className="rounded-xl border border-indigo-300/40 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200 hover:bg-indigo-500/20"
              >
                Edit profile
              </button>
            )
          )}
          {!hasProfile && !formOpen && <button type="button" onClick={() => { setIsEditing(true); setFormOpen(true); }} disabled={submitting} className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 font-semibold text-white disabled:opacity-60">Create profile</button>}
        </div>
      </div>

      {formOpen && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"><div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0b1226] p-6 shadow-2xl shadow-black/40">
        <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-bold">{hasProfile ? "Edit profile" : "Create profile"}</h3>{hasProfile && <button type="button" onClick={() => { setIsEditing(false); setFormOpen(false); }} disabled={submitting} className="text-slate-400 hover:text-white">Close</button>}</div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-300 md:col-span-2">
          Full name <span className="text-red-400">*</span>
          <input disabled={!isEditing} value={form.fullName} onChange={(event) => onChange("fullName", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white disabled:cursor-default disabled:opacity-70" />
        </label>

        <label className="block text-sm text-slate-300 md:col-span-2">
          Headline <span className="text-red-400">*</span>
          <input disabled={!isEditing} value={form.headline} onChange={(event) => onChange("headline", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white disabled:cursor-default disabled:opacity-70" />
        </label>

        <div className="block text-sm text-slate-300 md:col-span-2">
          <span>Avatar Photo</span>
          <div className="mt-2 flex items-center gap-4">
            {form.avatarUrl ? (
              <img src={form.avatarUrl} alt="Avatar preview" className="h-16 w-16 rounded-full object-cover border-2 border-indigo-500/40" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white/20 bg-slate-900/50 text-xs text-slate-400">
                No Photo
              </div>
            )}
            <div className="flex-1">
              <input disabled={!isEditing} value={form.avatarUrl} onChange={(event) => onChange("avatarUrl", event.target.value)} placeholder="File URL or upload photo below..." className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-white text-sm disabled:cursor-default disabled:opacity-70" />
              {isEditing && <div className="mt-2 flex items-center gap-2">
                <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" id="avatar-photo-upload" />
                <label htmlFor="avatar-photo-upload" className="cursor-pointer rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20">
                  {uploadingAvatar ? "Uploading photo..." : "📷 Upload Photo File"}
                </label>
              </div>}
            </div>
          </div>
        </div>

        <div className="block text-sm text-slate-300 md:col-span-2">
          <span>Resume Photo <span className="text-slate-500">(separate from portfolio avatar)</span></span>
          <div className="mt-2 flex items-center gap-4">
            {form.resumePhotoUrl ? <img src={form.resumePhotoUrl} alt="Resume photo preview" className="h-20 w-16 rounded-lg object-cover border border-teal-400/40" /> : <div className="flex h-20 w-16 items-center justify-center rounded-lg border border-dashed border-white/20 bg-slate-900/50 text-center text-xs text-slate-400">No photo</div>}
            <div className="flex-1">
              <input disabled={!isEditing} value={form.resumePhotoUrl} onChange={(event) => onChange("resumePhotoUrl", event.target.value)} placeholder="File URL or upload photo below..." className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white disabled:cursor-default disabled:opacity-70" />
              {isEditing && <div className="mt-2">
                <input ref={resumePhotoInputRef} type="file" accept="image/*" onChange={handleResumePhotoFileChange} className="hidden" id="resume-photo-upload" />
                <label htmlFor="resume-photo-upload" className="cursor-pointer rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-300 hover:bg-teal-500/20">{uploadingResumePhoto ? "Uploading photo..." : "Upload Resume Photo"}</label>
              </div>}
            </div>
          </div>
        </div>

        <label className="block text-sm text-slate-300">
          Email
          <input disabled={!isEditing} value={form.email} onChange={(event) => onChange("email", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white disabled:cursor-default disabled:opacity-70" />
        </label>

        <label className="block text-sm text-slate-300">
          Location
          <input disabled={!isEditing} value={form.location} onChange={(event) => onChange("location", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white disabled:cursor-default disabled:opacity-70" />
        </label>

        <label className="block text-sm text-slate-300">
          Availability
          <input disabled={!isEditing} value={form.availability} onChange={(event) => onChange("availability", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white disabled:cursor-default disabled:opacity-70" />
        </label>

        <label className="block text-sm text-slate-300 md:col-span-2">
          Short introduction for Hero
          <textarea disabled={!isEditing} value={form.intro} onChange={(event) => onChange("intro", event.target.value)} rows={3} placeholder="A concise introduction shown in the Hero section" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white disabled:cursor-default disabled:opacity-70" />
        </label>

        <label className="block text-sm text-slate-300">
          GitHub URL
          <input disabled={!isEditing} value={form.github} onChange={(event) => onChange("github", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white disabled:cursor-default disabled:opacity-70" />
        </label>

        <label className="block text-sm text-slate-300">
          LinkedIn URL
          <input disabled={!isEditing} value={form.linkedin} onChange={(event) => onChange("linkedin", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white disabled:cursor-default disabled:opacity-70" />
        </label>

        <div className="block text-sm text-slate-300">
          <span>Resume Document / Website URL</span>
          <input disabled={!isEditing} value={form.website} onChange={(event) => onChange("website", event.target.value)} placeholder="https://... or upload PDF document" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white disabled:cursor-default disabled:opacity-70" />
          {isEditing && <div className="mt-2">
            <input ref={documentInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleDocumentFileChange} className="hidden" id="resume-document-upload" />
            <label htmlFor="resume-document-upload" className="cursor-pointer rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20">
              {uploadingDocument ? "Uploading document..." : "📄 Upload Document File (PDF/DOC)"}
            </label>
          </div>}
        </div>

        <label className="block text-sm text-slate-300 md:col-span-2">
          Detailed About biography
          <textarea disabled={!isEditing} value={form.about} onChange={(event) => onChange("about", event.target.value)} rows={6} placeholder="Your background, strengths, experience, and professional focus" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white disabled:cursor-default disabled:opacity-70" />
        </label>
      </div>
      <div className="mt-6 flex justify-end gap-2">{hasProfile && <button type="button" onClick={() => { setIsEditing(false); setFormOpen(false); }} disabled={submitting} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200">Cancel</button>}<button type="button" onClick={async () => { const saved = await onSave(); if (saved) { setIsEditing(false); setFormOpen(false); } }} disabled={submitting} className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 font-semibold text-white disabled:opacity-60">{submitting ? "Saving..." : hasProfile ? "Update profile" : "Create profile"}</button></div>
      </div></div>}
    </section>
  );
}
