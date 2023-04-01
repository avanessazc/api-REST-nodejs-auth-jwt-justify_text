import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "token" })
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "varchar", length: 200, unique: true })
  token: string;

  @Column({ nullable: false, type: "int" })
  words: number;
}
