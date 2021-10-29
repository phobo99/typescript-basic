import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class Album {

    @PrimaryColumn({
        name: "album_id",
        type: "int",
        width: 5
    })
    albumId: number;

    @Column({
        type: "varchar",
        length: 50
    })
    name: string;

    @ManyToMany(() => Photo, photo => photo.albums)
    @JoinTable()
    photos: Photo[];

}

