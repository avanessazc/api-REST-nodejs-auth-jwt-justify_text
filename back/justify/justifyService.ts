import { dataSource } from "../data/app-data-source";
import { Token } from "../entities";
import { HttpCode } from "../types/httpCode";

export const updateToken = async (data: {
  token: string;
  words: number;
}): Promise<{ httpCode: HttpCode }> => {
  try {
    const ret = await dataSource
      .createQueryBuilder()
      .update(Token)
      .set({ words: data.words })
      .where("token = :token", { token: data.token })
      .execute();
    if (ret.affected === 0) {
      await dataSource.getRepository(Token).save(data);
    }
    return {
      httpCode: { status: 201, message: "TokenWords was updated" },
    };
  } catch (error: any) {
    return {
      httpCode: { status: 409, message: error.message },
    };
  }
};

export const tokenWords = async (token: string): Promise<Token | null> => {
  const ret = await dataSource.getRepository(Token).findOneBy({
    token: token,
  });
  return ret;
};

export const getLines = (text: string, maxLength: number): string[] => {
  const words: string[] = text.split(/\s+/);
  let lineLength = 0;
  const lines: string[] = [];
  let line = "";
  for (let i = 0; i < words.length; i++) {
    const currentWord: string = words[i];
    const currentwordLen: number = currentWord.length;
    const nextWord: string = words[i + 1];
    const nextWordLen: number = nextWord ? nextWord.length : 0;
    if (lineLength + currentwordLen === maxLength) {
      line += currentWord;
      lines.push(line.trim());
      lineLength = 0;
      line = "";
      continue;
    } else if (lineLength + currentwordLen < maxLength) {
      line += currentWord;
      line += " ";
      lineLength = line.length;
    }
    if (lineLength + nextWordLen > maxLength) {
      lines.push(line.trim());
      lineLength = 0;
      line = "";
    }
  }
  if (line) {
    lines.push(line.trim());
  }
  return lines;
};
