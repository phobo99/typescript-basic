import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { AllCode } from "./allcode";
import { Markdown } from "./markdown";

@Entity()
export class User {
    @PrimaryColumn({
        type: "int",
        width: 10
    })
    @Generated()
    id!: number;

    @Column({
        type: "varchar",
        length: 50
    })
    email!: string;

    @Column({
        type: "varchar",
        length: 50,
        select: false
    })
    password!: string;

    @Column({
        type: "varchar",
        length: 50
    })
    firstName!: string;

    @Column({
        type: "varchar",
        length: 50
    })
    lastName!: string;

    @Column({
        type: "varchar",
        length: 200
    })
    address?: string;

    @Column({
        type: "varchar",
        length: 20
    })
    phoneNumber?: string;

    @Column({
        type: "varchar",
        length: 10
    })
    gender!: string;

    @Column({
        type: "varchar",
        length: 200,
        select: false
    })
    image?: string;

    @Column({
        type: "varchar",
        length: 10
    })
    roleId?: string;

    @Column({
        type: "varchar",
        length: 10
    })
    positionId?: string;

    @OneToOne(() => Markdown, markdown => markdown.user)
    @JoinColumn()
    markdown!: Markdown;

    @ManyToOne(() => AllCode, allcode => allcode.users)
    allcode!: AllCode;


}