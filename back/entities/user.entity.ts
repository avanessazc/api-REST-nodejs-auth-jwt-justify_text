import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ nullable: false, type: "varchar", length: 200 })
  password: string;
}
