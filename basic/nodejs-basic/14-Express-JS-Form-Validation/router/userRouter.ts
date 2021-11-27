import express from "express";
import {body, validationResult} from 'express-validator'

const userRouter: express.Router = express.Router();

//logic
userRouter.get('/', (req: express.Request, res: express.Response) => {
    res.send('Routing Express!!! with user router')
})

/*
    fields: name, email, password
 */
userRouter.post('/register',[
   body('name').not().isEmpty().withMessage(`Name is required`),
    body('email').isEmail().withMessage('Prop Email is required'),
    body('password').isLength({min:5}).isCurrency().withMessage('Min 5 character required for password')
] ,async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let {name, email, password} = req.body

    try {

        res.status(200)
            .json({
                user: {name, email, password}
            })
    } catch (error) {
        console.error(error)
    }
})

export default userRouter