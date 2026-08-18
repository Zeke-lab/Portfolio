import { Eye, EyeOff } from "lucide-react";
import { useAdminDashboard } from "./useAdminDashboard";
import { ProfileSection } from "./sections/ProfileSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";

export default function AdminDashboard() {
  const state = useAdminDashboard();

  const openPublicPortfolio = () => {
    window.open(`${window.location.origin}/`, "_blank", "noopener,noreferrer");
  };

  if (!state.token || !state.user) {
    return (
      <main className="min-h-screen bg-[#040816] text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Portfolio Admin</p>
              <h1 className="text-xl font-bold">Login</h1>
            </div>
          </div>

          <form onSubmit={state.handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input
                value={state.email}
                onChange={(event) => state.setEmail(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-white outline-none ring-0 placeholder:text-slate-500"
                placeholder="admin@portfolio.local"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Password</label>
              <div className="relative">
                <input
                  type={state.showPassword ? "text" : "password"}
                  value={state.password}
                  onChange={(event) => state.setPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 pr-10 text-white outline-none ring-0 placeholder:text-slate-500"
                  placeholder="admin123"
                />
                <button
                  type="button"
                  onClick={() => state.setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white"
                  aria-label={state.showPassword ? "Hide password" : "Show password"}
                >
                  {state.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {state.error && <p className="text-sm text-red-400">{state.error}</p>}

            <button
              type="submit"
              disabled={state.loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 font-semibold text-white disabled:opacity-60"
            >
              {state.loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#040816] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Portfolio Admin</p>
            <h1 className="mt-2 text-2xl font-bold">Content Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openPublicPortfolio}
              className="rounded-xl border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 hover:bg-violet-500/20"
            >
              Preview portfolio
            </button>
            <button onClick={state.handleLogout} className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
              Logout
            </button>
          </div>
        </div>

        {state.error && (
          <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {state.error}
          </div>
        )}

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Projects</p>
            <p className="mt-2 text-3xl font-bold">{state.content?.projects?.length ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Skills</p>
            <p className="mt-2 text-3xl font-bold">{state.content?.skills?.length ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Experience</p>
            <p className="mt-2 text-3xl font-bold">{state.content?.experience?.length ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Education</p>
            <p className="mt-2 text-3xl font-bold">{state.content?.education?.length ?? 0}</p>
          </div>
        </div>

        <div className="space-y-6">
          <ProfileSection
            form={state.form}
            hasProfile={Boolean(state.content?.profile?.id)}
            submitting={state.submitting}
            onChange={state.updateForm}
            onSave={state.saveProfile}
            onDelete={state.removeProfile}
            onUploadFile={state.uploadFile}
          />

          <ProjectsSection
            draftProject={state.draftProject}
            editingProjectId={state.editingProjectId}
            projects={state.content?.projects ?? []}
            submitting={state.submitting}
            setDraftProject={state.setDraftProject}
            onSave={state.saveProject}
            onEdit={state.startEditProject}
            onDelete={state.removeProject}
            onCancelEdit={state.resetProjectDraft}
            onUploadFile={state.uploadFile}
          />

          <SkillsSection
            draftSkill={state.draftSkill}
            editingSkillId={state.editingSkillId}
            skills={state.content?.skills ?? []}
            submitting={state.submitting}
            setDraftSkill={state.setDraftSkill}
            onSave={state.saveSkill}
            onEdit={state.startEditSkill}
            onDelete={state.removeSkill}
            onCancelEdit={state.resetSkillDraft}
          />

          <ExperienceSection
            draftExperience={state.draftExperience}
            editingExperienceId={state.editingExperienceId}
            experience={state.content?.experience ?? []}
            submitting={state.submitting}
            setDraftExperience={state.setDraftExperience}
            onSave={state.saveExperience}
            onEdit={state.startEditExperience}
            onDelete={state.removeExperience}
            onCancelEdit={state.resetExperienceDraft}
            formatDateInput={state.formatDateInput}
          />

          <EducationSection
            draftEducation={state.draftEducation}
            draftCertification={state.draftCertification}
            editingEducationId={state.editingEducationId}
            editingCertificationId={state.editingCertificationId}
            education={state.content?.education ?? []}
            certifications={state.content?.certifications ?? []}
            submitting={state.submitting}
            setDraftEducation={state.setDraftEducation}
            setDraftCertification={state.setDraftCertification}
            onSaveEducation={state.saveEducation}
            onEditEducation={state.startEditEducation}
            onDeleteEducation={state.removeEducation}
            onCancelEducationEdit={state.resetEducationDraft}
            onSaveCertification={state.saveCertification}
            onEditCertification={state.startEditCertification}
            onDeleteCertification={state.removeCertification}
            onCancelCertificationEdit={state.resetCertificationDraft}
          />
        </div>
      </div>
    </main>
  );
}
