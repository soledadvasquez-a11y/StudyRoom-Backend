"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = require("./interfaces/routes/auth.routes");
const ping_routes_1 = require("./interfaces/routes/ping.routes");
const music_routes_1 = require("./interfaces/routes/music.routes");
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
];
app.use((0, cors_1.default)({
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
}));
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Backend funcionando 🚀");
});
app.use("/api/auth", auth_routes_1.authRouter);
app.use("/api/ping", ping_routes_1.pingRouter);
app.use("/api/music", music_routes_1.musicRouter);
const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
