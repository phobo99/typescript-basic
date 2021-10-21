import userService from '../services/userService';
import { Request, Response } from 'express';

const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      errCode: 1,
      message: 'Missing input parameters!',
    });
  }
  const userData: any = await userService.handleUserLogin(email, password);
  const { errCode, errMessage, user } = userData;
  return res.status(200).json({
    errCode,
    errMessage,
    user,
  });
};

const handleGetAllUsers = async (req: Request, res: Response) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing requied parameters',
      users: [],
    });
  }
  const users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    users,
  });
};

const handleCreateNewUser = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing requied parameters',
    });
  }
  const resCreateUser = await userService.createNewUser(req.body);
  console.log(resCreateUser);
  return res.status(200).json(resCreateUser);
};

const handleDeleteUser = async (req: Request, res: Response) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required parameters!',
    });
  }
  const responseDelete = await userService.deleteUser(req.body.id);
  return res.status(200).json(responseDelete);
};

const handleEditUser = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing requied parameters',
    });
  }
  const responseEdit = await userService.updateUserData(req.body);
  return res.status(200).json(responseEdit);
};

const getAllCode = async (req: Request, res: Response) => {
  if (!req.query.type) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing requied parameters',
    });
  }
  try {
    const dataAllCode = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(dataAllCode);
  } catch (e) {
    return res.json(500).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

export default {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
};
