import {
  CASE_STUDY,
  CERTS,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  TECH_GRID,
  TESTIMONIALS,
} from "./portfolio.content.js";

export function getPortfolioRepository() {
  return {
    skills: SKILLS,
    projects: PROJECTS,
    experience: EXPERIENCE,
    caseStudy: CASE_STUDY,
    techGrid: TECH_GRID,
    testimonials: TESTIMONIALS,
    certs: CERTS,
  };
}
