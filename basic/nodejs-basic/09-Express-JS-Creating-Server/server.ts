import express from 'express';

const app: express.Application = express();

const hostname: string = '127.0.0.1';   //optional, same localhost
const port: number = 5001;

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello world !!!')
})


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})