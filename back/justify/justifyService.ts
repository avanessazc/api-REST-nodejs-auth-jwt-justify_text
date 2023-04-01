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
