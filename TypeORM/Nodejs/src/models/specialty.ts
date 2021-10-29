import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Specialty {
    @PrimaryColumn({
        type: "int",
        width: 10
    })
    id!: number;

    @Column({
        type: "varchar",
        length: 100
    })
    name!: string;

    @Column({
        type: "varchar",
        length: 200
    })
    image!: string;

    @Column({
        type: "varchar",
        length: 100
    })
    description!: string;
}