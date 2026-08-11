import { getPortfolioRepository } from "./repository";

const portfolioRepository = getPortfolioRepository();

export const SKILLS = portfolioRepository.skills;
export const PROJECTS = portfolioRepository.projects;
export const EXPERIENCE = portfolioRepository.experience;
export const CASE_STUDY = portfolioRepository.caseStudy;
export const TECH_GRID = portfolioRepository.techGrid;
export const CERTS = portfolioRepository.certs;

export function getPortfolioContent() {
  return portfolioRepository;
}
