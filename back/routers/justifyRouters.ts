import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { api_justify_post } from "../justify/justifyController";

export const justifyRouters = Router();

justifyRouters.post("/api/justify", requireAuth, api_justify_post);
