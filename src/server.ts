import express from "express";
import cors from "cors"; // 👈 1. AGREGAMOS ESTO
import { authRouter } from "./interfaces/routes/auth.routes";
import { pingRouter } from "./interfaces/routes/ping.routes";

const app = express();
app.use(express.json());
app.use(cors()); // 👈 2. AGREGAMOS ESTO (Importante: antes de las rutas)

app.use(authRouter);
app.use(pingRouter);

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});