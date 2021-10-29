import { Entity, Column, OneToMany, PrimaryColumn, OneToOne } from "typeorm";
import { Photo } from "./Photo";
import { Profile } from "./Profile";

@Entity()
export class User {

    @PrimaryColumn({
        name: "user_id",
        type: "int",
        width: 10
    })
    userId: number;

    @Column({
        type: "varchar",
        length: 50
    })
    name: string;

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[];

    @OneToOne(() => Profile, profile => profile.user) // specify inverse side as a second parameter
    profile: Profile;

}