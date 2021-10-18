import userService from "../services/userService"
import { Request, Response } from "express";

const handleLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body

    // Nếu k gửi email password thì trả ra lỗi này
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    //còn có thì thực hiện vào đây
    const userData: any = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

const handleGetAllUsers = async (req: Request, res: Response) => {
    const id = req.query.id;   //ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing requied parameters',
            users: []
        })
    }
    const users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

const handleCreateNewUser = async (req: Request, res: Response) => {
    const message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message)
}


const handleDeleteUser = async (req: Request, res: Response) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    const message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}

const handleEditUser = async (req: Request, res: Response) => {
    const data = req.body;
    const message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

const getAllCode = async (req: Request, res: Response) => {
    try {
        const data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        return res.json(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
export default {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    getAllCode
}