import express from "express";

const userRouter: express.Router = express.Router();

/*
*   @usage: test url
*   @url: http://127.0.0.1:5001/users/
*   @method: get
*   @fields: no field
*   @access: PUBLIC
* */
userRouter.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('<div>Xin chao ba con co bac</div>')
});

/*
*   @usage: to check form data
*   @url: http://127.0.0.1:5001/users/login
*   @method: post
*   @fields: name, password
*   @access: PUBLIC
* */
userRouter.post('/login', (req: express.Request, res: express.Response) => {
    let formData = req.body;    //to receive the form data from client
    res.status(200).json({
        msg: 'form data is received',
        formData: formData
    });
});     //check with postman


export default userRouter;
