import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { portfolioRouter } from "./api/portfolio.routes.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ ok: true, service: "portfolio-backend" });
});

app.use("/api/portfolio", portfolioRouter);

app.use((_request, response) => {
  response.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Portfolio backend listening on http://localhost:${port}`);
});
