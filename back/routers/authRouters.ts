import { Router } from "express";
import { api_justify_post, api_token_post } from "../auth/authController";
import { requireAuth } from "../middleware/authMiddleware";

export const authRouters = Router();

authRouters.post("/api/token", api_token_post);
authRouters.post("/api/justify", requireAuth, api_justify_post);
