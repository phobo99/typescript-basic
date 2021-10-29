import { Entity, Column, ManyToOne, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Album } from "./Album";
import { Author } from "./Author";
import { User } from "./User";

@Entity()
export class Photo {

    @PrimaryColumn({
        name: "photo_id",
        type: "int",
        width: 10
    })
    photoId: number;

    @Column({
        type: "varchar",
        length: 200
    })
    url: string;

    @ManyToOne(() => User, user => user.photos)
    user: User;

    @ManyToMany(() => Album, album => album.photos)
    @JoinTable()
    albums: Album[];

    @ManyToOne(() => Author, author => author.photos)
    author: Author;

}