import express from "express";
import cors from "cors"; 
import { authRouter } from "./interfaces/routes/auth.routes";
import { pingRouter } from "./interfaces/routes/ping.routes";

const app = express();

app.use(cors()); // (Permite que tu React se conecte)
app.use(express.json());

app.use(authRouter);
app.use(pingRouter);

app.get("/", (_req, res) => {
  res.send("Backend funcionando 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});