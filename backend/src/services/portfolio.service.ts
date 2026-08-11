import { getPortfolioRepository } from "../repositories/portfolio.repository.js";

const portfolioRepository = getPortfolioRepository();

export function getPortfolioContent() {
  return portfolioRepository;
}

export function getProjects() {
  return portfolioRepository.projects;
}

export function getSkills() {
  return portfolioRepository.skills;
}

export function getExperience() {
  return portfolioRepository.experience;
}
