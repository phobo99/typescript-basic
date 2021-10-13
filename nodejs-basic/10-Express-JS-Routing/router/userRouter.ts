import express from "express";

const userRouter: express.Router = express.Router();

//logic
userRouter.get('/', (req: express.Request, res: express.Response) => {
    res.send('Routing Express!!! with user router')
})

userRouter.get('/about', (req: express.Request, res: express.Response) => {
    res.send('My name is Pho!! but in path user')
})

export default userRouter