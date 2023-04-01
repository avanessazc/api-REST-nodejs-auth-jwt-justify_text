import * as argon2 from "argon2";
import { dataSource } from "../data/app-data-source";
import { HttpCode } from "../types/httpCode";
import jwt from "jsonwebtoken";
import { User } from "../entities";

export const hashData = async (data: string): Promise<string> => {
  const hash = await argon2.hash(data);
  return hash;
};

export const isEmail = (email: string): boolean => {
  if (email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }
  return false;
};

export const createToken = (id: number): string => {
  const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_TIME_TOKEN,
  });
  return token;
};

export const createNewUser = async (data: {
  email: string;
  password: string;
}): Promise<{ user: User; httpCode: HttpCode }> => {
  try {
    const newUser = await dataSource.getRepository(User).save(data);
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
