import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ZodError } from "zod";
import { adminRouter } from "./api/admin.routes.js";
import { contactRouter } from "./api/contact.routes.js";
import { portfolioRouter } from "./api/portfolio.routes.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);
const configuredOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174,http://admin.localhost:5173")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin: string | undefined) => {
  if (!origin) return true;

  if (configuredOrigins.includes(origin)) return true;

  return /^http:\/\/(localhost|127\.0\.0\.1):517[3-9]$/.test(origin);
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ ok: true, service: "portfolio-backend" });
});

app.get("/", (_request, response) => {
  response.json({
    service: "portfolio-backend",
    health: "/health",
    portfolioApi: "/api/portfolio/content",
  });
});

app.use("/api/portfolio", portfolioRouter);
app.use("/api/admin", adminRouter);
app.use("/api/contact", contactRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);

  if (error instanceof ZodError) {
    response.status(400).json({
      error: error.issues.map((issue) => `${issue.path.join(".") || "request"}: ${issue.message}`).join("; "),
    });
    return;
  }

  response.status(500).json({ error: "Internal server error" });
});

app.use((_request, response) => {
  response.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Portfolio backend listening on http://localhost:${port}`);
});
