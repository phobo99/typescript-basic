import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Question {

    @PrimaryColumn({
        name: "question_id",
        type: "int",
        width: 3
    })
    questionId: number;

    @Column({
        type: "varchar",
        length: 250
    })
    title: string;

    @Column({
        type: "varchar",
        length:300
    })
    text: string;

    @ManyToMany(() => Category, category => category.questions)
    @JoinTable()
    categories: Category[];

}