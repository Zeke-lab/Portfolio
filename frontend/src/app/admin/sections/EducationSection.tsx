import type { CertificationContent, CertificationDraft, EducationContent, EducationDraft } from "../types";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

type Props = {
  draftEducation: EducationDraft;
  draftCertification: CertificationDraft;
  editingEducationId: string | null;
  editingCertificationId: string | null;
  education: EducationContent[];
  certifications: CertificationContent[];
  submitting: boolean;
  setDraftEducation: Dispatch<SetStateAction<EducationDraft>>;
  setDraftCertification: Dispatch<SetStateAction<CertificationDraft>>;
  onSaveEducation: () => void;
  onEditEducation: (item: EducationContent) => void;
  onDeleteEducation: (id: string) => void;
  onCancelEducationEdit: () => void;
  onSaveCertification: () => void;
  onEditCertification: (item: CertificationContent) => void;
  onDeleteCertification: (id: string) => void;
  onCancelCertificationEdit: () => void;
};

export function EducationSection({
  draftEducation,
  draftCertification,
  editingEducationId,
  editingCertificationId,
  education,
  certifications,
  submitting,
  setDraftEducation,
  setDraftCertification,
  onSaveEducation,
  onEditEducation,
  onDeleteEducation,
  onCancelEducationEdit,
  onSaveCertification,
  onEditCertification,
  onDeleteCertification,
  onCancelCertificationEdit,
}: Props) {
  const [educationFormOpen, setEducationFormOpen] = useState(false);
  const [certificationFormOpen, setCertificationFormOpen] = useState(false);
  const closeEducation = () => { onCancelEducationEdit(); setEducationFormOpen(false); };
  const closeCertification = () => { onCancelCertificationEdit(); setCertificationFormOpen(false); };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Education & Certifications</h2>
        <button type="button" onClick={() => { onCancelEducationEdit(); setEducationFormOpen(true); }} disabled={submitting} className="rounded-xl border border-indigo-300/40 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-200 disabled:opacity-60">Create education</button>
      </div>
      {educationFormOpen && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"><div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0b1226] p-6 shadow-2xl shadow-black/40">
        <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-bold">{editingEducationId ? "Edit education" : "Create education"}</h3><button type="button" onClick={closeEducation} disabled={submitting} className="text-slate-400 hover:text-white">Close</button></div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Institution
          <input value={draftEducation.institution} onChange={(event) => setDraftEducation((current) => ({ ...current, institution: event.target.value }))} placeholder="University of Technology" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          Degree / Certificate
          <input value={draftEducation.degree} onChange={(event) => setDraftEducation((current) => ({ ...current, degree: event.target.value }))} placeholder="BSc in Computer Science" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          Field of study
          <input value={draftEducation.field} onChange={(event) => setDraftEducation((current) => ({ ...current, field: event.target.value }))} placeholder="Computer Science" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          Start month
          <input type="month" value={draftEducation.startDate} onChange={(event) => setDraftEducation((current) => ({ ...current, startDate: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300">
          End month
          <input type="month" value={draftEducation.endDate} onChange={(event) => setDraftEducation((current) => ({ ...current, endDate: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
        <label className="block text-sm text-slate-300 md:col-span-2">
          Details
          <textarea value={draftEducation.description} onChange={(event) => setDraftEducation((current) => ({ ...current, description: event.target.value }))} rows={3} placeholder="Include key study focus or certification summary..." className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
        </label>
      </div>
      <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={closeEducation} disabled={submitting} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200">Cancel</button><button type="button" onClick={async () => { await onSaveEducation(); setEducationFormOpen(false); }} disabled={submitting} className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Saving..." : editingEducationId ? "Update education" : "Create education"}</button></div>
      </div></div>}

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-slate-200">Existing education</p>
        <div className="space-y-3">
          {education.length === 0 && <p className="text-sm text-slate-400">No education yet.</p>}
          {education.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.degree || "Education"} - {item.institution}</h3>
                  <p className="text-xs text-slate-400">{item.field || "No field"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => { onEditEducation(item); setEducationFormOpen(true); }} disabled={submitting} className="rounded-lg border border-indigo-300/40 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-200 disabled:opacity-60">Edit</button>
                  <button type="button" onClick={() => onDeleteEducation(item.id)} disabled={submitting} className="rounded-lg border border-red-300/40 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-200 disabled:opacity-60">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Certification</h3>
          <button type="button" onClick={() => { onCancelCertificationEdit(); setCertificationFormOpen(true); }} disabled={submitting} className="rounded-xl border border-indigo-300/40 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-200 disabled:opacity-60">Create certification</button>
        </div>
        {certificationFormOpen && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"><div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0b1226] p-6 shadow-2xl shadow-black/40">
          <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-bold">{editingCertificationId ? "Edit certification" : "Create certification"}</h3><button type="button" onClick={closeCertification} disabled={submitting} className="text-slate-400 hover:text-white">Close</button></div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-slate-300">
            Title
            <input value={draftCertification.title} onChange={(event) => setDraftCertification((current) => ({ ...current, title: event.target.value }))} placeholder="AWS Certified Solutions Architect" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
          </label>
          <label className="block text-sm text-slate-300">
            Issuer
            <input value={draftCertification.issuer} onChange={(event) => setDraftCertification((current) => ({ ...current, issuer: event.target.value }))} placeholder="Amazon Web Services" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
          </label>
          <label className="block text-sm text-slate-300">
            Year
            <input value={draftCertification.year} onChange={(event) => setDraftCertification((current) => ({ ...current, year: event.target.value }))} placeholder="2025" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
          </label>
          <label className="block text-sm text-slate-300">
            Issued month
            <input type="month" value={draftCertification.issuedAt} onChange={(event) => setDraftCertification((current) => ({ ...current, issuedAt: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
          </label>
          <label className="block text-sm text-slate-300 md:col-span-2">
            Credential URL
            <input value={draftCertification.credentialUrl} onChange={(event) => setDraftCertification((current) => ({ ...current, credentialUrl: event.target.value }))} placeholder="https://www.credly.com/..." className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-white" />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={closeCertification} disabled={submitting} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200">Cancel</button><button type="button" onClick={async () => { await onSaveCertification(); setCertificationFormOpen(false); }} disabled={submitting} className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Saving..." : editingCertificationId ? "Update certification" : "Create certification"}</button></div>
        </div></div>}

        <div className="mt-4 space-y-3">
          <p className="text-sm font-semibold text-slate-200">Existing certifications</p>
          {certifications.length === 0 && <p className="text-sm text-slate-400">No certifications yet.</p>}
          {certifications.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-slate-400">{item.issuer}</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => { onEditCertification(item); setCertificationFormOpen(true); }} disabled={submitting} className="rounded-lg border border-indigo-300/40 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-200 disabled:opacity-60">Edit</button>
                <button type="button" onClick={() => onDeleteCertification(item.id)} disabled={submitting} className="rounded-lg border border-red-300/40 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-200 disabled:opacity-60">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
