import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const optionalString = z.string().optional().or(z.literal(""));

export const profileCreateSchema = z.object({
  fullName: z.string().min(1),
  headline: optionalString,
  avatarUrl: optionalString,
  email: optionalString,
  location: optionalString,
  availability: optionalString,
  about: optionalString,
  github: optionalString,
  linkedin: optionalString,
  website: optionalString,
});

export const profileUpdateSchema = profileCreateSchema;

export const projectCreateSchema = z.object({
  title: z.string().min(1),
  subtitle: optionalString,
  summary: optionalString,
  description: optionalString,
  imageUrl: optionalString,
  liveUrl: optionalString,
  repoUrl: optionalString,
  caseStudyLink: optionalString,
  technologies: z.array(z.string()).optional().default([]),
});

export const projectUpdateSchema = projectCreateSchema;

export const skillCreateSchema = z.object({
  category: z.string().min(1),
  name: z.string().min(1),
  icon: optionalString,
});

export const skillUpdateSchema = skillCreateSchema;

export const experienceCreateSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  location: optionalString,
  startDate: optionalString,
  endDate: optionalString,
  description: z.string().min(1),
  bullets: z.array(z.string()).optional().default([]),
});

export const experienceUpdateSchema = experienceCreateSchema;

export const educationCreateSchema = z.object({
  institution: z.string().min(1),
  degree: optionalString,
  field: optionalString,
  location: optionalString,
  description: optionalString,
  startDate: optionalString,
  endDate: optionalString,
});

export const educationUpdateSchema = educationCreateSchema;

export const certificationCreateSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  year: optionalString,
  credentialUrl: optionalString,
  issuedAt: optionalString,
});

export const certificationUpdateSchema = certificationCreateSchema;

export const idParamSchema = z.object({ id: z.string().min(1) });

export type LoginInput = z.infer<typeof loginSchema>;
export type ProfileInput = z.infer<typeof profileCreateSchema>;
export type ProjectInput = z.infer<typeof projectCreateSchema>;
export type SkillInput = z.infer<typeof skillCreateSchema>;
export type ExperienceInput = z.infer<typeof experienceCreateSchema>;
export type EducationInput = z.infer<typeof educationCreateSchema>;
export type CertificationInput = z.infer<typeof certificationCreateSchema>;
