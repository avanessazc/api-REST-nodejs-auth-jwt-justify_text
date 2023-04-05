import { Router } from "express";
import { api_token_post } from "../auth/authController";

export const authRouters = Router();

authRouters.post("/api/token", api_token_post);