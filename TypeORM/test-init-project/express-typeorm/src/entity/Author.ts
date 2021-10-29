import { Entity, Column, OneToMany, JoinColumn, PrimaryColumn } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class Author {

    @PrimaryColumn({
        name: "author_id",
        type: "int",
        width: 5
    })
    authorId: number;

    @Column({
        type: "varchar",
        length: 10
    })
    name: string;

    @OneToMany(type => Photo, photo => photo.author) // note: we will create author property in the Photo class below
    photos: Photo[];
}