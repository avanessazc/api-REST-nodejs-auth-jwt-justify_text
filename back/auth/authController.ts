import { Request, Response } from "express";
import { hashData, createNewUser } from "./authService";
import { HttpCode } from "../types/httpCode";
import { User } from "../entities/user.entity";

export const api_token_post = async (req: Request, res: Response) => {
  const hash = await hashData(req.body.password);
  const ret: { user: User; httpCode: HttpCode } = await createNewUser({
    email: req.body.email,
    password: hash,
  });
  if (ret.httpCode.status === 201) {
    res.status(ret.httpCode.status).send(ret.user);
  } else {
    res.status(ret.httpCode.status).send(ret.httpCode);
  }
};
