export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type SocialLink = {
  id?: string;
  label: string;
  url: string;
  order: number;
};

export type ProfileContent = {
  id: string;
  fullName: string;
  headline?: string | null;
  avatarUrl?: string | null;
  resumePhotoUrl?: string | null;
  email?: string | null;
  location?: string | null;
  availability?: string | null;
  intro?: string | null;
  about?: string | null;
  socialLinks?: SocialLink[];
};

export type ProjectTechnology = {
  id?: string;
  name: string;
  order: number;
};

export type ProjectCaseStudy = {
  problem?: string | null;
  approach?: string | null;
  solution?: string | null;
  implementation?: string | null;
  execution?: string | null;
  results?: string | null;
};

export type ProjectContent = {
  id: string;
  title: string;
  subtitle?: string | null;
  summary?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  caseStudyLink?: string | null;
  technologies?: ProjectTechnology[];
  caseStudy?: ProjectCaseStudy | null;
  gallery?: { imageUrl: string; caption?: string | null }[];
};

export type SkillContent = {
  id: string;
  category: string;
  name: string;
  icon?: string | null;
  visible: boolean;
};

export type ExperienceBullet = {
  id?: string;
  text: string;
  order: number;
};

export type ExperienceContent = {
  id: string;
  company: string;
  role: string;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description: string;
  bullets?: ExperienceBullet[];
};

export type EducationContent = {
  id: string;
  institution: string;
  degree?: string | null;
  field?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: string | null;
};

export type CertificationContent = {
  id: string;
  title: string;
  issuer: string;
  year?: string | null;
  credentialUrl?: string | null;
  issuedAt?: string | null;
};

export type AdminContent = {
  profile: ProfileContent | null;
  projects: ProjectContent[];
  skills: SkillContent[];
  experience: ExperienceContent[];
  education: EducationContent[];
  certifications: CertificationContent[];
};

export type ProfileForm = {
  fullName: string;
  headline: string;
  avatarUrl: string;
  resumePhotoUrl: string;
  email: string;
  location: string;
  availability: string;
  intro: string;
  github: string;
  linkedin: string;
  website: string;
  about: string;
};

export type ProjectDraft = {
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
  caseStudyLink: string;
  technologies: string;
  caseStudyProblem: string;
  caseStudyApproach: string;
  caseStudySolution: string;
  caseStudyImplementation: string;
  caseStudyExecution: string;
  caseStudyResults: string;
  coreFeatures: string[];
  gallery: string;
};

export type SkillDraft = {
  category: string;
  name: string;
  icon: string;
};

export type ExperienceDraft = {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets: string;
};

export type EducationDraft = {
  institution: string;
  degree: string;
  field: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type CertificationDraft = {
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string;
  issuedAt: string;
};
