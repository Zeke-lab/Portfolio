import { Router } from "express";
import {
  getExperience,
  getPortfolioContent,
  getProjects,
  getSkills,
} from "../services/portfolio.service.js";

export const portfolioRouter = Router();

portfolioRouter.get("/content", (_request, response) => {
  response.json(getPortfolioContent());
});

portfolioRouter.get("/projects", (_request, response) => {
  response.json(getProjects());
});

portfolioRouter.get("/skills", (_request, response) => {
  response.json(getSkills());
});

portfolioRouter.get("/experience", (_request, response) => {
  response.json(getExperience());
});
