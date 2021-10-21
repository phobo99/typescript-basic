import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT || '');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

initWebRoutes(app);

connectDB();

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log('Backend Nodejs is running on the port:' + port);
});
