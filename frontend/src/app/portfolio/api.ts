import { getPortfolioContent } from "./service";

export async function fetchPortfolioContent() {
  return Promise.resolve(getPortfolioContent());
}

export async function fetchProjects() {
  return Promise.resolve(getPortfolioContent().projects);
}

export async function fetchSkills() {
  return Promise.resolve(getPortfolioContent().skills);
}

export async function fetchExperience() {
  return Promise.resolve(getPortfolioContent().experience);
}
