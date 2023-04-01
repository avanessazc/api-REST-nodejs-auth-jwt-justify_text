import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { api_token_post } from "../auth/authController";
import { api_justify_post } from "../justify/justifyController";

export const authRouters = Router();

authRouters.post("/api/token", api_token_post);
authRouters.post("/api/justify", requireAuth, api_justify_post);
