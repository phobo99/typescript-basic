import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { Profile } from "./entity/Profile";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { Category } from "./entity/Category";
import { Question } from "./entity/Question";

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "typeorm-example",
    entities: [
        __dirname + "/entity/*.ts"
    ],
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

    // ONE TO ONE 

    // const profile = new Profile();
    // profile.gender = "male";
    // profile.photo = "me.jpg";
    // await connection.manager.save(profile);

    // const user = new User();
    // user.firstName = 'Joe Smith';
    // user.lastName = 'Google';
    // user.age = 31;
    // user.profile = profile;
    // await connection.manager.save(user);

    // const userRepository = connection.getRepository(User);
    // const users = await userRepository.delete({ id: 3 });
    // console.log(users);


    // ONE TO MANY/ MANY TO ONE

    // const photo1 = new Photo();
    // photo1.url = "me.jpg";
    // await connection.manager.save(photo1);

    // const photo2 = new Photo();
    // photo2.url = "me-and-bears.jpg";
    // await connection.manager.save(photo2);

    // const user = new User();
    // user.name = "John";
    // user.photos = [photo1, photo2];
    // await connection.manager.save(user);

    // const users = await connection
    // .getRepository(User)
    // .createQueryBuilder("user")
    // .leftJoinAndSelect("user.photos", "photo")
    // .getMany();
    // console.log(users);

    //MANY-TO-MANY
    

    const users = await connection
    .getRepository(Question)
    .createQueryBuilder("question")
    .leftJoinAndSelect("question.categories", "category")
    .getMany();

    const categoriesWithQuestions = await connection
    .getRepository(Category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.questions", "question")
    .getMany();

    console.log(users);

    console.log(categoriesWithQuestions);
    


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
