import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Markdown {
    @PrimaryColumn({
        type: "int",
        width: 10
    })
    id!: number;

    @Column({
        type: "nvarchar",
        length: 2000
    })
    contentHTML!: string;

    @Column({
        type: "nvarchar",
        length: 2000
    })
    contentMarkdown!: string;

    @Column({
        type: "varchar",
        length: 100
    })
    description!: string;

    @Column({
        type: "int",
        width: 10
    })
    doctorId!: number;

    @Column({
        type: "int",
        width: 10
    })
    specialtyId!: number;

    @Column({
        type: "int",
        width: 10
    })
    clinicId!: number;

    @UpdateDateColumn()
    updateAt!:Date


    @OneToOne(() => User, user => user.markdown)
    @JoinColumn()
    user!: User;
}