import { Router } from "express";
import {
  getExperience,
  getPortfolioContent,
  getProjects,
  getSkills,
} from "../services/portfolio.service.js";

export const portfolioRouter = Router();

portfolioRouter.get("/content", async (_request, response, next) => {
  try {
    response.json(await getPortfolioContent());
  } catch (error) {
    next(error);
  }
});

portfolioRouter.get("/projects", async (_request, response, next) => {
  try {
    response.json(await getProjects());
  } catch (error) {
    next(error);
  }
});

portfolioRouter.get("/skills", async (_request, response, next) => {
  try {
    response.json(await getSkills());
  } catch (error) {
    next(error);
  }
});

portfolioRouter.get("/experience", async (_request, response, next) => {
  try {
    response.json(await getExperience());
  } catch (error) {
    next(error);
  }
});
