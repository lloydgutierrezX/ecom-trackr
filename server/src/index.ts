import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes/index';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `🚫 Route not found: ${req.originalUrl}`,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});