import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryColumn({
        type: "int",
        width: 10
    })
    id!: number;

    @Column({
        type: "varchar",
        length: 10
    })
    statusId!: string;

    @Column({
        type: "int",
        width: 10
    })
    doctorID!: number;

    @Column({
        type: "int"
    })
    patientId!: number;

    @CreateDateColumn()
    date!: Date;

    @Column({
        type: 'date'
    })
    timeType!: string;

    constructor(args: Partial<Booking>) {
        Object.assign(this, args)
    }
}