import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class History {
    @PrimaryColumn({
        type: "int",
        width: 10
    })
    id!: number;

    @Column({
        type: "int",
        length: 10
    })
    patientId!: number;
    @Column({
        type: "int",
        length: 10
    })
    doctorId!: number;
    @Column({
        type: "varchar",
        length: 100
    })
    description!: string;
    @Column({
        type: "varchar",
        length: 100
    })
    files!: string;
}