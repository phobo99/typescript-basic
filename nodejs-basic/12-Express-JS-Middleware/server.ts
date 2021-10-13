import express from 'express';
import userRouter from "./router/userRouter";
import apiRouter from "./router/apiRouter";
import appLogger from "./middlewares/appLogger";

const app: express.Application = express();

const hostname: string = '127.0.0.1';   //optional, same localhost
const port: number = 5001;

//configure middleware
app.use(appLogger);

//configure express to receive from data
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello world !!!')
})
app.use('/users', userRouter)
app.use('/api', apiRouter)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})