// src/server.ts
import "dotenv/config";
import express from "express";
import cors from "cors";

import { authRouter } from "./interfaces/routes/auth.routes";
import { pingRouter } from "./interfaces/routes/ping.routes";
import { musicRouter } from "./interfaces/routes/music.routes";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origin, como Postman, navegador directo o health checks
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("No permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Backend funcionando 🚀");
});

app.use("/api/auth", authRouter);
app.use("/api/ping", pingRouter);
app.use("/api/music", musicRouter);

const PORT = process.env.PORT || 3000;

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});