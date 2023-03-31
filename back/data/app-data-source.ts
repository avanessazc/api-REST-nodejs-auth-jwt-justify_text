import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

export const dataSource = new DataSource({
  type: "postgres",
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [User],
});