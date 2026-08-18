import { db } from "../db/client.js";

export function getContactRepository() {
  return {
    create(data: { name: string; email: string; subject?: string; message: string }) {
      return db.contactMessage.create({
        data: {
          ...data,
          status: "draft",
        },
      });
    },
  };
}
