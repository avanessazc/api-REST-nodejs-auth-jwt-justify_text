import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authRouters } from "./routers/authRouters";
import { dataSource } from "./data/app-data-source";

import "reflect-metadata";

dotenv.config({ path: __dirname + "/.env" });

// establish database connection
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app: Express = express();
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server:)");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.use(authRouters);
