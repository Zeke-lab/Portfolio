import { CASE_STUDY, CERTS, EXPERIENCE, PROJECTS, SKILLS, TECH_GRID } from "./content";

export function getPortfolioRepository() {
  return {
    skills: SKILLS,
    projects: PROJECTS,
    experience: EXPERIENCE,
    caseStudy: CASE_STUDY,
    techGrid: TECH_GRID,
    certs: CERTS,
  };
}
