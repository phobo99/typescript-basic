import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { Album } from "./entity/Album";
import { Author } from "./entity/Author";
createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "test-typeorm",
    entities: [Photo, PhotoMetadata, Author, Album],
    synchronize: true,
    logging: false
}).then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));

    // let photo = new Photo();
    // photo.name = "Me and Bears 456456";
    // photo.description = "I am near polar bears 123123";
    // photo.filename = "photo-with-bears.jpg";
    // photo.views = 1;
    // photo.isPublished = true;
    // let photoRepository = connection.getRepository(Photo);

    // create a photo metadata
    // let metadata = new PhotoMetadata();
    // metadata.height = 640;
    // metadata.width = 480;
    // metadata.compressed = true;
    // metadata.comment = "cybershoot456456";
    // metadata.orientation = "portrait";
    // metadata.photo = photo; // this way we connect them

    // await photoRepository.save(photo).then(photo => {
    //     console.log("Photo has been saved. Photo id is", photo.id);
    // });

    // photo.metadata = metadata; // this way we connect them

    // get entity repositories
    // let photoRepository = connection.getRepository(Photo);
    // let metadataRepository = connection.getRepository(PhotoMetadata);

    //LOADING FROM DB
    // let allPhoto = await photoRepository.find();
    // console.log("All photos from the db: ", allPhoto);

    // let firstPhoto = await photoRepository.findOne(1);
    // console.log("First photo from the db: ", firstPhoto);

    // let meAndBearsPhoto = await photoRepository.findOne({ name: "Me and Bears" });
    // console.log("Me and Bears photo from the db: ", meAndBearsPhoto);

    // let allViewedPhotos = await photoRepository.find({ views: 1 });
    // console.log("All viewed photos: ", allViewedPhotos);

    // let allPublishedPhotos = await photoRepository.find({ isPublished: true });
    // console.log("All published photos: ", allPublishedPhotos);

    // let [allPhotos, photosCount] = await photoRepository.findAndCount();
    // console.log("All photos: ", allPhotos);
    // console.log("Photos count: ", photosCount);

    //UPDATE
    // let photoToUpdate = await photoRepository.findOne(1);
    // photoToUpdate.name = "Me, my friends and polar bears 123123";
    // await photoRepository.save(photoToUpdate);

    // first we should save a photo
    // await photoRepository.save(photo);

    // photo is saved. Now we need to save a photo metadata
    // await metadataRepository.save(metadata);

    // done
    // console.log("Metadata is saved, and the relation between metadata and photo is created in the database too");

    //REMOVING
    // let photoToRemove = await photoRepository.findOne(2);
    // await photoRepository.remove(photoToRemove);

    // let photos = await photoRepository.find({ relations: ["metadata"] });
    // let photos = await connection
    //     .getRepository(Photo)
    //     .createQueryBuilder("photo")
    //     .innerJoinAndSelect("photo.metadata", "metadata")
    //     .getMany();
    // console.log(photos);


    // create a few albums
    // let album1 = new Album();
    // album1.name = "Bears";
    // await connection.manager.save(album1);

    // let album2 = new Album();
    // album2.name = "Me";
    // await connection.manager.save(album2);

    // create a few photos
    // let photo = new Photo();
    // photo.name = "Me and Bears";
    // photo.description = "I am near polar bears";
    // photo.filename = "photo-with-bears.jpg";
    // photo.views = 1
    // photo.isPublished = true
    // photo.albums = [album1, album2];
    // await connection.manager.save(photo);

    // now our photo is saved and albums are attached to it
    // now lets load them:
    // const loadedPhoto = await connection
    //     .getRepository(Photo)
    //     .findOne(19, { relations: ["albums"] });
    // console.log(loadedPhoto);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
