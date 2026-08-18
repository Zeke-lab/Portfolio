import { getPortfolioRepository } from "../repositories/portfolio.repository.js";

const portfolioRepository = getPortfolioRepository();

export function getPortfolioContent() {
  return portfolioRepository.getContent();
}

export function getProjects() {
  return portfolioRepository.getProjects();
}

export function getSkills() {
  return portfolioRepository.getSkills();
}

export function getExperience() {
  return portfolioRepository.getExperience();
}
