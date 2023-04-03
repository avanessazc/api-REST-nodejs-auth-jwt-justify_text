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

const justifyLine = (line: string, maxLength: number): string => {
  const words = line.split(/ +/);
  let numberOfChars = 0;
  for (let i = 0; i < words.length; i++) {
    numberOfChars = numberOfChars + words[i].length;
  }
  let spacesToDistribute: number = maxLength - numberOfChars;
  const newLine: string[] = words.map((word: string, index: number) => {
    const numGaps = words.length - index - 1;
    const padding = (spacesToDistribute / numGaps) | 0;
    spacesToDistribute -= padding;
    return word.padEnd(word.length + padding);
  });
  return newLine.join("");
};

export const justifyText = (text: string, maxLength: number): string => {
  const paragraphes: string[] = text.split(/[\n]+/gm);
  const newParagraphs: string[] = [];
  for (let i = 0; i < paragraphes.length; i++) {
    const lines = getLines(paragraphes[i], maxLength);
    const justifiedLines = lines.map((line: string) =>
      justifyLine(line, maxLength)
    );
    newParagraphs.push(justifiedLines.join("\n"));
  }
  return newParagraphs.join("\n\n");
};
