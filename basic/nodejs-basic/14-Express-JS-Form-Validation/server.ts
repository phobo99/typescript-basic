import express from 'express';
import userRouter from "./router/userRouter";

const app: express.Application = express();

//configure express to receive form data
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const hostname: string = '127.0.0.1';   //optional, same localhost
const port: number = 5001;

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello world !!!')
})

//router configuration
app.use('/users', userRouter)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})