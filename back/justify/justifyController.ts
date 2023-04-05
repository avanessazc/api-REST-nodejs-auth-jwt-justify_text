import { Request, Response } from "express";
import { justifyText, tokenWords, updateToken } from "./justifyService";
import { Token } from "../entities";

export const api_justify_post = (req: Request, res: Response) => {
  if (req.method === "POST" && req.headers["content-type"] === "text/plain") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      const bearerHeader = req.headers["authorization"];
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const token: Token | null = await tokenWords(bearerToken);
      const totalWords: number = data.split(/\s+/).length;
      if (
        (token === null &&
          totalWords <= parseInt(process.env.MAX_WORDS_QUANTITY)) ||
        (token !== null &&
          token.words + totalWords <= parseInt(process.env.MAX_WORDS_QUANTITY))
      ) {
        const words: number =
          token === null ? totalWords : totalWords + token.words;
        const ret = await updateToken({ token: bearerToken, words: words });
        if (ret.httpCode.status === 409) {
          res.status(ret.httpCode.status).send(ret.httpCode.message);
        }
        const text: string = justifyText(data, 80);
        res.end(text);
      } else {
        res.status(402).send("Payment Required");
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
};
