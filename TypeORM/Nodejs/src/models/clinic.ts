import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Clinic {
    @PrimaryColumn({
        type: "int",
        width: 10
    })
    id!: number;

    @Column({
        type: "varchar",
        length: 10
    })
    name!: string;

    @Column({
        type: "varchar",
        length: 100
    })
    address!: string;

    @Column({
        type: "varchar",
        length: 100
    })
    description!: string;

    @Column({
        type: "varchar",
        length: 200
    })
    image!: string;
}