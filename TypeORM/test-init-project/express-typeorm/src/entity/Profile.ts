import { Entity, Column, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {

    @PrimaryColumn({
        name: "profile_id",
        type: "int",
        width: 10
    })
    profileId: number;

    @Column({
        type: "varchar",
        length: 20
    })
    gender: string;

    @Column({
        type: "blob"
    })
    photo: string;

    @OneToOne(() => User, user => user.profile) // specify inverse side as a second parameter
    user: User;

}