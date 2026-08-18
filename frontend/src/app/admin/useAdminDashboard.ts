import { useEffect, useState } from "react";
import { adminApi } from "./api/adminApi";
import type {
  AdminContent,
  AdminUser,
  CertificationDraft,
  EducationDraft,
  ExperienceDraft,
  ProfileForm,
  ProjectDraft,
  SkillDraft,
} from "./types";

const EMPTY_PROFILE_FORM: ProfileForm = {
  fullName: "",
  headline: "",
  avatarUrl: "",
  email: "",
  location: "",
  availability: "",
  github: "",
  linkedin: "",
  website: "",
  about: "",
};

const EMPTY_PROJECT: ProjectDraft = {
  title: "",
  subtitle: "",
  summary: "",
  description: "",
  imageUrl: "",
  liveUrl: "",
  repoUrl: "",
  caseStudyLink: "",
  technologies: "",
};

const EMPTY_SKILL: SkillDraft = { category: "", name: "", icon: "" };

const EMPTY_EXPERIENCE: ExperienceDraft = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  bullets: "",
};

const EMPTY_EDUCATION: EducationDraft = {
  institution: "",
  degree: "",
  field: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
};

const EMPTY_CERTIFICATION: CertificationDraft = {
  title: "",
  issuer: "",
  year: "",
  credentialUrl: "",
  issuedAt: "",
};

function formatDateInput(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function toMonthValue(value?: string) {
  if (!value || value.trim() === "") return null;

  const normalized = value.trim();
  if (/^\d{4}-\d{2}$/.test(normalized)) {
    return `${normalized}-01T00:00:00.000Z`;
  }

  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return null;

  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)).toISOString();
}

export function useAdminDashboard() {
  const [email, setEmail] = useState("admin@portfolio.local");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem("portfolio-admin-token"));
  const [user, setUser] = useState<AdminUser | null>(null);
  const [content, setContent] = useState<AdminContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);
  const [editingCertificationId, setEditingCertificationId] = useState<string | null>(null);

  const [form, setForm] = useState<ProfileForm>(EMPTY_PROFILE_FORM);
  const [draftProject, setDraftProject] = useState<ProjectDraft>(EMPTY_PROJECT);
  const [draftSkill, setDraftSkill] = useState<SkillDraft>(EMPTY_SKILL);
  const [draftExperience, setDraftExperience] = useState<ExperienceDraft>(EMPTY_EXPERIENCE);
  const [draftEducation, setDraftEducation] = useState<EducationDraft>(EMPTY_EDUCATION);
  const [draftCertification, setDraftCertification] = useState<CertificationDraft>(EMPTY_CERTIFICATION);

  const updateForm = (field: keyof ProfileForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const fetchAdminContent = async (authToken: string) => {
    const data = await adminApi.content(authToken);
    setContent(data);

    if (data.profile) {
      setForm({
        fullName: data.profile.fullName ?? "",
        headline: data.profile.headline ?? "",
        avatarUrl: data.profile.avatarUrl ?? "",
        email: data.profile.email ?? "",
        location: data.profile.location ?? "",
        availability: data.profile.availability ?? "",
        github: data.profile.socialLinks?.find((link: any) => link.label === "GitHub")?.url ?? "",
        linkedin: data.profile.socialLinks?.find((link: any) => link.label === "LinkedIn")?.url ?? "",
        website: data.profile.socialLinks?.find((link: any) => link.label === "Website")?.url ?? "",
        about: data.profile.about ?? "",
      });
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await adminApi.login(email, password);
      localStorage.setItem("portfolio-admin-token", data.token);
      setToken(data.token);
      setUser(data.user);
      await fetchAdminContent(data.token);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("portfolio-admin-token");
    setToken(null);
    setUser(null);
    setContent(null);
    setError(null);
  };

  const resetProjectDraft = () => {
    setEditingProjectId(null);
    setDraftProject(EMPTY_PROJECT);
  };

  const resetSkillDraft = () => {
    setEditingSkillId(null);
    setDraftSkill(EMPTY_SKILL);
  };

  const resetExperienceDraft = () => {
    setEditingExperienceId(null);
    setDraftExperience(EMPTY_EXPERIENCE);
  };

  const resetEducationDraft = () => {
    setEditingEducationId(null);
    setDraftEducation(EMPTY_EDUCATION);
  };

  const resetCertificationDraft = () => {
    setEditingCertificationId(null);
    setDraftCertification(EMPTY_CERTIFICATION);
  };

  const startEditProject = (project: any) => {
    setEditingProjectId(project.id);
    setDraftProject({
      title: project.title ?? "",
      subtitle: project.subtitle ?? "",
      summary: project.summary ?? "",
      description: project.description ?? "",
      imageUrl: project.imageUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      repoUrl: project.repoUrl ?? "",
      technologies: (project.technologies ?? []).map((tech: any) => tech.name).join(", "),
    });
  };

  const startEditSkill = (skill: any) => {
    setEditingSkillId(skill.id);
    setDraftSkill({
      category: skill.category ?? "",
      name: skill.name ?? "",
      icon: skill.icon ?? "",
    });
  };

  const startEditExperience = (item: any) => {
    setEditingExperienceId(item.id);
    setDraftExperience({
      company: item.company ?? "",
      role: item.role ?? "",
      location: item.location ?? "",
      startDate: formatDateInput(item.startDate),
      endDate: formatDateInput(item.endDate),
      description: item.description ?? "",
      bullets: (item.bullets ?? []).map((bullet: any) => bullet.text).join("\n"),
    });
  };

  const startEditEducation = (item: any) => {
    setEditingEducationId(item.id);
    setDraftEducation({
      institution: item.institution ?? "",
      degree: item.degree ?? "",
      field: item.field ?? "",
      location: item.location ?? "",
      description: item.description ?? "",
      startDate: formatDateInput(item.startDate),
      endDate: formatDateInput(item.endDate),
    });
  };

  const startEditCertification = (item: any) => {
    setEditingCertificationId(item.id);
    setDraftCertification({
      title: item.title ?? "",
      issuer: item.issuer ?? "",
      year: item.year ?? "",
      credentialUrl: item.credentialUrl ?? "",
      issuedAt: formatDateInput(item.issuedAt),
    });
  };

  const removeProject = async (projectId: string) => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      await adminApi.deleteProject(token, projectId);
      if (editingProjectId === projectId) resetProjectDraft();
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to delete project");
    } finally {
      setSubmitting(false);
    }
  };

  const removeProfile = async () => {
    if (!token || !content?.profile?.id) return;

    setSubmitting(true);
    setError(null);

    try {
      await adminApi.deleteProfile(token, content.profile.id);
      setForm(EMPTY_PROFILE_FORM);
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to delete profile");
    } finally {
      setSubmitting(false);
    }
  };

  const removeSkill = async (skillId: string) => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      await adminApi.deleteSkill(token, skillId);
      if (editingSkillId === skillId) resetSkillDraft();
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to delete skill");
    } finally {
      setSubmitting(false);
    }
  };

  const removeExperience = async (experienceId: string) => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      await adminApi.deleteExperience(token, experienceId);
      if (editingExperienceId === experienceId) resetExperienceDraft();
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to delete experience");
    } finally {
      setSubmitting(false);
    }
  };

  const removeEducation = async (educationId: string) => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      await adminApi.deleteEducation(token, educationId);
      if (editingEducationId === educationId) resetEducationDraft();
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to delete education");
    } finally {
      setSubmitting(false);
    }
  };

  const removeCertification = async (certificationId: string) => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      await adminApi.deleteCertification(token, certificationId);
      if (editingCertificationId === certificationId) resetCertificationDraft();
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to delete certification");
    } finally {
      setSubmitting(false);
    }
  };

  const saveProfile = async () => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      const body = {
        fullName: form.fullName,
        headline: form.headline,
        avatarUrl: form.avatarUrl,
        email: form.email,
        location: form.location,
        availability: form.availability,
        about: form.about,
        github: form.github,
        linkedin: form.linkedin,
        website: form.website,
      };

      if (content?.profile?.id) {
        await adminApi.updateProfile(token, content.profile.id, body);
      } else {
        await adminApi.createProfile(token, body);
      }

      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save profile");
    } finally {
      setSubmitting(false);
    }
  };

  const saveProject = async () => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      const body = {
        title: draftProject.title,
        subtitle: draftProject.subtitle,
        summary: draftProject.summary,
        description: draftProject.description,
        imageUrl: draftProject.imageUrl,
        liveUrl: draftProject.liveUrl,
        repoUrl: draftProject.repoUrl,
        caseStudyLink: draftProject.caseStudyLink || null,
        technologies: draftProject.technologies.split(",").map((item) => item.trim()).filter(Boolean),
      };

      if (editingProjectId) {
        await adminApi.updateProject(token, editingProjectId, body);
      } else {
        await adminApi.createProject(token, body);
      }

      resetProjectDraft();
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save project");
    } finally {
      setSubmitting(false);
    }
  };

  const saveSkill = async () => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      const body = {
        category: draftSkill.category,
        name: draftSkill.name,
        icon: draftSkill.icon,
      };

      if (editingSkillId) {
        await adminApi.updateSkill(token, editingSkillId, body);
      } else {
        await adminApi.createSkill(token, body);
      }

      resetSkillDraft();
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save skill");
    } finally {
      setSubmitting(false);
    }
  };

  const saveExperience = async () => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      const body = {
        company: draftExperience.company,
        role: draftExperience.role,
        location: draftExperience.location,
        startDate: toMonthValue(draftExperience.startDate),
        endDate: toMonthValue(draftExperience.endDate),
        description: draftExperience.description,
        bullets: draftExperience.bullets.split("\n").map((item) => item.trim()).filter(Boolean),
      };

      if (editingExperienceId) {
        await adminApi.updateExperience(token, editingExperienceId, body);
      } else {
        await adminApi.createExperience(token, body);
      }

      resetExperienceDraft();
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save experience");
    } finally {
      setSubmitting(false);
    }
  };

  const saveEducation = async () => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      const body = {
        institution: draftEducation.institution,
        degree: draftEducation.degree,
        field: draftEducation.field,
        location: draftEducation.location,
        description: draftEducation.description,
        startDate: toMonthValue(draftEducation.startDate),
        endDate: toMonthValue(draftEducation.endDate),
      };

      if (editingEducationId) {
        await adminApi.updateEducation(token, editingEducationId, body);
      } else {
        await adminApi.createEducation(token, body);
      }

      resetEducationDraft();
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save education");
    } finally {
      setSubmitting(false);
    }
  };

  const saveCertification = async () => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      const body = {
        title: draftCertification.title,
        issuer: draftCertification.issuer,
        year: draftCertification.year,
        credentialUrl: draftCertification.credentialUrl,
        issuedAt: toMonthValue(draftCertification.issuedAt),
      };

      if (editingCertificationId) {
        await adminApi.updateCertification(token, editingCertificationId, body);
      } else {
        await adminApi.createCertification(token, body);
      }

      resetCertificationDraft();
      await fetchAdminContent(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save certification");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    const bootstrap = async () => {
      try {
        const data = await adminApi.me(token);
        setUser(data.user);
        await fetchAdminContent(token);
      } catch {
        handleLogout();
      }
    };

    void bootstrap();
  }, [token]);

  const uploadFile = async (file: File): Promise<string> => {
    if (!token) throw new Error("Authentication token missing.");
    setSubmitting(true);
    setError(null);
    try {
      const res = await adminApi.uploadFile(token, file);
      return res.url;
    } catch (uploadErr) {
      const msg = uploadErr instanceof Error ? uploadErr.message : "File upload failed";
      setError(msg);
      throw uploadErr;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    email,
    password,
    showPassword,
    token,
    user,
    content,
    error,
    loading,
    submitting,
    form,
    draftProject,
    draftSkill,
    draftExperience,
    draftEducation,
    draftCertification,
    editingProjectId,
    editingSkillId,
    editingExperienceId,
    editingEducationId,
    editingCertificationId,
    setEmail,
    setPassword,
    setShowPassword,
    setDraftProject,
    setDraftSkill,
    setDraftExperience,
    setDraftEducation,
    setDraftCertification,
    updateForm,
    handleLogin,
    handleLogout,
    saveProfile,
    saveProject,
    saveSkill,
    saveExperience,
    saveEducation,
    saveCertification,
    removeProfile,
    removeProject,
    removeSkill,
    removeExperience,
    removeEducation,
    removeCertification,
    startEditProject,
    startEditSkill,
    startEditExperience,
    startEditEducation,
    startEditCertification,
    resetProjectDraft,
    resetSkillDraft,
    resetExperienceDraft,
    resetEducationDraft,
    resetCertificationDraft,
    formatDateInput,
    uploadFile,
  };
}
