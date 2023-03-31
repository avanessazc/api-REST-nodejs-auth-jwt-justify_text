import * as argon2 from "argon2";
import { dataSource } from "../data/app-data-source";
import { User } from "../entities/user.entity";
import { HttpCode } from "../types/httpCode";

export const hashData = async (data: string): Promise<string> => {
  const hash = await argon2.hash(data);
  return hash;
};

export const createNewUser = async (data: {
  email: string;
  password: string;
}): Promise<{ user: User; httpCode: HttpCode }> => {
  try {
    const newUser = await dataSource.getRepository(User).save(data);
    console.log(newUser);
    return {
      user: newUser,
      httpCode: { status: 201, message: "User was created" },
    };
  } catch (error: any) {
    return {
      user: new User(),
      httpCode: { status: 409, message: error.message },
    };
  }
};
