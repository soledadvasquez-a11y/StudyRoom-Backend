// src/server.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { authRouter } from './interfaces/routes/auth.routes';
import { pingRouter } from './interfaces/routes/ping.routes';
import { musicRouter } from './interfaces/routes/music.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Backend funcionando 🚀');
});

app.use('/api/auth', authRouter);
app.use('/api/ping', pingRouter);
app.use('/api/music', musicRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});