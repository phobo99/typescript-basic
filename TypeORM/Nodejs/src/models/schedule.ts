import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Schedule {
    @PrimaryColumn({
        type: "int",
        width: 10
    })
    id!: number;

    @Column({
        type: "int",
        length: 5
    })
    currentNumber!: number;

    @Column({
        type: "int",
        length: 5
    })
    maxNumber!: number;

    @Column({
        type: "date"
    })
    date!: Date;

    @Column({
        type: "varchar",
        length: 10
    })
    timeType!: string;

    @Column({
        type: "int",
        length: 10
    })
    doctorId!: number;
}