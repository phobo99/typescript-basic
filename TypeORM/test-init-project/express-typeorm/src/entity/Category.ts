import { Entity, Column, ManyToMany, PrimaryColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class Category {

    @PrimaryColumn({
        name: "category_id",
        type: "int",
        width: 5
    })
    categoryId: number;

    @Column({
        type: "varchar",
        length: 50
    })
    name: string;

    @ManyToMany(() => Question, question => question.categories)
    questions: Question[];
}