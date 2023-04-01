import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    try {
      jwt.verify(bearerToken, process.env.TOKEN_SECRET);
      next();
    } catch (e: any) {
      return res.status(403).end(e.message);
    }
  } else {
    return res.status(403).end("There is no token");
  }
};
