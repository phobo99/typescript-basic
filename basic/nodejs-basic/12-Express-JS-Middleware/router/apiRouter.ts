import express from "express";
import appLogger from "../middlewares/appLogger";

const apiRouter: express.Router = express.Router();

//logic
apiRouter.get('/', (req: express.Request, res: express.Response) => {
    res.send('Routing Express!!!')
})

apiRouter.get('/about', (req: express.Request, res: express.Response) => {
    res.send('My name is Pho!!')
})


export default apiRouter