import express from 'express';
import userRouter from "./router/userRouter";

const app: express.Application = express();

const hostname: string = '127.0.0.1';   //optional, same localhost
const port: number = 5001;

//configure express to receive from data
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello world !!!')
})
app.use('/users', userRouter)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})