import { Router } from "express";
import { ZodError } from "zod";
import { createContactMessage } from "../services/contact.service.js";

export const contactRouter = Router();

contactRouter.post("/", async (request, response, next) => {
  try {
    const message = await createContactMessage(request.body);
    response.status(201).json({ id: message.id, createdAt: message.createdAt });
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({ error: "Invalid contact message", issues: error.flatten() });
      return;
    }

    next(error);
  }
});
