import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import initWebRoutes from './route/web';
import dotenv from 'dotenv';

import "reflect-metadata";
import { createConnection, getConnectionManager } from "typeorm";

dotenv.config();


const app: express.Application = express();
const connect = async () => {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123456",
      database: "typeorm-nodejs",
  });
  await connection.connect(); 
}

connect();
// createConnection({
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   password: "123456",
//   database: "typeorm-nodejs",
//   entities: [
//     __dirname + "/models/*.ts"
//   ],
//   synchronize: true,
//   logging: false
// }).then(() => {
//   app.use((req: Request, res: Response, next: NextFunction) => {
//     res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT || '');
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//     );
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'X-Requested-With,content-type',
//     );
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
//   });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  initWebRoutes(app);

  const port = process.env.PORT || 6969;

  app.listen(port, () => {
    console.log('Backend Nodejs is running on the port:' + port);
  });
// }).catch(error => console.log(error));


