import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class PhotoMetadata {

    @PrimaryColumn({
        type: "int",
        width: 5,
        name: "photo_metadata_id"
    })
    photoMetadataId: number;

    @Column({
        type: "int",
        width: 5
    })
    height: number;

    @Column({
        type: "int",
        width: 5
    })
    width: number;

    @Column({
        type: "varchar",
        length: 50
    })
    orientation: string;

    @Column({
        type: "boolean"
    })
    compressed: boolean;

    @Column({
        type: "varchar",
        length: 200
    })
    comment: string;

    // @OneToOne(type => Photo, photo => photo.metadata)
    @JoinColumn()
    photo: Photo;
}