import CRUDService from '../services/CRUDService'
import { Request, Response } from "express";


const postCRUD = async (req: Request, res: Response) => {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send("post crud on server");
}


const deleteCRUD = async (req: Request, res: Response) => {
    const id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete the user succeed!')
    } else {
        return res.send('Cant not find user')
    }

}
export default {
    postCRUD,
    deleteCRUD
}