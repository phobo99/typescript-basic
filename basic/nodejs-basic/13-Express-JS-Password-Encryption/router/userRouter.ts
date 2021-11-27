import express from "express";
import bcrypt from 'bcryptjs'

const userRouter: express.Router = express.Router();

//logic
userRouter.get('/', (req: express.Request, res: express.Response) => {
    res.send('Routing Express!!! with user router')
})

userRouter.post('/register', async (req: express.Request, res: express.Response) => {
    let {name, email, password} = req.body
    try {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        res.status(200)
            .json({
                user: {name, email, password},
                hashedPassword: hashedPassword
            })
    } catch (error) {
        console.error(error)
    }
})

export default userRouter