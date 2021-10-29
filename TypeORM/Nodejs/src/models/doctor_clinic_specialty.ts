import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DoctorClinicSpecialty {
    @PrimaryColumn({
        type: "int",
        width: 10
    })
    id!: number;

    @Column({
        type: "int",
        length: 10
    })
    doctorId!: number;

    @Column({
        type: "int",
        length: 10
    })
    clinicId!: number;

    @Column({
        type: "int",
        length: 10
    })
    specialtyId!: number;
    
}