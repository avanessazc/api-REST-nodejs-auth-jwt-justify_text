import { Request, Response } from "express";
import { hashData, createNewUser, isEmail, createToken } from "./authService";
import { HttpCode } from "../types/httpCode";
import { User } from "../entities/user.entity";

export const api_token_post = async (req: Request, res: Response) => {
  if (!isEmail(req.body.email)) {
    const httpCode: HttpCode = {
      status: 400,
      message: "Email is not valid",
    };
    res.status(httpCode.status).send(httpCode);
  } else if (req.body.password === "") {
    const httpCode: HttpCode = {
      status: 400,
      message: "Password is missing",
    };
    res.status(httpCode.status).send(httpCode);
  } else {
    const hash = await hashData(req.body.password);
    const ret: { user: User; httpCode: HttpCode } = await createNewUser({
      email: req.body.email,
      password: hash,
    });
    if (ret.httpCode.status === 201) {
      const token = createToken(ret.user.id);
      res.status(ret.httpCode.status).json({ token });
    } else {
      res.status(ret.httpCode.status).send(ret.httpCode);
    }
  }
};

export const api_justify_post = (req: Request, res: Response) => {
  if (req.method === "POST" && req.headers["content-type"] === "text/plain") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      res.end("Received text: " + data);
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
};
