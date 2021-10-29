import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class AllCode {
    constructor(args: Partial<AllCode>) {
        Object.assign(this, args)
    }

    @PrimaryColumn({
        type: "varchar",
        length: 10,
    })
    keyMap!: string;

    @Column({
        type: "varchar",
        length: 10
    })
    type!: string;

    @Column({
        type: "varchar",
        length: 50
    })
    valueEn!: string;

    @Column({
        type: "varchar",
        length: 50
    })
    valueVi!: string;


    @OneToMany(() => User, user => user.allcode)
    users!: User[];


}