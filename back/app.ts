import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authRouters } from "./routers/authRouters";
import { dataSource } from "./data/app-data-source";
import * as fs from "fs";
import * as https from "https";

import "reflect-metadata";

dotenv.config({ path: __dirname + "/.env" });
const port = process.env.PORT;

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

const httpsOpitons = {
  cert: fs.readFileSync("/etc/node/ssl/server.crt"),
  key: fs.readFileSync("/etc/node/ssl/server.key"),
};

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server:)");
});
app.use(authRouters);

https.createServer(httpsOpitons, app).listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
