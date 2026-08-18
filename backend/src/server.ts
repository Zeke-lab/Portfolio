import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { adminRouter } from "./api/admin.routes.js";
import { contactRouter } from "./api/contact.routes.js";
import { portfolioRouter } from "./api/portfolio.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT ?? 4000);
const configuredOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173,http://admin.localhost:5173")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || configuredOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(express.json());

const uploadsDir = path.resolve(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsDir));

app.get("/health", (_request, response) => {
  response.json({ ok: true, service: "portfolio-backend" });
});

app.use("/api/portfolio", portfolioRouter);
app.use("/api/admin", adminRouter);
app.use("/api/contact", contactRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: "Internal server error" });
});

app.use((_request, response) => {
  response.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Portfolio backend listening on http://localhost:${port}`);
});
