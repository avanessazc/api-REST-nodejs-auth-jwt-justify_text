import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { authRouters } from './routers/authRouters';

dotenv.config();

const app: Express = express();
app.use(express.json())

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server:)');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.use(authRouters)