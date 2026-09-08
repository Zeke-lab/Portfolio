import { z } from "zod";
import { getContactRepository } from "../repositories/contact.repository.js";

const contactRepository = getContactRepository();

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(1).max(100),
  message: z.string().trim().min(10).max(5_000),
});

export async function createContactMessage(input: unknown) {
  const message = contactMessageSchema.parse(input);
  return contactRepository.create(message);
}
